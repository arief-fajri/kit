# Checkbox Component

A fully customizable, accessible checkbox component with comprehensive theming support, multiple variants, and TypeScript integration. Perfect for forms, settings panels, and interactive lists.

## Features

- 🎨 **Flexible Theming**: Complete CSS custom properties system for unlimited customization
- 📏 **Multiple Sizes**: Five size variants from extra small to extra large
- 🎯 **Rich Variants**: Built-in semantic variants (default, primary, success, error)
- 🔗 **Form Integration**: Full form library support with proper validation states
- ♿ **Accessibility First**: WCAG compliant with ARIA support and keyboard navigation
- 🎭 **Advanced States**: Support for checked, disabled, readonly, and focus states
- 🎨 **Custom Styling**: Easy style overrides with CSS custom properties
- 🔧 **TypeScript Ready**: Comprehensive type definitions and IDE support

## User Interface Structure

The Checkbox component renders as a flexible container with customizable checkmark and label positioning.

```
<div class="checkbox-wrapper checkbox-wrapper--{className}">
  ├── <label class="checkbox-container" for="{id}">
  │   ├── <input type="checkbox" {props} /> (visually hidden)
  │   ├── <span class="checkmark" data-variant="{variant}" />
  │   └── <slot name="label">
  │       └── <span class="label-text">{label}</span> (when label prop provided)
  │
  └── <div id="{id}-description" class="description"> (when description slot used)
      └── <slot name="description" />
```

### Layout Behavior

- **Container**: Flexbox column layout with configurable gap between checkbox and description
- **Content Flow**: Horizontal alignment of checkbox and label with proper spacing
- **Size Scaling**: All dimensions scale proportionally based on CSS custom properties
- **State Switching**: Visual feedback for hover, focus, checked, and disabled states
- **Responsive**: Adapts to container width while maintaining aspect ratios

## Basic Usage

```svelte
<script>
  import { Checkbox } from '@rief/kit';
</script>

<!-- Basic checkbox -->
<Checkbox label="Accept terms and conditions" />

<!-- Checkbox with event handling -->
<Checkbox 
  label="Subscribe to newsletter" 
  bind:checked={subscribed}
  on:change={handleSubscriptionChange} 
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| undefined` | `undefined` | Unique identifier for the checkbox input |
| `name` | `string` | `"checkbox"` | HTML name attribute for form handling |
| `checked` | `boolean` | `false` | Controls the checked state of the checkbox |
| `value` | `any` | `undefined` | Value associated with the checkbox for form submission |
| `label` | `string` | `""` | Text label displayed next to the checkbox |
| `checkboxRef` | `HTMLInputElement \| undefined` | `undefined` | Reference to checkbox DOM element |

### Styling Props (`styling` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling.size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant of the checkbox |
| `styling.variant` | `'default' \| 'primary' \| 'success' \| 'error'` | `'default'` | Visual variant with semantic colors |
| `styling.wrapperClass` | `string` | `""` | Additional CSS classes for wrapper |
| `styling.labelClass` | `string` | `""` | Additional CSS classes for label |
| `styling.inputClass` | `string` | `""` | Additional CSS classes for input |
| `styling.wrapperStyle` | `string` | `""` | Inline styles for wrapper element |

### Behavior Props (`behavior` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `behavior.disabled` | `boolean` | `false` | Disables the checkbox interaction |
| `behavior.required` | `boolean` | `false` | Marks the checkbox as required for form validation |
| `behavior.readonly` | `boolean` | `false` | Makes the checkbox read-only (visually interactive but unchangeable) |
| `behavior.stopPropagation` | `boolean` | `false` | Prevents click event bubbling when enabled |

### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference |

## Variants

### Default
Standard checkbox appearance with neutral colors, perfect for general use cases.

```svelte
<Checkbox styling={{ variant: "default" }} label="Default Checkbox" />
```

### Primary
Emphasizes important selections with primary brand colors.

```svelte
<Checkbox styling={{ variant: "primary" }} label="Primary Action" />
```

### Success
Indicates positive actions or successful states with green accent colors.

```svelte
<Checkbox styling={{ variant: "success" }} label="Task Completed" />
```

### Error
Highlights critical selections or error states with red accent colors.

```svelte
<Checkbox styling={{ variant: "error" }} label="Delete Account" />
```

## Sizes

```svelte
<Checkbox styling={{ size: "xs" }} label="Extra Small" />
<Checkbox styling={{ size: "sm" }} label="Small" />
<Checkbox styling={{ size: "md" }} label="Medium" />
<Checkbox styling={{ size: "lg" }} label="Large" />
<Checkbox styling={{ size: "xl" }} label="Extra Large" />
```

## States

```svelte
<!-- Checked state -->
<Checkbox checked={true} label="Pre-selected Option" />

<!-- Disabled state -->
<Checkbox behavior={{ disabled: true }} label="Unavailable Option" />

<!-- Read-only state -->
<Checkbox behavior={{ readonly: true }} checked={true} label="Read-only Selection" />

<!-- Required state -->
<Checkbox behavior={{ required: true }} label="Required Field" />
```

## Custom Labels and Content

The component supports both simple text labels and complex custom content through slots.

