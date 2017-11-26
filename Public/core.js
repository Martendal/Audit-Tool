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



function getQuestionsByPackageId($scope, $http) {
	$http.get('/getAllQuestionsByPackageId/1').then(function(success) {
		console.log("get");
		console.log(success.data);
		$scope.list = function() {
			$scope.questions = success.data;
		}
	}, function(error) {
		console.log('Error: '+error);
	});
}





(function(app){
	"use strict";
	app.controller("mainController", function($scope, $http) {
		getQuestionsByPackageId($scope, $http);
	});

	app.controller("menuController", function($scope, $http) {
		menuController($scope, $http);
	});

	app.config(function($routeProvider) {
		$routeProvider
		.when("/", {
			templateUrl : "newAudit.htm"
		})
		.when("/newaudit", {
			templateUrl : "newAudit.htm"
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
})(auditTool);




