var app = angular.module('cs2', [
	'ui.router',
]);

app
	.controller('appCtrl', appController)
	.controller('mainCtrl', mainController);


function appController($scope, $state) {
	// avoid $scope
	var appCtrl = this;
	// console.log('editUrl: ', $state.current);

	// bindings
	$scope.state = $state;
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
	appCtrl.$state = $state;

	// init
	init();

	/**
	 * init
	 */
	function init() {
		$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			closeDrawers();
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

function mainController($scope, $state) {
	console.log('mainCtrl');
}