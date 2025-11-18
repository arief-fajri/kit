# TextArea Component

A powerful, fully customizable textarea input component built for Svelte applications. Provides extensive validation, auto-resizing capabilities, and comprehensive theming support with TypeScript integration.

## Features

- 🎨 **Multiple Variants**: Default, filled, and outlined styles for different design contexts
- 📏 **Flexible Sizing**: Small, medium, and large size variants with responsive scaling
- 🎯 **Auto-Resize**: Intelligent height adjustment based on content with configurable constraints
- 🔗 **Rich Validation**: Character limits, error states, and real-time feedback with counter display
- ♿ **Full Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **Interactive States**: Disabled, readonly, focus, and error states with smooth transitions
- 🎨 **Complete Theming**: CSS custom properties for comprehensive design system integration
- 🔧 **TypeScript Ready**: Fully typed props with grouped configuration objects for better DX

## User Interface Structure

The TextArea component follows a structured layout with conditional rendering based on configuration and state.

```
<div class="textarea textarea--{variant} textarea--{size}">
  ├── slot="label" (when label provided)
  │   └── .textarea__label
  │       ├── {label text}
  │       └── .textarea__required (*) (when required=true)
  │
  └── .textarea__container (with error state modifier)
      ├── .textarea__wrapper (with disabled/auto-resize modifiers)
      │   ├── slot="prefix" (optional)
      │   ├── .textarea__field (main textarea element)
      │   ├── slot="suffix" (optional)
      │   └── .textarea__action-btn (when clearable=true and has value)
      │
      ├── slot="helper" (when showMaxLengthCounter=true)
      │   └── .textarea__counter ({current}/{max} characters)
      │
      └── slot="error" (when isError=true and errorMessage provided)
          └── .textarea__error (with slide transition)
```

### Layout Behavior

- **Container**: Full-width block element with relative positioning for absolute child elements
- **Content Flow**: Vertical stacking with proper spacing between label, input, helper text, and error messages
- **Auto-Resize**: CSS Grid-based approach for seamless height adjustment without layout shifts
- **State Switching**: Smooth transitions between normal, focus, error, and disabled states
- **Responsive**: Maintains proportions across different screen sizes with scalable typography

## Basic Usage

```svelte
<script>
  import { TextArea } from '@rief/kit';
</script>

<!-- Basic textarea -->
<TextArea value="" placeholder="Enter your message..." />

<!-- Textarea with label and event handling -->
<TextArea 
  label="Description"
  value={description}
  placeholder="Describe your project..."
  on:input={(e) => description = e.detail}
/>
```

## Props

The TextArea component uses grouped props for better organization and TypeScript support:

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Current textarea value |
| `placeholder` | `string` | `""` | Placeholder text when empty |
| `label` | `string` | `""` | Label text displayed above textarea |
| `textareaRef` | `HTMLTextAreaElement \| undefined` | `undefined` | Reference to textarea DOM element |

### Styling Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling.size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant affecting padding and typography |
| `styling.variant` | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual style variant |
| `styling.inputClass` | `string` | `""` | Additional CSS classes for textarea element |
| `styling.wrapperClass` | `string` | `""` | Additional CSS classes for wrapper container |
| `styling.labelClass` | `string` | `""` | Additional CSS classes for label element |
| `styling.wrapperStyle` | `string` | `""` | Inline styles for wrapper container |

### Validation Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validation.required` | `boolean` | `false` | Shows required indicator (*) in label |
| `validation.isError` | `boolean` | `false` | Enables error state styling |
| `validation.errorMessage` | `string` | `""` | Error message displayed below textarea |
| `validation.maxLength` | `number \| null` | `null` | Maximum character limit with validation |
| `validation.showMaxLengthCounter` | `boolean` | `false` | Shows character count display |

### Behavior Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `behavior.disabled` | `boolean` | `false` | Disables textarea interaction |
| `behavior.readonly` | `boolean` | `false` | Makes textarea read-only |
| `behavior.autoFocus` | `boolean` | `false` | Automatically focuses textarea on mount |
| `behavior.clearable` | `boolean` | `false` | Shows clear button when textarea has content |
| `behavior.autocomplete` | `string` | `""` | HTML autocomplete attribute value |
| `behavior.excludedKeys` | `string[]` | `[]` | Array of keys to prevent from being typed |

