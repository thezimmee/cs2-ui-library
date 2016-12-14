# CS2 UI Library

[![Build Status](https://travis-ci.org/thezimmee/cs2-ui-library.svg?branch=master)](https://travis-ci.org/thezimmee/cs2-ui-library)

The goals of the UI Library are to:

- unify the CS2 UI.
- speed up development time.
- make the CS2 UI stunningly beautiful and a joy for the end-user to work in.

by doing the following:

- standardize the UI codebase.
- give developers code patterns to seamlessly plug in.
- document standards and guidelines for working in the CS2 UI codebase.

## Development

Current features to help with development are as follows:

- _Angular templates_: Any file with the `.tpl.html` extension is converted to an Angular template and combined in the `build/js/templates.js` file during development.
- _Markdown (`*.md`) files_: Markdown files are parsed and saved as an Angular template.
- _Code syntax highlighting_ inside of markdown code blocks.
- _HTML_ inside of markdown files is also allowed.

## Install

1. Clone the repo
2. Run `npm install`

## Build, Serve, Deploy

- `grunt`: runs a development build with _non-optimized assets_.
- `grunt -P` or `grunt --prod`: runs a production build with _optimized assets_.
- `grunt deploy`: runs a production build and automatically deploys to the `gh-pages` branch for GitHub pages.
