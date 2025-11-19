# InputText Component

A comprehensive and accessible text input component with advanced features including masking, validation, formatting, and extensive customization options. Built with TypeScript and designed for modern web applications.

## Features

- 🎨 **Multiple Variants**: Default, filled, and outlined styles for different design contexts
- 📏 **Flexible Sizing**: Small, medium, and large size options with responsive design
- 🎯 **Input Types**: Support for text, email, password, number, tel, url, and search inputs
- 🔗 **Advanced Masking**: Pattern-based input masking with customizable separators
- ♿ **Full Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **State Management**: Error states, loading indicators, and validation feedback
- 🎨 **Theming System**: Extensive CSS custom properties for design system integration
- 🔧 **TypeScript Ready**: Comprehensive type definitions and IntelliSense support

## User Interface Structure

The InputText component follows a flexible, slot-based architecture that supports various input configurations and states.

```
<div class="input-text input-text--{variant} input-text--{size}">
  ├── slot="label" (when label provided)
  │   └── .input-text__label
  │       └── .input-text__required (when required=true)
  │
  └── .input-text__container[class:input-text__container--error={isError}]
      ├── .input-text__wrapper[class:input-text__wrapper--disabled={disabled}]
      │   ├── slot="prefix" (optional prefix content)
      │   ├── input.input-text__field[type={localType}]
      │   ├── slot="suffix" (optional suffix content)
      │   ├── .input-text__action-btn (when clearable && value)
      │   └── .input-text__action-btn (when type="password")
      │
      ├── slot="helper" (when showMaxLengthCounter)
      │   └── .input-text__counter
      │
      └── slot="error" (when isError && errorMessage)
          └── .input-text__error[transition:slide]
```

### Layout Behavior

- **Container**: Full-width block element with flexible internal layout
- **Content Flow**: Vertical flow with label, input wrapper, helper text, and error message
- **Input Wrapper**: Flexbox container with prefix/suffix slot support and action buttons
- **State Switching**: Smooth transitions between normal, error, and disabled states
- **Responsive**: Adapts to container width with configurable breakpoint behavior

## Basic Usage

```svelte
<script>
  import { InputText } from '@rief/kit';
</script>

<!-- Basic text input -->
<InputText value="" placeholder="Enter your name" />

<!-- Input with label and validation -->
<InputText 
  label="Email Address"
  type="email"
  value=""
  validation={{ required: true }}
  on:input={handleInput} 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type for different data formats |
| `value` | `string` | `""` | Current input value (reactive) |
| `placeholder` | `string` | `""` | Placeholder text displayed when empty |
| `label` | `string` | `""` | Label text displayed above input |
| `inputRef` | `HTMLInputElement \| undefined` | `undefined` | Reference to the input DOM element |
| `styling` | `InputTextStyling` | `{}` | Styling configuration object |
| `validation` | `InputTextValidation` | `{}` | Validation rules and error handling |
| `behavior` | `InputTextBehavior` | `{}` | Behavioral configuration options |

### Styling Configuration (`styling` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size variant |
| `variant` | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual style variant |
| `inputClass` | `string` | `""` | Additional CSS classes for input element |
| `wrapperClass` | `string` | `""` | Additional CSS classes for wrapper |
| `labelClass` | `string` | `""` | Additional CSS classes for label |
| `wrapperStyle` | `string` | `""` | Inline styles for wrapper element |

### Validation Configuration (`validation` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `required` | `boolean` | `false` | Mark field as required with visual indicator |
| `isError` | `boolean` | `false` | Display error state styling |
| `errorMessage` | `string` | `""` | Error message to display below input |
| `maxLength` | `number \| null` | `null` | Maximum character limit |
| `pattern` | `string` | `""` | Masking pattern (e.g., 'xxx-xxx-xxxx') |
| `showMaxLengthCounter` | `boolean` | `false` | Show character count indicator |

### Behavior Configuration (`behavior` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable input interaction |
| `readonly` | `boolean` | `false` | Make input read-only |
| `autoFocus` | `boolean` | `false` | Auto-focus input on mount |
| `clearable` | `boolean` | `false` | Show clear button when input has value |
| `useKeyup` | `boolean` | `true` | Use keyup instead of input event |
| `useNumberFormat` | `boolean` | `true` | Enable number formatting for number inputs |
| `autocomplete` | `string` | `""` | HTML autocomplete attribute value |

## Variants

### Default
Clean, minimal styling with subtle borders and focus states. Perfect for most form contexts.

```svelte
<InputText 
  styling={{ variant: "default" }}
  label="Default Input"
  placeholder="Enter text here" 
