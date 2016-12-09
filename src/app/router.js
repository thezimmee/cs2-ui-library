app
	.config(function ($stateProvider, $urlRouterProvider){
		$urlRouterProvider.when('/', '/home');

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
	});
