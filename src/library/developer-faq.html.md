# FAQ

::: div(class="ds-faq")
> Why do I get "Error: cannot find module 'glob'" when I try to run grunt?

`glob` isn't installed. Run `npm install -g glob`. Do the same for any other errors that look like this one.
:::

::: div(class="ds-faq")
> Sometimes when you try to pull from Git in Visual Studio you get an error message, "Cannot pull because there are uncommitted changes..." even when you don't really have uncommitted changes.

- Open a cmd window to the Git repository directory and do 'git pull' and it will probably work. If that doesn't work, first delete the .git\ms-persist.xml file.
- Sometimes the VisualStudio plugin doesn't work too well. You can force a pull of all the code by using "git checkout .". After that, you can view the pending changes in VisualStudio and any pending file additions can be deleted.
:::

::: div(class="ds-faq")
> How does CS2 manage 3rd party dependencies? How do I include 3rd party code into the project?

We use two package managers to manage our 3rd party code:

- [Bower](http://bower.io) manages front-end packages (e.g., angular, jQuery, etc), and packages are installed to the `/vendor` directory.
- [NPM](http://npmjs.com) generally manages development (Grunt) dependencies, and packages are installed to `/node_modules`.

_Important: never directly modify any 3rd party code managed by these package managers._

To include 3rd party code into the project, do the following:

1. _Install the package:_
    - [Find the package on Bower](http://bower.io/search/) and install it by running: `bower install [packagename] --save-dev`.
    - If it's not available on Bower, [find it on NPM](https://www.npmjs.com/) and install it by running: `npm install [packagename] --save-dev`.
2. _Include the file(s) you need:_
    - CSS: `@import` the less/css file(s) in `src/less/main.less` (see [import options for less](http://lesscss.org/features/#import-options) for different ways to include a file).
    - JS: Add the needed js file(s) in `build.config.js` to the `vendor_files` variable.
3. _Done!_ Next time you build the project it will pull in the new files.
:::

::: div(class="ds-faq")
> When should you use a modifier versus an entirely new element?

That's up to the developer, but here are some guidelines. Think of it like cars... a BMW3 is similar to the BMW5 and uses a lot of the same parts, but it's a completely different car (element). However, each of these models comes in various "options", colors, etc (modifiers).

In short, use modifiers to modify a minimal part of an element, but don't hesitate to create a whole new component either. It's okay for two elements to share some features (though they shouldn't share everything).
:::

::: div(class="ds-faq")
> How do I learn git?

Git is a wonderful version control system. Here are some good, free resources to learn git:

- [GitHub git cheat sheet](https://services.github.com/kit/downloads/github-git-cheat-sheet.pdf)
- [Interactive visual git cheat sheet](http://ndpsoftware.com/git-cheatsheet.html) (click elements to see more info)
- [Learn git in 15 minutes](https://try.github.io/levels/1/challenges/1)
- [Pro git book](https://git-scm.com/book/en/v2)
- [git reference](https://git-scm.com/docs)
- [git video tutorials](https://git-scm.com/videos)
- [More git resources](https://git-scm.com/doc/ext)
:::

::: div(class="ds-faq")
> What is Grunt? And how to I learn Grunt?

Grunt is an automated task runner. We use it for our build tool. Here are some free resources to learn Grunt:

- [Getting started with Grunt](http://gruntjs.com/getting-started)
- [Find answers on StackOverflow](http://stackoverflow.com/questions/tagged/gruntjs)
:::