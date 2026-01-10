# BaseLayoutWrapper Component - Global Styling Guide

This guide covers how to customize the BaseLayoutWrapper component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The BaseLayoutWrapper component uses an extensive system of CSS custom properties that allow you to:

- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and layout behavior
- Override styles at different specificity levels
- Access dynamic window dimensions throughout your application

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
	--color-surface-secondary: #f9fafb;
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
}
```

### 2. BaseLayoutWrapper-Specific Global Styles

Override BaseLayoutWrapper component defaults globally:

```css
:root {
	/* === LAYOUT CONTAINER === */
	--base-layout-bg: transparent;
	--base-layout-z-index: 0;
	--base-layout-user-select: none;

	/* === BODY CONTAINER === */
	--base-layout-body-bg: transparent;
	--base-layout-body-padding: 0;
	--base-layout-text-color: var(--color-on-surface);

	/* === DIMENSIONS === */
	/* These are automatically set by the component based on window size */
	/* --base-layout-width: 100vw; (fallback) */
	/* --base-layout-height: 100vh; (fallback) */
}
```

## Available CSS Custom Properties

### Layout Container Properties

| Property                    | Default       | Description                                               |
| --------------------------- | ------------- | --------------------------------------------------------- |
| `--base-layout-bg`          | `transparent` | Background color of the outer layout container            |
| `--base-layout-z-index`     | `0`           | Z-index of the layout container                           |
| `--base-layout-user-select` | `none`        | User selection behavior (`none`, `text`, `all`, `auto`)   |
| `--base-layout-width`       | `100vw`       | Width of the layout (automatically set to window width)   |
| `--base-layout-height`      | `100vh`       | Height of the layout (automatically set to window height) |

### Body Container Properties

| Property                     | Default                   | Description                                  |
| ---------------------------- | ------------------------- | -------------------------------------------- |
| `--base-layout-body-bg`      | `transparent`             | Background color of the inner body container |
| `--base-layout-body-padding` | `0`                       | Padding of the body container                |
| `--base-layout-text-color`   | `var(--color-on-surface)` | Text color for content within the body       |

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	/* Global colors */
	--color-surface: #1f2937;
	--color-surface-secondary: #374151;
	--color-surface-hover: #374151;
	--color-on-surface: #f9fafb;

	/* BaseLayoutWrapper dark theme overrides */
	--base-layout-text-color: var(--color-on-surface);
	--base-layout-bg: transparent;
	--base-layout-body-bg: transparent;
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <BaseLayoutWrapper> */
/*     <div>Dark theme content</div> */
/*   </BaseLayoutWrapper> */
/* </div> */
```

### 2. Colored Background Variants

Create themed layout variants:

```css
/* Primary background */
.base-layout-primary {
	--base-layout-bg: var(--color-primary);
	--base-layout-text-color: #ffffff;
}

/* Secondary background */
.base-layout-secondary {
	--base-layout-bg: var(--color-surface-secondary);
	--base-layout-text-color: var(--color-on-surface);
}

/* Gradient background */
.base-layout-gradient {
	--base-layout-bg: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
	--base-layout-text-color: #ffffff;
}
```

Usage in Svelte:

```svelte
<BaseLayoutWrapper layoutClassName="base-layout-primary">
	<div>Primary themed content</div>
</BaseLayoutWrapper>

<BaseLayoutWrapper layoutClassName="base-layout-gradient">
	<div>Gradient themed content</div>
</BaseLayoutWrapper>
```

### 3. Application-Specific Variants

```css
/* Dashboard layout */
.base-layout-dashboard {
	--base-layout-bg: #f5f5f5;
	--base-layout-body-bg: #ffffff;
	--base-layout-body-padding: 2rem;
	--base-layout-text-color: var(--color-on-surface);
}

/* Kiosk mode */
.base-layout-kiosk {
	--base-layout-bg: #000000;
	--base-layout-body-bg: #000000;
	--base-layout-text-color: #ffffff;
	--base-layout-user-select: none;
}

/* Presentation mode */
.base-layout-presentation {
	--base-layout-bg: #1a1a1a;
	--base-layout-body-bg: transparent;
	--base-layout-body-padding: 3rem;
	--base-layout-text-color: #ffffff;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific BaseLayoutWrapper instances:

```css
/* App-specific layout */
.app-container {
	--base-layout-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--base-layout-z-index: 1;
	--base-layout-body-padding: 2rem;
	--base-layout-text-color: #ffffff;
}

/* Dashboard-specific layout */
.dashboard-container {
	--base-layout-bg: #f0f0f0;
	--base-layout-body-bg: #ffffff;
	--base-layout-body-padding: 1.5rem;
	--base-layout-text-color: var(--color-on-surface);
}
```

### 2. Responsive Overrides

```css
/* Mobile-first responsive padding */
:root {
	--base-layout-body-padding-responsive: 1rem;
}

@media (min-width: 640px) {
	:root {
		--base-layout-body-padding-responsive: 1.5rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--base-layout-body-padding-responsive: 2rem;
	}
}

.base-layout-responsive {
	--base-layout-body-padding: var(--base-layout-body-padding-responsive);
}
```

## Using Dynamic Dimensions

The component automatically sets `--base-layout-width` and `--base-layout-height` based on window dimensions. Use these throughout your application:

```css
/* Full viewport sized element */
.full-viewport {
	width: var(--base-layout-width);
	height: var(--base-layout-height);
}

