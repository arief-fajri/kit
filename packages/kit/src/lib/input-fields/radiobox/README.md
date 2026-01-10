# Radiobox Component

A customizable radio button component that provides a styled alternative to native HTML radio inputs while maintaining full accessibility and semantic markup. Perfect for forms, settings panels, and any interface requiring single-choice selection from a group of options.

## Features

- 🎨 **Multiple Variants**: Default, outlined, and filled visual styles
- 📏 **Flexible Sizing**: Five size options from extra-small to extra-large
- 🎯 **Semantic Colors**: Primary, secondary, success, error, and warning color schemes
- 🔗 **Form Integration**: Works seamlessly with form libraries and validation
- ♿ **Full Accessibility**: Proper ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **Interactive States**: Hover, focus, checked, and disabled state management
- 🎨 **CSS Variables**: Comprehensive theming system with CSS custom properties
- 🔧 **TypeScript Ready**: Complete type definitions for enhanced developer experience

## User Interface Structure

The Radiobox component uses a label-wrapped structure that ensures proper accessibility while allowing complete visual customization.

```
<div class="radiobox-wrapper radiobox-wrapper--{rtl}">
  └── <label class="radiobox-container radiobox-container--{rtl}">
      ├── <input type="radio" class="radiobox-input" /> (visually hidden)
      ├── <span class="radiobox-indicator radiobox-indicator--{variant} radiobox-indicator--{color}">
      │   └── ::after (inner circle when checked)
      └── <slot name="label"> or <span class="radiobox-label">{label}</span>
```

### Layout Behavior

- **Container**: Flexbox layout with configurable gap between radio and label
- **Content Flow**: Horizontal layout with RTL support for right-to-left languages
- **Indicator**: Circular visual element that scales based on size prop
- **State Switching**: Smooth transitions between checked/unchecked states
- **Responsive**: Uses relative units (em) for consistent scaling across devices

## Basic Usage

```svelte
<script>
	import { Radiobox } from '@rief/kit';
</script>

<!-- Basic radio button -->
<Radiobox name="option" label="Option 1" />

<!-- Radio button with event handler -->
<Radiobox name="choice" label="My Choice" on:change={(e) => console.log('Selected:', e.detail)} />
```

## Props

### Core Props

| Prop       | Type                            | Default     | Description                                   |
| ---------- | ------------------------------- | ----------- | --------------------------------------------- |
| `name`     | `string`                        | `"radio"`   | Radio group identifier for form grouping      |
| `label`    | `string`                        | `""`        | Text label displayed next to the radio button |
| `checked`  | `boolean`                       | `false`     | Whether the radio button is selected          |
| `id`       | `string`                        | `""`        | Field ID for label association                |
| `radioRef` | `HTMLInputElement \| undefined` | `undefined` | Reference to radio DOM element                |

### Styling Props (`styling` object)

