app.directive('showHideToggle', showHideToggleDirective);

function showHideToggleDirective() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function(){
				element.next().slideToggle(200);
				if (element.hasClass('ds--is-toggled')) {
					element.next().removeClass('ds--is-toggled');
					element.removeClass('ds--is-toggled');
				} else {
					element.next().addClass('ds--is-toggled');
					element.addClass('ds--is-toggled');
				}
			});

			scope.$on('$destroy', function () {
				element.off('click');
			});
		}
	}
}