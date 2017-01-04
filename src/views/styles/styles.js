app
	.config(stylesConfig)
	.controller('stylesCtrl', stylesController);

function stylesConfig($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('styles', {
			url: '/styles',
			template: '<ui-view></ui-view>',
			controller: 'stylesCtrl as ctrl'
		})
		.state('vendor', {
			parent: 'styles',
			url: '/vendor',
			templateUrl: 'views/styles/vendor.html.md',
			controller: 'stylesCtrl as ctrl'
		})
		.state('abstracts', {
			parent: 'styles',
			url: '/abstracts',
			templateUrl: 'views/styles/abstracts.html.md',
			controller: 'stylesCtrl as ctrl'
		})
		.state('core', {
			parent: 'styles',
			url: '/core',
			templateUrl: 'views/styles/core.html.md',
			controller: 'stylesCtrl as ctrl'
		})
		.state('components', {
			parent: 'styles',
			url: '/components',
			templateUrl: 'views/styles/components.html.md',
			controller: 'stylesCtrl as ctrl'
		})
		.state('views', {
			parent: 'styles',
			url: '/views',
			templateUrl: 'views/styles/views.html.md',
			controller: 'stylesCtrl as ctrl'
		})
		.state('cards', {
			parent: 'styles',
			url: '/cards',
			templateUrl: 'components/cards/cards.html.md',
			controller: 'stylesCtrl as ctrl'
		})
		.state('bootstrap', {
			parent: 'styles',
			url: '/bootstrap',
			templateUrl: 'views/styles/bootstrap.html.md',
			controller: 'stylesCtrl as ctrl'
		});
}

function stylesController($scope, $state) {}
