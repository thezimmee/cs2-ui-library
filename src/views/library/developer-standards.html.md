@@include('views/library/_edit-partial-title.md', {"title": "# Developer Standards", "path": "src/library/developer-standards.html.md"})

[[TOC]]

## Front End Methodology

### Goals

- A stunningly beautiful and joyful experience (e.g., **speed**) for the end-user.
- Unity and speed of development.
- Easy maintenance... easily add, change, or remove elements of the UI without affecting anything else.
- Make it easy and predictable to deal with CSS specificity.
- Flexible tooling.

_Resources:_ To learn more about front-end methodologies:

- [CSS at DirectScale presentation](https://docs.google.com/a/virtuosobranding.com/presentation/d/1HFf8cDV6W4iIvL3PjPrOKO0On8NwIReO0lNnpfTiJ-I/edit){target="_blank"}
- [SMACSS](https://smacss.com){target="_blank"}
- [BEM](https://en.bem.info/methodology/){target="_blank"}
- [BEM](https://en.bem.info/methodology/){target="_blank"}
- [OOCSS](http://oocss.org/){target="_blank"}
- [7-1 pattern”](http://sass-guidelin.es/#the-7-1-pattern){target="_blank"}

### Concept 1: Element Namespacing

_Each "element" or class receives its own unique namespace._

_Why:_ Isolating each element with a unique namespace allows us to add, change, or remove elements without affecting the rest of the UI.

_How:_ A unique namespace is made up of the following:

```bash
[prefix-][base][__child][--modifier]
```

|  Element   |                  Description                  |
|------------|-----------------------------------------------|
| _prefix_   | used to distinguish or version the namespace. |
| _block_    | base element.                                 |
| _child_    | child element.                                |
| _modifier_ | creates a variation.                          |

_Example:_

```css
/* base with prefix */
.ds-card {}
/* child elements */
.ds-card__header {}
.ds-card__body {}
.ds-card__footer {}
/* modifiers */
.ds-card--bordered {}
.ds-card--colored {}
```

_Note: while these naming conventions are especially useful for CSS, it should also be applied to JS code where possible._

### Concept 2: Code Bundles

_Each file is organized into a bundle._

_Why:_

- Categorizing code helps us make decisions on a bundle should be treated. For example, we can easily determine appropriate source order for CSS and JS files according to its bundle.
- Helps maintain a large codebase.
- Makes it easy to find stuff.
- Works well with front end tooling.
- ...
- Easy to find stuff. All you need is the name of the module.
- Flexible. Easy to add or remove modules with confidence other parts of the UI won’t be affected.

_How:_

1. Each file gets organized into one of the following bundles:
    - _vendor_: Code not managed or modified by us. Managed by [NPM](https://www.npmjs.com/) or [Bower](https://bower.io). _Examples: angular, jQuery, plugins, etc._
    - _abstracts_: Code that does not produce actual source code. _Examples: variables, mixins, etc._
    - _core_: Core or global components that may be consumed by components or views. _Examples: resets, typography, utilities, buttons, forms, etc._
    - _components_: Isolated and self-contained code with no dependencies outside of vendor, abstracts, or core elements. _Examples: cards, modals, header, navbar, etc._
    - _views_: Isolated and self-contained, like components, but views purpose are to provide a mechanism to modify components for a particular view. _Examples: pages, states, or anything you choose so long as it has its own unique namespace element._

2. Files are organized by bundles, not by file extension. Directory structure should look like:

    ```bash
    src/
        less/
            // core css
            core/
            // abstracts bundle
            abstracts/
            main.less
        js/
            // core js
            core/
        // views bundle
        home/
            home.js
            home.less
            home.tpl.html
        about/
            about.js
            about.less
            about.tpl.html
        // components bundle
        card/
            card.js
            card.less
            card.tpl.html
        modal/
            modal.js
            modal.less
            modal.tpl.html
    // vendor bundle
    vendor/
    ```

### Concept 3: Mobile First

_Make mobile a first class citizen... always._

_Why:_ Ensures a responsive UI and places more focus on performance.

_How:_

1. Default styles are for mobile.
2. Modify styles for other screen sizes with the following `@media` queries:
    - `@media screen only and (min-width: 480px) {...}`
    - `@media screen only and (min-width: 768px) {...}`
    - `@media screen only and (min-width: 960px) {...}`
    - `@media screen only and (min-width: 1280px) {...}`
3. When necessary, do not hesitate to style to content and create a custom `min-width` query.

### Concept 4: "Mix" Components and Views

_Components and views can be "mixed"._

_Why:_ Keeps components and views isolated, and keeps code more DRY.

_How:_

1. When mixing two components, simply add the base component classes.
2. In some cases you may need to create a view class, which may be mixed with other view or component classes.

_Example:_

HTML:
```html
<!-- in views/about/about.html -->
<!-- view mix: mixes views and/or components (.ds-card and .ds-about-page__card) -->
<div class=”ds-card ds-about-page__card”>
    <!-- component mix: mixes multiple components (.ds-card__button and .ds-button -->
    <button class=”ds-card__button ds-button” type=”button”>...</button>
    <!-- more markup -->
</div>
```

CSS:
```css
/* in less/base/buttons.less */
.ds-button {}

/* in components/card/card.less */
.ds-card {}
.ds-card__button {}

/* in views/about/about.less */
/* view mixes are applied in the "views" bundle */
.ds-about-page__card {}
```

### Concept 5: Utility classes

_Where possible, utility classes should be part of the "abstracts" bundle and applied in CSS, not in HTML._

_Why:_ Keeps classes on an element to a minimum, which helps with readability and maintainability.

_How:_

1. Utility classes are part of either the abstracts or core bundle, depending on the pre/post processor you use.
2. Use mixins, functions, or extends to apply utility classes.
3. Never apply a utility class on an HTML element if it already has a class.

_Example:_

```less
/* in less/core/utility.less */
.ds-row { display: flex; }

/* in views/ds-grid/ds-grid.less */
.ds-grid {
    &:extend(.row);
    /* more styles */
}
```

## Coding Style Guide

Because all CSS and JS gets minified, we do not impose many coding styles and preferences during development. We believe in freedom of code expression during development, and any prefences we impose should have tooling to make implementation as simple as possible.

**The rules and guidelines we have selected below, however, are deemed important enough for all team members to follow.**

### Comments

- Comment as much as possible.
- Comment all “magic numbers”.

## CSS Style Guide

- **Encoding**: Add `@charset ‘utf-8’;` to each stylesheet to avoid potential character encoding issues.
- **Never use IDs** (e.g., `#myidselector`) or tags (i.e., `div`) in CSS selectors. This evens the playing field with CSS specificity. IDs should only be added if they are needed for other reasons (anchor links, JavaScript, etc).
- **Never attach classes** (e.g., `.class1.class2`). Use modifiers instead.
- **Nesting**: Never nest CSS selectors more than _2-3 levels deep_.
- **Variables**: Use variables for _colors, sizes, and z-index values_.
- **Mobile first**: _Always_ style for for smallest screens first; use `min-width` @media queries for larger screens.
- **`!important`**: Avoid it like the plague.

## Angular Style Guide

We generally follow [John Papa’s style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md){target="_blank"} for all Angular code. The important rules to point out:

- Controllers:
    - Use [`controller as` syntax](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#controllers){target="_blank"}.
    - Only bind data that is used directly by the view.
- Services/Factories:
    - Add "Service" to the end of each service (e.g., _NavService_).
    - We generally prefer [factories](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#factories){target="_blank"} to [services](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#services){target="_blank"}.
- Directives:
    - Any DOM manipulation must go inside a directive, _no exceptions_.
    - Directives should [clean up after themselves](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#directives){target="_blank"}.
- Routing:
    - Use a nested URL structure for “content”. i.e., `http://domain.com/#/page/subpage` (e.g., tabs, dialogs, etc.).
    - Use query parameters for “data”. i.e., `http://domain.com/#/page?user=username`.
