# InputText Component - Global Styling Guide

This guide covers how to customize the InputText component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The InputText component uses an extensive system of CSS custom properties that allow you to:
- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and typography
- Override styles at different specificity levels

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
  /* Color Palette */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-active: #1d4ed8;
  
  --color-surface: #ffffff;
  --color-surface-secondary: #f9fafb;
  --color-surface-hover: #f3f4f6;
  --color-surface-disabled: #f9fafb;
  
  --color-border: #d1d5db;
  --color-error: #ef4444;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  
  --color-text: #111827;
  --color-text-secondary: #374151;
  --color-text-muted: #6b7280;
  
  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Spacing */
  --spacing-xs: 0.125rem;
  --spacing-sm: 0.25rem;
  --spacing-md: 0.5rem;
  --spacing-lg: 0.75rem;
  --spacing-xl: 1rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.1);
  --shadow-error-focus: 0 0 0 3px rgb(239 68 68 / 0.1);
}
```

### 2. InputText-Specific Global Styles

Override InputText component defaults globally:

```css
:root {
  /* === CORE COLORS === */
  --input-text-bg: var(--color-surface);
  --input-text-border: var(--color-border);
  --input-text-border-focus: var(--color-primary);
  --input-text-border-error: var(--color-error);
  --input-text-text: var(--color-text);
  --input-text-text-placeholder: var(--color-text-muted);
  --input-text-label: var(--color-text-secondary);
  --input-text-error-text: var(--color-error);
  
  /* === LAYOUT & SPACING === */
  --input-text-radius: var(--radius-md);
  --input-text-shadow-focus: var(--shadow-focus);
  
  /* === SIZE VARIANTS === */
  /* Small */
  --input-text-height-sm: 2rem;
  --input-text-padding-x-sm: 0.5rem;
  --input-text-font-size-sm: 0.875rem;
  
  /* Medium */
  --input-text-height-md: 2.5rem;
  --input-text-padding-x-md: 0.75rem;
  --input-text-font-size-md: 1rem;
  
  /* Large */
  --input-text-height-lg: 3rem;
  --input-text-padding-x-lg: 1rem;
  --input-text-font-size-lg: 1.125rem;
  
  /* === STYLE VARIANTS === */
  /* Filled variant */
  --input-text-filled-bg: var(--color-surface-secondary);
  --input-text-filled-bg-focus: var(--color-surface);
  --input-text-filled-border: transparent;
  
  /* Outlined variant */
  --input-text-outlined-border-width: 2px;
  --input-text-outlined-bg: transparent;
  
  /* === STATES === */
  --input-text-disabled-opacity: 0.6;
  --input-text-disabled-bg: var(--color-surface-disabled);
  --input-text-disabled-cursor: not-allowed;
  
  /* === ACTION BUTTONS === */
  --input-text-action-btn-color: var(--color-text-muted);
  --input-text-action-btn-hover-color: var(--color-text);
  --input-text-action-btn-hover-bg: var(--color-surface-hover);
  --input-text-action-btn-focus-shadow: 0 0 0 2px var(--color-primary);
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-secondary: #374151;
  --color-surface-hover: #4b5563;
  --color-surface-disabled: #374151;
  --color-border: #4b5563;
  --color-text: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-text-muted: #9ca3af;
  
  /* Dark theme input overrides */
  --input-text-bg: var(--color-surface);
  --input-text-border: var(--color-border);
  --input-text-text: var(--color-text);
  --input-text-text-placeholder: var(--color-text-muted);
  --input-text-label: var(--color-text-secondary);
  --input-text-disabled-bg: var(--color-surface-disabled);
  --input-text-filled-bg: var(--color-surface-secondary);
  --input-text-action-btn-hover-bg: var(--color-surface-hover);
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <InputText label="Dark Theme Input" placeholder="Enter text..." /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic input variants:

```css
/* Success inputs */
.input-text-success {
  --input-text-border-focus: var(--color-success);
  --input-text-shadow-focus: 0 0 0 3px rgb(16 185 129 / 0.1);
  --input-text-label: var(--color-success);
}

.input-text-success .input-text__wrapper:focus-within {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgb(16 185 129 / 0.1);
}

/* Warning inputs */
.input-text-warning {
  --input-text-border-focus: var(--color-warning);
  --input-text-shadow-focus: 0 0 0 3px rgb(245 158 11 / 0.1);
  --input-text-label: var(--color-warning);
}

.input-text-warning .input-text__wrapper:focus-within {
  border-color: var(--color-warning);
  box-shadow: 0 0 0 3px rgb(245 158 11 / 0.1);
}

/* Error inputs (enhanced) */
.input-text-error {
  --input-text-border: var(--color-error);
  --input-text-border-focus: var(--color-error);
  --input-text-shadow-focus: var(--shadow-error-focus);
  --input-text-label: var(--color-error);
}

/* Primary brand inputs */
.input-text-primary {
  --input-text-border-focus: var(--color-primary);
  --input-text-shadow-focus: var(--shadow-focus);
  --input-text-label: var(--color-primary);
}
```

Usage in Svelte:

```svelte
<InputText label="Success" styling={{ wrapperClass: "input-text-success" }} />
<InputText label="Warning" styling={{ wrapperClass: "input-text-warning" }} />
<InputText label="Error" styling={{ wrapperClass: "input-text-error" }} />
<InputText label="Primary" styling={{ wrapperClass: "input-text-primary" }} />
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.input-text-compact {
  --input-text-height: 1.75rem;
  --input-text-padding-x: 0.375rem;
  --input-text-font-size: 0.8125rem;
  --input-text-radius: var(--radius-sm);
}

.input-text-compact .input-text__label {
  font-size: 0.75rem;
  margin-bottom: 0.125rem;
}

/* Extra large size */
.input-text-xl {
  --input-text-height: 3.5rem;
  --input-text-padding-x: 1.25rem;
  --input-text-font-size: 1.25rem;
  --input-text-radius: var(--radius-lg);
}

.input-text-xl .input-text__label {
  font-size: 1rem;
  margin-bottom: 0.375rem;
}

/* Hero size for landing pages */
.input-text-hero {
  --input-text-height: 4rem;
  --input-text-padding-x: 1.5rem;
  --input-text-font-size: 1.375rem;
  --input-text-radius: var(--radius-lg);
  --input-text-shadow-focus: 0 0 0 4px rgb(59 130 246 / 0.15);
}

.input-text-hero .input-text__label {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.5rem;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific input instances:

```css
/* Search input styling */
.search-input {
  --input-text-bg: var(--color-surface-secondary);
  --input-text-border: transparent;
  --input-text-radius: var(--radius-full);
  --input-text-padding-x: 1rem;
}

.search-input .input-text__wrapper {
  background: var(--input-text-bg);
  border-radius: var(--input-text-radius);
}

.search-input .input-text__wrapper:focus-within {
  background: var(--color-surface);
  border-color: var(--input-text-border-focus);
}

/* Login form inputs */
.login-input {
  --input-text-bg: rgba(255, 255, 255, 0.1);
  --input-text-border: rgba(255, 255, 255, 0.2);
  --input-text-border-focus: rgba(255, 255, 255, 0.4);
  --input-text-text: #ffffff;
  --input-text-text-placeholder: rgba(255, 255, 255, 0.6);
  --input-text-label: #ffffff;
}

/* Card form inputs */
.card-input {
  --input-text-bg: transparent;
  --input-text-border: var(--color-border);
  --input-text-border-focus: var(--color-primary);
  --input-text-radius: var(--radius-sm);
  --input-text-shadow-focus: none;
}
```

### 2. State-Specific Overrides

```css
/* Custom loading state */
.input-text-loading {
  --input-text-bg: var(--color-surface-secondary);
  --input-text-text: var(--color-text-muted);
  position: relative;
}

.input-text-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0.75rem;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translateY(-50%);
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

/* Custom readonly state */
.input-text-readonly {
  --input-text-bg: var(--color-surface-secondary);
  --input-text-border: var(--color-border);
  --input-text-text: var(--color-text-secondary);
}

.input-text-readonly .input-text__wrapper {
  cursor: default;
}

.input-text-readonly .input-text__field {
  cursor: default;
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const inputTheme = {
  primary: {
    '--input-text-border-focus': '#3b82f6',
    '--input-text-shadow-focus': '0 0 0 3px rgb(59 130 246 / 0.1)',
    '--input-text-label': '#3b82f6'
  },
  success: {
    '--input-text-border-focus': '#10b981',
    '--input-text-shadow-focus': '0 0 0 3px rgb(16 185 129 / 0.1)',
    '--input-text-label': '#10b981'
  },
  error: {
    '--input-text-border-focus': '#ef4444',
    '--input-text-shadow-focus': '0 0 0 3px rgb(239 68 68 / 0.1)',
    '--input-text-label': '#ef4444'
  }
};

// Usage in Svelte component
let theme = 'primary';
$: inputStyles = Object.entries(inputTheme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<InputText 
  label="Dynamic Theme Input"
  styling={{ wrapperStyle: inputStyles }}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive input sizing */
:root {
  --input-text-padding-x-responsive: 0.5rem;
  --input-text-height-responsive: 2.25rem;
  --input-text-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
  :root {
    --input-text-padding-x-responsive: 0.75rem;
    --input-text-height-responsive: 2.5rem;
    --input-text-font-size-responsive: 1rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --input-text-padding-x-responsive: 1rem;
    --input-text-height-responsive: 2.75rem;
    --input-text-font-size-responsive: 1.125rem;
  }
}

.input-text-responsive .input-text__wrapper {
  height: var(--input-text-height-responsive);
  padding: 0 var(--input-text-padding-x-responsive);
}

.input-text-responsive .input-text__field {
  font-size: var(--input-text-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.input-text-smooth {
  --input-text-transition-duration: 300ms;
  --input-text-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.input-text-smooth .input-text__wrapper {
  transition: 
    border-color var(--input-text-transition-duration) var(--input-text-transition-timing),
    box-shadow var(--input-text-transition-duration) var(--input-text-transition-timing),
    background-color var(--input-text-transition-duration) var(--input-text-transition-timing);
}

.input-text-bouncy {
  --input-text-transition-duration: 200ms;
  --input-text-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.input-text-lift:hover .input-text__wrapper {
  transform: translateY(-1px);
  box-shadow: 
    var(--input-text-shadow-focus),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

.input-text-glow:focus-within .input-text__wrapper {
  box-shadow: 
    var(--input-text-shadow-focus),
    0 0 20px rgba(59, 130, 246, 0.2);
}

/* Floating label animation */
.input-text-floating {
  position: relative;
}

.input-text-floating .input-text__label {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  background: var(--input-text-bg);
  padding: 0 0.25rem;
  transition: all 200ms ease;
  pointer-events: none;
  z-index: 1;
}

.input-text-floating .input-text__wrapper:focus-within + .input-text__label,
.input-text-floating .input-text__field:not(:placeholder-shown) + .input-text__label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  color: var(--input-text-border-focus);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to input properties */
:root {
  /* Design System Tokens */
  --ds-color-primary-500: #3b82f6;
  --ds-color-primary-600: #2563eb;
  --ds-color-gray-200: #e5e7eb;
  --ds-color-gray-300: #d1d5db;
  --ds-color-gray-900: #111827;
  --ds-space-2: 0.5rem;
  --ds-space-3: 0.75rem;
  --ds-space-4: 1rem;
  --ds-radius-md: 0.375rem;
  --ds-text-sm: 0.875rem;
  --ds-text-base: 1rem;
  
  /* InputText Mappings */
  --input-text-border-focus: var(--ds-color-primary-500);
  --input-text-border: var(--ds-color-gray-300);
  --input-text-text: var(--ds-color-gray-900);
  --input-text-padding-x-md: var(--ds-space-3);
  --input-text-radius: var(--ds-radius-md);
  --input-text-font-size-md: var(--ds-text-base);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.input-text-tailwind {
  @apply relative;
}

.input-text-tailwind .input-text__wrapper {
  @apply flex items-center bg-white border border-gray-300 rounded-md;
  --input-text-border-focus: theme('colors.blue.500');
  --input-text-shadow-focus: theme('boxShadow.DEFAULT');
}

.input-text-tailwind .input-text__field {
  @apply flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-500;
}

/* Bootstrap Integration */
.input-text-bootstrap {
  --input-text-bg: var(--bs-body-bg);
  --input-text-border: var(--bs-border-color);
  --input-text-border-focus: var(--bs-primary);
  --input-text-text: var(--bs-body-color);
  --input-text-radius: var(--bs-border-radius);
  --input-text-padding-x-md: var(--bs-input-padding-x);
  --input-text-height-md: var(--bs-input-height);
}

/* Chakra UI Integration */
.input-text-chakra {
  --input-text-bg: var(--chakra-colors-white);
  --input-text-border: var(--chakra-colors-gray-200);
  --input-text-border-focus: var(--chakra-colors-blue-500);
  --input-text-text: var(--chakra-colors-gray-800);
  --input-text-radius: var(--chakra-radii-md);
  --input-text-shadow-focus: var(--chakra-shadows-outline);
}
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and typography consistent across your design system
4. **Test Accessibility**: Ensure sufficient color contrast and focus indicators in all themes
5. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage
6. **Performance**: Minimize the number of custom properties to avoid performance issues

## Complete Example

Here's a complete example integrating all concepts:

```css
/* Global theme setup */
:root {
  /* Design tokens */
  --color-primary: #6366f1;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-surface: #ffffff;
  --color-border: #d1d5db;
  
  /* InputText defaults */
  --input-text-border-focus: var(--color-primary);
  --input-text-shadow-focus: 0 0 0 3px rgb(99 102 241 / 0.1);
  --input-text-radius: 0.5rem;
  --input-text-font-weight: 500;
}

/* Semantic variants */
.input-text-primary { 
  --input-text-border-focus: var(--color-primary);
  --input-text-shadow-focus: 0 0 0 3px rgb(99 102 241 / 0.1);
}

.input-text-success { 
  --input-text-border-focus: var(--color-success);
  --input-text-shadow-focus: 0 0 0 3px rgb(16 185 129 / 0.1);
}

.input-text-warning { 
  --input-text-border-focus: var(--color-warning);
  --input-text-shadow-focus: 0 0 0 3px rgb(245 158 11 / 0.1);
}

.input-text-error { 
  --input-text-border-focus: var(--color-error);
  --input-text-shadow-focus: 0 0 0 3px rgb(239 68 68 / 0.1);
}

/* Dark theme */
[data-theme="dark"] {
  --input-text-bg: #374151;
  --input-text-border: #4b5563;
  --input-text-text: #f9fafb;
  --input-text-text-placeholder: #9ca3af;
  --input-text-disabled-bg: #4b5563;
}

/* Custom form styles */
.form-modern .input-text__wrapper {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid transparent;
  backdrop-filter: blur(10px);
}

.form-modern .input-text__wrapper:focus-within {
  background: #ffffff;
  border-color: var(--input-text-border-focus);
  transform: translateY(-1px);
}
```

```svelte
<!-- Usage in components -->
<InputText 
  label="Primary Input" 
  styling={{ wrapperClass: "input-text-primary" }} 
/>

<InputText 
  label="Success Input" 
  styling={{ wrapperClass: "input-text-success" }} 
/>

<InputText 
  label="Modern Form Input" 
  styling={{ 
    wrapperClass: "form-modern",
    variant: "outlined" 
  }} 
/>

<div data-theme="dark">
  <InputText 
    label="Dark Theme Input" 
    placeholder="Enter text in dark mode..." 
  />
</div>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application. The extensive use of CSS custom properties ensures that your InputText components can adapt to any design system or brand requirements while maintaining accessibility and usability standards.
