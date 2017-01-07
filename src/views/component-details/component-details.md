# <%= name %><% if (typeof(base) !== 'undefined') { %> <small><% _.each(base, function (item, i) { %><% if (i > 0) { %>, <% } %><code><%= item %></code><% }); %></small><% } %>

<%= intro %>

:::: div(class="dss-style__intro")

<div>
<table>
    <tbody>
        <tr>
            <td>Status</td>
            <td><span class="ds-tag--<%= typeof(status) === 'undefined' ? 'unknown' : status.replace(/ /g, '-').toLowerCase() %>"><%= typeof(status) === 'undefined' ? 'unknown' : status %></span></td>
        </tr>
        <tr>
            <td>Version</td>
            <td><em><%= typeof(version) === 'undefined' ? 'unknown' : version %></em></td>
        </tr>
        <tr>
            <td>Bundle</td>
            <td><em><%= typeof(bundle) === 'undefined' ? 'unknown' : bundle %></em></td>
        </tr>
        <tr>
            <td>Dependencies</td>
            <td><em><%= typeof(dependencies) === 'undefined' ? 'unknown' : (_.isArray(dependencies) ? dependencies.join(', ') : dependencies) %></em></td>
        </tr><% if (typeof(related) !== 'undefined') { %>
        <tr>
            <td>Related</td>
            <td><% _.each(related, function (style, i) { %><% if (i > 0) { %>, <% } %><a ui-sref="<%= style %>"><%= style %></a><% }); %></td>
        </tr><% } %>
    </tbody>
</table>
</div>

<% if (typeof(toc) !== 'undefined' && toc === true) { %>::: div(class="dss-toc__outer")

[[TOC]]

:::

<% } %>::::

<% if (typeof(base) !== 'undefined' && typeof(classes) !== 'undefined') { %>## Class list

<table class="ds-class-list">
    <thead>
        <tr class="ds-class-list__heading">
            <td class="ds-class-list__base">Base</td>
            <td><em>Usage</em></td>
        </tr>
    </thead>
    <tbody>
        <% _.each(base, function (item) { %><tr>
            <td><code><%= classes[item].name %></code></td>
            <td><%= classes[item].usage %></td>
        </tr><% _.each(classes[item].modifiers, function (modifier) { %>
        <tr>
            <td class="ds-class-list__modifier"><code><%= modifier %></code></td>
            <td><%= classes[modifier].usage %></td>
        </tr><% }); %><% }); %>
    </tbody>
</table>

<% } %><% if (typeof(classes) !== 'undefined') { %><table class="ds-class-list">
    <thead>
        <tr class="ds-class-list__heading">
            <td>Child Elements</td>
            <td><em>Usage</em></td>
        </tr>
    </thead>
    <tbody>
        <% _.each(classes, function (element) { if (base.indexOf(element.name) === -1 && element.name.indexOf('--') === -1) { %><tr>
            <td><code><%= element.name %></code></td>
            <td><%= element.usage %></td>
        </tr><% _.each(classes[element.name].modifiers, function (modifier) { %>
        <tr>
            <td class="ds-class-list__modifier"><code><%= modifier %></code></td>
            <td><%= classes[modifier].usage %></td>
        </tr><% }); %><% }}); %>
    </tbody>
</table>

<% } %><%= typeof(content) === 'undefined' ? '' : content %>
