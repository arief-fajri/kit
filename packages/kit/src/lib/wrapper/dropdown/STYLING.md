# DropdownWrapper Component - Global Styling Guide

This guide covers how to customize the DropdownWrapper component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The DropdownWrapper component uses an extensive system of CSS custom properties that allow you to:

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
	--radius-sm: 0.25rem;
	--radius-md: 0.5rem;
	--radius-lg: 0.75rem;
	--radius-full: 9999px;
}
```

### 2. DropdownWrapper-Specific Global Styles

Override DropdownWrapper component defaults globally:

```css
:root {
	/* === BASE STYLES === */
	--dropdown-bg: var(--color-surface);
	--dropdown-border-color: rgba(0, 0, 0, 0.1);
	--dropdown-border-radius: var(--radius-md);
	--dropdown-z-index: 9999;

	/* === SHADOWS === */
	--dropdown-shadow: rgba(0, 0, 0, 0.05) 0px 0px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px;
	--dropdown-minimal-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
	--dropdown-elevated-shadow:
		rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

	/* === BORDERS === */
	--dropdown-border: 1px solid var(--dropdown-border-color);
	--dropdown-outlined-border: 2px solid var(--dropdown-border-color);

	/* === SIZES === */
	/* Small */
	--dropdown-min-width-sm: 120px;
	--dropdown-max-width-sm: 200px;

	/* Medium */
	--dropdown-min-width-md: 160px;
	--dropdown-max-width-md: 280px;

	/* Large */
	--dropdown-min-width-lg: 200px;
	--dropdown-max-width-lg: 360px;

	/* Extra Large */
	--dropdown-min-width-xl: 240px;
	--dropdown-max-width-xl: 480px;

	/* === TYPOGRAPHY === */
	--dropdown-font-family: var(--font-family-base);
	--dropdown-font-size: 0.875rem;
	--dropdown-line-height: 1.5;
	--dropdown-text-color: var(--color-on-surface);

	/* === FOCUS === */
	--dropdown-focus-color: var(--color-primary);
	--dropdown-focus-outline: 2px solid var(--dropdown-focus-color);
	--dropdown-focus-offset: 2px;

	/* === FALLBACK CONTENT === */
	--dropdown-padding: 0.75rem;
	--dropdown-fallback-color: rgba(0, 0, 0, 0.5);
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--color-surface: #1f2937;
	--color-surface-hover: #374151;
	--color-on-surface: #f9fafb;

	/* Dark theme dropdown overrides */
	--dropdown-bg: var(--color-surface);
	--dropdown-border-color: rgba(255, 255, 255, 0.1);
	--dropdown-text-color: var(--color-on-surface);
	--dropdown-fallback-color: rgba(255, 255, 255, 0.5);

	/* Enhanced shadows for dark theme */
	--dropdown-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px, rgba(0, 0, 0, 0.2) 0px 4px 8px;
	--dropdown-elevated-shadow:
		rgba(0, 0, 0, 0.4) 0px 8px 12px -2px, rgba(0, 0, 0, 0.3) 0px 4px 8px -2px;
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <DropdownWrapper variant="elevated">Dark Theme Dropdown</DropdownWrapper> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic dropdown variants:

```css
/* Success dropdowns */
.dropdown-success {
	--dropdown-bg: var(--color-success);
	--dropdown-border-color: var(--color-success);
	--dropdown-text-color: white;
	--dropdown-focus-color: var(--color-success);
}

/* Warning dropdowns */
.dropdown-warning {
	--dropdown-bg: var(--color-warning);
	--dropdown-border-color: var(--color-warning);
	--dropdown-text-color: white;
	--dropdown-focus-color: var(--color-warning);
}

/* Danger dropdowns */
.dropdown-danger {
	--dropdown-bg: var(--color-danger);
	--dropdown-border-color: var(--color-danger);
	--dropdown-text-color: white;
	--dropdown-focus-color: var(--color-danger);
}

/* Subtle variants */
.dropdown-success-subtle {
	--dropdown-bg: #ecfdf5;
	--dropdown-border-color: var(--color-success);
	--dropdown-text-color: #065f46;
}

.dropdown-warning-subtle {
	--dropdown-bg: #fffbeb;
	--dropdown-border-color: var(--color-warning);
	--dropdown-text-color: #92400e;
}

.dropdown-danger-subtle {
	--dropdown-bg: #fef2f2;
	--dropdown-border-color: var(--color-danger);
	--dropdown-text-color: #991b1b;
}
```

Usage in Svelte:

```svelte
<DropdownWrapper class="dropdown-success">Success Dropdown</DropdownWrapper>
<DropdownWrapper class="dropdown-warning">Warning Dropdown</DropdownWrapper>
<DropdownWrapper class="dropdown-danger">Danger Dropdown</DropdownWrapper>
<DropdownWrapper class="dropdown-success-subtle">Subtle Success</DropdownWrapper>
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.dropdown-compact {
	--dropdown-min-width: 100px;
	--dropdown-max-width: 160px;
	--dropdown-font-size: 0.75rem;
	--dropdown-padding: 0.5rem;
	--dropdown-border-radius: var(--radius-sm);
}

/* Hero size */
.dropdown-hero {
	--dropdown-min-width: 320px;
	--dropdown-max-width: 600px;
	--dropdown-font-size: 1.125rem;
	--dropdown-padding: 1.5rem;
	--dropdown-border-radius: var(--radius-lg);
}

/* Full width (within constraints) */
.dropdown-full {
	--dropdown-min-width: 100%;
	--dropdown-max-width: 100vw;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific dropdown instances:

```css
/* Navigation dropdown styling */
.nav-dropdown {
	--dropdown-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	--dropdown-text-color: white;
	--dropdown-border-radius: var(--radius-full);
	--dropdown-shadow: rgba(102, 126, 234, 0.3) 0px 8px 32px, rgba(118, 75, 162, 0.2) 0px 4px 16px;
}

/* Tooltip-style dropdown */
.tooltip-dropdown {
	--dropdown-bg: #1f2937;
	--dropdown-text-color: #f9fafb;
	--dropdown-border: none;
	--dropdown-border-radius: var(--radius-sm);
	--dropdown-font-size: 0.75rem;
	--dropdown-padding: 0.5rem 0.75rem;
	--dropdown-shadow: rgba(0, 0, 0, 0.25) 0px 4px 12px;
}

/* Menu dropdown */
.menu-dropdown {
	--dropdown-bg: transparent;
	--dropdown-border: 1px solid var(--dropdown-border-color);
	--dropdown-text-color: var(--color-on-surface);
	--dropdown-border-radius: var(--radius-lg);
	--dropdown-backdrop-filter: blur(12px);
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: var(--dropdown-backdrop-filter);
}
```

### 2. State-Specific Overrides

```css
/* Loading state dropdown */
.dropdown-loading {
	--dropdown-bg: var(--color-surface-hover);
	--dropdown-text-color: var(--color-secondary);
	pointer-events: none;
	opacity: 0.7;
}

/* Error state dropdown */
.dropdown-error {
	--dropdown-bg: #fef2f2;
	--dropdown-border-color: var(--color-danger);
	--dropdown-text-color: var(--color-danger);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const dropdownTheme = {
	primary: {
		'--dropdown-bg': '#3b82f6',
		'--dropdown-text-color': 'white',
		'--dropdown-border-color': '#3b82f6'
	},
	secondary: {
		'--dropdown-bg': '#6b7280',
		'--dropdown-text-color': 'white',
		'--dropdown-border-color': '#6b7280'
	},
	glass: {
		'--dropdown-bg': 'rgba(255, 255, 255, 0.1)',
		'--dropdown-text-color': 'inherit',
		'--dropdown-border-color': 'rgba(255, 255, 255, 0.2)',
		'--dropdown-backdrop-filter': 'blur(20px)'
	}
};

// Usage in Svelte component
let theme = 'primary';
$: dropdownStyles = Object.entries(dropdownTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<DropdownWrapper bind:visible={isOpen} anchor={buttonEl} style={dropdownStyles}>
	Dynamic Theme Dropdown
</DropdownWrapper>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive dropdown sizing */
:root {
	--dropdown-min-width-responsive: 120px;
	--dropdown-max-width-responsive: 200px;
	--dropdown-font-size-responsive: 0.75rem;
	--dropdown-padding-responsive: 0.5rem;
}

@media (min-width: 640px) {
	:root {
		--dropdown-min-width-responsive: 160px;
		--dropdown-max-width-responsive: 280px;
		--dropdown-font-size-responsive: 0.875rem;
		--dropdown-padding-responsive: 0.75rem;
	}
}

@media (min-width: 1024px) {
	:root {
		--dropdown-min-width-responsive: 200px;
		--dropdown-max-width-responsive: 360px;
		--dropdown-font-size-responsive: 1rem;
		--dropdown-padding-responsive: 1rem;
	}
}

.dropdown-responsive {
	--dropdown-min-width: var(--dropdown-min-width-responsive);
	--dropdown-max-width: var(--dropdown-max-width-responsive);
	--dropdown-font-size: var(--dropdown-font-size-responsive);
	--dropdown-padding: var(--dropdown-padding-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.dropdown-smooth {
	transition-duration: 300ms;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-bouncy {
	transition-duration: 400ms;
	transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom hover effects */
.dropdown-lift:hover {
	transform: translateY(-2px);
	--dropdown-shadow: rgba(0, 0, 0, 0.1) 0px 8px 16px, rgba(0, 0, 0, 0.06) 0px 4px 8px;
}

.dropdown-glow:hover {
	--dropdown-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1);
}

/* Scale animation override */
.dropdown-scale-up {
	transform-origin: top center;
}

.dropdown-scale-down {
	transform-origin: bottom center;
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to dropdown properties */
:root {
	/* Design System Tokens */
	--ds-color-primary-500: #3b82f6;
	--ds-color-primary-600: #2563eb;
	--ds-color-primary-700: #1d4ed8;
	--ds-space-2: 0.5rem;
	--ds-space-3: 0.75rem;
	--ds-space-4: 1rem;
	--ds-radius-md: 0.5rem;
	--ds-text-sm: 0.875rem;
	--ds-text-base: 1rem;
	--ds-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

	/* DropdownWrapper Mappings */
	--dropdown-bg: var(--ds-color-surface);
	--dropdown-border-color: var(--ds-color-border);
	--dropdown-border-radius: var(--ds-radius-md);
	--dropdown-padding: var(--ds-space-3);
	--dropdown-font-size: var(--ds-text-sm);
	--dropdown-shadow: var(--ds-shadow-md);
	--dropdown-focus-color: var(--ds-color-primary-500);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.dropdown-tailwind {
	@apply bg-white border border-gray-200 rounded-lg shadow-lg;
	--dropdown-bg: theme('colors.white');
	--dropdown-border-color: theme('colors.gray.200');
	--dropdown-text-color: theme('colors.gray.900');
	--dropdown-border-radius: theme('borderRadius.lg');
	--dropdown-shadow: theme('boxShadow.lg');
}

/* Bootstrap Integration */
.dropdown-bootstrap {
	--dropdown-bg: var(--bs-body-bg);
	--dropdown-border-color: var(--bs-border-color);
	--dropdown-text-color: var(--bs-body-color);
	--dropdown-border-radius: var(--bs-border-radius);
	--dropdown-shadow: var(--bs-box-shadow);
}

/* Material Design Integration */
.dropdown-material {
	--dropdown-bg: var(--md-sys-color-surface-container);
	--dropdown-text-color: var(--md-sys-color-on-surface);
	--dropdown-border-radius: 12px;
	--dropdown-shadow:
		0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
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

	/* DropdownWrapper defaults */
	--dropdown-bg: white;
	--dropdown-focus-color: var(--color-primary);
	--dropdown-border-radius: 0.5rem;
	--dropdown-font-size: 0.875rem;
}

/* Semantic variants */
.dropdown-primary {
	--dropdown-bg: var(--color-primary);
	--dropdown-text-color: white;
}
.dropdown-success {
	--dropdown-bg: var(--color-success);
	--dropdown-text-color: white;
}
.dropdown-warning {
	--dropdown-bg: var(--color-warning);
	--dropdown-text-color: white;
}
.dropdown-danger {
	--dropdown-bg: var(--color-danger);
	--dropdown-text-color: white;
}

/* Dark theme */
[data-theme='dark'] {
	--dropdown-bg: #1f2937;
	--dropdown-border-color: rgba(255, 255, 255, 0.1);
	--dropdown-text-color: #f9fafb;
}

/* Responsive sizing */
.dropdown-responsive {
	--dropdown-min-width: clamp(120px, 20vw, 280px);
	--dropdown-max-width: clamp(200px, 40vw, 480px);
}
```

```svelte
<!-- Usage in components -->
<DropdownWrapper class="dropdown-primary">Primary Action</DropdownWrapper>
<DropdownWrapper variant="outlined" class="dropdown-danger">Delete Action</DropdownWrapper>
<DropdownWrapper class="dropdown-success dropdown-responsive">Responsive Success</DropdownWrapper>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
