var auditTool = angular.module("auditTool", ["ngRoute"]);



function menuController ($scope, $http) {
	$scope.menuList = [
		{
			"menuName":"New Audit",
			"href":"#!newaudit"
		},
		{
			"menuName":"Saved Audits",
			"href":"#!savedaudit"
		},
		{
			"menuName":"Import",
			"href":"#!import"
		},
		{
			"menuName":"Parameters",
			"href":"#!parameters"
		}
	];
	$scope.selectedMenuName = "New Audit";
	$scope.selectMenu = function(name) {
		$scope.selectedMenuName = name;
		console.log(name);
	};
}

function getAllPackages($scope, $http) {
	$http.get('/getAllPackages').then(function(success) {
		console.log(success.data);
		$scope.list = function() {
			$scope.packages = success.data;
		}
	}, function(error) {
		console.log('Error: '+error);
	});
}



function getQuestionsByPackageId($scope, $http, id, callback) {
	var questionsList = [];
	$http.get('/getAllQuestionsByPackageId/' + id).then(function(success) {
		console.log("get");
		console.log(success.data);
		$scope.list = function() {
			$scope.questions = success.data;
		}
	}, function(error) {
		console.log('Error: '+error);
	});
}


function getDefaultPackage($http, id) {
	return $http({
		method: 'GET',
		url: '/getAllQuestionsByPackageId/' + id
	});
};


function sortQuestionsByDomain(questions) {
	var domainIds = [];
	for(var i = 0; i<questions.length; i++) {
		if(!domainIds.includes(questions[i].DomaineID)) {
			domainIds.push(questions[i].DomaineID);
		}
	}
	console.log(domainIds);
}


(function(app){
	"use strict";
	

	app.config(function($routeProvider) {
		$routeProvider
		.when("/newaudit", {
			templateUrl : "newAudit.htm",
			controller : "newAuditCtrl"
		})
		.when("/savedaudit", {
			templateUrl : "savedAudit.htm"
		})
		.when("/import", {
			templateUrl : "import.htm"
		})
		.when("/parameters", {
			templateUrl : "parameters.htm"
		})
		.otherwise({
			templateUrl : "newAudit.htm"
		});
	});

	app.controller("mainController", function($scope, $http) {
		//getQuestionsByPackageId($scope, $http);
	});

	app.controller("menuController", function($scope, $http) {
		menuController($scope, $http);
	});

	app.controller("newAuditCtrl", function($scope, $http) {
		//console.log("test");
		// getQuestionsByPackageId($scope, $http, 1, function(q) {
		// 	console.log("list : ", q);
		// });
		getDefaultPackage($http, 1).then(function(data) {
			console.log("blablabla", data.data);
			$scope.questions = data.data;
			sortQuestionsByDomain(data.data);
		}, function(err) {
			console.log(err)
		});
		//sortQuestionsByDomain($scope.questions);
	});

})(auditTool);




