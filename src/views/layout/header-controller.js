app.controller('headerCtrl', headerController);

function headerController($scope, $timeout) {
	var hCtrl = this;
	var appCtrl = $scope.appCtrl;

	// Top Search
	hCtrl.openSearch = function(){
		appCtrl.showGlobalSearch = true;
		angular.element('.header__search').find('input').focus();
	};

	hCtrl.closeSearch = function(){
		appCtrl.showGlobalSearch = false;
		angular.element('.header__search').find('input').blur();
	};

	hCtrl.toggleSearch = function(){
		if (appCtrl.showGlobalSearch) {
			hCtrl.closeSearch();
		} else {
			hCtrl.openSearch();
		}
	};

	// Get messages and notification for header
	// this.img = messageService.img;
	// this.user = messageService.user;
	// this.user = messageService.text;

	// this.messageResult = messageService.getMessage(this.img, this.user, this.text);


	//Clear Notification
	this.clearNotification = function($event) {
		$event.preventDefault();

		var x = angular.element($event.target).closest('.listview');
		var y = x.find('.lv-item');
		var z = y.size();

		angular.element($event.target).parent().fadeOut();

		x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
		x.find('.grid-loading').fadeIn(1500);
		var w = 0;

		y.each(function(){
			var z = $(this);
			$timeout(function(){
				z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
					z.remove();
				});
			}, w+=150);
		});

		$timeout(function(){
			angular.element('#notifications').addClass('empty');
		}, (z*150)+200);
	};

	// Clear Local Storage
	this.clearLocalStorage = function() {

		//Get confirmation, if confirmed clear the localStorage
		swal({
			title: "Are you sure?",
			text: "All your saved localStorage values will be removed",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#F44336",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: false
		}, function(){
			localStorage.clear();
			swal("Done!", "localStorage is cleared", "success");
		});
	};

	//Fullscreen View
	this.fullScreen = function() {
		//Launch
		function launchIntoFullscreen(element) {
			if(element.requestFullscreen) {
				element.requestFullscreen();
			} else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if(element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if(element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		}

		//Exit
		function exitFullscreen() {
			if(document.exitFullscreen) {
				document.exitFullscreen();
			} else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if(document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}

		if (exitFullscreen()) {
			launchIntoFullscreen(document.documentElement);
		}
		else {
			launchIntoFullscreen(document.documentElement);
		}
	};
}