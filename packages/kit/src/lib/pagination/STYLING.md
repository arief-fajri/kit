# Pagination Component - Global Styling Guide

This guide covers how to customize the Pagination component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Pagination component uses an extensive system of CSS custom properties that allow you to:
- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, typography, and button styles
- Override styles at different specificity levels

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
  /* Color Palette */
  --color-primary: #3b82f6;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-text: #ffffff;
  
  --color-surface: #ffffff;
  --color-surface-hover: #f3f4f6;
  --color-surface-active: #e5e7eb;
  --color-text: #374151;
  --color-text-muted: #9ca3af;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
  
  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-medium: 500;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.375rem;
  --spacing-md: 0.5rem;
  --spacing-lg: 0.75rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

### 2. Pagination-Specific Global Styles

Override Pagination component defaults globally:

```css
:root {
  /* === LAYOUT === */
  --pagination-display: flex;
  --pagination-flex-direction: column;
  --pagination-gap-default: 0.25rem;
  --pagination-align-items: center;
  --pagination-justify-content: center;
  --pagination-width: 100%;
  
  /* === COLORS - BACKGROUND === */
  --pagination-bg-default: var(--color-surface, #ffffff);
  --pagination-bg-hover-default: var(--color-surface-hover, #f3f4f6);
  --pagination-bg-active-default: var(--color-surface-active, #e5e7eb);
  
  /* === COLORS - TEXT === */
  --pagination-text-default: var(--color-text, #374151);
  --pagination-text-hover-default: var(--color-text, #111827);
  --pagination-text-disabled-default: var(--color-text-muted, #9ca3af);
  
  /* === COLORS - ACTIVE STATE === */
  --pagination-active-bg-default: var(--color-primary-500, #3b82f6);
  --pagination-active-text-default: var(--color-primary-text, #ffffff);
  --pagination-active-bg-hover-default: var(--color-primary-600, #2563eb);
  
  /* === COLORS - BORDER === */
  --pagination-border-default: var(--color-border, #e5e7eb);
  --pagination-border-hover-default: var(--color-border, #d1d5db);
  --pagination-border-active-default: var(--color-primary-500, #3b82f6);
  
  /* === SPACING === */
  --pagination-padding-x-sm: 0.375rem;
  --pagination-padding-y-sm: 0.375rem;
  --pagination-padding-x-md: 0.5rem;
  --pagination-padding-y-md: 0.5rem;
  --pagination-padding-x-lg: 0.75rem;
  --pagination-padding-y-lg: 0.75rem;
  --pagination-container-gap: var(--pagination-gap-default, 0.25rem);
  --pagination-pages-gap: var(--pagination-gap-default, 0.25rem);
  
  /* === BUTTON SIZES === */
  --pagination-button-size-sm: 1.5rem;
  --pagination-button-size-md: 1.75rem;
  --pagination-button-size-lg: 2rem;
  --pagination-button-min-width: var(--pagination-button-size-md, 1.75rem);
  --pagination-button-padding-x: var(--pagination-padding-x-md, 0.5rem);
  
  /* === BORDER & RADIUS === */
  --pagination-border-radius-sm: 0.25rem;
  --pagination-border-radius-md: 0.375rem;
  --pagination-border-radius-lg: 0.5rem;
  --pagination-border-width: 1px;
  --pagination-border-style: solid;
  
  /* === TYPOGRAPHY === */
  --pagination-font-size-sm: 0.75rem;
  --pagination-font-size-md: 0.875rem;
  --pagination-font-size-lg: 1rem;
  --pagination-font-weight: 500;
  --pagination-line-height: 1.5;
  --pagination-font-family: inherit;
  
  /* === TRANSITIONS === */
  --pagination-transition-duration: 150ms;
  --pagination-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --pagination-transition-property: background-color, color, border-color, transform, opacity;
  
  /* === ICON SIZES === */
  --pagination-icon-size-sm: 0.875rem;
  --pagination-icon-size-md: 1rem;
  --pagination-icon-size-lg: 1.125rem;
  --pagination-icon-stroke-width: 2;
  
  /* === FOCUS & OUTLINE === */
  --pagination-focus-outline-width: 2px;
  --pagination-focus-outline-offset: 2px;
  --pagination-focus-outline-color: var(--pagination-active-bg);
  
  /* === SHADOW === */
  --pagination-shadow: none;
  --pagination-shadow-hover: none;
  --pagination-shadow-active: none;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --color-surface: #1f2937;
  --color-surface-hover: #374151;
  --color-surface-active: #4b5563;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
  --color-text-secondary: #6b7280;
  --color-border: #374151;
  
  /* Dark theme pagination overrides */
  --pagination-bg-default: #1f2937;
  --pagination-bg-hover-default: #374151;
  --pagination-bg-active-default: #4b5563;
  --pagination-text-default: #f9fafb;
  --pagination-text-hover-default: #ffffff;
  --pagination-text-disabled-default: #6b7280;
  --pagination-border-default: #374151;
  --pagination-border-hover-default: #4b5563;
}
```

