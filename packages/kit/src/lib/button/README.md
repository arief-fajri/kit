# Button Component

A highly customizable, accessible, and feature-rich button component for Svelte applications. The Button component supports multiple variants, sizes, states, and can function as both a button and a link.

## Features

- 🎨 **4 Visual Variants**: filled, outlined, text, link
- 📏 **4 Size Options**: sm, md, lg, xl
- 🎯 **Multiple States**: default, active, selected, highlight
- 🔗 **Link Support**: Automatic conversion to anchor tags
- ♿ **Accessibility**: Full WCAG compliance with ARIA support
- 🎭 **Loading States**: Built-in spinner and custom loading content
- 🎨 **Theming**: Extensive CSS custom properties for styling
- 🔧 **TypeScript**: Full type safety with comprehensive interfaces

## User Interface Structure

The Button component follows a flexible layout hierarchy that adapts based on state and content:

```
<button|a class="btn btn--{variant} btn--{size}">
  ├── Loading State (when loading=true)
  │   └── .btn__loading
  │       ├── .btn__spinner (SVG icon)
  │       └── .btn__loading-message (optional text)
  │
  └── Default State (when loading=false)
      └── .btn__content[data-icon-position="{position}"]
          ├── slot="icon" (when iconPosition="left|only")
          ├── .btn__label (when iconPosition≠"only")
          │   └── slot (default content/label)
          └── slot="icon" (when iconPosition="right")
```

### Layout Behavior

- **Container**: Flexbox with `align-items: center` and `justify-content: center`
- **Content Flow**: Horizontal layout with configurable gap between elements
- **Icon Positioning**: Icons can be placed left, right, or as the only content
- **State Switching**: Loading state completely replaces default content
- **Responsive**: All spacing and sizing use CSS custom properties for easy theming

## Basic Usage

```svelte
<script>
	import { Button } from '@rief/kit';
</script>

<!-- Basic button with grouped props -->
<Button
	label="Click me"
	styling={{
		variant: 'filled',
		size: 'md'
	}}
/>

<!-- Button with click handler and behavior -->
<Button
	label="Submit"
	styling={{
		variant: 'filled',
		size: 'md'
	}}
	behavior={{
		disabled: false,
		loading: false
	}}
	on:click={handleSubmit}
/>
```

## Props

### Core Props

| Prop    | Type     | Default | Description         |
| ------- | -------- | ------- | ------------------- |
| `label` | `string` | `""`    | Button text content |

### Styling Props (`styling` object)

| Prop                   | Type                                                       | Default     | Description              |
| ---------------------- | ---------------------------------------------------------- | ----------- | ------------------------ |
| `styling.variant`      | `'filled' \| 'outlined' \| 'text' \| 'link'`               | `'filled'`  | Visual style variant     |
| `styling.semantic`     | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `undefined` | Semantic color variant   |
| `styling.size`         | `'sm' \| 'md' \| 'lg' \| 'xl'`                             | `'md'`      | Button size              |
| `styling.fullRounded`  | `boolean`                                                  | `false`     | Apply full border radius |
| `styling.className`    | `string`                                                   | `""`        | Additional CSS classes   |
| `styling.style`        | `string`                                                   | `""`        | Additional inline styles |
| `styling.fillColor`    | `string`                                                   | `undefined` | Custom background color  |
| `styling.textColor`    | `string`                                                   | `undefined` | Custom text color        |
| `styling.outlineColor` | `string`                                                   | `undefined` | Custom border color      |

### Behavior Props (`behavior` object)

| Prop                       | Type                                                 | Default        | Description                  |
| -------------------------- | ---------------------------------------------------- | -------------- | ---------------------------- |
| `behavior.disabled`        | `boolean`                                            | `false`        | Disable the button           |
| `behavior.state`           | `'default' \| 'active' \| 'selected' \| 'highlight'` | `undefined`    | Button state                 |
| `behavior.loading`         | `boolean`                                            | `false`        | Show loading state           |
| `behavior.loadingMessage`  | `string`                                             | `"Loading..."` | Text shown during loading    |
| `behavior.stopPropagation` | `boolean`                                            | `false`        | Stop event propagation       |
| `behavior.href`            | `string`                                             | `undefined`    | URL (converts to anchor tag) |
| `behavior.target`          | `string`                                             | `undefined`    | Link target                  |
| `behavior.rel`             | `string`                                             | `undefined`    | Link rel attribute           |
| `behavior.iconPosition`    | `'left' \| 'right' \| 'only'`                        | `'left'`       | Icon placement               |

### Accessibility Props

| Prop              | Type     | Default     | Description                 |
| ----------------- | -------- | ----------- | --------------------------- |
| `ariaLabel`       | `string` | `undefined` | Accessibility label         |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference |

## Variants

### Filled (Default)

Solid background with contrasting text.

