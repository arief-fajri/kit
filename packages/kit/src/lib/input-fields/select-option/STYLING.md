# SelectOption Component - Global Styling Guide

This guide covers how to customize the SelectOption component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The SelectOption component uses an extensive system of CSS custom properties that allow you to:
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
  
  --color-secondary: #64748b;
  --color-secondary-hover: #475569;
  --color-secondary-active: #334155;
  
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  --color-surface: #ffffff;
  --color-surface-hover: #f9fafb;
  --color-surface-secondary: #f9fafb;
  --color-surface-disabled: #f9fafb;
  --color-on-surface: #111827;
  
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-text-muted: #9ca3af;
  --color-text-disabled: #d1d5db;
  --color-text-secondary: #374151;
  
  /* Typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;
  
  /* Border Radius */
  --radius: 0.375rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  
  /* Shadow */
  --shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.1);
}
```

### 2. SelectOption-Specific Global Styles

Override SelectOption component defaults globally:

```css
:root {
  /* === LAYOUT === */
  --select-option-width: 100%;
  --select-option-display: flex;
  --select-option-flex-direction: column;
  --select-option-gap: 0.25rem;
  
  /* === COLORS === */
  --select-option-bg: var(--color-surface, #ffffff);
  --select-option-bg-hover: var(--color-surface-hover, #f9fafb);
  --select-option-border: var(--color-border, #e5e7eb);
  --select-option-border-focus: var(--color-primary, #3b82f6);
  --select-option-border-error: var(--color-error, #ef4444);
  --select-option-text: var(--color-text, #111827);
  --select-option-text-placeholder: var(--color-text-muted, #9ca3af);
  --select-option-text-disabled: var(--color-text-disabled, #d1d5db);
  --select-option-text-selected: var(--color-text, #111827);
  --select-option-label: var(--color-text-secondary, #374151);
  --select-option-error-text: var(--color-error, #ef4444);
  --select-option-check-color: var(--color-primary, #3b82f6);
  --select-option-bg-selected: var(--color-surface-hover, #f9fafb);
  
  /* === SPACING === */
  /* Small */
  --select-option-padding-x-sm: 0.5rem;
  --select-option-padding-y-sm: 0.375rem;
  --select-option-height-sm: 2rem;
  --select-option-font-size-sm: 0.875rem;
  
  /* Medium */
  --select-option-padding-x-md: 0.75rem;
  --select-option-padding-y-md: 0.5rem;
  --select-option-height-md: 2.5rem;
  --select-option-font-size-md: 1rem;
  
  /* Large */
  --select-option-padding-x-lg: 1rem;
  --select-option-padding-y-lg: 0.625rem;
  --select-option-height-lg: 3rem;
  --select-option-font-size-lg: 1.125rem;
  
  /* === BORDER & RADIUS === */
  --select-option-border-radius: var(--radius, 0.375rem);
  --select-option-border-width: 1px;
  
  /* === SHADOW === */
  --select-option-shadow-focus: var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1));
  
  /* === TRANSITIONS === */
  --select-option-transition: all 0.15s ease-in-out;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-hover: #374151;
  --color-surface-secondary: #374151;
  --color-surface-disabled: #374151;
  --color-on-surface: #f9fafb;
  
  --color-border: #4b5563;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
  --color-text-disabled: #6b7280;
  --color-text-secondary: #d1d5db;
  
  /* Dark theme SelectOption overrides */
  --select-option-bg: var(--color-surface);
  --select-option-bg-hover: var(--color-surface-hover);
  --select-option-border: var(--color-border);
  --select-option-text: var(--color-text);
  --select-option-text-placeholder: var(--color-text-muted);
  --select-option-text-disabled: var(--color-text-disabled);
  --select-option-label: var(--color-text-secondary);
  --select-option-border-focus: var(--color-primary);
  --select-option-shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.2);
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <SelectOption options={options} label="Dark Theme Select" /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic select variants:

```css
/* Success selects */
.select-option-success {
  --select-option-border-focus: var(--color-success);
  --select-option-shadow-focus: 0 0 0 3px rgb(16 185 129 / 0.1);
}

.select-option-success.select-option--error {
  --select-option-border-error: var(--color-success);
  --select-option-error-text: var(--color-success);
}

/* Warning selects */
.select-option-warning {
  --select-option-border-focus: var(--color-warning);
  --select-option-shadow-focus: 0 0 0 3px rgb(245 158 11 / 0.1);
}

.select-option-warning.select-option--error {
  --select-option-border-error: var(--color-warning);
  --select-option-error-text: var(--color-warning);
}

/* Danger selects */
.select-option-danger {
  --select-option-border-focus: var(--color-error);
  --select-option-shadow-focus: 0 0 0 3px rgb(239 68 68 / 0.1);
}

.select-option-danger.select-option--error {
  --select-option-border-error: var(--color-error);
  --select-option-error-text: var(--color-error);
}
```

Usage in Svelte:

```svelte
<SelectOption 
  options={options} 
  label="Success Select" 
  styling={{ wrapperClass: "select-option-success" }}
/>
<SelectOption 
  options={options} 
  label="Warning Select" 
  styling={{ wrapperClass: "select-option-warning" }}
/>
<SelectOption 
  options={options} 
  label="Danger Select" 
  styling={{ wrapperClass: "select-option-danger" }}
/>
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.select-option-compact {
  --select-option-padding-x-sm: 0.375rem;
  --select-option-padding-y-sm: 0.25rem;
  --select-option-height-sm: 1.75rem;
  --select-option-font-size-sm: 0.8125rem;
  
  --select-option-padding-x-md: 0.5rem;
  --select-option-padding-y-md: 0.375rem;
  --select-option-height-md: 2rem;
  --select-option-font-size-md: 0.875rem;
  
  --select-option-padding-x-lg: 0.75rem;
  --select-option-padding-y-lg: 0.5rem;
  --select-option-height-lg: 2.5rem;
  --select-option-font-size-lg: 1rem;
}

/* Hero size */
.select-option-hero {
  --select-option-padding-x-sm: 0.75rem;
  --select-option-padding-y-sm: 0.5rem;
  --select-option-height-sm: 2.5rem;
  --select-option-font-size-sm: 1rem;
  
  --select-option-padding-x-md: 1rem;
  --select-option-padding-y-md: 0.75rem;
  --select-option-height-md: 3.5rem;
  --select-option-font-size-md: 1.25rem;
  
  --select-option-padding-x-lg: 1.25rem;
  --select-option-padding-y-lg: 1rem;
  --select-option-height-lg: 4rem;
  --select-option-font-size-lg: 1.5rem;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific select instances:

```css
/* Form context styling */
.form-select {
  --select-option-border-radius: var(--radius-md);
  --select-option-border-width: 2px;
  --select-option-shadow-focus: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

/* Sidebar context styling */
.sidebar-select {
  --select-option-bg: transparent;
  --select-option-bg-hover: rgba(59, 130, 246, 0.1);
  --select-option-border: transparent;
  --select-option-border-radius: var(--radius-sm);
}

/* Card context styling */
.card-select {
  --select-option-bg: var(--color-surface-secondary);
  --select-option-border: var(--color-border);
  --select-option-border-radius: var(--radius-lg);
}
```

### 2. Variant-Specific Overrides

```css
/* Filled variant customization */
.select-option--filled {
  --select-option-bg: var(--color-surface-secondary);
  --select-option-border: transparent;
}

.select-option--filled:focus-within {
  --select-option-bg: var(--color-surface);
  --select-option-border: var(--select-option-border-focus);
}

/* Outlined variant customization */
.select-option--outlined {
  --select-option-bg: transparent;
  --select-option-border-width: 2px;
}

.select-option--outlined:focus-within {
  --select-option-border-width: 2px;
  --select-option-shadow-focus: 0 0 0 4px rgba(59, 130, 246, 0.15);
}
```

### 3. State-Specific Overrides

```css
/* Custom error state */
.select-option-custom-error {
  --select-option-border-error: #dc2626;
  --select-option-error-text: #dc2626;
  --select-option-shadow-focus: 0 0 0 3px rgb(220 38 38 / 0.1);
}

/* Custom disabled state */
.select-option-custom-disabled {
  --select-option-bg: #f3f4f6;
  --select-option-text-disabled: #9ca3af;
  --select-option-border: #e5e7eb;
  opacity: 0.5;
}

/* Custom focus state */
.select-option-custom-focus {
  --select-option-border-focus: #8b5cf6;
  --select-option-shadow-focus: 0 0 0 3px rgb(139 92 246 / 0.1);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const selectOptionTheme = {
  primary: {
    '--select-option-border-focus': '#3b82f6',
    '--select-option-shadow-focus': '0 0 0 3px rgb(59 130 246 / 0.1)'
  },
  secondary: {
    '--select-option-border-focus': '#64748b',
    '--select-option-shadow-focus': '0 0 0 3px rgb(100 116 139 / 0.1)'
  },
  success: {
    '--select-option-border-focus': '#10b981',
    '--select-option-shadow-focus': '0 0 0 3px rgb(16 185 129 / 0.1)'
  }
};

// Usage in Svelte component
let theme = 'primary';
$: selectStyles = Object.entries(selectOptionTheme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<SelectOption 
  options={options}
  label="Dynamic Theme"
  styling={{ wrapperStyle: selectStyles }}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive select sizing */
:root {
  --select-option-padding-x-responsive: 0.5rem;
  --select-option-padding-y-responsive: 0.375rem;
  --select-option-height-responsive: 2rem;
  --select-option-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
  :root {
    --select-option-padding-x-responsive: 0.75rem;
    --select-option-padding-y-responsive: 0.5rem;
    --select-option-height-responsive: 2.5rem;
    --select-option-font-size-responsive: 1rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --select-option-padding-x-responsive: 1rem;
    --select-option-padding-y-responsive: 0.625rem;
    --select-option-height-responsive: 3rem;
    --select-option-font-size-responsive: 1.125rem;
  }
}

.select-option-responsive {
  --select-option-padding-x-md: var(--select-option-padding-x-responsive);
  --select-option-padding-y-md: var(--select-option-padding-y-responsive);
  --select-option-height-md: var(--select-option-height-responsive);
  --select-option-font-size-md: var(--select-option-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.select-option-smooth {
  --select-option-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-option-snappy {
  --select-option-transition: all 0.1s cubic-bezier(0.4, 0, 1, 1);
}

/* Custom chevron animation */
.select-option-chevron-bounce .select-option__chevron {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.select-option-chevron-bounce .select-option__chevron--open {
  transform: rotate(180deg) scale(1.1);
}

/* Custom dropdown animations */
.select-option-dropdown-fade .select-option__dropdown {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 4. Dropdown Customization

```css
/* Custom dropdown styling */
.select-option-custom-dropdown {
  --select-option-dropdown-bg: var(--color-surface);
  --select-option-dropdown-border: var(--color-border);
  --select-option-dropdown-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --select-option-dropdown-radius: var(--radius-lg);
  --select-option-dropdown-padding: 0.5rem;
}

/* Custom option item styling */
.select-option-custom-options .select-option__item {
  --select-option-item-padding-x: 1rem;
  --select-option-item-padding-y: 0.75rem;
  --select-option-item-gap: 0.5rem;
  --select-option-item-radius: var(--radius-md);
}

.select-option-custom-options .select-option__item:hover {
  --select-option-bg-hover: rgba(59, 130, 246, 0.1);
}

.select-option-custom-options .select-option__item--selected {
  --select-option-bg-hover: rgba(59, 130, 246, 0.15);
  font-weight: var(--font-weight-semibold);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to SelectOption properties */
:root {
  /* Design System Tokens */
  --ds-color-primary-500: #3b82f6;
  --ds-color-primary-600: #2563eb;
  --ds-color-primary-700: #1d4ed8;
  --ds-space-2: 0.5rem;
  --ds-space-3: 0.75rem;
  --ds-space-4: 1rem;
  --ds-radius-md: 0.375rem;
  --ds-text-sm: 0.875rem;
  --ds-text-base: 1rem;
  --ds-text-lg: 1.125rem;
  
  /* SelectOption Mappings */
  --select-option-border-focus: var(--ds-color-primary-500);
  --select-option-shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.1);
  --select-option-padding-x-sm: var(--ds-space-2);
  --select-option-padding-y-sm: var(--ds-space-2);
  --select-option-padding-x-md: var(--ds-space-3);
  --select-option-padding-y-md: var(--ds-space-2);
  --select-option-padding-x-lg: var(--ds-space-4);
  --select-option-padding-y-lg: var(--ds-space-3);
  --select-option-border-radius: var(--ds-radius-md);
  --select-option-font-size-sm: var(--ds-text-sm);
  --select-option-font-size-md: var(--ds-text-base);
  --select-option-font-size-lg: var(--ds-text-lg);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.select-option-tailwind {
  --select-option-bg: theme('colors.white');
  --select-option-bg-hover: theme('colors.gray.50');
  --select-option-border: theme('colors.gray.300');
  --select-option-border-focus: theme('colors.blue.500');
  --select-option-text: theme('colors.gray.900');
  --select-option-text-placeholder: theme('colors.gray.400');
  --select-option-border-radius: theme('borderRadius.md');
  --select-option-padding-x-md: theme('spacing.3');
  --select-option-padding-y-md: theme('spacing.2');
  --select-option-shadow-focus: theme('boxShadow.outline');
}

/* Bootstrap Integration */
.select-option-bootstrap {
  --select-option-bg: var(--bs-body-bg);
  --select-option-bg-hover: var(--bs-gray-100);
  --select-option-border: var(--bs-border-color);
  --select-option-border-focus: var(--bs-primary);
  --select-option-text: var(--bs-body-color);
  --select-option-text-placeholder: var(--bs-secondary-color);
  --select-option-border-radius: var(--bs-border-radius);
  --select-option-padding-x-md: var(--bs-input-padding-x);
  --select-option-padding-y-md: var(--bs-input-padding-y);
  --select-option-shadow-focus: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and typography consistent across your design system
4. **Test Accessibility**: Ensure sufficient color contrast and focus indicators in all themes
5. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage
6. **Performance**: Minimize the number of custom properties to avoid performance issues
7. **Responsive Design**: Use responsive custom properties for adaptive sizing across breakpoints

## Complete Example

Here's a complete example integrating all concepts:

```css
/* Global theme setup */
:root {
  /* Design tokens */
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* SelectOption defaults */
  --select-option-border-focus: var(--color-primary);
  --select-option-shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.1);
  --select-option-border-radius: 0.375rem;
  --select-option-transition: all 0.15s ease-in-out;
}

/* Semantic variants */
.select-option-primary { 
  --select-option-border-focus: var(--color-primary); 
}
.select-option-success { 
  --select-option-border-focus: var(--color-success); 
}
.select-option-warning { 
  --select-option-border-focus: var(--color-warning); 
}
.select-option-danger { 
  --select-option-border-focus: var(--color-error); 
}

/* Dark theme */
[data-theme="dark"] {
  --select-option-bg: #1f2937;
  --select-option-bg-hover: #374151;
  --select-option-border: #4b5563;
  --select-option-text: #f9fafb;
  --select-option-text-placeholder: #9ca3af;
  --select-option-shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.2);
}
```

```svelte
<!-- Usage in components -->
<SelectOption 
  options={options} 
  label="Primary Select" 
  styling={{ wrapperClass: "select-option-primary" }}
/>

<SelectOption 
  options={options} 
  label="Success Select" 
  styling={{ wrapperClass: "select-option-success" }}
/>

<SelectOption 
  options={options} 
  label="Dark Theme Select" 
  styling={{ variant: "filled" }}
/>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.