### 2. Brand Color Variants

Create semantic pagination variants:

```css
/* Primary pagination */
.pagination-primary {
  --pagination-active-bg: var(--color-primary);
  --pagination-active-text: #ffffff;
  --pagination-active-bg-hover: var(--color-primary-hover);
  --pagination-border-active: var(--color-primary);
  --pagination-focus-outline-color: var(--color-primary);
}

/* Success pagination */
.pagination-success {
  --pagination-active-bg: #10b981;
  --pagination-active-text: #ffffff;
  --pagination-active-bg-hover: #059669;
  --pagination-border-active: #10b981;
  --pagination-focus-outline-color: #10b981;
}

/* Minimal pagination */
.pagination-minimal {
  --pagination-border-width: 0;
  --pagination-bg: transparent;
  --pagination-bg-hover: var(--color-surface-hover);
  --pagination-shadow: none;
  --pagination-shadow-hover: none;
}
```

Usage in Svelte:

```svelte
<Pagination 
  bind:currentOffset
  {limit}
  {totalRows}
  class="pagination-primary"
/>
```

### 3. Size Variants

Customize size-specific properties:

```css
/* Compact pagination */
.pagination-compact {
  --pagination-button-size: 1.25rem;
  --pagination-font-size: 0.625rem;
  --pagination-padding-x: 0.25rem;
  --pagination-padding-y: 0.25rem;
  --pagination-border-radius: 0.125rem;
  --pagination-gap: 0.125rem;
}

/* Large pagination */
.pagination-large {
  --pagination-button-size: 2.5rem;
  --pagination-font-size: 1.125rem;
  --pagination-padding-x: 1rem;
  --pagination-padding-y: 1rem;
  --pagination-border-radius: 0.75rem;
  --pagination-gap: 0.5rem;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific pagination instances:

```css
/* Table pagination */
.table-pagination {
  --pagination-bg: transparent;
  --pagination-border-width: 0;
  --pagination-gap: 0.5rem;
  --pagination-button-size: 2rem;
}