| Prop                   | Type                                                            | Default     | Description                                    |
| ---------------------- | --------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `styling.size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                          | `'md'`      | Size of the radio button indicator             |
| `styling.variant`      | `'default' \| 'outlined' \| 'filled'`                           | `'default'` | Visual style variant                           |
| `styling.color`        | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | Semantic color scheme                          |
| `styling.wrapperClass` | `string`                                                        | `""`        | Additional CSS classes for the wrapper         |
| `styling.labelClass`   | `string`                                                        | `""`        | Additional CSS classes for the label container |
| `styling.radioClass`   | `string`                                                        | `""`        | Additional CSS classes for the radio input     |
| `styling.wrapperStyle` | `string`                                                        | `""`        | Inline styles for wrapper element              |

### Behavior Props (`behavior` object)

| Prop                       | Type      | Default | Description                                       |
| -------------------------- | --------- | ------- | ------------------------------------------------- |
| `behavior.disabled`        | `boolean` | `false` | Disables interaction and applies disabled styling |
| `behavior.rtl`             | `boolean` | `false` | Right-to-left layout for international support    |
| `behavior.stopPropagation` | `boolean` | `false` | Prevents click event bubbling when enabled        |

### Accessibility Props

| Prop              | Type     | Default     | Description                  |
| ----------------- | -------- | ----------- | ---------------------------- |
| `ariaLabel`       | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference  |

## Variants

### Default

The standard radio button style with a filled background when selected and transparent when unselected.

```svelte
<Radiobox styling={{ variant: 'default' }} name="style" label="Default Style" />
```

### Outlined

A border-only style that shows the color on the border and inner circle when selected, with a transparent background.

```svelte
<Radiobox styling={{ variant: 'outlined' }} name="style" label="Outlined Style" />
```

### Filled

A pre-filled background style that changes color when selected, providing a different visual emphasis.

```svelte
<Radiobox styling={{ variant: 'filled' }} name="style" label="Filled Style" />
```

## Sizes

```svelte
<Radiobox styling={{ size: 'xs' }} name="size" label="Extra Small" />
<Radiobox styling={{ size: 'sm' }} name="size" label="Small" />
<Radiobox styling={{ size: 'md' }} name="size" label="Medium" />
<Radiobox styling={{ size: 'lg' }} name="size" label="Large" />
<Radiobox styling={{ size: 'xl' }} name="size" label="Extra Large" />
```

## Colors

```svelte
<Radiobox styling={{ color: 'primary' }} name="color" label="Primary" />
<Radiobox styling={{ color: 'secondary' }} name="color" label="Secondary" />
<Radiobox styling={{ color: 'success' }} name="color" label="Success" />
<Radiobox styling={{ color: 'error' }} name="color" label="Error" />
<Radiobox styling={{ color: 'warning' }} name="color" label="Warning" />
```

## Radio Button Groups

Create mutually exclusive option groups by using the same `name` attribute:

```svelte
<script>
	let selectedOption = '';

	function handleSelection(event) {
		selectedOption = event.detail;
	}
</script>

<!-- Payment method selection -->
<fieldset>
	<legend>Choose Payment Method</legend>
	<Radiobox
		name="payment"
		label="Credit Card"
		checked={selectedOption === 'credit'}
		on:change={() => (selectedOption = 'credit')}
	/>
	<Radiobox
		name="payment"
		label="PayPal"
		checked={selectedOption === 'paypal'}
		on:change={() => (selectedOption = 'paypal')}
	/>
	<Radiobox
		name="payment"
		label="Bank Transfer"
		checked={selectedOption === 'bank'}
		on:change={() => (selectedOption = 'bank')}
	/>
</fieldset>
```

## Custom Label Content

Use the label slot for rich content including icons, formatted text, or complex layouts:

```svelte
<script>
	import { Radiobox } from '@rief/kit';
	import Icon from './Icon.svelte';
</script>

<!-- Radio with icon and description -->
<Radiobox name="plan" checked={false}>
	<div slot="label" class="flex items-center gap-3">
		<Icon name="star" class="text-yellow-500" />
		<div>
			<div class="font-semibold">Premium Plan</div>
			<div class="text-sm text-gray-500">$19/month - All features included</div>
		</div>
	</div>
</Radiobox>

<!-- Radio with formatted text -->
<Radiobox name="terms">
	<span slot="label">
		I agree to the
		<a href="/terms" class="text-blue-600 underline">Terms of Service</a>
		and
		<a href="/privacy" class="text-blue-600 underline">Privacy Policy</a>
	</span>
</Radiobox>
```

## States and Interactions

```svelte
<script>
	let loading = false;
	let formValid = true;
</script>

<!-- Disabled state -->
<Radiobox name="disabled-demo" label="Disabled Option" behavior={{ disabled: true }} />

<!-- Conditional disabling -->
<Radiobox
	name="conditional"
	label="Available when form is valid"
	behavior={{ disabled: !formValid }}
/>

<!-- Pre-selected option -->
<Radiobox name="default" label="Default Selection" checked />
```

## RTL (Right-to-Left) Support

For international applications supporting RTL languages:

```svelte
<!-- Arabic/Hebrew layout -->
<div dir="rtl">
	<Radiobox name="language" label="العربية" behavior={{ rtl: true }} />
	<Radiobox name="language" label="עברית" behavior={{ rtl: true }} />
