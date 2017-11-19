var auditTool = angular.module("auditTool", []);


/*
auditTool.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);*/


function getQuestionsByDomainId($scope, $http) {
	console.log("coucou");
	$http.get('/QuestionsByDomain/1').then(function(success) {
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
		getQuestionsByDomainId($scope, $http);
	});
})(auditTool);