/>
```

### Filled
Filled background style that works well in dense interfaces or dark themes.

```svelte
<InputText 
  styling={{ variant: "filled" }}
  label="Filled Input"
  placeholder="Enter text here" 
/>
```

### Outlined
Prominent border styling for emphasis or when inputs need to stand out.

```svelte
<InputText 
  styling={{ variant: "outlined" }}
  label="Outlined Input"
  placeholder="Enter text here" 
/>
```

## Sizes

```svelte
<InputText styling={{ size: "sm" }} label="Small" placeholder="Small input" />
<InputText styling={{ size: "md" }} label="Medium" placeholder="Medium input" />
<InputText styling={{ size: "lg" }} label="Large" placeholder="Large input" />
```

## Input Types

### Email Input
```svelte
<InputText 
  type="email"
  label="Email Address"
  placeholder="user@example.com"
  validation={{ required: true }}
/>
```

### Password Input
```svelte
<InputText 
  type="password"
  label="Password"
  placeholder="Enter your password"
  validation={{ required: true, minLength: 8 }}
/>
```

### Number Input
```svelte
<InputText 
  type="number"
  label="Amount"
  placeholder="0.00"
  behavior={{ useNumberFormat: true }}
/>
```

### Phone Number with Masking
```svelte
<InputText 
  type="tel"
  label="Phone Number"
  placeholder="(555) 123-4567"
  validation={{ pattern: "(xxx) xxx-xxxx" }}
/>
```

## Validation and Error Handling

### Basic Validation
```svelte
<script>
  let email = "";
  let emailError = false;
  let errorMessage = "";
  
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError = !emailRegex.test(email);
    errorMessage = emailError ? "Please enter a valid email address" : "";
  }
</script>

<InputText 
  type="email"
  label="Email Address"
  bind:value={email}
  validation={{
    required: true,
    isError: emailError,
    errorMessage: errorMessage
  }}
  on:blur={validateEmail}
/>
```

### Character Limit with Counter
```svelte
<InputText 
  label="Bio"
  placeholder="Tell us about yourself..."
  validation={{
    maxLength: 150,
    showMaxLengthCounter: true
  }}
/>
```

### Pattern Masking
```svelte
<InputText 
  type="tel"
  label="Credit Card"
  placeholder="1234 5678 9012 3456"
  validation={{ pattern: "xxxx xxxx xxxx xxxx" }}
/>
```

## Slots and Custom Content

### Prefix and Suffix Icons
```svelte
<script>
  import { InputText } from '@rief/kit';
  import SearchIcon from './SearchIcon.svelte';
  import ClearIcon from './ClearIcon.svelte';
</script>

<!-- Search input with prefix icon -->
<InputText 
  type="search"
  placeholder="Search..."
  behavior={{ clearable: true }}
>
  <SearchIcon slot="prefix" />
</InputText>

<!-- Currency input with prefix -->
<InputText 
  type="number"
  label="Price"
  placeholder="0.00"
>
  <span slot="prefix">$</span>
  <span slot="suffix">USD</span>
</InputText>
```

### Custom Label Content
```svelte
<InputText placeholder="Enter your name">
  <div slot="label" class="custom-label">
    <span>Full Name</span>
    <span class="optional-badge">Optional</span>
  </div>
</InputText>
```

### Custom Helper Text
```svelte
<InputText 
  label="Username"
  placeholder="Choose a username"
>
  <div slot="helper" class="helper-text">
    Username must be 3-20 characters and contain only letters, numbers, and underscores.
  </div>
</InputText>
```

## Advanced Features

### Number Formatting
```svelte
<script>
  let amount = "";
</script>

<InputText 
  type="number"
  label="Amount"
  bind:value={amount}
  behavior={{ 
    useNumberFormat: true,
    useKeyup: false 
  }}
  placeholder="Enter amount"
/>
```

### Auto-focus and Clearable
```svelte
<InputText 
  label="Search Query"
  placeholder="Type to search..."
  behavior={{
    autoFocus: true,
    clearable: true
  }}
  on:input={handleSearch}
/>
```

### Readonly State
```svelte
<InputText 
  label="Generated ID"
  value="USR-2024-001"
  behavior={{ readonly: true }}
