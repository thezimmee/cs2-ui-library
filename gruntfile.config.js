/**
 * configuration for gruntfile build
 */

var globals = module.exports = {};


/** vendor JS files */
globals.vendorJs = [
	// jquery
	'vendors/jquery/dist/jquery.min.js',
	// angular
	'vendors/angular/angular.min.js',
	'vendors/angular-ui-router/release/angular-ui-router.min.js',
	// other
	'vendors/highlightjs/highlight.pack.min.js',
];


/** fonts to copy over */
globals.fonts = [
	'vendors/material-design-iconic-font/dist/fonts/**/*',
	'vendors/roboto-fontface/fonts/Roboto/Roboto-Light.*',
	'vendors/roboto-fontface/fonts/Roboto/Roboto-Regular.*',
	'vendors/roboto-fontface/fonts/Roboto/Roboto-Medium.*',
	'vendors/roboto-fontface/fonts/Roboto/Roboto-Bold.*'
];


/** data for local build (for lodash templates) */
var styleguide = require('./src/components/data/styles.js');
globals.data = {
	styles: styleguide.styles,
	// code categories with sorted keys for each style block
	vendors: styleguide.vendors,
	abstracts: styleguide.abstracts,
	core: styleguide.core,
	components: styleguide.components,
	views: styleguide.views
};
