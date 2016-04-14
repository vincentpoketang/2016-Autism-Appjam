angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/users', {
			templateUrl: 'views/user.html',
			controller: 'UserController'
		})
                                        
        .when('/bryce', {
              templateUrl: 'views/bryce.html',
              controller: 'BryceController'
      });

	$locationProvider.html5Mode(true);

}]);