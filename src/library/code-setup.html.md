# Code Setup

<div class="ds-example__header" data-ng-init="activeTab = 'CLI'">
    <a class="ds-button" data-ng-click="activeTab = 'CLI'" data-ng-class="{'ds-button--active': activeTab === 'CLI'}">Command Line</a>
    <a class="ds-button" data-ng-click="activeTab = 'VS'" data-ng-class="{'ds-button--active': activeTab === 'VS'}">Visual Studio</a>
</div>

::: div(data-ng-if="activeTab === 'CLI'")
@@include('library/code-setup--cli.md')
:::

::: div(data-ng-if="activeTab === 'VS'")
@@include('library/code-setup--visual-studio.md')
:::