/>
```

## Events

The InputText component dispatches several events for comprehensive interaction handling:

```svelte
<InputText 
  label="Interactive Input"
  on:input={handleInput}
  on:focus={handleFocus}
  on:outFocus={handleBlur}
  on:keydown={handleKeydown}
  on:keyup={handleKeyup}
  on:targetKeyup={handleTargetKeyup}
  on:change={handleChange}
/>
```

### Event Details

- **`input`**: Fired when the input value changes (provides new value)
- **`focus`**: Fired when input gains focus
- **`outFocus`**: Fired when input loses focus (blur)
- **`keydown`**: Fired on key press (provides key and event)
- **`keyup`**: Fired on key release (provides key)
- **`targetKeyup`**: Fired on key release (provides full event)
- **`change`**: Native change event (bubbled through)

## Accessibility

The InputText component is fully accessible by default:

- Proper semantic markup with `<input>` elements
- ARIA attributes for error states and descriptions
- Keyboard navigation support for all interactive elements
- Focus management with visible focus indicators
- Screen reader announcements for state changes
- Proper labeling and form associations

```svelte
<!-- Accessible form input with error state -->
<InputText 
  label="Email Address"
  type="email"
  validation={{
    required: true,
    isError: true,
    errorMessage: "Please enter a valid email address"
  }}
  aria-describedby="email-help"
/>
<div id="email-help">
  We'll use this email to send you important updates.
</div>
```

## Advanced Usage

### Dynamic Validation
```svelte
<script>
  let password = "";
  let confirmPassword = "";
  
  $: passwordsMatch = password === confirmPassword;
  $: confirmError = confirmPassword.length > 0 && !passwordsMatch;
</script>

<InputText 
  type="password"
  label="Password"
  bind:value={password}
  validation={{ required: true }}
/>

<InputText 
  type="password"
  label="Confirm Password"
  bind:value={confirmPassword}
  validation={{
    required: true,
    isError: confirmError,
    errorMessage: confirmError ? "Passwords do not match" : ""
  }}
/>
```

### Conditional Rendering
```svelte
<InputText 
  type={showPassword ? "text" : "password"}
  label="Password"
  styling={{
    variant: isSecure ? "outlined" : "default",
    size: isMobile ? "lg" : "md"
  }}
  validation={{
    required: true,
    isError: !isValidPassword,
    errorMessage: passwordErrorMessage
  }}
  behavior={{
    disabled: isLoading,
    clearable: !isRequired
  }}
/>
```

### Form Integration
```svelte
<form on:submit|preventDefault={handleSubmit}>
  <InputText 
    label="First Name"
    bind:value={firstName}
    validation={{ required: true }}
  />
  
  <InputText 
    label="Last Name"
    bind:value={lastName}
    validation={{ required: true }}
  />
  
  <InputText 
    type="email"
    label="Email"
    bind:value={email}
    validation={{
      required: true,
      isError: emailError,
      errorMessage: emailErrorMessage
    }}
  />
  
  <button type="submit" disabled={!isFormValid}>
    Submit
  </button>
</form>
```

### Custom Styling Integration
```svelte
<InputText 
  label="Branded Input"
  styling={{
    variant: "outlined",
    wrapperClass: "custom-input-wrapper",
    inputClass: "custom-input-field",
    labelClass: "custom-label"
  }}
  validation={{
    maxLength: 100,
    showMaxLengthCounter: true
  }}
/>

<style>
  :global(.custom-input-wrapper) {
    --input-text-border-focus: #your-brand-color;
    --input-text-shadow-focus: 0 0 0 3px rgba(your-brand-rgb, 0.1);
  }
  
  :global(.custom-input-field) {
    font-family: 'Your Custom Font', sans-serif;
  }
  
  :global(.custom-label) {
    color: #your-brand-color;
    font-weight: 600;
  }
</style>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options and CSS custom property documentation.

## TypeScript

The component exports comprehensive TypeScript types for full type safety:

```typescript
import type { 
  InputTextProps, 
  InputTextStyling, 
  InputTextValidation, 
  InputTextBehavior,
  InputType,
  InputSize,
  InputVariant 
} from '@rief/kit';

const inputConfig: InputTextProps = {
  type: 'email',
  styling: {
    variant: 'outlined',
    size: 'lg'
  },
  validation: {
    required: true,
    maxLength: 100
  },
  behavior: {
    clearable: true,
    autoFocus: false
  }
};
```
