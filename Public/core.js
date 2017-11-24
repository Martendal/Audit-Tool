var auditTool = angular.module("auditTool", []);


/*
auditTool.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);*/
function menuController ($scope, $http) {
	$scope.menuList = [
		{
			"menuName":"New Audit"
		},
		{
			"menuName":"Saved Audit"
		},
		{
			"menuName":"Import"
		},
		{
			"menuName":"Parameters"
		}
	];
	$scope.selectedMenuName = "New Audit";
	$scope.selectMenu = function(name) {
		$scope.selectedMenuName = name;
		console.log(name);
	}
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
		/*console.log("coucou");
		$http.get('/QuestionsByDomain/1').then(function(success) {
			console.log(success.data[0].Explication);
		}, function(error) {
			console.log('Error: '+error);
		});*/
		getQuestionsByPackageId($scope, $http);
	});

	app.controller("menuController", function($scope, $http) {
		menuController($scope, $http);
	})
})(auditTool);




