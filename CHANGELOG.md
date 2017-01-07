## Release History

[![Build Status](https://travis-ci.org/thezimmee/cs2-ui-library.svg?branch=master)](https://travis-ci.org/thezimmee/cs2-ui-library)

- 1/7/2016: Added abstract, core, and component style blocks.
- 1/6/2016: Automated the creation of style guide pages.
- 1/4/2016: Added all vendor code blocks.
- 12/23/2016: Added js, css, and html linters.
- 12/14/2016: Auto-build when any file changes with Travis CI.
- 12/13/2016: Edit pages on GitHub.
- 12/12/2016:
    - Add html containers in markdown files with this syntax:
        ```md
        :::: a(href="#link-me" title="I am a link. The span on the next line gets nested.")
        ::: span(class="test this" data-ng-class="{'sometimes': onlySometimes()}")

        <!-- other markdown tags here -->

        :::
        ::::
        ```
    - Speedier, incremental builds.
- 12/9/2016: Added card element (`.ds-card`).
- 12/8/2016: Moved CS2 documentation here.