/* Dashboard pagination */
.dashboard-pagination {
  --pagination-active-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --pagination-border-radius: 0.75rem;
  --pagination-shadow-active: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Minimal pagination */
.minimal-pagination {
  --pagination-border-width: 0;
  --pagination-bg: transparent;
  --pagination-bg-hover: rgba(0, 0, 0, 0.05);
  --pagination-active-bg: rgba(59, 130, 246, 0.1);
  --pagination-active-text: var(--color-primary);
}
```

### 2. Interactive States

```css
/* Custom hover effects */
.pagination-lift .pagination__button:not(:disabled):hover {
  transform: translateY(-2px);
  --pagination-shadow-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.pagination-glow .pagination__button--active {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

/* Custom active effects */
.pagination-bounce .pagination__button:not(:disabled):active {
  transform: scale(0.9);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const paginationTheme = {
  primary: {
    '--pagination-active-bg': '#3b82f6',
    '--pagination-active-text': '#ffffff',
    '--pagination-focus-outline-color': '#3b82f6'
  },
  secondary: {
    '--pagination-active-bg': '#6b7280',
    '--pagination-active-text': '#ffffff',
    '--pagination-focus-outline-color': '#6b7280'
  }
};

// Usage in Svelte component
let theme = 'primary';
$: paginationStyles = Object.entries(paginationTheme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<Pagination 
  bind:currentOffset
  {limit}
  {totalRows}
  style={paginationStyles}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive pagination sizing */
:root {
  --pagination-button-size-responsive: 1.5rem;
  --pagination-font-size-responsive: 0.75rem;
  --pagination-padding-x-responsive: 0.375rem;
  --pagination-gap-responsive: 0.125rem;
}

@media (min-width: 640px) {
  :root {
    --pagination-button-size-responsive: 1.75rem;
    --pagination-font-size-responsive: 0.875rem;
    --pagination-padding-x-responsive: 0.5rem;
    --pagination-gap-responsive: 0.25rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --pagination-button-size-responsive: 2rem;
    --pagination-font-size-responsive: 1rem;
    --pagination-padding-x-responsive: 0.75rem;
    --pagination-gap-responsive: 0.5rem;
  }
}

.pagination-responsive {
  --pagination-button-size: var(--pagination-button-size-responsive);
  --pagination-font-size: var(--pagination-font-size-responsive);
  --pagination-button-padding-x: var(--pagination-padding-x-responsive);
  --pagination-container-gap: var(--pagination-gap-responsive);
  --pagination-pages-gap: var(--pagination-gap-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.pagination-smooth {
  --pagination-transition-duration: 250ms;
  --pagination-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.pagination-bouncy {
  --pagination-transition-duration: 300ms;
  --pagination-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom button animations */
.pagination-fade .pagination__button {
  transition: opacity var(--pagination-transition-duration) var(--pagination-transition-timing);
}

.pagination-fade .pagination__button:not(:disabled):hover {
  opacity: 0.8;
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to pagination properties */
:root {
  /* Design System Tokens */
  --ds-color-primary-500: #3b82f6;
  --ds-color-primary-600: #2563eb;
  --ds-color-surface-100: #ffffff;
  --ds-color-surface-200: #f9fafb;
  --ds-space-2: 0.5rem;
  --ds-space-3: 0.75rem;
  --ds-radius-md: 0.375rem;
  --ds-text-sm: 0.875rem;
  --ds-text-base: 1rem;
  
  /* Pagination Mappings */
  --pagination-active-bg-default: var(--ds-color-primary-500);
  --pagination-active-bg-hover-default: var(--ds-color-primary-600);
  --pagination-bg-default: var(--ds-color-surface-100);
  --pagination-bg-hover-default: var(--ds-color-surface-200);
  --pagination-padding-x-md: var(--ds-space-2);
  --pagination-border-radius-md: var(--ds-radius-md);
  --pagination-font-size-md: var(--ds-text-sm);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.pagination-tailwind {
  @apply flex items-center justify-center gap-2;
  --pagination-bg: theme('colors.white');
  --pagination-border-radius: theme('borderRadius.md');
  --pagination-active-bg: theme('colors.blue.500');
}

/* Bootstrap Integration */
.pagination-bootstrap {
  --pagination-bg: var(--bs-white);
  --pagination-border-radius: var(--bs-border-radius);
  --pagination-active-bg: var(--bs-primary);
  --pagination-padding-x: var(--bs-pagination-padding-x);
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
  --color-primary-600: #2563eb;
  --color-surface: #ffffff;
  --color-surface-hover: #f3f4f6;
  
  /* Pagination defaults */
  --pagination-active-bg-default: var(--color-primary);
  --pagination-active-bg-hover-default: var(--color-primary-600);
  --pagination-bg-default: var(--color-surface);
  --pagination-bg-hover-default: var(--color-surface-hover);
  --pagination-border-radius: 0.375rem;
}

/* Semantic variants */
.pagination-primary { 
  --pagination-active-bg: var(--color-primary);
  --pagination-active-text: #ffffff;
}
.pagination-minimal { 
  --pagination-border-width: 0;
  --pagination-bg: transparent;
}

/* Dark theme */
[data-theme="dark"] {
  --pagination-bg-default: #1f2937;
  --pagination-bg-hover-default: #374151;
  --pagination-text-default: #f9fafb;
}
```

```svelte
<!-- Usage in components -->
<Pagination 
  bind:currentOffset
  {limit}
  {totalRows}
  class="pagination-primary"
/>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
