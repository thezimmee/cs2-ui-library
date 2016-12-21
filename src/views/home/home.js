app
	.config(homeRouter)
	.controller('homeCtrl', homeController);

/**
 * home page router
 */
function homeRouter($stateProvider, $urlRouterProvider) {
	$stateProvider.state ('home', {
		url: '/home',
		templateUrl: 'views/home/home.html.md',
		controller: 'homeCtrl as ctrl',
	});
}

function homeController() {}