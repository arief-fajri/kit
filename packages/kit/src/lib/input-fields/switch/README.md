# Switch Component

The Switch component is a fully themeable, accessible toggle built on a native checkbox. It delivers a modern slider experience with semantic variants, responsive sizing, and TypeScript-first ergonomics that make it perfect for settings panels, forms, and feature flags.

## Features

- 🎨 **Theme-ready styling**: Driven entirely by CSS custom properties for easy theming and dark-mode support.
- 📏 **Responsive sizing**: Five proportional size presets (xs–xl) scale track width, height, and knob travel in sync.
- 🎯 **Form-friendly behavior**: Native checkbox semantics with bidirectional binding, validation flags, and full event payloads.
- 🔗 **Drop-in integration**: Works with any form library via `name`, `value`, and `id`, plus support for propagation control.
- ♿ **Accessible by default**: Uses `role="switch"`, ARIA attributes, and focus-visible outlines for WCAG compliance.
- 🎭 **Rich states**: Handles hover, focus, checked, disabled, and semantic variants without extra markup.
- 🎨 **Semantic variants**: Built-in default, primary, success, error, and warning tracks map directly to your design tokens.
- 🔧 **TypeScript ready**: Ships with `SwitchProps`, `SwitchVariant`, `SwitchSize`, and `SwitchEventDetail` for first-class DX.

## User Interface Structure

The Switch uses a label-wrapped checkbox so the entire control is clickable while remaining keyboard friendly.

```
<div class="switch-wrapper switch-wrapper--{size}">
  └── <label class="switch-container" for="{id}">
      ├── <input type="checkbox" role="switch" /> (visually hidden)
      ├── <span class="switch-slider" data-variant="{variant}">
      │     └── ::before (knob that translates on check)
      └── <slot name="label">
            <span class="switch-label">{label}</span> (optional helper text)
```

### Layout Behavior

- **Container**: Inline-flex wrapper keeps switches aligned within form rows or stacked layouts.
- **Content Flow**: Track appears first, optional label follows with configurable gap via CSS variables.
- **Track Mechanics**: Slider uses absolute positioning so the knob glides smoothly without layout shifts.
- **State Switching**: Checked state updates background color and knob translation via CSS transforms.
- **Responsive**: Width/height/knob sizes scale proportionally using a single `--switch-size` multiplier.

## Basic Usage

```svelte
<script>
	import { Switch } from '@rief/kit';

	let marketingEmails = false;
</script>

<!-- Basic toggle -->
<Switch bind:checked={marketingEmails} label="Marketing emails" />

<!-- Listen to change event -->
<Switch label="Notifications" on:change={(event) => console.log(event.detail.checked)} />
```

## Props

### Core Props

| Prop        | Type                            | Default     | Description                                                        |
| ----------- | ------------------------------- | ----------- | ------------------------------------------------------------------ |
| `id`        | `string \| undefined`           | `undefined` | Unique identifier used for label association and form inputs       |
| `name`      | `string`                        | `"switch"`  | HTML name attribute so the switch participates in form submissions |
| `checked`   | `boolean`                       | `false`     | Controls the current on/off state; works with `bind:checked`       |
| `value`     | `any`                           | `undefined` | Value submitted with the form when the switch is checked           |
| `label`     | `string`                        | `""`        | Optional inline label (falls back to the `label` slot)             |
| `switchRef` | `HTMLInputElement \| undefined` | `undefined` | Reference to switch DOM element                                    |

### Styling Props (`styling` object)

| Prop                   | Type                                                          | Default     | Description                                             |
| ---------------------- | ------------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| `styling.size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                        | `'md'`      | Adjusts track width/height and knob size proportionally |
| `styling.variant`      | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning'` | `'default'` | Sets semantic track colors for checked state            |
| `styling.wrapperClass` | `string`                                                      | `""`        | Adds custom classes to the root wrapper                 |
| `styling.labelClass`   | `string`                                                      | `""`        | Additional CSS classes for label                        |
| `styling.inputClass`   | `string`                                                      | `""`        | Additional CSS classes for input                        |
| `styling.wrapperStyle` | `string`                                                      | `""`        | Inline styles for wrapper element                       |

### Behavior Props (`behavior` object)

| Prop                       | Type      | Default | Description                                                   |
| -------------------------- | --------- | ------- | ------------------------------------------------------------- |
| `behavior.disabled`        | `boolean` | `false` | Prevents interaction and applies reduced-opacity styling      |
| `behavior.required`        | `boolean` | `false` | Marks the field as required for native form validation        |
| `behavior.stopPropagation` | `boolean` | `false` | Stops click bubbling when you need isolated interaction zones |

