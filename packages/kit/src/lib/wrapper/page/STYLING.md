# PageWrapper Component - Global Styling Guide

This guide covers how to customize the PageWrapper component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The PageWrapper component uses an extensive system of CSS custom properties that allow you to:

- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and layout behavior
- Override styles at different specificity levels
- Integrate with your existing design tokens

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
	/* Color Palette */
	--color-primary: #3b82f6;
	--color-surface: #ffffff;
	--color-surface-secondary: #f9fafb;
	--color-on-surface: #111827;

	/* Spacing */
	--spacing-xs: 0.25rem;
	--spacing-sm: 0.5rem;
	--spacing-md: 0.75rem;
	--spacing-lg: 1rem;
	--spacing-xl: 1.5rem;
}
```

### 2. PageWrapper-Specific Global Styles

Override PageWrapper component defaults globally:

```css
:root {
	/* === PAGE WRAPPER === */
	--page-wrapper-bg: var(--color-surface, transparent);
	--page-wrapper-padding: 0;
	--page-wrapper-scroll-behavior: smooth;

	/* === CONTENT AREA === */
	--page-content-max-width: none;
	--page-content-padding: 0;

	/* === FOOTER === */
	--page-footer-bg: transparent;
	--page-footer-padding: 0;
}
```

## Available CSS Custom Properties

### Page Wrapper Properties

| Property                         | Default                             | Description                                   |
| -------------------------------- | ----------------------------------- | --------------------------------------------- |
| `--page-wrapper-bg`              | `var(--color-surface, transparent)` | Background color of the page wrapper          |
| `--page-wrapper-padding`         | `0`                                 | Padding of the page wrapper                   |
| `--page-wrapper-scroll-behavior` | `smooth`                            | Scroll behavior (`smooth`, `auto`, `instant`) |

### Content Area Properties

| Property                   | Default | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `--page-content-max-width` | `none`  | Maximum width of the content area |
| `--page-content-padding`   | `0`     | Padding of the content area       |

### Footer Properties

| Property                | Default       | Description                    |
| ----------------------- | ------------- | ------------------------------ |
| `--page-footer-bg`      | `transparent` | Background color of the footer |
| `--page-footer-padding` | `0`           | Padding of the footer          |

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	/* Global colors */
	--color-surface: #1f2937;
	--color-surface-secondary: #374151;
	--color-on-surface: #f9fafb;

	/* PageWrapper dark theme overrides */
	--page-wrapper-bg: var(--color-surface);
	--page-footer-bg: var(--color-surface-secondary);
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <PageWrapper> */
/*     <div>Dark theme content</div> */
/*   </PageWrapper> */
/* </div> */
```

### 2. Padded Variants

Create padded layout variants:

```css
/* Standard padding */
.page-wrapper-padded {
	--page-wrapper-padding: var(--spacing-lg, 1rem);
	--page-content-padding: var(--spacing-xl, 1.5rem);
}

/* Extra padding */
.page-wrapper-padded-xl {
	--page-wrapper-padding: var(--spacing-xl, 1.5rem);
	--page-content-padding: 2rem;
}

/* No padding */
.page-wrapper-no-padding {
	--page-wrapper-padding: 0;
	--page-content-padding: 0;
}
```

Usage in Svelte:

```svelte
<PageWrapper wrapperClassName="page-wrapper-padded">
	<div>Padded content</div>
</PageWrapper>
```

### 3. Content Width Variants

```css
/* Narrow content */
.page-wrapper-narrow {
	--page-content-max-width: 800px;
	--page-content-padding: var(--spacing-xl, 1.5rem);
}

/* Medium content */
.page-wrapper-medium {
	--page-content-max-width: 1200px;
	--page-content-padding: var(--spacing-xl, 1.5rem);
}

/* Wide content */
.page-wrapper-wide {
	--page-content-max-width: 1600px;
	--page-content-padding: var(--spacing-xl, 1.5rem);
}
```

### 4. Application-Specific Variants

```css
/* Dashboard layout */
.page-wrapper-dashboard {
	--page-wrapper-bg: #f5f5f5;
	--page-content-padding: 2rem;
	--page-footer-bg: #ffffff;
	--page-footer-padding: 1rem;
}

/* Documentation layout */
.page-wrapper-docs {
	--page-wrapper-bg: #ffffff;
	--page-content-max-width: 900px;
	--page-content-padding: 3rem;
	--page-footer-bg: #f9fafb;
	--page-footer-padding: 2rem;
}

/* Landing page */
.page-wrapper-landing {
	--page-wrapper-bg: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
	--page-content-padding: 4rem 2rem;
	--page-footer-bg: rgba(0, 0, 0, 0.1);
	--page-footer-padding: 2rem;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific PageWrapper instances:

```css
/* App-specific page */
.app-page {
	--page-wrapper-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--page-content-max-width: 1200px;
	--page-content-padding: 2rem;
}

