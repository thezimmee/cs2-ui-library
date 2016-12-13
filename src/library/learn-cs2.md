## Learn / Resources

### Directory Structure / Code Organization

#### Principles of Code Structure

_Terminology_:

For our purposes, the following terms are used as follows:

- _module_: any self-contained piece of code.
- _component_: any self-contained _module_ that is not connected to any other components. A good example is a widget, such as a modal or a card, as long as it does not rely on any other _module_.
- _view_: a _module_ that connects other components. A good example is a “page” which consumes the card component and the modal component. It is important to contain a _view_, perhaps by giving it a parent class, which can then be used to modify components on the page without affecting those components on other views or pages.
- _assets_: any files that relate to a _module_. This includes styles, scripts, templates, directives, controllers, services, other angular code, etc.

We use two principles to code organization (see also [the 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern)):

- Separate 3rd party code from our code by putting all 3rd party code in a separate directory.
- Organize directories by _module_ rather than by technology type.

Following these principles make the codebase more modular, therefore making it easier to maintain, understand, update and debug.

#### Example

Here's an example directory structure:

```bash
src/
    |- components/
    |   |- modal/
    |   |   |- modal.js
    |   |   |- modal-controller.js
    |   |   |- modal-service.js
    |   |   |- modal.less
    |   |   |- modal.tpl.html
    |   |- card/
    |   |   |- card.less
    |   |   |- card.tpl.html
    |- views/
    |   |- home/
    |   |   |- home.js
    |   |   |- home-controller.js
    |   |   |- home.less
    |   |- team-dashboard/
    |   |   |- team-dashboard.js
    |   |   |- team-dashboard-controller.js
    |   |   |- team-dashboard.less
    |- less/
    |   |- main.less
vendor/
    |- <all 3rd party code modules>
```

---

_Note: While our current directory structure doesn't 100% mirror the principles outlined above we are working to do so._

#### Current Directory Structure

```
cloudspark/
    |- build/
    |   |- <build files>
    |- node_modules/
    |   |- <npm packages>
    |- vendor/
    |   |- <bower packages>
    |- vendor-custom/
    |   |- <manually installed packages>
    |- src/
    |   |- app/
    |   |   |- <app logic> // @todo: move to src/components/
    |   |- assets/
    |   |   |- <static files>
    |   |- common/
    |   |   |- <reusable code> // @todo: move to src/components/
    |   |- less/
    |   |   |- main.less
    |   |   |- <less partials>
    |- .bowerrc
    |- bower.json
    |- build.config.js
    |- Gruntfile.js
    |- module.prefix
    |- module.suffix
    |- node_modules
    |- package.json
    |- README.md
```

### Managing 3rd Party Code / Package Managers

