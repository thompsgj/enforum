(function () {
	angular.module('enforumApp', ['ngRoute','ngSanitize','ui.bootstrap']);

	function config ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : '/home/home.view.html',
				controller : 'homeCtrl',
				controllerAs : 'vm'
			})
			.when('/forum/:forumid', {
				templateUrl : '/postList/postList.view.html',
				css : '/postList/postList.style.css',
				controller : 'listCtrl',
				controllerAs : 'vm'
			})
			.when('/thread/:postid', {
				templateUrl : '/postRetrieve/postRetrieve.view.html',
				controller : 'retrieveCtrl',
				controllerAs : 'vm'
			})
			.otherwise({redirectTo: '/'});
	}

	angular
		.module('enforumApp')
		.config(['$routeProvider', config])
}) ();