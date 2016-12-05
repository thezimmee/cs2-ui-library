app
	.config(function ($stateProvider, $urlRouterProvider){
		$urlRouterProvider.when('/', '/home');

		$stateProvider
			.state ('home', {
				url: '/home',
				templateUrl: 'home/home.tpl.html',
			})
	});