We use two package managers, [Bower](http://bower.io) and [NPM](http://npmjs.com), to manage all of our 3rd party code. This separates all 3rd party code from code we write, and gives us access to almost any 3rd party code package we might need to consume.

If you wish to include 3rd party code into the project, do the following:

1. [Find the package on Bower](http://bower.io/search/) and install it by running: `bower install [packagename] --save-dev`
2. If it's not available on Bower, [find it on NPM](https://www.npmjs.com/) and install it by running: `npm install [packagename] --save-dev`
3. If it's not available in Bower or NPM, consider using a different package. As a last resort you can manually copy/install it to the `vendor-custom/` directory. However, we want to avoid manually including 3rd party code.
4. `@import` the needed css files in `src/less/main.less` (see [import options for less](http://lesscss.org/features/#import-options) for the different ways you can include a file)
5. Include the needed js files in `build.config.js`
6. Done! Run `grunt watch` to build for development and `grunt` to build for production. This will compile all of your new css and process and concatenate all of your new js.

See the [Directory Structure](#directory-structure) below for more info.

### Visual Studio and Other Integrated Tools

The above steps describe the workflow when using the command line for grunt and git. If these tools are integrated into your development environment your workflow may differ. Here are some resources to help when using other tools:

- [Developer setup in Visual Studio](https://sites.google.com/a/virtuosobranding.com/cloudspark275/developer-setup)
- [Use Windows Explorer](http://prntscr.com/9s0n6k) [to open a git command prompt](http://prntscr.com/9s0njp)
- [Committing work](http://prntscr.com/9s0teb) [in Visual Studio](http://prntscr.com/9s0u9h)
- [Signing off on work in Visual Studio](http://prntscr.com/9s0vf0)

### Code Standards

Our code standards are designed to ensure the following:

- Easier _maintenance_ of a large codebase over the long term.
- Better _readability_ and easier to understand, which allows for quicker debugging within a team.
- Easily add or remove code modules as needed without affecting other parts of the app.
- _Flexible_ tooling and implementation to meet the needs of our developers.

#### BEM Methodology

We follow [BEM methodology](https://en.bem.info/methodology/) in all of our code to create a modular and nested structure. Become familiar with [BEM's key concepts](https://en.bem.info/methodology/key-concepts/). The purpose is to organize all code into _[modules](#directory-structure--code-organization)_ and to encapsulate each module so it is self-contained. This makes our code more maintainable, easier to understand, and easier to update.

BEM stands for _block_, _element_, _modifier_.

#### CSS Standards

##### Naming conventions

Always follow [BEM naming conventions](https://en.bem.info/methodology/naming-convention/) to name your classes. The difference is we use two underscores to dilineate a block element, and two dashes to dilineate a modifier (BEM documentation suggests a single underscore to dilineate a modifier).

An example of a module's CSS:

```css
/* block parent */
.menu {}
/* block child element */
.menu__item {}
/* block modifier */
.menu--hidden {}
/* nested block modifiers */
.menu--theme--green {}
.menu--theme--blue {}
/* child element modifiers */
.menu__item--highlighted {}
```

In addition to the above:

- Never use IDs (i.e., `#myidselector`) or tags (i.e., `div`) in CSS selectors. This evens the playing field with CSS specificity.
- Never use attached classes (i.e., `.class1.class2`). Use modifiers instead.
- _When should I use a modifier versus an entirely new component?_ Use modifiers if you're modifying a minimal part of a component, but don't be afraid to create a whole new component either. This can be likened to models of cars. The BMW3 is similar to the BMW5 and uses a lot of the same parts, but it's a whole new car (module). That said, each of these models comes in various "options", colors, etc (modifiers).

##### Other standards

- _Mobile first_: styles outside of media queries should be for the smallest mobile screens. Then use min-width media queries (i.e., `@media (min-width: 768px) {...}`) to modify styles as needed for larger screens.
- _Use variables_: for colors, sizes, and z-index values.
- _!important_: Avoid it.
- _Encoding_: Add @charset ‘utf-8’; to each stylesheet to avoid potential character encoding issues.
- _Comment_ as much as possible. Comment all “magic numbers”.

#### Angular Standards

We follow [John Papa's Angular 1 style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) for all Angular code. A few points to draw out:

- Use 'controller as' syntax instead of $scope
    - Use 'var ctrl = this;' as the first line, then always refer to the controller using 'ctrl'.
- Services/Factories
    - Use the name Service (ex: NavService)
    - Use module.factory instead of module.service to create them
- Controllers
    - Only include values and functions that are used directly by the view
- Directives
    - Any DOM manipulation must go in a directive

### Learn Git

- [GitHub git cheat sheet](https://services.github.com/kit/downloads/github-git-cheat-sheet.pdf)
- [Interactive visual git cheat sheet](http://ndpsoftware.com/git-cheatsheet.html) (click elements to see more info)
- [Learn git in 15 minutes](https://try.github.io/levels/1/challenges/1)
- [Pro git book](https://git-scm.com/book/en/v2)
- [git reference](https://git-scm.com/docs)
- [git video tutorials](https://git-scm.com/videos)
- [More git resources](https://git-scm.com/doc/ext)

### Learn Grunt

- [Getting started with Grunt](http://gruntjs.com/getting-started)
- [Find answers on StackOverflow](http://stackoverflow.com/questions/tagged/gruntjs)