</div>
```

## Events

The Radiobox component dispatches a `change` event when the selection state changes:

```svelte
<script>
	function handleChange(event) {
		console.log('Radio changed:', event.detail); // boolean: true when selected
	}

	function handleFormSubmit(event) {
		const formData = new FormData(event.target);
		console.log('Selected option:', formData.get('option'));
	}
</script>

<form on:submit|preventDefault={handleFormSubmit}>
	<Radiobox name="option" label="Option A" value="a" on:change={handleChange} />
	<Radiobox name="option" label="Option B" value="b" on:change={handleChange} />
	<button type="submit">Submit</button>
</form>
```

## Accessibility

The Radiobox component is fully accessible by default:

- Proper semantic markup using `<input type="radio">` and `<label>`
- ARIA attributes for screen readers
- Keyboard navigation support (Tab, Space, Arrow keys)
- Focus management with visible focus indicators
- Proper form association and value submission

```svelte
<!-- Accessible radio group with fieldset -->
<fieldset>
	<legend>Preferred Contact Method</legend>
	<Radiobox name="contact" label="Email" value="email" aria-describedby="contact-help" />
	<Radiobox name="contact" label="Phone" value="phone" aria-describedby="contact-help" />
	<div id="contact-help" class="text-sm text-gray-600">Choose how you'd like us to reach you</div>
</fieldset>
```

## Advanced Usage

### Dynamic Content

```svelte
<script>
	let options = [
		{ id: 'small', label: 'Small', price: '$10' },
		{ id: 'medium', label: 'Medium', price: '$15' },
		{ id: 'large', label: 'Large', price: '$20' }
	];
	let selectedSize = 'medium';
</script>

{#each options as option}
	<Radiobox
		name="size"
		value={option.id}
		checked={selectedSize === option.id}
		on:change={() => (selectedSize = option.id)}
	>
		<div slot="label" class="flex justify-between w-full">
			<span>{option.label}</span>
			<span class="font-semibold">{option.price}</span>
		</div>
	</Radiobox>
{/each}
```

### Form Integration with Validation

```svelte
<script>
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, errors, handleSubmit } = createForm({
		initialValues: { plan: '' },
		validationSchema: yup.object({
			plan: yup.string().required('Please select a plan')
		}),
		onSubmit: (values) => {
			console.log('Form submitted:', values);
		}
	});
</script>

<form on:submit={handleSubmit}>
	<fieldset>
		<legend>Choose Your Plan</legend>

		<Radiobox
			name="plan"
			value="basic"
			bind:checked={$form.plan === 'basic'}
			styling={{ color: $errors.plan ? 'error' : 'primary' }}
			label="Basic Plan - $9/month"
		/>

		<Radiobox
			name="plan"
			value="pro"
			bind:checked={$form.plan === 'pro'}
			styling={{ color: $errors.plan ? 'error' : 'primary' }}
			label="Pro Plan - $19/month"
		/>

		{#if $errors.plan}
			<div class="text-red-600 text-sm mt-1">{$errors.plan}</div>
		{/if}
	</fieldset>

	<button type="submit">Continue</button>
</form>
```

### Custom Styling

```svelte
<!-- Custom themed radio buttons -->
<Radiobox
	name="theme"
	label="Dark Theme"
	styling={{
		wrapperClass: 'custom-radio-dark',
		labelClass: 'text-white font-medium'
	}}
/>

<style>
	:global(.custom-radio-dark) {
		--radiobox-primary: #8b5cf6;
		--radiobox-background: #1f2937;
		--radiobox-border: #374151;
	}
</style>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { RadioboxProps, RadioboxStyling, RadioboxBehavior } from '@rief/kit';

const radioConfig: RadioboxProps = {
	name: 'example',
	label: 'Typed Radio Button',
	checked: false,
	styling: {
		size: 'lg',
		variant: 'outlined',
		color: 'success'
	},
	behavior: {
		disabled: false
	}
};
```
