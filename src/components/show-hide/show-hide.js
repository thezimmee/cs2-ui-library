app.directive('showHideToggle', showHideToggleDirective);

function showHideToggleDirective() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var showHideElement = element.next();

			if (!showHideElement.hasClass('ds--is-active')) {
				showHideElement.slideToggle(200);
			}

			element.on('click', function(){
				showHideElement.slideToggle(200);
				if (element.hasClass('ds--is-active')) {
					showHideElement.removeClass('ds--is-active');
					element.removeClass('ds--is-active');
				} else {
					showHideElement.addClass('ds--is-active');
					element.addClass('ds--is-active');
				}
			});

			scope.$on('$destroy', function () {
				element.off('click');
			});
		}
	};
}
