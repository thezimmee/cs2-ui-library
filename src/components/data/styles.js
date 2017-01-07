/**
 * data for style-guide style blocks
 * ---
 * style block = {
 *  status: '',
 *  version: '',
 *  bundle: '', // vendors|abstracts|core|components|views
 *  base: '', // base class (can be array if multiple base classes exist)
 *  dependencies: [], // list of dependencies (include links... accepts markdown/html)
 *  classes: {
 *      '.ds-class-name': '<usage description>'
 *  },
 *  name: '', // defaults to file name (used by navbar and page header)
 *  intro: '', // intro text before style page metadata (accepts markdown/html)
 *  content: '', // content after style page metadata
 *  related: [], // related style blocks (use the style block's key so it links properly)
 * };
 * statuses:
 *  - complete: implemented
 *  - in progress: partially implemented
 *  - needs update: needs to be looked at
 *  - needs implementation: not implemented
 *  - deprecated: implemented but deprecated... do not use
 *  - unknown: unknown
 * bundles:
 *  - vendors
 *  - abstracts
 *  - core
 *  - components
 *  - views
 */

var _ = require('lodash');

var styleguide = module.exports = {};

// save style block keys to their code category (they are sorted later)
styleguide.vendors = [];
styleguide.abstracts = [];
styleguide.core = [];
styleguide.components = [];
styleguide.views = [];

