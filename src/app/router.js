app
	.config(function ($stateProvider, $urlRouterProvider){
		$urlRouterProvider.when('/', '/home');
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state ('home', {
				url: '/home',
				templateUrl: 'home/home',
				controller: 'homeCtrl as ctrl',
			})
			.state ('developer-standards', {
				url: '/developer-standards',
				templateUrl: 'library/developer-standards',
				controller: 'libraryCtrl as ctrl',
				data: {
					editable: true
				}
			})
			.state ('developer-workflow', {
				url: '/developer-workflow',
				templateUrl: 'library/developer-workflow',
				controller: 'libraryCtrl as ctrl',
				data: {
					editable: true
				}
			})
			.state('client-setup', {
				url: '/client-setup',
				templateUrl: 'library/client-setup',
				controller: 'libraryCtrl as ctrl',
				data: {
					editable: true
				}
			})
			.state('developer-setup', {
				url: '/developer-setup',
				templateUrl: 'library/developer-setup',
				controller: 'libraryCtrl as ctrl',
				data: {
					editable: true
				}
			})
			.state('developer-faq', {
				url: '/developer-faq',
				templateUrl: 'library/developer-faq',
				controller: 'libraryCtrl as ctrl',
				data: {
					editable: true
				}
			})
			.state('creating-a-widget', {
				url: '/creating-a-widget',
				templateUrl: 'library/creating-a-widget',
				controller: 'libraryCtrl as ctrl',
				data: {
					editable: true
				}
			})
			.state('cards', {
				url: '/cards',
				templateUrl: 'cards/cards',
				controller: 'libraryCtrl as ctrl',
				data: {
					editable: true
				}
			})
	});
