# Tags Component - Global Styling Guide

This guide covers how to customize the Tags component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Tags component uses an extensive system of CSS custom properties that allow you to:

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
	--color-surface-hover: #f9fafb;
	--color-surface-disabled: #f9fafb;
	--color-on-surface: #111827;

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
	--shadow-error-focus: 0 0 0 3px rgb(239 68 68 / 0.1);
}
```

### 2. Tags-Specific Global Styles

Override Tags component defaults globally:

```css
:root {
	/* === CORE COLORS === */
	--tags-bg: var(--color-surface);
	--tags-border: var(--color-border);
	--tags-border-focus: var(--color-primary);
	--tags-border-error: var(--color-error);
	--tags-text: var(--color-text);
	--tags-text-placeholder: var(--color-text-muted);
	--tags-label: var(--color-text-secondary);
	--tags-error-text: var(--color-error);

	/* === LAYOUT & SPACING === */
	--tags-radius: var(--radius-md);
	--tags-shadow-focus: var(--shadow-focus);

	/* === TAG STYLES === */
	--tags-tag-bg: rgba(59, 130, 246, 0.1);
	--tags-tag-bg-hover: rgba(59, 130, 246, 0.15);
	--tags-tag-text: var(--color-primary);
	--tags-tag-radius: var(--radius-sm);
	--tags-tag-padding-x: 0.5rem;
	--tags-tag-padding-y: 0.25rem;
	--tags-tag-gap: 0.3125rem;

	/* === DROPDOWN === */
	--tags-dropdown-bg: var(--color-surface);
	--tags-dropdown-border: var(--color-border);
	--tags-dropdown-item-hover: rgba(59, 130, 246, 0.1);
	--tags-dropdown-max-height: 240px;

	/* === STATES === */
	--tags-disabled-opacity: 0.5;
	--tags-disabled-bg: var(--color-surface-disabled);
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	/* === GLOBAL COLORS === */
	--color-surface: #1f2937;
	--color-surface-secondary: #374151;
	--color-surface-hover: #374151;
	--color-surface-disabled: #374151;
	--color-on-surface: #f9fafb;
	--color-border: #4b5563;
	--color-text: #f9fafb;
	--color-text-secondary: #d1d5db;
	--color-text-muted: #9ca3af;

	/* === TAGS DARK THEME === */
	--tags-bg: var(--color-surface);
	--tags-border: var(--color-border);
	--tags-text: var(--color-text);
	--tags-text-placeholder: var(--color-text-muted);
	--tags-label: var(--color-text-secondary);
	--tags-disabled-bg: var(--color-surface-disabled);
	--tags-tag-bg: rgba(59, 130, 246, 0.15);
	--tags-tag-bg-hover: rgba(59, 130, 246, 0.2);
	--tags-tag-text: #60a5fa;
	--tags-dropdown-bg: var(--color-surface);
	--tags-dropdown-border: var(--color-border);
	--tags-dropdown-item-hover: rgba(59, 130, 246, 0.15);
}
```

Usage in Svelte:

```svelte
<div data-theme="dark">
	<Tags bind:tags placeholder="Add tags..." />
</div>
```

### 2. Brand Color Variants

Create semantic tag variants:

```css
/* Success tags */
.tags-success {
	--tags-tag-bg: rgba(16, 185, 129, 0.1);
	--tags-tag-bg-hover: rgba(16, 185, 129, 0.15);
	--tags-tag-text: var(--color-success);
	--tags-border-focus: var(--color-success);
}

/* Warning tags */
.tags-warning {
	--tags-tag-bg: rgba(245, 158, 11, 0.1);
	--tags-tag-bg-hover: rgba(245, 158, 11, 0.15);
	--tags-tag-text: var(--color-warning);
	--tags-border-focus: var(--color-warning);
}

/* Error tags */
.tags-error {
	--tags-tag-bg: rgba(239, 68, 68, 0.1);
	--tags-tag-bg-hover: rgba(239, 68, 68, 0.15);
	--tags-tag-text: var(--color-error);
	--tags-border-focus: var(--color-error);
}
```

Usage in Svelte:

```svelte
<Tags bind:tags wrapperClass="tags-success" placeholder="Success tags..." />
<Tags bind:tags wrapperClass="tags-warning" placeholder="Warning tags..." />
<Tags bind:tags wrapperClass="tags-error" placeholder="Error tags..." />
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific Tags instances:

```css
/* Compact tags */
.tags-compact {
	--tags-tag-padding-x: 0.375rem;
	--tags-tag-padding-y: 0.125rem;
	--tags-tag-gap: 0.25rem;
	--tags-tag-radius: var(--radius-sm);
}

/* Large tags */
.tags-large {
	--tags-tag-padding-x: 0.75rem;
	--tags-tag-padding-y: 0.5rem;
	--tags-tag-gap: 0.5rem;
	--tags-tag-radius: var(--radius-md);
	--tags-tag-font-size: 1rem;
}
```