### Accessibility Props

| Prop              | Type     | Default     | Description                  |
| ----------------- | -------- | ----------- | ---------------------------- |
| `ariaLabel`       | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference  |

## Variants

### Default (Neutral)

Neutral gray track suited for generic binary toggles.

```svelte
<Switch styling={{ variant: 'default' }} label="Neutral" />
```

### Primary

Aligns with the primary brand color for emphasis.

```svelte
<Switch styling={{ variant: 'primary' }} label="Primary action" />
```

### Success

Communicates enabling positive outcomes or confirmations.

```svelte
<Switch styling={{ variant: 'success' }} label="Auto backup" />
```

### Error

Use for destructive or high-risk toggles.

```svelte
<Switch styling={{ variant: 'error' }} label="Danger mode" />
```

### Warning

Great for experimental features or cautionary toggles.

```svelte
<Switch styling={{ variant: 'warning' }} label="Beta features" />
```

## Sizes

```svelte
<Switch styling={{ size: 'xs' }} label="XS" />
<Switch styling={{ size: 'sm' }} label="Small" />
<Switch styling={{ size: 'md' }} label="Medium" />
<Switch styling={{ size: 'lg' }} label="Large" />
<Switch styling={{ size: 'xl' }} label="XL" />
```

## States

```svelte
<Switch checked label="Enabled" />
<Switch behavior={{ disabled: true }} label="Unavailable" />
<Switch behavior={{ disabled: true }} checked label="Locked on" />
```

## Label Slot

Use the `label` slot when you need custom markup (icons, helper text, etc.).

```svelte
<Switch bind:checked={enabled}>
	<div slot="label" class="flex items-center gap-2">
		<span>Enable syncing</span>
		<small class="text-muted">Uses additional bandwidth</small>
	</div>
</Switch>
```

## Form Integration

```svelte
<form on:submit|preventDefault={(event) => console.log(new FormData(event.target))}>
	<Switch
		id="privacy"
		name="privacy"
		value="enabled"
		behavior={{ required: true }}
		label="Privacy Shield"
	/>
	<button type="submit">Save</button>
</form>
```

## Custom Colors

Override CSS variables inline or via classes for bespoke styling.

```svelte
<Switch
	label="Custom gradient"
	style="
    --switch-bg-unchecked: #334155;
    --switch-bg-checked: linear-gradient(90deg, #6366f1, #8b5cf6);
    --switch-slider-color: #f8fafc;
  "
/>
```

## Events

Switch dispatches three events with helpful payloads:

```svelte
<Switch
	label="Notifications"
	on:change={(event) => console.log(event.detail.checked)}
	on:focus={() => console.log('focused')}
	on:blur={() => console.log('blurred')}
/>
```

- `change`: `{ checked: boolean; value: any; originalEvent: Event }`
- `focus`: `{ originalEvent: FocusEvent }`
- `blur`: `{ originalEvent: FocusEvent }`

## Accessibility

Switch is accessible out of the box:

- Uses a native checkbox wrapped in a `<label>` for click targets.
- Applies `role="switch"` and synchronizes `aria-checked`/`aria-disabled`.
- Supports keyboard activation (Space/Enter) automatically.
- Focus states use `:focus-visible` for clear outlines.

```svelte
<Switch label="Airplane mode" aria-label="Toggle airplane mode" on:change={handleToggle} />
```

## Advanced Usage

### Conditional Rendering

```svelte
<Switch
	variant={isBeta ? 'warning' : 'primary'}
	size={compact ? 'sm' : 'lg'}
	disabled={!canToggle}
	bind:checked={isEnabled}
	label={isEnabled ? 'Enabled' : 'Disabled'}
/>
```

### Dynamic Content

````svelte
<Switch bind:checked={streaming}>
  <span slot="label">
    {#if streaming}
      Streaming enabled
    {:else}
      Streaming disabled
    {/if}
  </span>
</Switch>
``>

## Global Styling

See the [Global Styling Guide](./STYLING.md) for all CSS variables, dark mode recommendations, and advanced override patterns.

## TypeScript

```ts
import type {
  SwitchProps,
  SwitchVariant,
  SwitchSize,
  SwitchEventDetail
} from '@rief/kit';

const marketingToggle: SwitchProps = {
  id: 'marketing',
  name: 'marketing',
  variant: 'primary' satisfies SwitchVariant,
  size: 'sm' satisfies SwitchSize,
  label: 'Marketing emails'
};
````
