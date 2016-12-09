app
	.config(function ($stateProvider, $urlRouterProvider){
		$urlRouterProvider.when('/', '/home');
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state ('home', {
				url: '/home',
				templateUrl: 'home/home.tpl.html',
			})
			.state ('developer-standards', {
				url: '/developer-standards',
				templateUrl: 'library/developer-standards.tpl.html',
			})
			.state ('developer-workflow', {
				url: '/developer-workflow',
				templateUrl: 'library/developer-workflow.tpl.html',
			})
			.state('client-setup', {
				url: '/client-setup',
				templateUrl: 'library/client-setup.tpl.html'
			})
			.state('developer-setup', {
				url: '/developer-setup',
				templateUrl: 'library/developer-setup.tpl.html'
			})
			.state('developer-faq', {
				url: '/developer-faq',
				templateUrl: 'library/developer-faq.tpl.html'
			})
			.state('creating-a-widget', {
				url: '/creating-a-widget',
				templateUrl: 'library/creating-a-widget.tpl.html'
			})
			.state('cards', {
				url: '/cards',
				templateUrl: 'cards/cards.tpl.html'
			})
	});
