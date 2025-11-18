# TextArea Component - Global Styling Guide

This guide covers how to customize the TextArea component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The TextArea component uses an extensive system of CSS custom properties that allow you to:
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
  
  --color-secondary: #6b7280;
  --color-secondary-hover: #4b5563;
  --color-secondary-active: #374151;
  
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  --color-surface: #ffffff;
  --color-surface-secondary: #f9fafb;
  --color-surface-hover: #f3f4f6;
  --color-surface-disabled: #f9fafb;
  --color-border: #d1d5db;
  --color-text: #111827;
  --color-text-secondary: #374151;
  --color-text-muted: #6b7280;
  
  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.1);
}
```

### 2. TextArea-Specific Global Styles

Override TextArea component defaults globally:

```css
:root {
  /* === BACKGROUND COLORS === */
  --textarea-bg: var(--color-surface);
  --textarea-bg-disabled: var(--color-surface-disabled);
  
  /* === BORDER COLORS === */
  --textarea-border: var(--color-border);
  --textarea-border-focus: var(--color-primary);
  --textarea-border-error: var(--color-error);
  
  /* === TEXT COLORS === */
  --textarea-text: var(--color-text);
  --textarea-text-placeholder: var(--color-text-muted);
  --textarea-label: var(--color-text-secondary);
  --textarea-error-text: var(--color-error);
  
  /* === FOCUS STYLES === */
  --textarea-shadow-focus: var(--shadow-focus);
  --textarea-radius: var(--radius-md);
  
  /* === SIZE VARIANTS === */
  /* Small */
  --textarea-padding-x-sm: var(--spacing-sm);
  --textarea-padding-y-sm: 0.375rem;
  --textarea-font-size-sm: 0.875rem;
  
  /* Medium */
  --textarea-padding-x-md: var(--spacing-md);
  --textarea-padding-y-md: var(--spacing-sm);
  --textarea-font-size-md: 1rem;
  
  /* Large */
  --textarea-padding-x-lg: var(--spacing-lg);
  --textarea-padding-y-lg: 0.625rem;
  --textarea-font-size-lg: 1.125rem;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-secondary: #111827;
  --color-surface-hover: #374151;
  --color-surface-disabled: #111827;
  --color-border: #374151;
  --color-text: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-text-muted: #9ca3af;
  
  /* Dark theme textarea overrides */
  --textarea-bg: var(--color-surface);
  --textarea-border: var(--color-border);
  --textarea-text: var(--color-text);
  --textarea-text-placeholder: var(--color-text-muted);
  --textarea-label: var(--color-text-secondary);
  --textarea-bg-disabled: var(--color-surface-disabled);
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <TextArea label="Dark Theme TextArea" /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic textarea variants:

```css
/* Success textareas */
.textarea-success {
  --textarea-border: var(--color-success);
  --textarea-border-focus: var(--color-success);
  --textarea-shadow-focus: 0 0 0 3px rgb(16 185 129 / 0.1);
}

/* Warning textareas */
.textarea-warning {
  --textarea-border: var(--color-warning);
  --textarea-border-focus: var(--color-warning);
  --textarea-shadow-focus: 0 0 0 3px rgb(245 158 11 / 0.1);
}

/* Error textareas */
.textarea-danger {
  --textarea-border: var(--color-error);
  --textarea-border-focus: var(--color-error);
  --textarea-shadow-focus: 0 0 0 3px rgb(239 68 68 / 0.1);
}
```

Usage in Svelte:

```svelte
<TextArea label="Success" styling={{ wrapperClass: "textarea-success" }} />
<TextArea label="Warning" styling={{ wrapperClass: "textarea-warning" }} />
<TextArea label="Error" styling={{ wrapperClass: "textarea-danger" }} />
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.textarea-compact {
  --textarea-padding-x: 0.375rem;
  --textarea-padding-y: 0.25rem;
  --textarea-font-size: 0.75rem;
  --textarea-radius: var(--radius-sm);
}

/* Hero size */
.textarea-hero {
  --textarea-padding-x: 1.5rem;
  --textarea-padding-y: 1rem;
  --textarea-font-size: 1.25rem;
  --textarea-radius: var(--radius-lg);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific textarea instances:

```css
/* Chat message textarea */
.chat-textarea {
  --textarea-bg: transparent;
  --textarea-border: 2px solid var(--color-border);
  --textarea-radius: var(--radius-lg);
  --textarea-padding-x: 1rem;
  --textarea-padding-y: 0.75rem;
}

/* Code editor textarea */
.code-textarea {
  --textarea-bg: #1e1e1e;
  --textarea-text: #d4d4d4;
  --textarea-text-placeholder: #6a6a6a;
  --textarea-border: 1px solid #3e3e3e;
  --textarea-border-focus: 1px solid #007acc;
  --textarea-radius: var(--radius-sm);
  font-family: 'Fira Code', 'Consolas', monospace;
}

/* Minimal textarea */
.minimal-textarea {
  --textarea-bg: transparent;
  --textarea-border: none;
  --textarea-border-focus: none;
  --textarea-shadow-focus: none;
  --textarea-padding-x: 0;
  --textarea-padding-y: 0;
}
```

### 2. State-Specific Overrides

```css
/* Custom focus state */
.textarea-focus-glow:focus-within {
  --textarea-shadow-focus: 0 0 20px rgb(59 130 246 / 0.3);
}

/* Custom error state */
.textarea-error-shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const textareaTheme = {
  primary: {
    '--textarea-border': '#3b82f6',
    '--textarea-border-focus': '#2563eb',
    '--textarea-shadow-focus': '0 0 0 3px rgb(59 130 246 / 0.1)'
  },
  secondary: {
    '--textarea-border': '#6b7280',
    '--textarea-border-focus': '#4b5563',
    '--textarea-shadow-focus': '0 0 0 3px rgb(107 114 128 / 0.1)'
  }
};

// Usage in Svelte component
let theme = 'primary';
$: textareaStyles = Object.entries(textareaTheme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<TextArea 
  label="Dynamic Theme" 
  styling={{ wrapperStyle: textareaStyles }}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive textarea sizing */
:root {
  --textarea-padding-x-responsive: 0.5rem;
  --textarea-padding-y-responsive: 0.375rem;
  --textarea-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
  :root {
    --textarea-padding-x-responsive: 0.75rem;
    --textarea-padding-y-responsive: 0.5rem;
    --textarea-font-size-responsive: 1rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --textarea-padding-x-responsive: 1rem;
    --textarea-padding-y-responsive: 0.625rem;
    --textarea-font-size-responsive: 1rem;
  }
}

.textarea-responsive {
  --textarea-padding-x: var(--textarea-padding-x-responsive);
  --textarea-padding-y: var(--textarea-padding-y-responsive);
  --textarea-font-size: var(--textarea-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.textarea-smooth {
  --textarea-transition-duration: 0.3s;
  --textarea-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.textarea-bouncy {
  --textarea-transition-duration: 0.5s;
  --textarea-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.textarea-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
}

.textarea-glow:focus-within {
  box-shadow: 0 0 0 1px var(--textarea-border-focus), 
              0 0 20px rgb(59 130 246 / 0.2);
}

/* Auto-resize animation */
.textarea-smooth-resize {
  transition: height 0.2s ease-out;
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to textarea properties */
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
  
  /* TextArea Mappings */
  --textarea-border-focus: var(--ds-color-primary-500);
  --textarea-padding-x-md: var(--ds-space-3);
  --textarea-padding-y-md: var(--ds-space-2);
  --textarea-radius: var(--ds-radius-md);
  --textarea-font-size-md: var(--ds-text-base);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.textarea-tailwind {
  @apply w-full rounded-md border-gray-300 shadow-sm;
  --textarea-border: theme('colors.gray.300');
  --textarea-border-focus: theme('colors.blue.500');
  --textarea-text: theme('colors.gray.900');
  --textarea-radius: theme('borderRadius.md');
  --textarea-padding-x: theme('spacing.3');
  --textarea-padding-y: theme('spacing.2');
}

/* Bootstrap Integration */
.textarea-bootstrap {
  --textarea-border: var(--bs-border-color);
  --textarea-border-focus: var(--bs-primary);
  --textarea-text: var(--bs-body-color);
  --textarea-radius: var(--bs-border-radius);
  --textarea-padding-x: var(--bs-input-padding-x);
  --textarea-padding-y: var(--bs-input-padding-y);
}

/* Material Design Integration */
.textarea-material {
  --textarea-bg: transparent;
  --textarea-border: none;
  --textarea-border-focus: none;
  --textarea-text: var(--md-sys-color-on-surface);
  border-bottom: 1px solid var(--md-sys-color-outline);
  border-radius: 4px 4px 0 0;
}

.textarea-material:focus-within {
  border-bottom: 2px solid var(--md-sys-color-primary);
}
```

## Variant-Specific Styling

### 1. Default Variant Customization

```css
.textarea--default {
  --textarea-bg: var(--color-surface);
  --textarea-border: 1px solid var(--color-border);
  --textarea-border-focus: 1px solid var(--color-primary);
}
```

### 2. Filled Variant Customization

```css
.textarea--filled {
  --textarea-bg: var(--color-surface-secondary);
  --textarea-border: 1px solid transparent;
  --textarea-border-focus: 1px solid var(--color-primary);
}

.textarea--filled:focus-within {
  --textarea-bg: var(--color-surface);
}
```

### 3. Outlined Variant Customization

```css
.textarea--outlined {
  --textarea-bg: transparent;
  --textarea-border: 2px solid var(--color-border);
  --textarea-border-focus: 2px solid var(--color-primary);
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
  --color-error: #ef4444;
  
  /* TextArea defaults */
  --textarea-border-focus: var(--color-primary);
  --textarea-shadow-focus: 0 0 0 3px rgb(59 130 246 / 0.1);
  --textarea-radius: 0.375rem;
  --textarea-font-weight: 400;
}

/* Semantic variants */
.textarea-primary { --textarea-border-focus: var(--color-primary); }
.textarea-success { --textarea-border-focus: var(--color-success); }
.textarea-warning { --textarea-border-focus: var(--color-warning); }
.textarea-error { --textarea-border-focus: var(--color-error); }

/* Dark theme */
[data-theme="dark"] {
  --textarea-bg: #1f2937;
  --textarea-border: #374151;
  --textarea-text: #f9fafb;
  --textarea-text-placeholder: #9ca3af;
}

/* Custom textarea for specific use cases */
.comment-textarea {
  --textarea-bg: #f8fafc;
  --textarea-border: 1px solid #e2e8f0;
  --textarea-radius: 0.5rem;
  --textarea-padding-x: 1rem;
  --textarea-padding-y: 0.75rem;
}

.code-textarea {
  --textarea-bg: #0d1117;
  --textarea-text: #c9d1d9;
  --textarea-border: 1px solid #30363d;
  --textarea-radius: 0.375rem;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}
```

```svelte
<!-- Usage in components -->
<TextArea 
  label="Primary Action" 
  styling={{ wrapperClass: "textarea-primary" }} 
/>

<TextArea 
  label="Code Input" 
  styling={{ wrapperClass: "code-textarea" }}
  placeholder="Enter your code here..."
/>

<TextArea 
  label="Comment" 
  styling={{ wrapperClass: "comment-textarea" }}
  layout={{ autoResize: true, maxHeight: 200 }}
/>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
