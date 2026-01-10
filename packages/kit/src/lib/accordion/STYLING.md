# Accordion Component - Global Styling Guide

This guide covers how to customize the Accordion component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Accordion component uses an extensive system of CSS custom properties that allow you to:
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
  --color-danger: #ef4444;
  
  --color-surface: #ffffff;
  --color-surface-hover: #f9fafb;
  --color-on-surface: #111827;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-border: #d1d5db;
  
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
}
```

### 2. Accordion-Specific Global Styles

Override Accordion component defaults globally:

```css
:root {
  /* === DEFAULT VARIANT === */
  --accordion-bg: transparent;
  --accordion-bg-hover: var(--color-surface-hover, #f9fafb);
  --accordion-text: var(--color-text, #111827);
  --accordion-text-hover: var(--color-primary, #3b82f6);
  --accordion-text-subtitle: var(--color-text-muted, #6b7280);
  --accordion-border-color: var(--color-border, #d1d5db);
  --accordion-icon-color: var(--color-text, #111827);
  --accordion-icon-color-hover: var(--color-primary, #3b82f6);
  
  /* === FILLED VARIANT === */
  /* Note: Uses --accordion-bg and --accordion-bg-hover */
  
  /* === OUTLINED VARIANT === */
  /* Note: Uses --accordion-border-color and --accordion-border-width */
  
  /* === SIZES === */
  /* Small */
  --accordion-padding-x-sm: 0.5rem;
  --accordion-padding-y-sm: 0.25rem;
  --accordion-font-size-sm: 0.875rem;
  
  /* Medium */
  --accordion-padding-x-md: 0.5rem;
  --accordion-padding-y-md: 0.5rem;
  --accordion-font-size-md: 1rem;
  
  /* Large */
  --accordion-padding-x-lg: 0.75rem;
  --accordion-padding-y-lg: 0.75rem;
  --accordion-font-size-lg: 1.125rem;
  
  /* === TYPOGRAPHY === */
  --accordion-font-weight: 400;
  --accordion-font-weight-bold: 500;
  --accordion-line-height: 1.5;
  
  /* === TRANSITIONS === */
  --accordion-transition-duration: 300ms;
  --accordion-transition-easing: ease;
  
  /* === BORDER === */
  --accordion-border-width: 1px;
  --accordion-border-color: var(--color-border, #d1d5db);
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-hover: #374151;
  --color-on-surface: #f9fafb;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
  --color-border: #4b5563;
  
  /* Dark theme accordion overrides */
  --accordion-bg: transparent;
  --accordion-bg-hover: rgba(55, 65, 81, 0.5);
  --accordion-text: var(--color-text);
  --accordion-text-hover: var(--color-primary);
  --accordion-text-subtitle: var(--color-text-muted);
  --accordion-border-color: var(--color-border);
  --accordion-icon-color: var(--color-text);
  --accordion-icon-color-hover: var(--color-primary);
}
```

Usage in Svelte:
```svelte
<div data-theme="dark">
  <Accordion content={{ title: "Dark Theme Accordion", content: "<p>Content</p>" }} />
</div>
```

### 2. Brand Color Variants

Create semantic accordion variants:

```css
/* Primary accordion */
.accordion-primary {
  --accordion-text: var(--color-primary);
  --accordion-text-hover: var(--color-primary-hover);
  --accordion-icon-color: var(--color-primary);
  --accordion-icon-color-hover: var(--color-primary-hover);
}

/* Success accordion */
.accordion-success {
  --accordion-text: var(--color-success);
  --accordion-text-hover: #059669;
  --accordion-icon-color: var(--color-success);
  --accordion-icon-color-hover: #059669;
}

/* Warning accordion */
.accordion-warning {
  --accordion-text: var(--color-warning);
  --accordion-text-hover: #d97706;
  --accordion-icon-color: var(--color-warning);
  --accordion-icon-color-hover: #d97706;
}

/* Danger accordion */
.accordion-danger {
  --accordion-text: var(--color-danger);
  --accordion-text-hover: #dc2626;
  --accordion-icon-color: var(--color-danger);
  --accordion-icon-color-hover: #dc2626;
}
```

Usage in Svelte:
```svelte
<Accordion 
  styling={{ className: "accordion-primary" }}
  content={{ title: "Primary", content: "<p>Content</p>" }}
/>
<Accordion 
  styling={{ className: "accordion-success" }}
  content={{ title: "Success", content: "<p>Content</p>" }}
/>
<Accordion 
  styling={{ className: "accordion-warning" }}
  content={{ title: "Warning", content: "<p>Content</p>" }}
/>
<Accordion 
  styling={{ className: "accordion-danger" }}
  content={{ title: "Danger", content: "<p>Content</p>" }}
/>
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.accordion-compact {
  --accordion-padding-x: 0.375rem;
  --accordion-padding-y: 0.125rem;
  --accordion-font-size: 0.8125rem;
}

/* Hero size */
.accordion-hero {
  --accordion-padding-x: 1rem;
  --accordion-padding-y: 1rem;
  --accordion-font-size: 1.25rem;
  --accordion-font-weight: var(--font-weight-semibold);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific accordion instances:

```css
/* Specific accordion styling */
.faq-accordion {
  --accordion-bg: var(--color-surface);
  --accordion-bg-hover: var(--color-surface-hover);
  --accordion-padding-x: 1rem;
}

.sidebar-accordion {
  --accordion-bg: transparent;
  --accordion-bg-hover: rgba(59, 130, 246, 0.1);
  --accordion-text: var(--color-on-surface);
  --accordion-text-hover: var(--color-primary);
}
```

### 2. State-Specific Overrides

```css
/* Custom expanded state */
.accordion-expanded-custom {
  --accordion-bg: rgba(59, 130, 246, 0.05);
  --accordion-border-color: var(--color-primary);
  --accordion-text: var(--color-primary);
  --accordion-text-hover: var(--color-primary);
}

/* Custom disabled state */
.accordion-disabled-custom {
  --accordion-opacity: 0.4;
  --accordion-cursor: not-allowed;
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const accordionTheme = {
  primary: {
    '--accordion-text': '#3b82f6',
    '--accordion-text-hover': '#2563eb',
    '--accordion-icon-color': '#3b82f6',
    '--accordion-icon-color-hover': '#2563eb'
  },
  secondary: {
    '--accordion-text': '#6b7280',
    '--accordion-text-hover': '#4b5563',
    '--accordion-icon-color': '#6b7280',
    '--accordion-icon-color-hover': '#4b5563'
  }
};

// Usage in Svelte component
let theme = 'primary';
$: accordionStyles = Object.entries(accordionTheme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<Accordion 
  styling={{ wrapperStyle: accordionStyles }}
  content={{ title: "Dynamic Theme", content: "<p>Content</p>" }}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive accordion sizing */
:root {
  --accordion-padding-x-responsive: 0.5rem;
  --accordion-padding-y-responsive: 0.25rem;
  --accordion-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
  :root {
    --accordion-padding-x-responsive: 0.75rem;
    --accordion-padding-y-responsive: 0.5rem;
    --accordion-font-size-responsive: 1rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --accordion-padding-x-responsive: 1rem;
    --accordion-padding-y-responsive: 0.75rem;
    --accordion-font-size-responsive: 1.125rem;
  }
}

.accordion-responsive {
  --accordion-padding-x: var(--accordion-padding-x-responsive);
  --accordion-padding-y: var(--accordion-padding-y-responsive);
  --accordion-font-size: var(--accordion-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.accordion-smooth {
  --accordion-transition-duration: 500ms;
  --accordion-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-fast {
  --accordion-transition-duration: 150ms;
  --accordion-transition-easing: ease-out;
}

.accordion-bouncy {
  --accordion-transition-duration: 400ms;
  --accordion-transition-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.accordion-lift:hover .accordion__header {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.accordion-glow:hover .accordion__header {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to accordion properties */
:root {
  /* Design System Tokens */
  --ds-color-primary-500: #3b82f6;
  --ds-color-primary-600: #2563eb;
  --ds-space-2: 0.5rem;
  --ds-space-3: 0.75rem;
  --ds-space-4: 1rem;
  --ds-text-sm: 0.875rem;
  --ds-text-base: 1rem;
  
  /* Accordion Mappings */
  --accordion-text-hover: var(--ds-color-primary-500);
  --accordion-icon-color-hover: var(--ds-color-primary-600);
  --accordion-padding-x-md: var(--ds-space-2);
  --accordion-padding-y-md: var(--ds-space-2);
  --accordion-font-size-md: var(--ds-text-base);
  --accordion-font-size-sm: var(--ds-text-sm);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.accordion-tailwind {
  --accordion-text: theme('colors.gray.900');
  --accordion-text-hover: theme('colors.blue.600');
  --accordion-padding-x: theme('spacing.4');
  --accordion-padding-y: theme('spacing.2');
}

/* Bootstrap Integration */
.accordion-bootstrap {
  --accordion-text: var(--bs-body-color);
  --accordion-text-hover: var(--bs-primary);
  --accordion-padding-x: var(--bs-gutter-x);
  --accordion-padding-y: var(--bs-gutter-y);
}
```

## Available CSS Custom Properties

### Layout Properties

| Property | Default | Description |
|---------|---------|-------------|
| `--accordion-display` | `flex` | Display type |
| `--accordion-flex-direction` | `column` | Flex direction |
| `--accordion-align-items` | `center` | Align items |
| `--accordion-justify-content` | `center` | Justify content |
| `--accordion-width` | `100%` | Component width |

### Spacing Properties

| Property | Default | Description |
|---------|---------|-------------|
| `--accordion-padding-x-sm` | `0.5rem` | Horizontal padding (small) |
| `--accordion-padding-x-md` | `0.5rem` | Horizontal padding (medium) |
| `--accordion-padding-x-lg` | `0.75rem` | Horizontal padding (large) |
| `--accordion-padding-y-sm` | `0.25rem` | Vertical padding (small) |
| `--accordion-padding-y-md` | `0.5rem` | Vertical padding (medium) |
| `--accordion-padding-y-lg` | `0.75rem` | Vertical padding (large) |
| `--accordion-padding-x` | *computed* | Computed horizontal padding (set by size variant, can be overridden) |
| `--accordion-padding-y` | *computed* | Computed vertical padding (set by size variant, can be overridden) |
| `--accordion-gap` | `0` | Gap between elements |

### Typography Properties

| Property | Default | Description |
|---------|---------|-------------|
| `--accordion-font-size-sm` | `0.875rem` | Font size (small) |
| `--accordion-font-size-md` | `1rem` | Font size (medium) |
| `--accordion-font-size-lg` | `1.125rem` | Font size (large) |
| `--accordion-font-size` | *computed* | Computed font size (set by size variant, can be overridden) |
| `--accordion-font-weight` | `400` | Font weight (normal) |
| `--accordion-font-weight-bold` | `500` | Font weight (bold, used when expanded) |
| `--accordion-line-height` | `1.5` | Line height |

### Color Properties

| Property | Default | Description |
|---------|---------|-------------|
| `--accordion-bg` | `transparent` | Background color |
| `--accordion-bg-hover` | `var(--color-surface-hover, #f9fafb)` | Background hover color |
| `--accordion-text` | `var(--color-text, #111827)` | Text color |
| `--accordion-text-hover` | `var(--color-primary, #3b82f6)` | Text hover color |
| `--accordion-text-subtitle` | `var(--color-text-muted, #6b7280)` | Subtitle text color |
| `--accordion-border-color` | `var(--color-border, #d1d5db)` | Border color (used for underline) |
| `--accordion-icon-color` | `var(--color-text, #111827)` | Icon color |
| `--accordion-icon-color-hover` | `var(--color-primary, #3b82f6)` | Icon hover color |
| `--accordion-bg` | `transparent` | Background color (used in filled variant) |
| `--accordion-bg-hover` | `var(--color-surface-hover, #f3f4f6)` | Background hover color (used in filled variant) |

### Transition Properties

| Property | Default | Description |
|---------|---------|-------------|
| `--accordion-transition-duration` | `300ms` | Transition duration |
| `--accordion-transition-easing` | `ease` | Transition easing function |

### Border Properties

| Property | Default | Description |
|---------|---------|-------------|
| `--accordion-border-width` | `1px` | Border width (used for underline) |
| `--accordion-border-color` | `var(--color-border, #d1d5db)` | Border color (used for underline) |

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
  
  /* Accordion defaults */
  --accordion-text-hover: var(--color-primary);
  --accordion-icon-color-hover: var(--color-primary);
  --accordion-font-weight: 400;
}

/* Semantic variants */
.accordion-primary { --accordion-text-hover: var(--color-primary); }
.accordion-success { --accordion-text-hover: var(--color-success); }
.accordion-warning { --accordion-text-hover: var(--color-warning); }
.accordion-danger { --accordion-text-hover: var(--color-danger); }

/* Dark theme */
[data-theme="dark"] {
  --accordion-bg-filled-hover: rgba(55, 65, 81, 0.5);
  --accordion-text: #f9fafb;
  --accordion-text-subtitle: #9ca3af;
}
```

```svelte
<!-- Usage in components -->
<Accordion 
  styling={{ className: "accordion-primary" }}
  content={{ title: "Primary Accordion", content: "<p>Content</p>" }}
/>
<Accordion 
  styling={{ variant: "outlined", className: "accordion-danger" }}
  content={{ title: "Danger Accordion", content: "<p>Content</p>" }}
/>
<Accordion 
  styling={{ className: "accordion-success" }}
  content={{ title: "Success Accordion", content: "<p>Content</p>" }}
/>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.

