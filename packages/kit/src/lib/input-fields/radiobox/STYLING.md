# Radiobox Component - Global Styling Guide

This guide covers how to customize the Radiobox component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Radiobox component uses an extensive system of CSS custom properties that allow you to:

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
	--radius-sm: 0.25rem;
	--radius-md: 0.375rem;
	--radius-lg: 0.5rem;
	--radius-full: 9999px;
}
```

### 2. Radiobox-Specific Global Styles

Override Radiobox component defaults globally:

```css
:root {
	/* === COLOR VARIANTS === */
	--radiobox-primary: var(--color-primary);
	--radiobox-secondary: var(--color-secondary);
	--radiobox-success: var(--color-success);
	--radiobox-error: var(--color-error);
	--radiobox-warning: var(--color-warning);

	/* === LAYOUT & SPACING === */
	--radiobox-gap: 0.5rem;
	--radiobox-border: #d1d5db;
	--radiobox-disabled: #9ca3af;
	--radiobox-background: #ffffff;

	/* === SIZE SYSTEM === */
	/* Extra Small */
	--radiobox-size-xs: 0.625;
	--radiobox-indicator-size-xs: calc(1.25rem * var(--radiobox-size-xs));

	/* Small */
	--radiobox-size-sm: 0.75;
	--radiobox-indicator-size-sm: calc(1.25rem * var(--radiobox-size-sm));

	/* Medium (Default) */
	--radiobox-size-md: 1;
	--radiobox-indicator-size-md: calc(1.25rem * var(--radiobox-size-md));

	/* Large */
	--radiobox-size-lg: 1.25;
	--radiobox-indicator-size-lg: calc(1.25rem * var(--radiobox-size-lg));

	/* Extra Large */
	--radiobox-size-xl: 1.5;
	--radiobox-indicator-size-xl: calc(1.25rem * var(--radiobox-size-xl));

	/* === INTERACTION STATES === */
	--radiobox-focus-ring-width: 2px;
	--radiobox-focus-ring-offset: 2px;
	--radiobox-transition-duration: 0.2s;
	--radiobox-transition-timing: ease-in-out;

	/* === TYPOGRAPHY === */
	--radiobox-font-family: var(--font-family-base);
	--radiobox-font-weight: var(--font-weight-medium);
	--radiobox-line-height: 1.5;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--color-surface: #1f2937;
	--color-surface-hover: #374151;
	--color-on-surface: #f9fafb;

	/* Dark theme radiobox overrides */
	--radiobox-background: var(--color-surface);
	--radiobox-border: #4b5563;
	--radiobox-disabled: #6b7280;
	--radiobox-primary: #60a5fa;
	--radiobox-secondary: #9ca3af;
	--radiobox-success: #34d399;
	--radiobox-error: #f87171;
	--radiobox-warning: #fbbf24;
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <Radiobox name="theme" label="Dark Theme Radio" /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic radiobox variants:

```css
/* Success radioboxes */
.radiobox-success {
	--radiobox-primary: var(--color-success);
	--current-color: var(--color-success);
}

/* Warning radioboxes */
.radiobox-warning {
	--radiobox-primary: var(--color-warning);
	--current-color: var(--color-warning);
}

/* Error radioboxes */
.radiobox-error {
	--radiobox-primary: var(--color-error);
	--current-color: var(--color-error);
}

/* Secondary radioboxes */
.radiobox-secondary {
	--radiobox-primary: var(--color-secondary);
	--current-color: var(--color-secondary);
}
```

Usage in Svelte:

```svelte
<Radiobox name="status" label="Success" class="radiobox-success" />
<Radiobox name="status" label="Warning" class="radiobox-warning" />
<Radiobox name="status" label="Error" class="radiobox-error" />
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.radiobox-compact {
	--radiobox-size: 0.5;
	--radiobox-indicator-size: calc(1.25rem * var(--radiobox-size));
	--radiobox-gap: 0.25rem;
}

/* Hero size */
.radiobox-hero {
	--radiobox-size: 2;
	--radiobox-indicator-size: calc(1.25rem * var(--radiobox-size));
	--radiobox-gap: 1rem;
	--radiobox-font-weight: var(--font-weight-semibold);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific radiobox instances:

```css
/* Card selection radioboxes */
.card-selector .radiobox-wrapper {
	--radiobox-gap: 1rem;
	--radiobox-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--radiobox-indicator-size: 1.5rem;
	--radiobox-border: #e5e7eb;
}

/* Form radioboxes */
.form-group .radiobox-wrapper {
	--radiobox-background: transparent;
	--radiobox-border: #d1d5db;
	--radiobox-gap: 0.75rem;
}

/* Settings panel radioboxes */
.settings-panel .radiobox-wrapper {
	--radiobox-primary: var(--color-primary);
	--radiobox-gap: 0.5rem;
	--radiobox-font-weight: normal;
}
```

### 2. Variant-Specific Overrides

```css
/* Custom outlined variant */
.radiobox-outlined-custom {
	--radiobox-background: transparent;
	--radiobox-border: var(--color-primary);
}

.radiobox-outlined-custom .radiobox-indicator--checked {
	background-color: transparent;
	border-color: var(--color-primary);
}

.radiobox-outlined-custom .radiobox-indicator--checked::after {
	background-color: var(--color-primary);
}

/* Custom filled variant */
.radiobox-filled-custom {
	--radiobox-background: #f3f4f6;
	--radiobox-border: transparent;
}

.radiobox-filled-custom .radiobox-indicator--checked {
	background-color: var(--color-primary);
	border-color: var(--color-primary);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const radioboxTheme = {
	primary: {
		'--radiobox-primary': '#3b82f6',
		'--radiobox-background': '#ffffff',
		'--radiobox-border': '#d1d5db'
	},
	secondary: {
		'--radiobox-primary': '#6b7280',
		'--radiobox-background': '#f9fafb',
		'--radiobox-border': '#e5e7eb'
	},
	success: {
		'--radiobox-primary': '#10b981',
		'--radiobox-background': '#ecfdf5',
		'--radiobox-border': '#a7f3d0'
	}
};

// Usage in Svelte component
let theme = 'primary';
$: radioboxStyles = Object.entries(radioboxTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<Radiobox name="dynamic" label="Dynamic Theme" style={radioboxStyles} />
```

### 2. Responsive Theming

```css
/* Mobile-first responsive radiobox sizing */
:root {
	--radiobox-size-responsive: 0.75;
	--radiobox-gap-responsive: 0.5rem;
	--radiobox-font-size-responsive: 0.875rem;
}

@media (min-width: 640px) {
	:root {
		--radiobox-size-responsive: 1;
		--radiobox-gap-responsive: 0.75rem;
		--radiobox-font-size-responsive: 1rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--radiobox-size-responsive: 1.25;
		--radiobox-gap-responsive: 1rem;
		--radiobox-font-size-responsive: 1.125rem;
	}
}

.radiobox-responsive {
	--radiobox-size: var(--radiobox-size-responsive);
	--radiobox-gap: var(--radiobox-gap-responsive);
	font-size: var(--radiobox-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.radiobox-smooth {
	--radiobox-transition-duration: 0.3s;
	--radiobox-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.radiobox-bouncy {
	--radiobox-transition-duration: 0.4s;
	--radiobox-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.radiobox-lift:hover .radiobox-indicator {
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.radiobox-glow:hover .radiobox-indicator {
	box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

/* Pulse animation for checked state */
.radiobox-pulse .radiobox-indicator--checked {
	animation: radiobox-pulse 2s infinite;
}

@keyframes radiobox-pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.7;
	}
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to radiobox properties */
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

	/* Radiobox Mappings */
	--radiobox-primary: var(--ds-color-primary-500);
	--radiobox-gap: var(--ds-space-3);
	--radiobox-border-radius: var(--ds-radius-md);
	--radiobox-font-size: var(--ds-text-base);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.radiobox-tailwind {
	--radiobox-primary: theme('colors.blue.500');
	--radiobox-secondary: theme('colors.gray.500');
	--radiobox-success: theme('colors.green.500');
	--radiobox-error: theme('colors.red.500');
	--radiobox-warning: theme('colors.yellow.500');
	--radiobox-gap: theme('spacing.3');
	--radiobox-font-family: theme('fontFamily.sans');
}

/* Bootstrap Integration */
.radiobox-bootstrap {
	--radiobox-primary: var(--bs-primary);
	--radiobox-secondary: var(--bs-secondary);
	--radiobox-success: var(--bs-success);
	--radiobox-error: var(--bs-danger);
	--radiobox-warning: var(--bs-warning);
	--radiobox-gap: var(--bs-spacer);
	--radiobox-font-family: var(--bs-font-sans-serif);
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

	/* Radiobox defaults */
	--radiobox-primary: var(--color-primary);
	--radiobox-gap: 0.75rem;
	--radiobox-transition-duration: 0.2s;
	--radiobox-font-weight: 500;
}

/* Semantic variants */
.radiobox-primary {
	--radiobox-primary: var(--color-primary);
}
.radiobox-success {
	--radiobox-primary: var(--color-success);
}
.radiobox-warning {
	--radiobox-primary: var(--color-warning);
}
.radiobox-error {
	--radiobox-primary: var(--color-error);
}

/* Dark theme */
[data-theme='dark'] {
	--radiobox-background: #1f2937;
	--radiobox-border: #4b5563;
	--radiobox-primary: #60a5fa;
}

/* Custom variants */
.radiobox-card {
	--radiobox-gap: 1rem;
	--radiobox-size: 1.25;
	--radiobox-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.radiobox-minimal {
	--radiobox-gap: 0.5rem;
	--radiobox-size: 0.875;
	--radiobox-border: transparent;
	--radiobox-background: transparent;
}
```

```svelte
<!-- Usage in components -->
<Radiobox name="action" label="Primary Action" class="radiobox-primary" />
<Radiobox name="status" label="Success Status" class="radiobox-success" />
<Radiobox name="card" label="Card Selection" class="radiobox-card" />
<Radiobox name="minimal" label="Minimal Style" class="radiobox-minimal" />
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