// each style block
styleguide.styles = _.each({
    // abstracts
        'background-color': {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'abstracts',
            base: '.bg()',
            intro: '`less` mixin which applies a light or dark `color` property based on the lightness/darkness of the supplied `background-color`.'
        },
        'font-face': {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'abstracts',
            base: '.font-face()',
            intro: '`less` mixin which makes it easy to produce correct `@font-face` syntax.'
        },
    // core
        buttons: {
            status: 'needs implementation',
            version: '1.0.0',
            base: '.ds-button',
            bundle: 'core'
        },
        colors: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            base: '.ds-c',
            intro: 'All reusable background and foreground color values.'
        },
        flex: {
            status: 'needs update',
            version: '1.0.0',
            bundle: 'core',
            base: '.ds-flex',
            intro: 'Flexible `flexbox` implementation for laying elements out. Should be used in place of `floats`, grids, and other older CSS layout properties.'
        },
        fonts: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            intro: 'Custom fonts.'
        },
        spacing: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            base: ['.ds-m', '.ds-p'],
            intro: 'Utility classes for common spacing values (e.g., `margin` and `padding` properties). These values should be used in place of any other custom values.'
        },
        tables: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            intro: 'Responsive data tables.'
        },
        typography: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            intro: 'Core typography styles.'
        },
        layout: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            intro: 'Main layout.',
            related: ['header', 'footer', 'navbar']
        },
        header: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            intro: 'Global header. This is part of <a ui-sref="layout">layout</a>.',
            related: ['layout','footer', 'navbar']
        },
        footer: {
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'core',
            intro: 'Global footer. This is part of <a ui-sref="layout">layout</a>.',
            related: ['layout', 'header', 'navbar']
        },
        navbar: {
            status: 'needs implementation',
            version: '1.0.0',
            name: 'NavBar',
            bundle: 'core',
            intro: 'Global navigation sidebar. This is part of <a ui-sref="layout">layout</a>.',
            related: ['layout', 'header', 'footer']
        },
    // components
        cards: {
            status: 'needs update',
            version: '1.0.0',
            bundle: 'components',
            base: '.ds-card',
            classes: {
                '.ds-card': 'base card element',
                '.ds-card--square': 'square edges',
                '.ds-card--flat': 'no drop shadow',
                '.ds-card__header': 'header',
                '.ds-card__header-action': 'action button in header',
                '.ds-card__title': 'title text',
                '.ds-card__body': 'body content',
                '.ds-card__body--pad': 'padded body',
                '.ds-card__footer': 'footer',
                '.ds-card__footer--link': 'clickable footer',
                '.ds-card__footer-icon': 'footer icon',
                '.ds-card__li': 'list item in body',
                '.ds-card__li--active': 'active list item',
                '.ds-card__li--button': 'clickable list item',
            },
            dependencies: '<a href="https://github.com/thezimmee/cs2-ui-library/edit/master/src/components/cards/cards.less" target="_blank">cards.less</a>',
            toc: true
        },
        'show-hide': {
            name: 'Show / hide toggle',
            status: 'needs implementation',
            version: '1.0.0',
            bundle: 'components',
            base: '[show-hide-toggle]',
            intro: 'Show hide toggle.'
        },
    // vendor code
        alasql: {
            version: '0.2.6',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        angular: {
            status: 'complete',
            version: '1.3.17',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-bootstrap': {
            version: '0.13.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-chosen-localytics': {
            version: '1.0.7',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-cookies': {
            version: '1.3.17',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-filter': {
            version: '0.5.7',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-nouislider': {
            version: '0.3.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-resource': {
            version: '1.3.17',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-sanitize': {
            version: '1.3.17',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-swipe': {
            version: '0.0.9',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-translate': {
            version: '1.1.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-translate-storage-cookie': {
            version: '0.1.6',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-translate-storage-local': {
            version: '0.1.6',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-ui': {
            version: '0.4.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-ui-router': {
            version: '0.2.10',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'angular-ui-utils': {
            version: '0.1.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'animate.css': {
            version: '3.5.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        bootstrap: {
            status: 'deprecated',
            version: '3.3.6',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
            content: 'Bootstrap is currently used in CS2. _However, because few of the included components are actually being used as intended, the plan is to get rid of Bootstrap in the coming weeks. **For this reason, avoid using Bootstrap classes in any new code.**_'
        },
        'bootstrap-daterangepicker': {
            version: '2.1.17',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'bootstrap-sweetalert': {
            version: '0.4.5',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'bower-angular-translate-loader-static-files': {
            version: '0.1.6',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'chosen': {
            version: '1.4.2',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'circliful': {
            version: '0.1.5',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'clipboard': {
            version: '1.5.10',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'cryptojslib': {
            version: '3.1.2',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'dragscroll': {
            version: '0.0.5',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'easy-pie-chart': {
            version: '1.2.3',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'eonasdan-bootstrap-datetimepicker': {
            version: '4.17.37',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'fingerprintjs2': {
            version: '1.0.3',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'fullcalendar': {
            version: '2.3.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'html2canvas': {
            version: '0.4.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'imagesloaded': {
            version: '^4.1.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'isotope': {
            version: '^3.0.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'isotope-packery': {
            version: '^2.0.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'jquery': {
            version: '2.1.4',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'jquery-sortable': {
            version: '0.9.13',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'jquery-tokeninput': {
            version: '1.7.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'jquery.scrollTo': {
            version: '2.1.2',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'jspdf': {
            version: '1.0.272',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'lightgallery': {
            version: '1.2.18',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'material-design-iconic-font': {
            version: '2.2.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'mdi': {
            version: '1.5.54',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'moment': {
            version: '2.10.3',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'moment-timezone': {
            version: '^0.5.4',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'ng-img-crop': {
            version: '0.3.2',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'ng-table': {
            version: '0.8.3',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'ngclipboard': {
            version: '1.1.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'nouislider': {
            version: '6.2.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'ocLazyLoad': {
            version: '1.0.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'qtip2': {
            version: '2.2.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'remarkable-bootstrap-notify': {
            version: '2.0.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'summernote': {
            version: '0.6.16',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'tablesaw': {
            version: '2.0.1',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'tmsolution-tableheaderfixer': {
            version: '1.1.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'underscore': {
            version: '1.7.0',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
        'waves': {
            version: '0.7.2',
            bundle: 'vendors',
            base: 'n/a',
            dependencies: 'none',
        },
}, function (style, key) {
    // transform classes from globals.data.styles
    if (style.classes) {
        _.each(style.classes, function (value, className) {
            if (typeof value === 'string') {
                style.classes[className] = {
                    usage: value
                };
            }
            style.classes[className].name = className;
            // if it's a modifier, push to parent
            if (className.indexOf('--') > -1) {
                var parent = className.split('--')[0];
                if (!style.classes[parent].modifiers) {
                    style.classes[parent].modifiers = [];
                }
                if (style.classes[parent].modifiers.indexOf(className) === -1) {
                    style.classes[parent].modifiers.push(className);
                }
            }
        });
    }
    // if style.name doesn't exist already, use the file name
    style.name = style.name || (key[0].toUpperCase() + key.slice(1).toLowerCase()).replace(/-/g, ' ');
    // make sure style.related is an array
    if (typeof style.related === 'string') {
        style.related = [style.related];
    }
    // make sure style.base is an array
    if (typeof style.base === 'string') {
        style.base = [style.base];
    }
    // make sure certain properties exist
    style.intro = style.intro || '';
    style.content = style.content || '';
    // push to bundle list
    styleguide[style.bundle].push(key);
});

// sort code category keys
styleguide.vendors = _.sortBy(styleguide.vendors);
styleguide.abstracts = _.sortBy(styleguide.abstracts);
styleguide.core = _.sortBy(styleguide.core);
styleguide.components = _.sortBy(styleguide.components);
styleguide.views = _.sortBy(styleguide.views);