```svelte
<Button label="Filled Button" styling={{ variant: 'filled' }} />
```

### Outlined

Transparent background with border.

```svelte
<Button label="Outlined Button" styling={{ variant: 'outlined' }} />
```

### Text

Minimal style with hover effects.

```svelte
<Button label="Text Button" styling={{ variant: 'text' }} />
```

### Link

Underlined text for link-like appearance.

```svelte
<Button label="Link Button" styling={{ variant: 'link' }} />
```

## Sizes

```svelte
<Button label="Small" styling={{ size: 'sm' }} />
<Button label="Medium" styling={{ size: 'md' }} />
<Button label="Large" styling={{ size: 'lg' }} />
<Button label="Extra Large" styling={{ size: 'xl' }} />
```

## States

```svelte
<Button label="Default" behavior={{ state: 'default' }} />
<Button label="Active" behavior={{ state: 'active' }} />
<Button label="Selected" behavior={{ state: 'selected' }} />
<Button label="Highlight" behavior={{ state: 'highlight' }} />
```

## Icons

Use the `icon` slot to add icons to your buttons.

```svelte
<script>
	import { Button } from '@rief/kit';
	import Icon from './Icon.svelte';
</script>

<!-- Icon on the left (default) -->
<Button label="Save" behavior={{ iconPosition: 'left' }}>
	<Icon name="save" slot="icon" />
</Button>

<!-- Icon on the right -->
<Button label="Next" behavior={{ iconPosition: 'right' }}>
	<Icon name="arrow-right" slot="icon" />
</Button>

<!-- Icon only -->
<Button behavior={{ iconPosition: 'only' }} ariaLabel="Close">
	<Icon name="close" slot="icon" />
</Button>
```

## Loading States

```svelte
<script>
	let loading = false;

	async function handleSubmit() {
		loading = true;
		try {
			await submitForm();
		} finally {
			loading = false;
		}
	}
</script>

<!-- Basic loading -->
<Button
	label="Submit"
	behavior={{
		loading: loading,
		loadingMessage: 'Submitting...'
	}}
	on:click={handleSubmit}
/>

<!-- Custom loading content -->
<Button label="Upload" behavior={{ loading: loading }} on:click={handleUpload}>
	<div slot="loading" let:loadingMsg>
		<CustomSpinner />
		<span>{loadingMsg}</span>
	</div>
</Button>
```

## Links

When `href` is provided, the button automatically becomes an anchor tag.

```svelte
<!-- Internal link -->
<Button label="Go to Dashboard" behavior={{ href: '/dashboard' }} />

<!-- External link (automatically gets target="_blank" and rel="noopener noreferrer") -->
<Button label="Visit Site" behavior={{ href: 'https://example.com' }} />

<!-- Custom target and rel -->
<Button
	label="Help"
	behavior={{
		href: '/help',
		target: '_blank',
		rel: 'noopener'
	}}
/>
```

## Custom Colors

Override colors using the styling props:

```svelte
<Button
	label="Custom Colors"
	styling={{
		fillColor: '#ff6b6b',
		textColor: '#ffffff',
		outlineColor: '#ff5252'
	}}
/>
```

## Events

The Button component dispatches several events:

```svelte
<Button
	label="Interactive Button"
	on:click={handleClick}
	on:focus={handleFocus}
	on:blur={handleBlur}
	on:keydown={handleKeydown}
	on:dragstart={handleDragStart}
/>
```

## Accessibility

The Button component is fully accessible by default:

- Proper semantic markup (`<button>` or `<a>`)
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Loading state announcements

```svelte
<!-- Accessible icon-only button -->
<Button behavior={{ iconPosition: 'only' }} ariaLabel="Delete item" on:click={deleteItem}>
	<TrashIcon slot="icon" />
</Button>
```

## Advanced Usage

### Dynamic Content

```svelte
<Button on:click={toggle}>
	<span slot="icon">
		{#if expanded}
			<ChevronUpIcon />
		{:else}
			<ChevronDownIcon />
		{/if}
	</span>
	{expanded ? 'Collapse' : 'Expand'}
</Button>
```

### Conditional Rendering

```svelte
<Button
	label={isEditing ? 'Save' : 'Edit'}
	styling={{
		variant: isPrimary ? 'filled' : 'outlined'
	}}
	behavior={{
		state: currentState,
		disabled: !isValid
	}}
/>
```

### Form Integration

```svelte
<form on:submit|preventDefault={handleSubmit}>
	<Button
		type="submit"
		label="Submit Form"
		behavior={{
			loading: submitting,
			disabled: !isFormValid
		}}
	/>
</form>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { ButtonProps, ButtonStyling, ButtonBehavior } from '@rief/kit';

const buttonConfig: ButtonProps = {
	label: 'Typed Button',
	styling: {
		variant: 'filled',
		size: 'lg'
	},
	behavior: {
		state: 'default'
	}
};
```
