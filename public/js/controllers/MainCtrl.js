angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tagline = 'WHY ARENT MY AJAX CALLS WORKING';

	$scope.changeTagline=function() {
		var request = {
			method: 'GET',
			url: "http://localhost:3000/api/users/570dc21926f41e1c28ab4712"
		};
		$http(request).
		success(function (data) {
			$scope.tagline = data.name;
		}).error(function (data) {
			console.log('ERROR: Could not find user');
		});

	};
});