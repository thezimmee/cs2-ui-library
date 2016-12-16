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