# Button Component - Global Styling Guide

This guide covers how to customize the Button component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Button component uses an extensive system of CSS custom properties that allow you to:

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
	--spacing-md: 1rem;
	--spacing-lg: 1.5rem;
	--spacing-xl: 2rem;

	/* Border Radius */
	--radius-sm: 0.375rem;
	--radius-md: 0.5rem;
	--radius-lg: 0.75rem;
	--radius-full: 9999px;
}
```

### 2. Button-Specific Global Styles

Override Button component defaults globally:

```css
:root {
	/* === FILLED VARIANT === */
	--btn-bg-filled: var(--color-primary);
	--btn-bg-filled-hover: var(--color-primary-hover);
	--btn-bg-filled-active: var(--color-primary-active);
	--btn-text-filled: #ffffff;
	--btn-text-filled-hover: #ffffff;
	--btn-text-filled-active: #ffffff;

	/* === OUTLINED VARIANT === */
	--btn-bg-outlined-hover: rgba(59, 130, 246, 0.05);
	--btn-bg-outlined-active: rgba(59, 130, 246, 0.1);
	--btn-border-outlined: var(--color-primary);
	--btn-border-outlined-hover: var(--color-primary-hover);
	--btn-border-outlined-active: var(--color-primary-active);
	--btn-text-outlined: var(--color-primary);
	--btn-text-outlined-hover: var(--color-primary-hover);
	--btn-text-outlined-active: var(--color-primary-active);

	/* === TEXT VARIANT === */
	--btn-bg-text-hover: rgba(59, 130, 246, 0.05);
	--btn-bg-text-active: rgba(59, 130, 246, 0.1);
	--btn-text-text: var(--color-primary);
	--btn-text-text-hover: var(--color-primary-hover);
	--btn-text-text-active: var(--color-primary-active);

	/* === LINK VARIANT === */
	--btn-text-link: var(--color-primary);
	--btn-text-link-hover: var(--color-primary-hover);
	--btn-text-link-active: var(--color-primary-active);

	/* === SIZES === */
	/* Small */
	--btn-padding-x-sm: 0.75rem;
	--btn-padding-y-sm: 0.375rem;
	--btn-min-height-sm: 2rem;
	--btn-font-size-sm: 0.875rem;
	--btn-gap-sm: 0.375rem;
	--btn-border-radius-sm: var(--radius-sm);

	/* Medium */
	--btn-padding-x-md: 1rem;
	--btn-padding-y-md: 0.5rem;
	--btn-min-height-md: 2.5rem;
	--btn-font-size-md: 1rem;
	--btn-gap-md: 0.5rem;
	--btn-border-radius-md: var(--radius-md);

	/* Large */
	--btn-padding-x-lg: 1.25rem;
	--btn-padding-y-lg: 0.625rem;
	--btn-min-height-lg: 3rem;
	--btn-font-size-lg: 1.125rem;
	--btn-gap-lg: 0.625rem;
	--btn-border-radius-lg: var(--radius-lg);

	/* Extra Large */
	--btn-padding-x-xl: 1.5rem;
	--btn-padding-y-xl: 0.75rem;
	--btn-min-height-xl: 3.5rem;
	--btn-font-size-xl: 1.25rem;
	--btn-gap-xl: 0.75rem;
	--btn-border-radius-xl: var(--radius-lg);

	/* === STATES === */
	--btn-bg-selected: var(--color-surface-hover);
	--btn-text-selected: var(--color-on-surface);

	--btn-bg-highlight: #fef3c7;
	--btn-text-highlight: #92400e;
	--btn-border-highlight: #fbbf24;

	/* === DISABLED STATE === */
	--btn-bg-disabled: #e5e7eb;
	--btn-text-disabled: #9ca3af;
	--btn-border-disabled: #d1d5db;

	/* === FOCUS === */
	--btn-focus-ring-color: var(--color-primary);
	--btn-focus-ring-width: 2px;
	--btn-focus-ring-offset: 2px;

	/* === TYPOGRAPHY === */
	--btn-font-family: var(--font-family-base);
	--btn-font-weight: var(--font-weight-medium);
	--btn-line-height: 1.5;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--color-surface: #1f2937;
	--color-surface-hover: #374151;
	--color-on-surface: #f9fafb;

	/* Dark theme button overrides */
	--btn-bg-filled: var(--color-primary);
	--btn-bg-outlined-hover: rgba(59, 130, 246, 0.1);
	--btn-bg-text-hover: rgba(59, 130, 246, 0.1);
	--btn-bg-disabled: #374151;
	--btn-text-disabled: #6b7280;
	--btn-border-disabled: #4b5563;
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <Button label="Dark Theme Button" /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic button variants:

```css
/* Success buttons */
.btn-success {
	--btn-bg: var(--color-success);
	--btn-bg-hover: #059669;
	--btn-bg-active: #047857;
	--btn-text: #ffffff;
	--btn-border: var(--color-success);
	--btn-border-hover: #059669;
	--btn-focus-ring-color: var(--color-success);
}

/* Warning buttons */
.btn-warning {
	--btn-bg: var(--color-warning);
	--btn-bg-hover: #d97706;
	--btn-bg-active: #b45309;
	--btn-text: #ffffff;
	--btn-border: var(--color-warning);
	--btn-border-hover: #d97706;
	--btn-focus-ring-color: var(--color-warning);
}

/* Danger buttons */
.btn-danger {
	--btn-bg: var(--color-danger);
	--btn-bg-hover: #dc2626;
	--btn-bg-active: #b91c1c;
	--btn-text: #ffffff;
	--btn-border: var(--color-danger);
	--btn-border-hover: #dc2626;
	--btn-focus-ring-color: var(--color-danger);
}
```

Usage in Svelte:

```svelte
<Button label="Save" className="btn-success" />
<Button label="Warning" className="btn-warning" />
<Button label="Delete" className="btn-danger" />
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.btn-compact {
	--btn-padding-x: 0.5rem;
	--btn-padding-y: 0.25rem;
	--btn-min-height: 1.75rem;
	--btn-font-size: 0.75rem;
	--btn-gap: 0.25rem;
	--btn-border-radius: 0.25rem;
}

/* Hero size */
.btn-hero {
	--btn-padding-x: 2rem;
	--btn-padding-y: 1rem;
	--btn-min-height: 4rem;
	--btn-font-size: 1.5rem;
	--btn-gap: 1rem;
	--btn-border-radius: 1rem;
	--btn-font-weight: var(--font-weight-semibold);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific button instances:

```css
/* Specific component styling */
.header-cta-button {
	--btn-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--btn-bg-hover: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
	--btn-text: #ffffff;
	--btn-border-radius: var(--radius-full);
	--btn-padding-x: 2rem;
}

.sidebar-nav-button {
	--btn-bg: transparent;
	--btn-bg-hover: rgba(59, 130, 246, 0.1);
	--btn-text: var(--color-on-surface);
	--btn-text-hover: var(--color-primary);
	--btn-border-radius: var(--radius-sm);
	--btn-justify-content: flex-start;
}
```

### 2. State-Specific Overrides

```css
/* Custom active state */
.toggle-button {
	--btn-bg-active: var(--color-success);
	--btn-text-active: #ffffff;
	--btn-border-active: var(--color-success);
}

/* Custom selected state */
.filter-button {
	--btn-bg-selected: var(--color-primary);
	--btn-text-selected: #ffffff;
	--btn-border-selected: var(--color-primary);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const buttonTheme = {
	primary: {
		'--btn-bg': '#3b82f6',
		'--btn-bg-hover': '#2563eb',
		'--btn-text': '#ffffff'
	},
	secondary: {
		'--btn-bg': '#6b7280',
		'--btn-bg-hover': '#4b5563',
		'--btn-text': '#ffffff'
	}
};

// Usage in Svelte component
let theme = 'primary';
$: buttonStyles = Object.entries(buttonTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<Button label="Dynamic Theme" style={buttonStyles} />
```

### 2. Responsive Theming

```css
/* Mobile-first responsive button sizing */
:root {
	--btn-padding-x-responsive: 0.75rem;
	--btn-padding-y-responsive: 0.375rem;
	--btn-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
	:root {
		--btn-padding-x-responsive: 1rem;
		--btn-padding-y-responsive: 0.5rem;
		--btn-font-size-responsive: 1rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--btn-padding-x-responsive: 1.25rem;
		--btn-padding-y-responsive: 0.625rem;
		--btn-font-size-responsive: 1.125rem;
	}
}

.btn-responsive {
	--btn-padding-x: var(--btn-padding-x-responsive);
	--btn-padding-y: var(--btn-padding-y-responsive);
	--btn-font-size: var(--btn-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.btn-smooth {
	--btn-transition-duration: 0.3s;
	--btn-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-bouncy {
	--btn-transition-duration: 0.2s;
	--btn-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.btn-lift:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-glow:hover {
	box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to button properties */
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

	/* Button Mappings */
	--btn-bg-filled: var(--ds-color-primary-500);
	--btn-bg-filled-hover: var(--ds-color-primary-600);
	--btn-bg-filled-active: var(--ds-color-primary-700);
	--btn-padding-x-md: var(--ds-space-4);
	--btn-padding-y-md: var(--ds-space-2);
	--btn-border-radius-md: var(--ds-radius-md);
	--btn-font-size-md: var(--ds-text-base);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.btn-tailwind {
	@apply inline-flex items-center justify-center;
	--btn-bg: theme('colors.blue.500');
	--btn-bg-hover: theme('colors.blue.600');
	--btn-text: theme('colors.white');
	--btn-border-radius: theme('borderRadius.md');
	--btn-padding-x: theme('spacing.4');
	--btn-padding-y: theme('spacing.2');
}

/* Bootstrap Integration */
.btn-bootstrap {
	--btn-bg: var(--bs-primary);
	--btn-bg-hover: var(--bs-primary-hover);
	--btn-text: var(--bs-white);
	--btn-border-radius: var(--bs-border-radius);
	--btn-padding-x: var(--bs-btn-padding-x);
	--btn-padding-y: var(--bs-btn-padding-y);
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

	/* Button defaults */
	--btn-bg-filled: var(--color-primary);
	--btn-focus-ring-color: var(--color-primary);
	--btn-border-radius-md: 0.5rem;
	--btn-font-weight: 500;
}

/* Semantic variants */
.btn-primary {
	--btn-bg: var(--color-primary);
}
.btn-success {
	--btn-bg: var(--color-success);
}
.btn-warning {
	--btn-bg: var(--color-warning);
}
.btn-danger {
	--btn-bg: var(--color-danger);
}

/* Dark theme */
[data-theme='dark'] {
	--btn-bg-outlined-hover: rgba(59, 130, 246, 0.2);
	--btn-bg-disabled: #374151;
}
```

```svelte
<!-- Usage in components -->
<Button label="Primary Action" className="btn-primary" />
<Button label="Delete" variant="outlined" className="btn-danger" />
<Button label="Save" className="btn-success" loading={saving} />
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
