app.config(cardsConfig);

function cardsConfig($stateProvider, $urlRouterProvider){
	$stateProvider.state('cards', {
		url: '/cards',
		templateUrl: 'components/cards/cards.html.md',
		controller: 'libraryCtrl as ctrl'
	});
}