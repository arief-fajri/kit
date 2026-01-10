# Checkbox Component - Global Styling Guide

This guide covers how to customize the Checkbox component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Checkbox component uses an extensive system of CSS custom properties that allow you to:

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
	--radius-sm: 0.125rem;
	--radius-md: 0.25rem;
	--radius-lg: 0.5rem;
	--radius-full: 9999px;
}
```

### 2. Checkbox-Specific Global Styles

Override Checkbox component defaults globally:

```css
:root {
	/* === CORE PROPERTIES === */
	--checkbox-size: 1.25rem;
	--checkbox-border-width: 2px;
	--checkbox-border-color: currentColor;
	--checkbox-border-radius: var(--radius-md);
	--checkbox-background: transparent;
	--checkbox-checkmark-color: currentColor;
	--checkbox-disabled-opacity: 0.5;
	--checkbox-focus-ring-color: var(--color-primary);
	--checkbox-transition: all 0.2s ease-in-out;
	--checkbox-gap: var(--spacing-sm);

	/* === DEFAULT VARIANT === */
	--checkbox-bg-default: transparent;
	--checkbox-bg-default-hover: var(--color-surface-hover);
	--checkbox-border-default: var(--color-secondary);
	--checkbox-border-default-hover: var(--color-primary);
	--checkbox-text-default: var(--color-on-surface);

	/* === PRIMARY VARIANT === */
	--checkbox-bg-primary: transparent;
	--checkbox-bg-primary-hover: rgba(59, 130, 246, 0.1);
	--checkbox-border-primary: var(--color-primary);
	--checkbox-border-primary-hover: var(--color-primary-hover);
	--checkbox-text-primary: var(--color-primary);
	--checkbox-checkmark-primary: var(--color-primary);

	/* === SUCCESS VARIANT === */
	--checkbox-bg-success: transparent;
	--checkbox-bg-success-hover: rgba(16, 185, 129, 0.1);
	--checkbox-border-success: var(--color-success);
	--checkbox-border-success-hover: #059669;
	--checkbox-text-success: var(--color-success);
	--checkbox-checkmark-success: var(--color-success);

	/* === ERROR VARIANT === */
	--checkbox-bg-error: transparent;
	--checkbox-bg-error-hover: rgba(239, 68, 68, 0.1);
	--checkbox-border-error: var(--color-danger);
	--checkbox-border-error-hover: #dc2626;
	--checkbox-text-error: var(--color-danger);
	--checkbox-checkmark-error: var(--color-danger);

	/* === SIZES === */
	/* Note: Size is controlled via inline style `--checkbox-size` prop.
     The following are optional size-specific overrides you can define: */
	/* Extra Small */
	--checkbox-size-xs: 0.75rem;
	--checkbox-gap-xs: 0.25rem;
	--checkbox-font-size-xs: 0.75rem;

	/* Small */
	--checkbox-size-sm: 1rem;
	--checkbox-gap-sm: 0.375rem;
	--checkbox-font-size-sm: 0.875rem;

	/* Medium */
	--checkbox-size-md: 1.25rem;
	--checkbox-gap-md: 0.5rem;
	--checkbox-font-size-md: 1rem;

	/* Large */
	--checkbox-size-lg: 1.5rem;
	--checkbox-gap-lg: 0.625rem;
	--checkbox-font-size-lg: 1.125rem;

	/* Extra Large */
	--checkbox-size-xl: 1.75rem;
	--checkbox-gap-xl: 0.75rem;
	--checkbox-font-size-xl: 1.25rem;

	/* === DISABLED STATE === */
	--checkbox-bg-disabled: #f3f4f6;
	--checkbox-text-disabled: #9ca3af;
	--checkbox-border-disabled: #d1d5db;

	/* === FOCUS === */
	--checkbox-focus-ring-width: 2px;
	--checkbox-focus-ring-offset: 2px;

	/* === TYPOGRAPHY === */
	--checkbox-font-family: var(--font-family-base);
	--checkbox-font-weight: var(--font-weight-medium);
	--checkbox-line-height: 1.5;

	/* === DESCRIPTION === */
	--checkbox-description-font-size: 0.875rem;
	--checkbox-description-color: #6b7280;
	--checkbox-description-margin-top: 0.25rem;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--color-surface: #1f2937;
	--color-surface-hover: #374151;
	--color-on-surface: #f9fafb;

	/* Dark theme checkbox overrides */
	--checkbox-border-default: #6b7280;
	--checkbox-text-default: var(--color-on-surface);
	--checkbox-bg-disabled: #374151;
	--checkbox-text-disabled: #6b7280;
	--checkbox-border-disabled: #4b5563;
	--checkbox-description-color: #9ca3af;
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <Checkbox label="Dark Theme Checkbox" /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic checkbox variants:

```css
/* Success checkboxes */
.checkbox-success {
	--checkbox-border-color: var(--color-success);
	--checkbox-border-hover: #059669;
	--checkbox-checkmark-color: var(--color-success);
	--checkbox-focus-ring-color: var(--color-success);
	--checkbox-text-color: var(--color-success);
}

/* Warning checkboxes */
.checkbox-warning {
	--checkbox-border-color: var(--color-warning);
	--checkbox-border-hover: #d97706;
	--checkbox-checkmark-color: var(--color-warning);
	--checkbox-focus-ring-color: var(--color-warning);
	--checkbox-text-color: var(--color-warning);
}

/* Danger checkboxes */
.checkbox-danger {
	--checkbox-border-color: var(--color-danger);
	--checkbox-border-hover: #dc2626;
	--checkbox-checkmark-color: var(--color-danger);
	--checkbox-focus-ring-color: var(--color-danger);
	--checkbox-text-color: var(--color-danger);
}
```

Usage in Svelte:

```svelte
<Checkbox label="Save Changes" class="checkbox-success" />
<Checkbox label="Proceed with Caution" class="checkbox-warning" />
<Checkbox label="Delete Account" class="checkbox-danger" />
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.checkbox-compact {
	--checkbox-size: 0.875rem;
	--checkbox-gap: 0.25rem;
	--checkbox-font-size: 0.75rem;
	--checkbox-border-width: 1px;
}

/* Hero size */
.checkbox-hero {
	--checkbox-size: 2rem;
	--checkbox-gap: 1rem;
	--checkbox-font-size: 1.5rem;
	--checkbox-border-width: 3px;
	--checkbox-font-weight: var(--font-weight-semibold);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific checkbox instances:

```css
/* Settings panel checkboxes */
.settings-checkbox {
	--checkbox-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--checkbox-border-radius: var(--radius-full);
	--checkbox-gap: 0.75rem;
	--checkbox-font-weight: var(--font-weight-semibold);
}

/* Minimal checkboxes */
.minimal-checkbox {
	--checkbox-background: transparent;
	--checkbox-border-color: transparent;
	--checkbox-border-hover: var(--color-primary);
	--checkbox-checkmark-color: var(--color-primary);
	--checkbox-gap: 0.375rem;
}
```

### 2. State-Specific Overrides

```css
/* Custom checked state */
.checkbox-filled-on-check input:checked ~ .checkmark {
	--checkbox-background: var(--color-primary);
	--checkbox-border-color: var(--color-primary);
	--checkbox-checkmark-color: white;
}

/* Custom hover effects */
.checkbox-lift:hover .checkmark {
	transform: translateY(-1px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const checkboxTheme = {
	primary: {
		'--checkbox-border-color': '#3b82f6',
		'--checkbox-checkmark-color': '#3b82f6',
		'--checkbox-focus-ring-color': '#3b82f6'
	},
	secondary: {
		'--checkbox-border-color': '#6b7280',
		'--checkbox-checkmark-color': '#6b7280',
		'--checkbox-focus-ring-color': '#6b7280'
	}
};

// Usage in Svelte component
let theme = 'primary';
$: checkboxStyles = Object.entries(checkboxTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<Checkbox label="Dynamic Theme Checkbox" style={checkboxStyles} />
```

### 2. Responsive Theming

```css
/* Mobile-first responsive checkbox sizing */
:root {
	--checkbox-size-responsive: 1rem;
	--checkbox-gap-responsive: 0.375rem;
	--checkbox-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
	:root {
		--checkbox-size-responsive: 1.25rem;
		--checkbox-gap-responsive: 0.5rem;
		--checkbox-font-size-responsive: 1rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--checkbox-size-responsive: 1.5rem;
		--checkbox-gap-responsive: 0.625rem;
		--checkbox-font-size-responsive: 1.125rem;
	}
}

.checkbox-responsive {
	--checkbox-size: var(--checkbox-size-responsive);
	--checkbox-gap: var(--checkbox-gap-responsive);
	--checkbox-font-size: var(--checkbox-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.checkbox-smooth {
	--checkbox-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.checkbox-bouncy {
	--checkbox-transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.checkbox-glow:hover .checkmark {
	box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.checkbox-scale:hover .checkmark {
	transform: scale(1.05);
}

/* Custom checkmark animations */
.checkbox-slide-in input:checked ~ .checkmark::after {
	animation: slideInCheckmark 0.2s ease-out;
}

@keyframes slideInCheckmark {
	from {
		transform: translateX(-100%) rotate(45deg);
		opacity: 0;
	}
	to {
		transform: translateX(0) rotate(45deg);
		opacity: 1;
	}
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to checkbox properties */
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

	/* Checkbox Mappings */
	--checkbox-border-primary: var(--ds-color-primary-500);
	--checkbox-border-primary-hover: var(--ds-color-primary-600);
	--checkbox-checkmark-primary: var(--ds-color-primary-500);
	--checkbox-gap-md: var(--ds-space-3);
	--checkbox-border-radius: var(--ds-radius-md);
	--checkbox-font-size-md: var(--ds-text-base);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.checkbox-tailwind {
	@apply inline-flex items-center;
	--checkbox-border-color: theme('colors.blue.500');
	--checkbox-border-hover: theme('colors.blue.600');
	--checkbox-checkmark-color: theme('colors.blue.500');
	--checkbox-border-radius: theme('borderRadius.md');
	--checkbox-gap: theme('spacing.2');
}

/* Bootstrap Integration */
.checkbox-bootstrap {
	--checkbox-border-color: var(--bs-primary);
	--checkbox-border-hover: var(--bs-primary-hover);
	--checkbox-checkmark-color: var(--bs-primary);
	--checkbox-border-radius: var(--bs-border-radius);
	--checkbox-gap: var(--bs-checkbox-gap, 0.5rem);
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

	/* Checkbox defaults */
	--checkbox-border-primary: var(--color-primary);
	--checkbox-focus-ring-color: var(--color-primary);
	--checkbox-border-radius: 0.25rem;
	--checkbox-font-weight: 500;
}

/* Semantic variants */
.checkbox-primary {
	--checkbox-border-color: var(--color-primary);
}
.checkbox-success {
	--checkbox-border-color: var(--color-success);
}
.checkbox-warning {
	--checkbox-border-color: var(--color-warning);
}
.checkbox-danger {
	--checkbox-border-color: var(--color-danger);
}

/* Dark theme */
[data-theme='dark'] {
	--checkbox-border-default: #6b7280;
	--checkbox-bg-disabled: #374151;
}
```

```svelte
<!-- Usage in components -->
<Checkbox label="Primary Action" class="checkbox-primary" />
<Checkbox label="Delete Item" variant="error" class="checkbox-danger" />
<Checkbox label="Save Changes" class="checkbox-success" bind:checked={saved} />
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
