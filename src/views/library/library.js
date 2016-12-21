app
	.config(libraryConfig)
	.controller('libraryCtrl', libraryController);

function libraryConfig($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state ('developer-standards', {
			url: '/developer-standards',
			templateUrl: 'views/library/developer-standards.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state ('developer-workflow', {
			url: '/developer-workflow',
			templateUrl: 'views/library/developer-workflow.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state('client-setup', {
			url: '/client-setup',
			templateUrl: 'views/library/client-setup.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state('code-setup', {
			url: '/code-setup',
			templateUrl: 'views/library/code-setup.html.md',
			controller: 'libraryCtrl as ctrl',
		})
		.state('developer-faq', {
			url: '/developer-faq',
			templateUrl: 'views/library/developer-faq.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state('creating-a-widget', {
			url: '/creating-a-widget',
			templateUrl: 'views/library/creating-a-widget.html.md',
			controller: 'libraryCtrl as ctrl'
		});
}

function libraryController($scope, $state) {}