```svelte
<script>
  import { Checkbox } from '@rief/kit';
</script>

<!-- Simple text label -->
<Checkbox label="Simple text label" />

<!-- Custom label content -->
<Checkbox>
  <span slot="label">
    I agree to the <a href="/terms" target="_blank">Terms of Service</a> 
    and <a href="/privacy" target="_blank">Privacy Policy</a>
  </span>
</Checkbox>

<!-- With description -->
<Checkbox label="Enable notifications">
  <div slot="description">
    Receive email updates about your account activity and important announcements.
  </div>
</Checkbox>
```

## Form Integration

The Checkbox component integrates seamlessly with form libraries and native HTML forms.

```svelte
<script>
  let formData = {
    newsletter: false,
    terms: false,
    marketing: false
  };
  
  function handleSubmit() {
    console.log('Form data:', formData);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <Checkbox 
    name="newsletter"
    bind:checked={formData.newsletter}
    label="Subscribe to newsletter"
  />
  
  <Checkbox 
    name="terms"
    bind:checked={formData.terms}
    behavior={{ required: true }}
    styling={{ variant: "primary" }}
    label="Accept terms and conditions"
  />
  
  <Checkbox 
    name="marketing"
    bind:checked={formData.marketing}
    label="Receive marketing communications"
  >
    <div slot="description">
      We'll send you updates about new features and special offers.
    </div>
  </Checkbox>
  
  <button type="submit" disabled={!formData.terms}>
    Create Account
  </button>
</form>
```

## Events

The Checkbox component dispatches comprehensive events with detailed information:

```svelte
<Checkbox 
  label="Interactive Checkbox"
  on:change={handleChange}
  on:focus={handleFocus}
  on:blur={handleBlur}
/>

<script>
  function handleChange(event) {
    console.log('Checked:', event.detail.checked);
    console.log('Value:', event.detail.value);
    console.log('Original event:', event.detail.originalEvent);
  }
  
  function handleFocus(event) {
    console.log('Checkbox focused:', event.detail.originalEvent);
  }
  
  function handleBlur(event) {
    console.log('Checkbox blurred:', event.detail.originalEvent);
  }
</script>
```

## Accessibility

The Checkbox component is fully accessible by default:

- Proper semantic markup with `<input type="checkbox">` and `<label>` association
- ARIA attributes for enhanced screen reader support
- Keyboard navigation with Space key activation
- Focus management with visible focus indicators
- Support for `aria-describedby` when using description slots

```svelte
<!-- Accessible checkbox with description -->
<Checkbox 
  id="newsletter-opt-in"
  label="Subscribe to newsletter"
  aria-describedby="newsletter-description"
>
  <div slot="description" id="newsletter-description">
    Receive weekly updates about new features and product announcements.
  </div>
</Checkbox>
```

## Advanced Usage

### Dynamic Content

```svelte
<script>
  let isSubscribed = false;
  let userType = 'premium';
</script>

<Checkbox bind:checked={isSubscribed}>
  <span slot="label">
    {#if userType === 'premium'}
      Enable premium notifications
    {:else}
      Enable basic notifications
    {/if}
  </span>
  
  <div slot="description">
    {isSubscribed ? 'You will receive notifications' : 'You will not receive notifications'}
  </div>
</Checkbox>
```

### Conditional Rendering

```svelte
<script>
  let hasAccount = true;
  let isRequired = true;
  let currentVariant = hasAccount ? 'primary' : 'default';
</script>

<Checkbox 
  styling={{ variant: currentVariant }}
  behavior={{
    required: isRequired,
    disabled: !hasAccount
  }}
  label={hasAccount ? 'Update preferences' : 'Create account first'}
/>
```

### Checkbox Groups

```svelte
<script>
  let selectedFeatures = [];
  
  const features = [
    { id: 'notifications', label: 'Email Notifications', description: 'Receive updates via email' },
    { id: 'analytics', label: 'Usage Analytics', description: 'Help improve our service' },
    { id: 'marketing', label: 'Marketing Communications', description: 'Special offers and news' }
  ];
  
  function handleFeatureChange(featureId, event) {
    if (event.detail.checked) {
      selectedFeatures = [...selectedFeatures, featureId];
    } else {
      selectedFeatures = selectedFeatures.filter(id => id !== featureId);
    }
  }
</script>

<fieldset>
  <legend>Select Features</legend>
  {#each features as feature}
    <Checkbox 
      id={feature.id}
      name="features"
      value={feature.id}
      label={feature.label}
      checked={selectedFeatures.includes(feature.id)}
      on:change={(e) => handleFeatureChange(feature.id, e)}
    >
      <div slot="description">{feature.description}</div>
    </Checkbox>
  {/each}
</fieldset>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { 
  CheckboxProps, 
  CheckboxStyling, 
  CheckboxBehavior,
  CheckboxEventDetail,
  FocusEventDetail 
} from '@rief/kit';

const checkboxConfig: CheckboxProps = {
  label: 'Typed Checkbox',
  checked: true,
  styling: {
    variant: 'primary',
    size: 'lg'
  },
  behavior: {
    disabled: false,
    required: false
  }
};
```
