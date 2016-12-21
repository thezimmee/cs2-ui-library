@@include('views/library/_edit-partial-title.md', {"title": "# Developer Workflow", "path": "src/library/developer-workflow.html.md"})

_Taking a feature from development to production in CS2._

## Overview

CS2 uses [git for version control](https://www.atlassian.com/git/tutorials/what-is-version-control/). The CS2 team has adopted a simplified version of the [Gitflow branch strategy](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/). What follows is a step-by-step tutorial on how to take a feature from development to production in CS2. Examples are provided for git command line or git in Visual Studio.

For more information on using git, see the following:

- [A comprehensive git tutorial](https://www.atlassian.com/git/tutorials/what-is-version-control/) (good for understanding principles of git)
- [Using git in Visual Studio](https://www.visualstudio.com/en-us/docs/git/tutorial/gitworkflow)
- [A comprehensive guide to the gitflow branching strategy](http://nvie.com/posts/a-successful-git-branching-model/)
- [Choosing the right git branching strategy](http://www.creativebloq.com/web-design/choose-right-git-branching-strategy-121518344)

## The Steps

### 1. **Create a feature branch**

<div class="ds-example__header">
    <a class="ds-button" data-ng-click="activeTool.branch = 'CLI'" data-ng-class="{'ds-button--active': activeTool.branch === 'CLI'}">Command Line</a>
    <a class="ds-button" data-ng-click="activeTool.branch = 'VS'" data-ng-class="{'ds-button--active': activeTool.branch === 'VS'}">Visual Studio</a>
</div>
<div class="ds-example" data-ng-init="activeTool = {}; activeTool.branch = 'CLI'">

<div data-ng-if="activeTool.branch === 'CLI'">

```bash
git checkout -b [feature-name]--[story#]
```

or

```bash
git branch [feature-name]--[story#]
git checkout [feature-name]--[story#]
```

</div>

<div ng-if="activeTool.branch === 'VS'">

1. Open Team Explorer and go to _Branches_ view.
2. Right-click the branch to base the new feature branch on (probably `dev` branch), and choose _New Local Branch From..._
3. Enter branch name and click _Create Branch_.

![Visual Studio | Create a branch](https://www.visualstudio.com/en-us/docs/git/tutorial/_img/vsbranch.gif)

</div>
</div>

### 2. **Regularly commit and push code**

While working on a story, make sure to regularly push and pull code so you and others working on it can be in sync. The more frequently you push and pull the latest code, the easier code merges will be.

When committing code, include the task # in each commit.

<div class="ds-example__header">
    <a class="ds-button" data-ng-click="activeTool.push = 'CLI'" data-ng-class="{'ds-button--active': activeTool.push === 'CLI'}">Command Line</a>
    <a class="ds-button" data-ng-click="activeTool.push = 'VS'" data-ng-class="{'ds-button--active': activeTool.push === 'VS'}">Visual Studio</a>
</div>
<div class="ds-example" data-ng-init="activeTool.push = 'CLI'">

<div data-ng-if="activeTool.push === 'CLI'">

```bash
# stage
git add .
# commit
git commit -m "TP #[story#]: [brief commit description]"
# push to remote
git push
# push to remote (first time... if remote branch isn't yet tracked locally)
git push -u origin [branch-name]
```

</div>

<div data-ng-if="activeTool.push === 'VS'">

Commit changes:

1. Open _Changes_ in Team Explorer.
2. Enter a commit message, then select _Commit All_ to commit changes.

![Visual Studio | Commit changes](https://www.visualstudio.com/en-us/docs/git/tutorial/_img/vscommitall.gif)

Push changes:

1. _Publish_ when no remote branch exists.
2. _Push_ if an existing branch exists.

![Visual Studio | Push changes](https://www.visualstudio.com/en-us/docs/git/tutorial/_img/vspush.gif)

</div>
</div>

### 3. **Submit a pull request**

When story is complete, make sure all changes have been pushed and create a Github pull request, asking to merge the feature branch to the dev branch. The reasons for a pull request:

1. To make sure no code gets merged before it is ready to be tested by QA.
2. To give opportunity for a code review.

    _Note: Code reviews are for you, not for the reviewer, and give you an opportunity to review and explain your own code with the help of another set of eyes. Code reviews should be brief and should focus on code stability. A code review may not be needed for small, inconsequential changes._

_How to create a pull request:_

<div class="ds-example__header">
    <a class="ds-button" data-ng-click="activeTool.pullRequest = 'CLI'" data-ng-class="{'ds-button--active': activeTool.pullRequest === 'CLI'}">Command Line</a>
    <a class="ds-button" data-ng-click="activeTool.pullRequest = 'VS'" data-ng-class="{'ds-button--active': activeTool.pullRequest === 'VS'}">Visual Studio</a>
</div>
<div class="ds-example" data-ng-init="activeTool.pullRequest = 'CLI'">

<div data-ng-if="activeTool.pullRequest === 'CLI'">

[How to create a pull request directly in Github](https://help.github.com/articles/creating-a-pull-request/)

</div>

<div data-ng-if="activeTool.pullRequest === 'VS'">

[How to create a pull request in Visual Studio](https://www.visualstudio.com/en-us/docs/git/tutorial/pullrequest)

</div>
</div>

### 4. **With approval, merge the pull request to the `dev` branch**

Once your pull request has been approved, merge it to the `dev` branch.

<div class="ds-example__header">
    <a class="ds-button" data-ng-click="activeTool.merge = 'CLI'" data-ng-class="{'ds-button--active': activeTool.merge === 'CLI'}">Command Line</a>
    <a class="ds-button" data-ng-click="activeTool.merge = 'VS'" data-ng-class="{'ds-button--active': activeTool.merge === 'VS'}">Visual Studio</a>
</div>
<div class="ds-example" data-ng-init="activeTool.merge = 'CLI'">

<div data-ng-if="activeTool.merge === 'CLI'">

- [How to merge a pull request directly in Github](https://help.github.com/articles/merging-a-pull-request/)
- [Checking out pull requests on the command line](https://help.github.com/articles/checking-out-pull-requests-locally/)

</div>

<div data-ng-if="activeTool.merge === 'VS'">

- [Completing a pull request in Visual Studio](https://www.visualstudio.com/en-us/docs/git/tutorial/pullrequest#completing-a-pull-request)
- [Resolving merge conflicts in Visual Studio](https://www.visualstudio.com/en-us/docs/git/tutorial/merging)

</div>
</div>

### 5. **Fix QA bugs**

Fix any QA bugs directly on the `dev` branch. Make sure to add the bug # to each commit. Committing code is the same as in Step 2, only make sure you are committing fixes to the `dev` branch.

### 6. **With QA approval, merge `dev` branch to `master` branch**

Once all bugs are complete and QA deems the feature "production ready", merge dev branch to master branch. master branch should always be production-ready, and is deployable at any time.

<div class="ds-example__header">
    <a class="ds-button" data-ng-click="activeTool.master = 'CLI'" data-ng-class="{'ds-button--active': activeTool.master === 'CLI'}">Command Line</a>
    <a class="ds-button" data-ng-click="activeTool.master = 'VS'" data-ng-class="{'ds-button--active': activeTool.master === 'VS'}">Visual Studio</a>
</div>
<div class="ds-example" data-ng-init="activeTool.master = 'CLI'">

<div data-ng-if="activeTool.master === 'CLI'">

```bash
# checkout master
git checkout master
# merge dev into master
git merge dev
# if conflicts are found, resolve them with the mergetool
git mergetool
```

</div>

<div data-ng-if="activeTool.master === 'VS'">

[Merging in Visual Studio](https://www.visualstudio.com/en-us/docs/git/tutorial/merging)

</div>
</div>

### 7. **Delete the feature branch**

<div class="ds-example__header">
    <a class="ds-button" data-ng-click="activeTool.delete = 'CLI'" data-ng-class="{'ds-button--active': activeTool.delete === 'CLI'}">Command Line</a>
    <a class="ds-button" data-ng-click="activeTool.delete = 'VS'" data-ng-class="{'ds-button--active': activeTool.delete === 'VS'}">Visual Studio</a>
</div>
<div class="ds-example" data-ng-init="activeTool.delete = 'CLI'">

<div data-ng-if="activeTool.delete === 'CLI'">

```bash
# delete locally
git branch -d [branch-name]--[story#]
# push changes to remote
git push origin --delete [branch-name]--[story#]
```

</div>

<div data-ng-if="activeTool.delete === 'VS'">

1. Open _Branches_ view in Team Explorer.
2. Select the branch (make sure you don't have it checked out).
3. Right-click the branch name and select _Delete_.
4. Do the same for the remote branch (_remotes/[branch-name]_).

![Visual Studio | Delete a branch](https://www.visualstudio.com/en-us/docs/git/tutorial/_img/vsbranchdelete.gif)

</div>
</div>