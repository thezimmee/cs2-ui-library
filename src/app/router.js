app
	.config(function ($stateProvider, $urlRouterProvider){
		$urlRouterProvider.when('/', '/home');
		// $urlRouterProvider.otherwise('/home');

		$stateProvider
			.state ('home', {
				url: '/home',
				templateUrl: 'home/home.html.md',
				controller: 'homeCtrl as ctrl',
			})
			.state ('developer-standards', {
				url: '/developer-standards',
				templateUrl: 'library/developer-standards.html.md',
				controller: 'libraryCtrl as ctrl'
			})
			.state ('developer-workflow', {
				url: '/developer-workflow',
				templateUrl: 'library/developer-workflow.html.md',
				controller: 'libraryCtrl as ctrl'
			})
			.state('client-setup', {
				url: '/client-setup',
				templateUrl: 'library/client-setup.html.md',
				controller: 'libraryCtrl as ctrl'
			})
			.state('code-setup', {
				url: '/code-setup',
				templateUrl: 'library/code-setup.html.md',
				controller: 'libraryCtrl as ctrl',
			})
			.state('developer-faq', {
				url: '/developer-faq',
				templateUrl: 'library/developer-faq.html.md',
				controller: 'libraryCtrl as ctrl'
			})
			.state('creating-a-widget', {
				url: '/creating-a-widget',
				templateUrl: 'library/creating-a-widget.html.md',
				controller: 'libraryCtrl as ctrl'
			})
			.state('cards', {
				url: '/cards',
				templateUrl: 'cards/cards.html.md',
				controller: 'libraryCtrl as ctrl'
			})
	});
