# Cards

[[TOC]]

## Details

_Class_: 		`.ds-card` <br/>
_Bundle_:		`components` <br/>

<div>
<button class="ds-button ds-button--small" type="button" show-hide-toggle>Elements</button>
<div class="ds-example ds-example--hide">

```bash
.ds-card
	.ds-card--square
	.ds-card--flat

.ds-card__header
	.ds-card__header-action

.ds-card__title

.ds-card__body
	.ds-card__body--pad

.ds-card__footer
	.ds-card__footer--link

.ds-card__footer-icon

.ds-card__li
	.ds-card__li--button
	.ds-card__li--active
```

</div>
</div>

## Examples

### Simple card with header and footer

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

### Card list with footer link

<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Card Title</h3>
		<a href="#" class="ds-card__header-action"><span class="zmdi zmdi-edit"></span></a>
	</div>
	<div class="ds-card__body">
		<div class="ds-card__li">List item one</div>
		<div class="ds-card__li">List item two</div>
		<div class="ds-card__li">List item three</div>
	</div>
	<a class="ds-card__footer--link" ui-sref="home">Go home</a>
</div>

**HTML:**
```html
<div class="ds-card">
	<div class="ds-card__header">
		<h3 class="ds-card__title">Card Title</h3>
		<a href="#" class="ds-card__header-action"><span class="zmdi zmdi-edit"></span></a>
	</div>
	<div class="ds-card__body">
		<div class="ds-card__li">List item one</div>
		<div class="ds-card__li">List item two</div>
		<div class="ds-card__li">List item three</div>
	</div>
	<a class="ds-card__footer--link" ui-sref="home">Go home</a>
</div>
```
