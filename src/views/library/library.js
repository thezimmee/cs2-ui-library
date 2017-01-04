app
	.config(libraryConfig)
	.controller('libraryCtrl', libraryController);

function libraryConfig($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('library', {
			url: '/library',
			template: '<ui-view></ui-view>',
			controller: 'libraryCtrl as ctrl'
		})
		.state('developer-standards', {
			parent: 'library',
			url: '/developer-standards',
			templateUrl: 'views/library/developer-standards.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state('developer-workflow', {
			parent: 'library',
			url: '/developer-workflow',
			templateUrl: 'views/library/developer-workflow.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state('client-setup', {
			parent: 'library',
			url: '/client-setup',
			templateUrl: 'views/library/client-setup.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state('code-setup', {
			parent: 'library',
			url: '/code-setup',
			templateUrl: 'views/library/code-setup.html.md',
			controller: 'libraryCtrl as ctrl',
		})
		.state('developer-faq', {
			parent: 'library',
			url: '/developer-faq',
			templateUrl: 'views/library/developer-faq.html.md',
			controller: 'libraryCtrl as ctrl'
		})
		.state('creating-a-widget', {
			parent: 'library',
			url: '/creating-a-widget',
			templateUrl: 'views/library/creating-a-widget.html.md',
			controller: 'libraryCtrl as ctrl'
		});
}

function libraryController($scope, $state) {}
