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

<!-- Basic button -->
<Button label="Click me" />

<!-- Button with click handler -->
<Button 
  label="Submit" 
  on:click={handleSubmit} 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `""` | Button text content |
| `variant` | `'filled' \| 'outlined' \| 'text' \| 'link'` | `'filled'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `state` | `'default' \| 'active' \| 'selected' \| 'highlight'` | `'default'` | Button state |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading state |
| `loadingMessage` | `string` | `"Loading..."` | Text shown during loading |
| `fullRounded` | `boolean` | `false` | Apply full border radius |
| `className` | `string` | `""` | Additional CSS classes |
| `href` | `string` | `undefined` | URL (converts to anchor tag) |
| `target` | `string` | `undefined` | Link target |
| `iconPosition` | `'left' \| 'right' \| 'only'` | `'left'` | Icon placement |
| `fillColor` | `string` | `undefined` | Custom background color |
| `textColor` | `string` | `undefined` | Custom text color |
| `outlineColor` | `string` | `undefined` | Custom border color |
| `ariaLabel` | `string` | `undefined` | Accessibility label |
| `stopPropagation` | `boolean` | `false` | Stop event propagation |

## Variants

### Filled (Default)
Solid background with contrasting text.

```svelte
<Button variant="filled" label="Filled Button" />
```

### Outlined
Transparent background with border.

```svelte
<Button variant="outlined" label="Outlined Button" />
```

### Text
Minimal style with hover effects.

```svelte
<Button variant="text" label="Text Button" />
```

### Link
Underlined text for link-like appearance.

```svelte
<Button variant="link" label="Link Button" />
```

## Sizes

```svelte
<Button size="sm" label="Small" />
<Button size="md" label="Medium" />
<Button size="lg" label="Large" />
<Button size="xl" label="Extra Large" />
```

## States

```svelte
<Button state="default" label="Default" />
<Button state="active" label="Active" />
<Button state="selected" label="Selected" />
<Button state="highlight" label="Highlight" />
```

## Icons

Use the `icon` slot to add icons to your buttons.

```svelte
<script>
  import { Button } from '@rief/kit';
  import Icon from './Icon.svelte';
</script>

<!-- Icon on the left (default) -->
<Button label="Save" iconPosition="left">
  <Icon name="save" slot="icon" />
</Button>

<!-- Icon on the right -->
<Button label="Next" iconPosition="right">
  <Icon name="arrow-right" slot="icon" />
</Button>

<!-- Icon only -->
<Button iconPosition="only" ariaLabel="Close">
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
  {loading} 
  loadingMessage="Submitting..."
  on:click={handleSubmit} 
/>

<!-- Custom loading content -->
<Button label="Upload" {loading} on:click={handleUpload}>
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
<Button href="/dashboard" label="Go to Dashboard" />

<!-- External link (automatically gets target="_blank" and rel="noopener noreferrer") -->
<Button href="https://example.com" label="Visit Site" />

<!-- Custom target and rel -->
<Button 
  href="/help" 
  target="_blank" 
  rel="noopener" 
  label="Help" 
/>
```

## Custom Colors

Override colors using the color props:

```svelte
<Button 
  label="Custom Colors"
  fillColor="#ff6b6b"
  textColor="#ffffff"
  outlineColor="#ff5252"
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
<Button 
  iconPosition="only" 
  ariaLabel="Delete item"
  on:click={deleteItem}
>
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
  variant={isPrimary ? 'filled' : 'outlined'}
  state={currentState}
  disabled={!isValid}
  label={isEditing ? 'Save' : 'Edit'}
/>
```

### Form Integration

```svelte
<form on:submit|preventDefault={handleSubmit}>
  <Button 
    type="submit"
    label="Submit Form"
    loading={submitting}
    disabled={!isFormValid}
  />
</form>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { ButtonProps, ButtonVariant, ButtonSize, ButtonState } from '@rief/kit';

const buttonConfig: ButtonProps = {
  variant: 'filled',
  size: 'lg',
  state: 'default',
  label: 'Typed Button'
};
```

