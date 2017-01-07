app
	.config(stylesConfig)
	.controller('stylesCtrl', stylesController);

function stylesConfig($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('styles', {
			url: '/style-guide',
			template: '<ui-view></ui-view>',
			controller: 'stylesCtrl as ctrl'
		})
		.state('vendors', {
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
		<% _.each(styles, function (style, name) { %>.state('<%= name %>', {
			parent: 'styles',
			url: '/<%= name %>',
			templateUrl: 'views/styles/<%= name %>.html.md',
			controller: 'stylesCtrl as ctrl'
		})<% }) %>;
}

function stylesController($scope, $state) {}