/* Responsive sizing */
.responsive-container {
	width: calc(var(--base-layout-width) - 4rem);
	max-width: 1200px;
	margin: 0 auto;
}

/* Aspect ratio based on viewport */
.aspect-container {
	width: var(--base-layout-width);
	height: calc(var(--base-layout-width) * 0.5625); /* 16:9 aspect ratio */
}

/* Centered content with max width */
.centered-content {
	width: min(100%, var(--base-layout-width));
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}
```

Usage in Svelte:

```svelte
<BaseLayoutWrapper>
	<div class="full-viewport">Full viewport content</div>

	<div class="responsive-container">Responsive container</div>
</BaseLayoutWrapper>
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const layoutTheme = {
	light: {
		'--base-layout-bg': '#ffffff',
		'--base-layout-body-bg': '#f9fafb',
		'--base-layout-text-color': '#111827'
	},
	dark: {
		'--base-layout-bg': '#1a1a1a',
		'--base-layout-body-bg': '#1f2937',
		'--base-layout-text-color': '#f9fafb'
	},
	blue: {
		'--base-layout-bg': '#3b82f6',
		'--base-layout-body-bg': '#2563eb',
		'--base-layout-text-color': '#ffffff'
	}
};

// Usage in Svelte component
let theme = 'light';
$: layoutStyles = Object.entries(layoutTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<BaseLayoutWrapper layoutStyle={layoutStyles}>
	<div>Dynamic theme content</div>
</BaseLayoutWrapper>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive layout */
:root {
	--base-layout-body-padding-mobile: 1rem;
	--base-layout-body-padding-tablet: 1.5rem;
	--base-layout-body-padding-desktop: 2rem;
}

@media (min-width: 640px) {
	:root {
		--base-layout-body-padding: var(--base-layout-body-padding-tablet);
	}
}

@media (min-width: 1024px) {
	:root {
		--base-layout-body-padding: var(--base-layout-body-padding-desktop);
	}
}
```

### 3. Animation Customization

```css
/* Smooth transitions */
.base-layout-animated {
	transition:
		background-color 0.3s ease,
		color 0.3s ease;
}

/* Custom transitions for body */
.base-layout__body {
	transition:
		padding 0.3s ease,
		background-color 0.3s ease;
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to BaseLayoutWrapper properties */
:root {
	/* Design System Tokens */
	--ds-color-surface: #ffffff;
	--ds-color-surface-secondary: #f9fafb;
	--ds-color-on-surface: #111827;
	--ds-space-2: 0.5rem;
	--ds-space-4: 1rem;
	--ds-space-8: 2rem;

	/* BaseLayoutWrapper Mappings */
	--base-layout-bg: var(--ds-color-surface);
	--base-layout-body-bg: var(--ds-color-surface-secondary);
	--base-layout-text-color: var(--ds-color-on-surface);
	--base-layout-body-padding: var(--ds-space-8);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.base-layout-tailwind {
	--base-layout-bg: theme('colors.gray.50');
	--base-layout-body-bg: theme('colors.white');
	--base-layout-text-color: theme('colors.gray.900');
	--base-layout-body-padding: theme('spacing.8');
}

/* Bootstrap Integration */
.base-layout-bootstrap {
	--base-layout-bg: var(--bs-body-bg);
	--base-layout-body-bg: var(--bs-white);
	--base-layout-text-color: var(--bs-body-color);
	--base-layout-body-padding: var(--bs-gutter-x);
}
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and typography consistent across your design system
4. **Leverage Dynamic Dimensions**: Use `--base-layout-width` and `--base-layout-height` for responsive sizing
5. **Performance**: Minimize the number of custom properties to avoid performance issues
6. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage

## Complete Example

Here's a complete example integrating all concepts:

```css
/* Global theme setup */
:root {
	/* Design tokens */
	--color-primary: #3b82f6;
	--color-surface: #ffffff;
	--color-on-surface: #111827;
	--spacing-lg: 1rem;
	--spacing-xl: 2rem;

	/* BaseLayoutWrapper defaults */
	--base-layout-bg: transparent;
	--base-layout-body-bg: var(--color-surface);
	--base-layout-text-color: var(--color-on-surface);
	--base-layout-body-padding: var(--spacing-xl);
}

/* Application-specific variant */
.app-layout {
	--base-layout-bg: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
	--base-layout-body-bg: rgba(255, 255, 255, 0.95);
	--base-layout-body-padding: var(--spacing-xl);
	--base-layout-text-color: var(--color-on-surface);
}

/* Dark theme */
[data-theme='dark'] {
	--base-layout-bg: #1a1a1a;
	--base-layout-body-bg: #1f2937;
	--base-layout-text-color: #f9fafb;
}
```

```svelte
<!-- Usage in components -->
<BaseLayoutWrapper layoutClassName="app-layout">
	<div>Primary themed content</div>
</BaseLayoutWrapper>

<BaseLayoutWrapper>
	<div style="width: var(--base-layout-width);">Full width content using dynamic dimensions</div>
</BaseLayoutWrapper>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
