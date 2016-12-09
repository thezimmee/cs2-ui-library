var app = angular.module('cs2', [
	'ui.router',
]);

app.controller('appCtrl', appController);

function appController($scope) {
	// avoid $scope
	var appCtrl = this;

	// bindings
	// appCtrl.showGlobalSearch = false;
	// isTouch detects touch devices
	appCtrl.isTouch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	// set up drawers
	appCtrl.drawers = {
		navbar: {
			open: false,
			pinned: false
		},
		chatbar: {
			open: false,
			pinned: false
		}
	};
	appCtrl.toggleDrawer = toggleDrawer;
	appCtrl.openDrawer = openDrawer;
	appCtrl.closeDrawers = closeDrawers;

	// init
	init();

	// init
	function init() {
		// Detact Mobile Browser
		// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//    angular.element('html').addClass('ismobile');
		// }

		$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			closeDrawers();
			// @todo: put this somewhere else
			// $('pre code').each(function(i, block) {
			// 	console.log('bloc: ', block);
			// 	hljs.highlightBlock(block);
			// });
		});
	}

	/**
	 * toggle drawer
	 * @param {string}
	 */
	function toggleDrawer(drawerName) {
		appCtrl.closeDrawers(drawerName);
		appCtrl.drawers[drawerName].open = !appCtrl.drawers[drawerName].open;
	}

	/**
	 * open drawer
	 * @param {string}
	 */
	function openDrawer(drawerName) {
		appCtrl.closeDrawers(drawerName);
		appCtrl.drawers[drawerName].open = true;
	}

	/**
	 * close drawers
	 * @param {string}
	 */
	function closeDrawers(activeDrawer) {
		for (var drawer in appCtrl.drawers) {
			if (drawer !== activeDrawer) {
				appCtrl.drawers[drawer].open = false;
			}
		}
	}
}