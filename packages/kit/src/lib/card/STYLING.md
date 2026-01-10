# Card Component - Global Styling Guide

This guide covers how to customize the Card component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Card component uses an extensive system of CSS custom properties that allow you to:

- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, shadows, and borders
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

	--color-surface: #ffffff;
	--color-surface-hover: #f9fafb;
	--color-surface-secondary: #f3f4f6;
	--color-on-surface: #111827;
	--color-text: #1f2937;
	--color-border: #e5e7eb;

	/* Spacing */
	--spacing-xs: 0.25rem;
	--spacing-sm: 0.5rem;
	--spacing-md: 0.75rem;
	--spacing-lg: 1rem;
	--spacing-xl: 1.5rem;

	/* Border Radius */
	--radius-sm: 0.375rem;
	--radius-md: 0.5rem;
	--radius-lg: 0.75rem;
	--radius-full: 9999px;
}
```

### 2. Card-Specific Global Styles

Override Card component defaults globally:

```css
:root {
	/* === CORE PROPERTIES === */
	--card-display: flex;
	--card-flex-direction: column;
	--card-gap: 1rem;
	--card-align-items: center;
	--card-justify-content: center;
	--card-position: relative;
	--card-box-sizing: border-box;

	/* === SPACING === */
	--card-padding-sm: 0.75rem;
	--card-padding-md: 1rem;
	--card-padding-lg: 1.5rem;
	--card-padding-xl: 2rem;

	/* === BORDER RADIUS === */
	--card-border-radius-sm: 0.375rem;
	--card-border-radius-md: 0.5rem;
	--card-border-radius-lg: 0.75rem;

	/* === BORDERS === */
	--card-border-width: 1px;
	--card-border-style: solid;

	/* === SHADOWS === */
	--card-shadow-color: rgba(0, 0, 0, 0.1);

	/* === TRANSITIONS === */
	--card-transition-duration: 0.2s;
	--card-transition-timing: ease-in-out;

	/* === DEFAULT VARIANT === */
	--card-bg-default: #ffffff;
	--card-bg-hover-default: #f9fafb;
	--card-border-default: #e5e7eb;
	--card-text-default: #1f2937;
	--card-shadow: none;
	--card-shadow-hover: none;

	/* === OUTLINED VARIANT === */
	--card-bg-outlined: transparent;
	--card-bg-outlined-hover: #f9fafb;
	--card-border-outlined: #e5e7eb;

	/* === ELEVATED VARIANT === */
	--card-bg-elevated: #ffffff;
	--card-bg-elevated-hover: #ffffff;
	--card-border-elevated: transparent;
	--card-shadow-elevated:
		0 1px 3px 0 var(--card-shadow-color), 0 1px 2px -1px var(--card-shadow-color);
	--card-shadow-elevated-hover:
		0 4px 6px -1px var(--card-shadow-color), 0 2px 4px -2px var(--card-shadow-color);

	/* === FILLED VARIANT === */
	--card-bg-filled: #f9fafb;
	--card-bg-filled-hover: #f3f4f6;
	--card-border-filled: transparent;

	/* === FOCUS === */
	--card-focus-ring-color: #3b82f6;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--color-surface: #1f2937;
	--color-surface-hover: #374151;
	--color-surface-secondary: #111827;
	--color-on-surface: #f9fafb;
	--color-text: #f9fafb;
	--color-border: #374151;

	/* Dark theme card overrides */
	--card-bg-default: #1f2937;
	--card-bg-hover-default: #374151;
	--card-border-default: #374151;
	--card-text-default: #f9fafb;
	--card-bg-outlined: transparent;
	--card-bg-outlined-hover: #374151;
	--card-border-outlined: #4b5563;
	--card-bg-elevated: #1f2937;
	--card-bg-filled: #374151;
	--card-bg-filled-hover: #4b5563;
	--card-shadow-color: rgba(0, 0, 0, 0.3);
}
```

### 2. Brand Color Variants

Create semantic card variants:

```css
/* Primary cards */
.card-primary {
	--card-bg: var(--color-primary);
	--card-bg-hover: var(--color-primary-hover);
	--card-text: #ffffff;
	--card-border-color: var(--color-primary);
}

/* Success cards */
.card-success {
	--card-bg: #10b981;
	--card-bg-hover: #059669;
	--card-text: #ffffff;
	--card-border-color: #10b981;
}

/* Warning cards */
.card-warning {
	--card-bg: #f59e0b;
	--card-bg-hover: #d97706;
	--card-text: #ffffff;
	--card-border-color: #f59e0b;
}

/* Danger cards */
.card-danger {
	--card-bg: #ef4444;
	--card-bg-hover: #dc2626;
	--card-text: #ffffff;
	--card-border-color: #ef4444;
}
```

Usage in Svelte:

```svelte
<Card variant="filled" class="card-primary">
	<h3>Primary Card</h3>
</Card>
<Card variant="outlined" class="card-success">
	<h3>Success Card</h3>
</Card>
```

### 3. Size Variants

Customize size-specific properties:

```css
/* Compact cards */
.card-compact {
	--card-padding: 0.5rem;
	--card-gap: 0.5rem;
	--card-border-radius: 0.25rem;
}

