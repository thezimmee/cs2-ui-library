# Cards

[[TOC]]

## Details

|              |                                                                                                                        |
|--------------|------------------------------------------------------------------------------------------------------------------------|
| Status       | <span class="ds-tag--needs-update">needs update</span>                                                                  |
| Base         | `.ds-card`                                                                                                             |
| Bundle       | `components`                                                                                                           |
| Dependencies | [cards.less](https://github.com/thezimmee/cs2-ui-library/edit/master/src/components/cards/cards.less){target="_blank"} |

## Class list

<table class="ds-class-list">
	<thead>
		<tr class="ds-class-list__heading">
			<td class="ds-class-list__base">Base</td>
			<td><em>Usage</em></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>.ds-card</code></td>
			<td>base card element</td>
		</tr>
		<tr>
			<td class="ds-class-list__modifier"><code>.ds-card--square</code></td>
			<td>square edges</td>
		</tr>
		<tr>
			<td class="ds-class-list__modifier"><code>.ds-card--flat</code></td>
			<td>no drop shadow</td>
		</tr>
	</tbody>
</table>

<table class="ds-class-list">
	<thead>
		<tr class="ds-class-list__heading">
			<td>Child Elements</td>
			<td><em>Usage</em></td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>.ds-card__header</code></td>
			<td>card header</td>
		</tr>
		<tr>
			<td><code>.ds-card__header-action</code></td>
			<td>action button in header</td>
		</tr>
		<tr>
			<td><code>.ds-card__title</code></td>
			<td>card title text</td>
		</tr>
		<tr>
			<td><code>.ds-card__body</code></td>
			<td>body content</td>
		</tr>
		<tr>
			<td class="ds-class-list__modifier"><code>.ds-card__body--pad</code></td>
			<td>padded body</td>
		</tr>
		<tr>
			<td><code>.ds-card__footer</code></td>
			<td>card footer</td>
		</tr>
		<tr>
			<td class="ds-class-list__modifier"><code>.ds-card__footer--link</code></td>
			<td>clickable footer</td>
		</tr>
		<tr>
			<td><code>.ds-card__footer-icon</code></td>
			<td>icon in footer</td>
		</tr>
		<tr>
			<td><code>.ds-card__li</code></td>
			<td>list item in body</td>
		</tr>
		<tr>
			<td class="ds-class-list__modifier"><code>.ds-card__li--active</code></td>
			<td>active list item</td>
		</tr>
		<tr>
			<td class="ds-class-list__modifier"><code>.ds-card__li--button</code></td>
			<td>clickable list item</td>
		</tr>
	</tbody>
</table>

## Examples

### Simple card

<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Simple card</h3>
	</div>
	<div class="ds-card__body--pad">
		<p>Lorem ipsum dolor sit.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim odit odio temporibus, molestiae quam velit hic optio delectus atque dolor similique nulla beatae alias totam ut corporis magni illo, ipsum sapiente neque quisquam iusto. Consectetur.</p>
	</div>
	<div class="ds-card__footer">
		Simple card footer (I am not a link)
	</div>
</div>

**HTML:**

```html
<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Simple card</h3>
	</div>
	<div class="ds-card__body--pad">
		<!-- card body -->
	</div>
	<div class="ds-card__footer">
		Simple card footer (I am not a link)
	</div>
</div>
```

### Card list

<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Card Title</h3>
	</div>
	<div class="ds-card__body">
		<div class="ds-card__li">List item one</div>
		<a class="ds-card__li ds-card__li--button">List item two: I am a button</a>
		<div class="ds-card__li ds-card__li--active">List item three: I am active</div>
	</div>
</div>

**HTML:**
```html
<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Card Title</h3>
	</div>
	<div class="ds-card__body">
		<div class="ds-card__li">List item one</div>
		<a class="ds-card__li ds-card__li--button">List item two: I am a button</a>
		<div class="ds-card__li ds-card__li--active">List item three: I am active</div>
	</div>
</div>
```

### Action card

<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Action button in header and footer</h3>
		<a href="#" class="ds-card__header-action"><span class="zmdi zmdi-edit"></span></a>
	</div>
	<div class="ds-card__body--pad">
		I am a padded body.
	</div>
	<a class="ds-card__footer--link" ui-sref="home">I am a footer link.</a>
</div>

**HTML:**
```html
<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Action button in header and footer</h3>
		<a href="#" class="ds-card__header-action"><span class="zmdi zmdi-edit"></span></a>
	</div>
	<div class="ds-card__body--pad">
		I am a padded body.
	</div>
	<a class="ds-card__footer--link" ui-sref="home">I am a footer link.</a>
</div>
```
