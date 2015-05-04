four51.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.
		when('/reward', { templateUrl: 'partials/reward.html', controller: 'RewardCtrl' }).
		otherwise({redirectTo: '/reward'});
}]);