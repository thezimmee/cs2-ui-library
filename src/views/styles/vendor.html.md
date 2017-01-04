# Vendor code

_Vendor code_ is any 3rd party code not created or modified by us. Examples are _angularJS_, _jQuery_, plugins, etc. Vendor code is the first code category because vendor code must be inserted before any other code in our HTML files.

There are two rules for importing vendor code into our codebase:

1. Never modify vendor code.
2. Use [Bower](https://bower.io/) or [NPM](https://npmjs.org) to install and manage vendor code.

## Installing vendor code

To install vendor code:

1. Install the package with [Bower](https://bower.io/) or [NPM](https://npmjs.org).
2. Link only to the file(s) you need:
    - for `js` files, link to them in `gruntfile.js`.
    - for `css` files, link to them in `main.less`.
