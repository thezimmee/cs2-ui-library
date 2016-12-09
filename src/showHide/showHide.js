app.directive('showHideToggle', showHideToggleDirective);

// @todo: make this more global to a menu component
function showHideToggleDirective() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			console.log('showHideToggle');
			element.on('click', function(){
				element.next().slideToggle(200);
				element.parent().toggleClass('ds--is-toggled');
			});
		}
	}
}