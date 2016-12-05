var app = angular.module('cs2', [
	'ui.router',
]);

app
	.controller('appCtrl', appController);


function appController($scope, $timeout, $state) {
	var appCtrl = this;

	appCtrl.showGlobalSearch = false;

	$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		if (toState.name === 'headers.textual-menu') {
			appCtrl.headerSrc = 'components/layout/header-textual-menu.tpl.html';
		} else if (toState.name === 'headers.image-logo') {
			appCtrl.headerSrc = 'components/layout/header-image-logo.tpl.html';
		} else if (toState.name === 'headers.mainmenu-on-top') {
			appCtrl.headerSrc = 'components/layout/header-top-menu.tpl.html';
		} else {
			appCtrl.headerSrc = 'components/layout/header.tpl.html';
		}
	});

	//Welcome Message
	// growlService.growl('Welcome back Mallinda!', 'inverse')


	// Detact Mobile Browser
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   angular.element('html').addClass('ismobile');
	}


	// By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
	this.drawers = {
		navbar: {
			open: false,
			pinned: false
		},
		chatbar: {
			open: false,
			pinned: false
		}
	};
	this.toggleDrawer = function (drawerName) {
		appCtrl.closeDrawers(drawerName);
		appCtrl.drawers[drawerName].open = !appCtrl.drawers[drawerName].open;
	}
	this.openDrawer = function (drawerName) {
		appCtrl.closeDrawers(drawerName);
		appCtrl.drawers[drawerName].open = true;
	}
	this.closeDrawers = function (activeDrawer) {
		for (var drawer in appCtrl.drawers) {
			if (drawer !== activeDrawer) {
				appCtrl.drawers[drawer].open = false;
			}
		}
	}

	// By default template has a boxed layout
	this.drawers.navbar.pinned = JSON.parse(localStorage.getItem('navbar--pinned'));

	// For Mainmenu Active Class
	this.$state = $state;

	//Close sidebar on click
	this.navbarClick = function(event) {
		if (!angular.element(event.target).parent().hasClass('active')) {
			appCtrl.closeDrawers();
		}
	}

	//Listview Search (Check listview pages)
	this.listviewSearchStat = false;

	this.lvSearch = function() {
		this.listviewSearchStat = true;
	}

	//Listview menu toggle in small screens
	this.lvMenuStat = false;

	//Blog
	this.wallCommenting = [];

	this.wallImage = false;
	this.wallVideo = false;
	this.wallLink = false;

	//Skin Switch
	this.currentSkin = 'blue';

	this.skinList = [
		'lightblue',
		'bluegray',
		'cyan',
		'teal',
		'green',
		'orange',
		'blue',
		'purple'
	]

	this.skinSwitch = function (color) {
		this.currentSkin = color;
	}
}