### 2. Custom Tag Colors

```css
/* Custom color scheme */
.tags-custom {
	--tags-tag-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--tags-tag-text: #ffffff;
	--tags-tag-bg-hover: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
	--tags-border-focus: #667eea;
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const tagsTheme = {
	primary: {
		'--tags-tag-bg': 'rgba(59, 130, 246, 0.1)',
		'--tags-tag-text': '#3b82f6',
		'--tags-border-focus': '#3b82f6'
	},
	success: {
		'--tags-tag-bg': 'rgba(16, 185, 129, 0.1)',
		'--tags-tag-text': '#10b981',
		'--tags-border-focus': '#10b981'
	}
};

// Usage in Svelte component
let theme = 'primary';
$: tagsStyles = Object.entries(tagsTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<Tags bind:tags style={tagsStyles} placeholder="Dynamic theme..." />
```

### 2. Responsive Theming

```css
/* Mobile-first responsive tag sizing */
:root {
	--tags-tag-padding-x-responsive: 0.375rem;
	--tags-tag-padding-y-responsive: 0.125rem;
	--tags-tag-gap-responsive: 0.25rem;
}

@media (min-width: 640px) {
	:root {
		--tags-tag-padding-x-responsive: 0.5rem;
		--tags-tag-padding-y-responsive: 0.25rem;
		--tags-tag-gap-responsive: 0.3125rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--tags-tag-padding-x-responsive: 0.75rem;
		--tags-tag-padding-y-responsive: 0.375rem;
		--tags-tag-gap-responsive: 0.5rem;
	}
}

.tags-responsive {
	--tags-tag-padding-x: var(--tags-tag-padding-x-responsive);
	--tags-tag-padding-y: var(--tags-tag-padding-y-responsive);
	--tags-tag-gap: var(--tags-tag-gap-responsive);
}
```

### 3. Animation Customization

```css
/* Smooth transitions */
.tags-smooth {
	--tags-transition-duration: 0.3s;
	--tags-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom hover effects */
.tags-lift .tags__tag:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.tags-glow .tags__tag:hover {
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to Tags properties */
:root {
	/* Design System Tokens */
	--ds-color-primary-500: #3b82f6;
	--ds-color-primary-600: #2563eb;
	--ds-space-2: 0.5rem;
	--ds-space-3: 0.75rem;
	--ds-radius-md: 0.375rem;

	/* Tags Mappings */
	--tags-tag-bg: rgba(var(--ds-color-primary-500-rgb), 0.1);
	--tags-tag-text: var(--ds-color-primary-500);
	--tags-tag-padding-x: var(--ds-space-2);
	--tags-tag-padding-y: var(--ds-space-1);
	--tags-tag-radius: var(--ds-radius-md);
}
```

### 2. Component Library Integration

```css
/* Tailwind CSS Integration */
.tags-tailwind {
	--tags-tag-bg: theme('colors.blue.100');
	--tags-tag-text: theme('colors.blue.600');
	--tags-border-focus: theme('colors.blue.500');
	--tags-tag-radius: theme('borderRadius.md');
	--tags-tag-padding-x: theme('spacing.2');
	--tags-tag-padding-y: theme('spacing.1');
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
	--color-error: #ef4444;

	/* Tags defaults */
	--tags-bg: var(--color-surface);
	--tags-border: var(--color-border);
	--tags-border-focus: var(--color-primary);
	--tags-tag-bg: rgba(59, 130, 246, 0.1);
	--tags-tag-text: var(--color-primary);
	--tags-tag-radius: var(--radius-sm);
}

/* Semantic variants */
.tags-primary {
	--tags-tag-bg: rgba(59, 130, 246, 0.1);
	--tags-tag-text: var(--color-primary);
}
.tags-success {
	--tags-tag-bg: rgba(16, 185, 129, 0.1);
	--tags-tag-text: var(--color-success);
}
.tags-error {
	--tags-tag-bg: rgba(239, 68, 68, 0.1);
	--tags-tag-text: var(--color-error);
}

/* Dark theme */
[data-theme='dark'] {
	--tags-bg: var(--color-surface);
	--tags-border: var(--color-border);
	--tags-tag-bg: rgba(59, 130, 246, 0.15);
	--tags-tag-text: #60a5fa;
}
```

```svelte
<!-- Usage in components -->
<Tags bind:tags wrapperClass="tags-primary" placeholder="Primary tags..." />
<Tags bind:tags wrapperClass="tags-success" placeholder="Success tags..." />
<Tags bind:tags wrapperClass="tags-error" placeholder="Error tags..." />
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
