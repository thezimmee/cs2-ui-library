# CS2 UI Library

The goals of the UI Library are to:

- unify the CS2 UI.
- speed up development time.
- make the CS2 UI stunningly beautiful and a joy (e.g., **speed**) for the end-user to work in.

by doing the following:

- standardize the UI codebase.
- give developers code patterns to seamlessly plug in.
- document standards and guidelines for working in the CS2 UI codebase.

## Release History

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

## Upcoming

- [x] Add markdown documentation editing
- [ ] Add auto build with Travis CI
- [ ] Review documentation for up-to-date accuracy.
    - [ ] Align `developer-standards` with [CSS at Scale](https://docs.google.com/a/virtuosobranding.com/presentation/d/1HFf8cDV6W4iIvL3PjPrOKO0On8NwIReO0lNnpfTiJ-I/edit) presentation.
    - [ ] Find a place for `learn-cs2.md`.
- [ ] Automate process of creating a "/library" document (with navigation).
- [ ] Document base / global modules:
    - [x] cards
    - [ ] forms
    - [ ] menus
    - [ ] modals
    - [ ] buttons
- [ ] Add inline WYSIWYG/markdown editor? ([prose](https://prose.io/)?, [draft](https://draftin.com/)?)
- [x] Add plugin to only process modified files in grunt build.
- [x] Add markdown plugins:
    - [ ] todo boxes
    - [x] html containers
- [ ] Convert @spu to rem units
- [ ] Add plugin (nodemon?) to auto-restart after errors (like with less)
- [ ] Add global search functionality
- [ ] Add grunt-concurrent to speed up build?
- [ ] Generators (?) to build common features, such as pages, components, etc.