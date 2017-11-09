var auditTool = angular.module('auditTool', []);

function mainController ($scope, $http) {
	$scope.formData = {};

	$http.get('/test').success(function(data) {
		console.log('successful get');
	}).error(fucntion(data) {
		console.log('Error: '+data);
	});
}