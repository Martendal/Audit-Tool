var auditTool = angular.module("auditTool", ["ngRoute"]);


//import { Component } from '@angular/core';




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
		},
		{
			"menuName":"Manage Database",
			"href":"#!managedatabase"
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
}

function getDomainNameById($http, id) {
	return $http({
		method: 'GET',
		url: '/getAssociatedDomainName/' + id
	});
}

function getSurveyByPackageId($http, id) {
	return $http({
		method: 'GET',
		url: '/getPackage/' + id
	});
}

function fillDomainNames($http, domains, callback) {
	for(var i=0; i<domains.length; i++) {
		domains[i].domainName = getDomainNameById($http, domains[i].domainId);
	}
	callback(domains);
}


//Order all the questions of the package by domain. Each domain has a list of questions
function createDomainList($http, questions) {
	var domains = [];
	for(var i = 0; i<questions.length; i++) {
		if(domains.filter(e => e.domainId == questions[i].DomaineID).length == 0) {
			//console.log("domaine : ",getDomainNameById($http, questions[i].DomaineID));
			var obj = {
				domainId: questions[i].DomaineID,
				domainName: "",//getDomainNameById($http, questions[i].DomaineID)["$$state"].value.data,
				questions: [questions[i]]
			};
			domains.push(obj);
		}
		else{
			var dom = $.grep(domains, function(e) { return e.domainId == questions[i].DomaineID});
			if(dom.length == 1) {
				dom[0].questions.push(questions[i]);
			}
		}
	}
	//return domains;
	var d = {};
	fillDomainNames($http, domains, function(dnames) {
		d = dnames;
	});
	return d;
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
		.when("/managedatabase", {
			templateUrl : "managedatabase.htm",	
			controller : "databaseManagerCtrl"
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
		/*getDefaultPackage($http, 1).then(function(data) {
			//console.log("blablabla", data.data);
			$scope.questions = data.data;
			$scope.domainList = createDomainList($http, data.data);
		}, function(err) {
			console.log(err)
		}).then(function() {
			console.log("domains: ",$scope.domainList);
		});*/
		//Survey.Survey.cssType = "bootstrap";
		//Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
		/*getSurveyByPackageId($http, 1).then(function(data) {
			//console.log(data);
			var json = data;


			


			$scope.survey = json;
			/*window.survey = new Survey.Model(json);

			survey.onComplete.add(function(result) {
			    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
			});

			function onAngularComponentInit() {
			    Survey.SurveyNG.render("surveyElement", { 
			        model: survey 
			    });
			}
			var HelloApp =
			    ng.core
			        .Component({
			            selector: 'ng-app',
			            template: '<div id="surveyContainer" class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div> '})
			        .Class({
			            constructor: function() {
			            },
			            ngOnInit: function() {
			                onAngularComponentInit();
			            }
			    });
			document.addEventListener('DOMContentLoaded', function() {
			    ng.platformBrowserDynamic.bootstrap(HelloApp);
			});*/
		//});
	});
	app.controller("databaseManagerCtrl", function($scope, $http) { });

})(auditTool);




