# CS2 Developer Standards

## Goals

- Allow easy maintenance of a large codebase over time.
Easily add or remove portions of the codebase (“modules”) without - affecting the rest of the UI.
- Easily modify components without affecting other parts of the UI.
- Flexible tooling and implementation to meet the needs of any developer.
- Rapid design iteration.

## General Coding Standards

See also the [CSS at Scale Presentation](https://docs.google.com/a/virtuosobranding.com/presentation/d/1HFf8cDV6W4iIvL3PjPrOKO0On8NwIReO0lNnpfTiJ-I/edit), which provides a step by step approach to CSS methodology.

### Modular Methodology

**Everything we build should be modular**, meaning it is self-contained and reusable. Modules make our codebase maintainable, easier to understand, and reusable. For our purposes, there are two types of modules:

- _Component_: any self-contained module not connected to other components. (_i.e., buttons, dialogs, card, etc._)
- _View_: any larger, self-contained block of content that contains and connects multiple components. (_i.e., contact page, home page, tree viewer, etc._)

### Code / Directory Organization

_Guidelines:_

- Organize code by module, not file type. Follow the “[7-1 pattern”](http://sass-guidelin.es/#the-7-1-pattern).
- If a file is not part of a component or view (such as a CSS reset, mixins, etc.), these should be placed in a separate folder that corresponds to its file type, such as /css.

_Example directory structure:_

```bash
/app
    /Views
        /Home
        /Home.html
        /Home.less
        /HomeController.js
    /Components
        /Modal
        /Modal.less
        /Modal.tpl.html
        /Modal.js
    /css
        Reset.less
        mixins.less
        functions.less
        main.less
```

_Benefits:_

- Easy to find stuff. All you need is the name of the module.
- Flexible. Easy to add or remove modules with confidence other parts of the UI won’t be affected.

### Naming Conventions

_Guidelines:_

- Naming conventions follow the [BEM](https://en.bem.info/) (block, element, modifier). For example:
    - `.[namespace-][block][__element][--modifier]`
    - _Namespace_ (optional): can be used to differentiate from 3rd party classes.
    - _**B**lock_: root element.
    - _**E**lement_: any child element.
    - _**M**odifier_: any modifier, such as a variation on the module or a state modifier.
- _Never use tags or IDs in class names_. This puts all classes on an even playing field when it comes to specificity.
- _Never use multiple attached classes (i.e., .class1.class2)_. Use modifiers instead.

### Code Encapsulation (“single source of truth”)

_Guidelines:_

- Each module must be self-contained. Any dependencies are connected through a form of dependency injector.
- To self contain a module, each gets a _“single source of truth”_ (the ‘B’ in BEM).

### Code Commenting

- Comment as much as possible.
- Comment all “magic numbers”.

## CSS

### CSS Preprocessors:

- Never nest CSS selectors more than _2-3 deep_.
- Use variables for _colors, sizes, and z-index values_.

### Media Queries:

- _Mobile first… always_. Default styles should always be written for the smallest screens.
- _Use min-width media queries_ to adjust styles for larger screens.

### Utility “classes”:

A utility class is a single-purpose class… something that only modifies one property of an element. For example:

```css
.m-top-0 { margin-top: 0; }
```

Because utility classes are single purpose, they are not part of any particular module and should be used cautiously. Use the following guidelines:

- _Do not insert utility classes into actual HTML_. Rather create utility mixins or extends “functions”, which can then later be used in any actual class (not HTML). For example:

    ```less
    // utilities.less
    // this is a utility “extend” class; only apply to other classes, not to HTML.
    .my-utility-class { margin-top: 0; }
            
    // mixins.less
    .my-mixin-utility() {
        &:hover {
            border: 1px solid red;
        }
    }

    // card.less
    .card {
        &:extend(.my-utility-class);
    }
    .card__button {
        .my-mixin-utility();
    }       
    ```

- _Never apply more than two utility classes to an element_. In some cases it may be helpful to insert a utility class to HTML markup, but if more than two utility classes are needed, simply create or update a module for that element and apply utility mixins or extends in the module’s CSS.

### Encoding:

- Add `@charset ‘utf-8’;` to each stylesheet to avoid potential character encoding issues.

### !important:

Avoid it.

## Angular

### Coding style guide:
- Follow John Papa’s style guide.
- Additional specifications:
    - Use 'controller as' syntax instead of `$scope`
        - Use `var ctrl = this;` as the first line, then always refer to the controller using `ctrl`.
    - Services/Factories
        - Use the name `Service` (ex: NavService)
        - Use `module.factory` instead of `module.service` to create Services/Factories
    - Controllers
        - Only include values and functions that are used directly by the view
    - Directives
        - Any DOM manipulation must go in a directive (no exceptions)

### Angular Routing:

- URLs:
    - Use a nested URL structure for “content”. i.e., `http://domain.com/#/page/subpage`
        - Examples of “content” include tabs, dialogs, etc.
    - Use query parameters for “data”. i.e., `http://domain.com/#/page?user=username`