/* Dashboard-specific page */
.dashboard-page {
	--page-wrapper-bg: #f0f0f0;
	--page-content-padding: 1.5rem;
	--page-footer-bg: #ffffff;
}
```

### 2. Responsive Overrides

```css
/* Mobile-first responsive padding */
:root {
	--page-content-padding-responsive: 1rem;
}

@media (min-width: 640px) {
	:root {
		--page-content-padding-responsive: 1.5rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--page-content-padding-responsive: 2rem;
	}
}

.page-wrapper-responsive {
	--page-content-padding: var(--page-content-padding-responsive);
}
```

### 3. Scroll Behavior Customization

```css
/* Instant scroll (no animation) */
.page-wrapper-instant-scroll {
	--page-wrapper-scroll-behavior: auto;
}

/* Smooth scroll (default) */
.page-wrapper-smooth-scroll {
	--page-wrapper-scroll-behavior: smooth;
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const pageTheme = {
	light: {
		'--page-wrapper-bg': '#ffffff',
		'--page-content-padding': '2rem',
		'--page-footer-bg': '#f9fafb'
	},
	dark: {
		'--page-wrapper-bg': '#1a1a1a',
		'--page-content-padding': '2rem',
		'--page-footer-bg': '#1f2937'
	},
	blue: {
		'--page-wrapper-bg': '#3b82f6',
		'--page-content-padding': '2rem',
		'--page-footer-bg': '#2563eb'
	}
};

// Usage in Svelte component
let theme = 'light';
$: wrapperStyles = Object.entries(pageTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<PageWrapper wrapperStyle={wrapperStyles}>
	<div>Dynamic theme content</div>
</PageWrapper>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive layout */
:root {
	--page-content-padding-mobile: 1rem;
	--page-content-padding-tablet: 1.5rem;
	--page-content-padding-desktop: 2rem;
}

@media (min-width: 640px) {
	:root {
		--page-content-padding: var(--page-content-padding-tablet);
	}
}

@media (min-width: 1024px) {
	:root {
		--page-content-padding: var(--page-content-padding-desktop);
	}
}
```

### 3. Animation Customization

```css
/* Smooth transitions */
.page-wrapper-animated {
	transition:
		background-color 0.3s ease,
		padding 0.3s ease;
}

/* Custom transitions for content */
.page-content {
	transition:
		padding 0.3s ease,
		max-width 0.3s ease;
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to PageWrapper properties */
:root {
	/* Design System Tokens */
	--ds-color-surface: #ffffff;
	--ds-color-surface-secondary: #f9fafb;
	--ds-space-2: 0.5rem;
	--ds-space-4: 1rem;
	--ds-space-8: 2rem;

	/* PageWrapper Mappings */
	--page-wrapper-bg: var(--ds-color-surface);
	--page-content-padding: var(--ds-space-8);
	--page-footer-bg: var(--ds-color-surface-secondary);
	--page-footer-padding: var(--ds-space-4);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.page-wrapper-tailwind {
	--page-wrapper-bg: theme('colors.gray.50');
	--page-content-padding: theme('spacing.8');
	--page-footer-bg: theme('colors.white');
}

/* Bootstrap Integration */
.page-wrapper-bootstrap {
	--page-wrapper-bg: var(--bs-body-bg);
	--page-content-padding: var(--bs-gutter-x);
	--page-footer-bg: var(--bs-white);
}
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and typography consistent across your design system
4. **Leverage Design Tokens**: Use your existing design tokens as fallbacks for CSS custom properties
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

	/* PageWrapper defaults */
	--page-wrapper-bg: var(--color-surface);
	--page-wrapper-padding: 0;
	--page-content-max-width: none;
	--page-content-padding: var(--spacing-xl);
	--page-footer-bg: transparent;
	--page-footer-padding: var(--spacing-lg);
}

/* Application-specific variant */
.app-page {
	--page-wrapper-bg: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
	--page-content-max-width: 1200px;
	--page-content-padding: var(--spacing-xl);
	--page-footer-bg: rgba(255, 255, 255, 0.95);
	--page-footer-padding: var(--spacing-xl);
}

/* Dark theme */
[data-theme='dark'] {
	--page-wrapper-bg: #1a1a1a;
	--page-content-padding: var(--spacing-xl);
	--page-footer-bg: #1f2937;
	--page-footer-padding: var(--spacing-lg);
}
```

```svelte
<!-- Usage in components -->
<PageWrapper wrapperClassName="app-page">
	<div>Primary themed content</div>
</PageWrapper>

<PageWrapper>
	<div style="max-width: var(--page-content-max-width);">Content using CSS variables</div>
</PageWrapper>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