/* Hero cards */
.card-hero {
	--card-padding: 2.5rem;
	--card-gap: 1.5rem;
	--card-border-radius: 1rem;
	--card-shadow: 0 10px 15px -3px var(--card-shadow-color), 0 4px 6px -2px var(--card-shadow-color);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific card instances:

```css
/* Dashboard cards */
.dashboard-card {
	--card-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--card-text: #ffffff;
	--card-border-radius: 1rem;
	--card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Product cards */
.product-card {
	--card-bg: #ffffff;
	--card-border-radius: 0.5rem;
	--card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	--card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Minimal cards */
.minimal-card {
	--card-bg: transparent;
	--card-border-color: transparent;
	--card-shadow: none;
	--card-shadow-hover: none;
}
```

### 2. Interactive States

```css
/* Custom hover effects */
.card-lift:hover {
	transform: translateY(-4px);
	--card-shadow-hover:
		0 20px 25px -5px var(--card-shadow-color), 0 10px 10px -5px var(--card-shadow-color);
}

.card-glow:hover {
	box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

/* Custom clickable effects */
.card-bounce:active {
	transform: scale(0.98);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const cardTheme = {
	primary: {
		'--card-bg': '#3b82f6',
		'--card-text': '#ffffff',
		'--card-border-color': '#3b82f6'
	},
	secondary: {
		'--card-bg': '#6b7280',
		'--card-text': '#ffffff',
		'--card-border-color': '#6b7280'
	}
};

// Usage in Svelte component
let theme = 'primary';
$: cardStyles = Object.entries(cardTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<Card style={cardStyles}>
	<h3>Dynamic Theme Card</h3>
</Card>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive card sizing */
:root {
	--card-padding-responsive: 0.75rem;
	--card-gap-responsive: 0.75rem;
	--card-border-radius-responsive: 0.375rem;
}

@media (min-width: 640px) {
	:root {
		--card-padding-responsive: 1rem;
		--card-gap-responsive: 1rem;
		--card-border-radius-responsive: 0.5rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--card-padding-responsive: 1.5rem;
		--card-gap-responsive: 1.5rem;
		--card-border-radius-responsive: 0.75rem;
	}
}

.card-responsive {
	--card-padding: var(--card-padding-responsive);
	--card-gap: var(--card-gap-responsive);
	--card-border-radius: var(--card-border-radius-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.card-smooth {
	--card-transition-duration: 0.3s;
	--card-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.card-bouncy {
	--card-transition-duration: 0.4s;
	--card-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover animations */
.card-fade-in:hover {
	animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
	from {
		opacity: 0.8;
	}
	to {
		opacity: 1;
	}
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to card properties */
:root {
	/* Design System Tokens */
	--ds-color-surface-100: #ffffff;
	--ds-color-surface-200: #f9fafb;
	--ds-color-surface-300: #f3f4f6;
	--ds-space-3: 0.75rem;
	--ds-space-4: 1rem;
	--ds-space-6: 1.5rem;
	--ds-radius-md: 0.5rem;
	--ds-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	--ds-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

	/* Card Mappings */
	--card-bg-default: var(--ds-color-surface-100);
	--card-bg-hover-default: var(--ds-color-surface-200);
	--card-padding-md: var(--ds-space-4);
	--card-padding-lg: var(--ds-space-6);
	--card-border-radius-md: var(--ds-radius-md);
	--card-shadow: var(--ds-shadow-sm);
	--card-shadow-hover: var(--ds-shadow-md);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.card-tailwind {
	@apply bg-white rounded-lg shadow-md p-4;
	--card-bg: theme('colors.white');
	--card-border-radius: theme('borderRadius.lg');
	--card-shadow: theme('boxShadow.md');
}

/* Bootstrap Integration */
.card-bootstrap {
	--card-bg: var(--bs-white);
	--card-border-radius: var(--bs-border-radius);
	--card-shadow: var(--bs-box-shadow);
	--card-padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
}
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and shadows consistent across your design system
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
	--color-surface: #ffffff;
	--color-surface-hover: #f9fafb;

	/* Card defaults */
	--card-bg-default: var(--color-surface);
	--card-bg-hover-default: var(--color-surface-hover);
	--card-border-radius: 0.5rem;
	--card-shadow-color: rgba(0, 0, 0, 0.1);
}

/* Semantic variants */
.card-primary {
	--card-bg: var(--color-primary);
	--card-text: #ffffff;
}
.card-success {
	--card-bg: var(--color-success);
	--card-text: #ffffff;
}

/* Dark theme */
[data-theme='dark'] {
	--card-bg-default: #1f2937;
	--card-bg-hover-default: #374151;
	--card-shadow-color: rgba(0, 0, 0, 0.3);
}
```

```svelte
<!-- Usage in components -->
<Card variant="elevated" class="card-primary">
	<h3>Primary Card</h3>
</Card>
<Card variant="outlined" class="card-success">
	<h3>Success Card</h3>
</Card>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