### Layout Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout.rows` | `number` | `4` | Number of visible text lines |
| `layout.fixedHeight` | `boolean` | `true` | Maintains fixed height when true |
| `layout.maxHeight` | `number \| null` | `null` | Maximum height in pixels |
| `layout.autoResize` | `boolean` | `!layout.fixedHeight` | Enables automatic height adjustment |

## Variants

### Default
Clean, minimal styling with subtle border and focus states. Perfect for most form contexts.

```svelte
<TextArea 
  styling={{ variant: "default" }}
  label="Default TextArea"
  placeholder="Enter text here..."
/>
```

### Filled
Filled background style that works well in dense layouts or when you want to reduce visual noise.

```svelte
<TextArea 
  styling={{ variant: "filled" }}
  label="Filled TextArea"
  placeholder="Enter text here..."
/>
```

### Outlined
Prominent border styling that provides strong visual definition and works well for important inputs.

```svelte
<TextArea 
  styling={{ variant: "outlined" }}
  label="Outlined TextArea"
  placeholder="Enter text here..."
/>
```

## Sizes

```svelte
<TextArea styling={{ size: "sm" }} label="Small" placeholder="Small textarea" />
<TextArea styling={{ size: "md" }} label="Medium" placeholder="Medium textarea" />
<TextArea styling={{ size: "lg" }} label="Large" placeholder="Large textarea" />
```

## Auto-Resize Feature

The TextArea component provides intelligent auto-resizing that grows with content while respecting constraints.

```svelte
<script>
  let content = "";
</script>

<!-- Auto-resize enabled (default when fixedHeight is false) -->
<TextArea 
  bind:value={content}
  label="Auto-Resize TextArea"
  layout={{ 
    fixedHeight: false, 
    autoResize: true,
    maxHeight: 300 
  }}
  placeholder="This textarea will grow as you type..."
/>

<!-- Fixed height mode -->
<TextArea 
  bind:value={content}
  label="Fixed Height TextArea"
  layout={{ 
    fixedHeight: true, 
    rows: 6 
  }}
  placeholder="This textarea maintains fixed height"
/>
```

## Validation and Character Limits

Comprehensive validation with real-time feedback and character counting.

```svelte
<script>
  let message = "";
  let isError = false;
  let errorMessage = "";
  
  $: if (message.length > 100) {
    isError = true;
    errorMessage = "Message is too long";
  } else {
    isError = false;
    errorMessage = "";
  }
</script>

<!-- Character limit with counter -->
<TextArea 
  bind:value={message}
  label="Message"
  validation={{
    required: true,
    maxLength: 200,
    showMaxLengthCounter: true,
    isError,
    errorMessage
  }}
  placeholder="Enter your message (max 200 characters)"
/>
```

## Clearable TextArea

Add a clear button for easy content removal.

```svelte
<script>
  let notes = "Some initial content";
</script>

<TextArea 
  bind:value={notes}
  label="Notes"
  behavior={{ clearable: true }}
  placeholder="Enter your notes..."
  on:clear={() => console.log('TextArea cleared')}
/>
```

## Key Exclusion

Prevent specific keys from being typed in the textarea.

```svelte
<TextArea 
  label="No Numbers Allowed"
  behavior={{ 
    excludedKeys: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] 
  }}
  placeholder="Try typing numbers - they won't work!"
/>
```

## Slots and Custom Content

Enhance the textarea with prefix, suffix, and custom helper content.

```svelte
<script>
  import { TextArea } from '@rief/kit';
  import Icon from './Icon.svelte';
</script>

<!-- Custom label with icon -->
<TextArea value={description} placeholder="Describe your project...">
  <div slot="label" class="flex items-center gap-2">
    <Icon name="edit" size="sm" />
    <span>Project Description</span>
    <span class="text-red-500">*</span>
  </div>
</TextArea>

<!-- Custom helper text -->
<TextArea 
  value={feedback}
  label="Feedback"
  placeholder="Share your thoughts..."
>
  <div slot="helper" class="text-sm text-gray-600">
    Your feedback helps us improve our service
  </div>
</TextArea>

<!-- Custom error display -->
<TextArea 
  value={content}
  label="Content"
  validation={{ isError: true }}
>
  <div slot="error" class="flex items-center gap-2 text-red-600">
    <Icon name="warning" size="sm" />
    <span>Please provide valid content</span>
  </div>
</TextArea>
```

