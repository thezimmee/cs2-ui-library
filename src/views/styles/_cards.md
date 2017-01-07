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
