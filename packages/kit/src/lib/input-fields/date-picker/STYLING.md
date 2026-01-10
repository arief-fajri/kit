# DatePicker Component - Global Styling Guide

This guide covers how to customize the DatePicker component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The DatePicker component uses an extensive system of CSS custom properties that allow you to:
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
  
  --color-secondary: #f3f4f6;
  --color-secondary-hover: #e5e7eb;
  --color-secondary-active: #d1d5db;
  
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  
  --color-surface: #ffffff;
  --color-surface-hover: #f9fafb;
  --color-on-surface: #374151;
  
  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}
```

### 2. DatePicker-Specific Global Styles

Override DatePicker component defaults globally:

```css
:root {
  /* === DEFAULT VARIANT === */
  --dp-bg-default: var(--color-surface);
  --dp-text-default: var(--color-on-surface);
  --dp-border-default: #e5e7eb;
  
  /* === PRIMARY COLORS === */
  --dp-primary-default: var(--color-primary);
  --dp-primary-hover-default: var(--color-primary-hover);
  --dp-primary-text-default: #ffffff;
  
  /* === SECONDARY COLORS === */
  --dp-secondary-default: var(--color-secondary);
  --dp-secondary-hover-default: var(--color-secondary-hover);
  
  /* === TEXT COLORS === */
  --dp-text-muted-default: #6b7280;
  --dp-text-disabled-default: #9ca3af;
  
  /* === SIZES === */
  /* Small */
  --dp-padding-sm: 0.75rem;
  --dp-gap-sm: 0.375rem;
  --dp-cell-size-sm: 2rem;
  --dp-font-size-sm: 0.875rem;
  --dp-border-radius-sm: var(--radius-sm);
  
  /* Medium */
  --dp-padding-md: 1rem;
  --dp-gap-md: 0.5rem;
  --dp-cell-size-md: 2.5rem;
  --dp-font-size-md: 1rem;
  --dp-border-radius-md: var(--radius-md);
  
  /* Large */
  --dp-padding-lg: 1.25rem;
  --dp-gap-lg: 0.75rem;
  --dp-cell-size-lg: 3rem;
  --dp-font-size-lg: 1.125rem;
  --dp-border-radius-lg: var(--radius-lg);
  
  /* === FOCUS === */
  --dp-focus-ring-default: var(--color-primary);
  --dp-focus-ring-width: 2px;
  --dp-focus-ring-offset: 2px;
  
  /* === TYPOGRAPHY === */
  --dp-font-family: var(--font-family-base);
  --dp-font-weight-normal: 400;
  --dp-font-weight-medium: var(--font-weight-medium);
  --dp-line-height: 1.5;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-hover: #374151;
  --color-on-surface: #f9fafb;
  
  /* Dark theme DatePicker overrides */
  --dp-bg-default: var(--color-surface);
  --dp-text-default: var(--color-on-surface);
  --dp-text-muted-default: #9ca3af;
  --dp-text-disabled-default: #6b7280;
  --dp-border-default: #374151;
  --dp-secondary-default: #374151;
  --dp-secondary-hover-default: #4b5563;
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <DatePicker value={selectedDate} /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic DatePicker variants:

```css
/* Success DatePickers */
.dp-success {
  --dp-primary-color: var(--color-success);
  --dp-primary-hover: #059669;
  --dp-primary-active: #047857;
  --dp-primary-text: #ffffff;
  --dp-focus-ring-color: var(--color-success);
}

/* Warning DatePickers */
.dp-warning {
  --dp-primary-color: var(--color-warning);
  --dp-primary-hover: #d97706;
  --dp-primary-active: #b45309;
  --dp-primary-text: #ffffff;
  --dp-focus-ring-color: var(--color-warning);
}

/* Danger DatePickers */
.dp-danger {
  --dp-primary-color: var(--color-danger);
  --dp-primary-hover: #dc2626;
  --dp-primary-active: #b91c1c;
  --dp-primary-text: #ffffff;
  --dp-focus-ring-color: var(--color-danger);
}
```

Usage in Svelte:

```svelte
<DatePicker value={saveDate} className="dp-success" />
<DatePicker value={warningDate} className="dp-warning" />
<DatePicker value={deleteDate} className="dp-danger" />
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.dp-compact {
  --dp-padding: 0.5rem;
  --dp-gap: 0.25rem;
  --dp-cell-size: 1.75rem;
  --dp-font-size: 0.75rem;
  --dp-border-radius: 0.125rem;
}

/* Hero size */
.dp-hero {
  --dp-padding: 1.5rem;
  --dp-gap: 1rem;
  --dp-cell-size: 3.5rem;
  --dp-font-size: 1.25rem;
  --dp-border-radius: 0.75rem;
  --dp-font-weight: var(--font-weight-semibold);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific DatePicker instances:

```css
/* Calendar widget styling */
.calendar-widget {
  --dp-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --dp-text-color: #ffffff;
  --dp-border-radius: 1rem;
  --dp-padding: 1.5rem;
  --dp-primary-color: #ffffff;
  --dp-primary-text: #667eea;
}

.inline-datepicker {
  --dp-bg: transparent;
  --dp-border-default: transparent;
  --dp-text-color: var(--color-on-surface);
  --dp-border-radius: 0.25rem;
}
```

### 2. Calendar Cell Customization

```css
/* Custom cell styling */
.dp-custom-cells {
  --dp-cell-size: 3rem;
  --dp-cell-hover-bg: rgba(16, 185, 129, 0.1);
  --dp-cell-hover-color: #059669;
  --dp-range-bg: rgba(16, 185, 129, 0.2);
  --dp-range-color: #047857;
  --dp-today-color: #f59e0b;
}

/* Rounded cells */
.dp-rounded-cells .calendar-grid__cell {
  border-radius: 50%;
}

/* Square cells */
.dp-square-cells .calendar-grid__cell {
  border-radius: 0;
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const datePickerTheme = {
  primary: {
    '--dp-primary-color': '#3b82f6',
    '--dp-primary-hover': '#2563eb',
    '--dp-primary-text': '#ffffff'
  },
  secondary: {
    '--dp-primary-color': '#6b7280',
    '--dp-primary-hover': '#4b5563',
    '--dp-primary-text': '#ffffff'
  }
};

// Usage in Svelte component
let theme = 'primary';
$: datePickerStyles = Object.entries(datePickerTheme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<DatePicker 
  value={selectedDate}
  style={datePickerStyles}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive DatePicker sizing */
:root {
  --dp-padding-responsive: 0.75rem;
  --dp-cell-size-responsive: 2rem;
  --dp-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
  :root {
    --dp-padding-responsive: 1rem;
    --dp-cell-size-responsive: 2.5rem;
    --dp-font-size-responsive: 1rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --dp-padding-responsive: 1.25rem;
    --dp-cell-size-responsive: 3rem;
    --dp-font-size-responsive: 1.125rem;
  }
}

.dp-responsive {
  --dp-padding: var(--dp-padding-responsive);
  --dp-cell-size: var(--dp-cell-size-responsive);
  --dp-font-size: var(--dp-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.dp-smooth {
  --dp-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dp-bouncy {
  --dp-transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.dp-lift .calendar-grid__cell:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dp-glow .calendar-grid__cell--selected {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to DatePicker properties */
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
  
  /* DatePicker Mappings */
  --dp-primary-default: var(--ds-color-primary-500);
  --dp-primary-hover-default: var(--ds-color-primary-600);
  --dp-primary-active-default: var(--ds-color-primary-700);
  --dp-padding-md: var(--ds-space-4);
  --dp-gap-md: var(--ds-space-2);
  --dp-border-radius-md: var(--ds-radius-md);
  --dp-font-size-md: var(--ds-text-base);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.dp-tailwind {
  --dp-primary-color: theme('colors.blue.500');
  --dp-primary-hover: theme('colors.blue.600');
  --dp-primary-text: theme('colors.white');
  --dp-border-radius: theme('borderRadius.md');
  --dp-padding: theme('spacing.4');
  --dp-gap: theme('spacing.2');
}

/* Bootstrap Integration */
.dp-bootstrap {
  --dp-primary-color: var(--bs-primary);
  --dp-primary-hover: var(--bs-primary-hover);
  --dp-primary-text: var(--bs-white);
  --dp-border-radius: var(--bs-border-radius);
  --dp-padding: var(--bs-datepicker-padding);
  --dp-gap: var(--bs-datepicker-gap);
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
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  
  /* DatePicker defaults */
  --dp-primary-default: var(--color-primary);
  --dp-focus-ring-default: var(--color-primary);
  --dp-border-radius-md: 0.375rem;
  --dp-font-weight-medium: 500;
}

/* Semantic variants */
.dp-primary { --dp-primary-color: var(--color-primary); }
.dp-success { --dp-primary-color: var(--color-success); }
.dp-warning { --dp-primary-color: var(--color-warning); }
.dp-danger { --dp-primary-color: var(--color-danger); }

/* Dark theme */
[data-theme="dark"] {
  --dp-bg-default: #1f2937;
  --dp-text-default: #f9fafb;
  --dp-border-default: #374151;
}
```

```svelte
<!-- Usage in components -->
<DatePicker value={primaryDate} className="dp-primary" />
<DatePicker value={deleteDate} variant="bordered" className="dp-danger" />
<DatePicker value={saveDate} className="dp-success" loading={saving} />
```

## InputDatePicker Styling

The `InputDatePicker` component (input wrapper) uses separate CSS custom properties with the `--input-date-picker-` prefix:

```css
:root {
  /* === INPUT TRIGGER === */
  --input-date-picker-bg: var(--color-surface, #ffffff);
  --input-date-picker-bg-hover: var(--color-surface-hover, #f9fafb);
  --input-date-picker-border: var(--color-border, #e5e7eb);
  --input-date-picker-border-focus: var(--color-primary, #3b82f6);
  --input-date-picker-border-error: var(--color-error, #ef4444);
  --input-date-picker-text: var(--color-text, #111827);
  --input-date-picker-text-placeholder: var(--color-text-muted, #9ca3af);
  --input-date-picker-label: var(--color-text-secondary, #374151);
  --input-date-picker-error-text: var(--color-error, #ef4444);
  --input-date-picker-icon-color: var(--color-text-muted, #6b7280);
  --input-date-picker-shadow-focus: var(--shadow-focus, 0 0 0 3px rgb(59 130 246 / 0.1));
  --input-date-picker-border-radius: var(--radius, 0.375rem);
  --input-date-picker-border-width: 1px;
  --input-date-picker-transition: all 0.2s ease-in-out;
  
  /* === SIZES === */
  /* Small */
  --input-date-picker-height-sm: 2rem;
  --input-date-picker-padding-x-sm: 0.5rem;
  --input-date-picker-padding-y-sm: 0.375rem;
  --input-date-picker-font-size-sm: 0.875rem;
  
  /* Medium */
  --input-date-picker-height-md: 2.5rem;
  --input-date-picker-padding-x-md: 0.75rem;
  --input-date-picker-padding-y-md: 0.5rem;
  --input-date-picker-font-size-md: 0.875rem;
  
  /* Large */
  --input-date-picker-height-lg: 3rem;
  --input-date-picker-padding-x-lg: 1rem;
  --input-date-picker-padding-y-lg: 0.625rem;
  --input-date-picker-font-size-lg: 1.125rem;
}
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
