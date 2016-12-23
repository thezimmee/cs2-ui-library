app.directive('a', dsTocDirective);

function dsTocDirective($location) {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {
			if (attrs.href && attrs.href[0] === '#') {
				element.attr('href', '#' + $location.path() + attrs.href);
			}
		}
	};
}