## Events

The TextArea component dispatches comprehensive events for interaction handling:

```svelte
<TextArea 
  label="Interactive TextArea"
  on:input={(e) => console.log('Input:', e.detail)}
  on:focus={() => console.log('Focused')}
  on:outFocus={() => console.log('Blurred')}
  on:change={(e) => console.log('Changed:', e.detail)}
  on:keydown={(e) => console.log('Key down:', e.detail.key)}
  on:clear={() => console.log('Cleared')}
  on:paste-rejected={(e) => console.log('Paste rejected:', e.detail.reason)}
/>
```

## Accessibility

The TextArea component is fully accessible by default:

- Proper semantic markup (`<textarea>` element)
- ARIA attributes for screen readers (`aria-invalid`, `aria-describedby`)
- Keyboard navigation support (Tab, Shift+Tab, arrow keys)
- Focus management with visible focus indicators
- Error state announcements for screen readers

```svelte
<!-- Accessible textarea with comprehensive labeling -->
<TextArea 
  label="Accessible Description"
  validation={{
    required: true,
    isError: hasError,
    errorMessage: "Please provide a description"
  }}
  behavior={{ autoFocus: true }}
  placeholder="Describe your needs..."
/>
```

## Advanced Usage

### Dynamic Content and Conditional Rendering

```svelte
<script>
  let mode = 'edit';
  let content = '';
  let isLoading = false;
</script>

<TextArea 
  bind:value={content}
  label={mode === 'edit' ? 'Edit Content' : 'Review Content'}
  behavior={{ 
    readonly: mode === 'review',
    disabled: isLoading 
  }}
  validation={{
    isError: mode === 'edit' && content.length === 0,
    errorMessage: mode === 'edit' ? 'Content is required' : ''
  }}
  layout={{ 
    autoResize: mode === 'edit',
    fixedHeight: mode === 'review' 
  }}
>
  <div slot="helper">
    {#if isLoading}
      <span>Saving...</span>
    {:else if mode === 'edit'}
      <span>Edit your content</span>
    {:else}
      <span>Review mode - content is read-only</span>
    {/if}
  </div>
</TextArea>
```

### Form Integration

```svelte
<script>
  let formData = {
    title: '',
    description: '',
    notes: ''
  };
  let errors = {};
  let isSubmitting = false;
  
  async function handleSubmit() {
    isSubmitting = true;
    errors = {};
    
    // Validation
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (Object.keys(errors).length === 0) {
      try {
        await submitForm(formData);
      } catch (error) {
        console.error('Submission failed:', error);
      }
    }
    
    isSubmitting = false;
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <TextArea 
    bind:value={formData.description}
    label="Project Description"
    validation={{
      required: true,
      isError: !!errors.description,
      errorMessage: errors.description,
      maxLength: 500,
      showMaxLengthCounter: true
    }}
    behavior={{ disabled: isSubmitting }}
    placeholder="Describe your project goals and requirements..."
  />
  
  <TextArea 
    bind:value={formData.notes}
    label="Additional Notes"
    layout={{ autoResize: true, maxHeight: 200 }}
    behavior={{ clearable: true }}
    placeholder="Any additional information..."
  />
  
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
</form>
```

### Real-time Validation

```svelte
<script>
  let email = '';
  let emailError = '';
  
  $: validateEmail(email);
  
  function validateEmail(value) {
    if (!value) {
      emailError = '';
    } else if (!value.includes('@')) {
      emailError = 'Please enter a valid email address';
    } else {
      emailError = '';
    }
  }
</script>

<TextArea 
  bind:value={email}
  label="Email Address"
  validation={{
    isError: !!emailError,
    errorMessage: emailError
  }}
  placeholder="Enter your email address..."
  on:input={() => validateEmail(email)}
/>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { 
  TextAreaProps, 
  TextAreaStyling, 
  TextAreaValidation, 
  TextAreaBehavior, 
  TextAreaLayout 
} from '@rief/kit';

const textareaConfig: TextAreaProps = {
  styling: {
    variant: 'filled',
    size: 'lg'
  },
  validation: {
    required: true,
    maxLength: 200,
    showMaxLengthCounter: true
  },
  behavior: {
    autoFocus: true,
    clearable: true
  },
  layout: {
    autoResize: true,
    maxHeight: 300
  }
};
```
