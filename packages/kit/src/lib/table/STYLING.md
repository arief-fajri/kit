# Table Component - Global Styling Guide

This guide covers how to customize the Table component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Table component uses CSS custom properties that allow you to:

- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and interactive states
- Override styles at different specificity levels

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
	/* Color Palette */
	--color-primary: #05ac69;
	--color-primary-hover: #048a56;
	--color-error: #ef4444;

	--color-surface: #ffffff;
	--color-surface-hover: #f3f4f6;
	--color-surface-secondary: #f9fafb;
	--color-text: #111827;
	--color-text-secondary: #6b7280;
	--color-border: #e5e7eb;

	/* Spacing */
	--spacing-4: 1rem;
	--spacing-6: 1.5rem;

	/* Border Radius */
	--radius-lg: 0.5rem;
}
```

### 2. Table-Specific Global Styles

Override Table component defaults globally:

```css
:root {
	/* === TABLE LISTING === */
	--table-listing-hover-bg: var(--color-surface-hover, #f3f4f6);
	--table-listing-selected-bg: var(--color-surface-secondary, #f9fafb);
	--table-listing-transition: background-color 150ms ease-in-out;

	/* === SORT HEADER === */
	--sort-header-bg: transparent;
	--sort-header-bg-hover: var(--color-surface-hover, #f3f4f6);
	--sort-header-text-color: var(--color-text, #111827);
	--sort-header-text-color-hover: var(--color-text, #111827);
	--sort-header-icon-color: var(--color-text-muted, #9ca3af);
	--sort-header-icon-color-hover: var(--color-text-secondary, #6b7280);
	--sort-header-icon-color-active: var(--color-text, #111827);
	--sort-header-padding-x: 0.75rem;
	--sort-header-padding-y: 0.5rem;
	--sort-header-gap: 0.25rem;
	--sort-header-transition-duration: 200ms;
	--sort-header-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);

	/* === FONT WEIGHTS === */
	--font-weight-medium: 500;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--color-surface: #1f2937;
	--color-surface-hover: #374151;
	--color-surface-secondary: #111827;
	--color-text: #f9fafb;
	--color-text-secondary: #9ca3af;
	--color-border: #374151;

	/* Dark theme table overrides */
	--table-listing-hover-bg: #374151;
	--table-listing-selected-bg: #111827;
	--sort-header-bg-hover: #374151;
	--sort-header-text-color: #f9fafb;
	--sort-header-text-color-hover: #ffffff;
	--sort-header-icon-color: #6b7280;
	--sort-header-icon-color-hover: #9ca3af;
	--sort-header-icon-color-active: #f9fafb;
}
```

### 2. Brand Color Variants

Create semantic table variants:

```css
/* Primary table */
.table-primary {
	--table-listing-hover-bg: rgba(5, 172, 105, 0.1);
	--table-listing-selected-bg: rgba(5, 172, 105, 0.15);
	--sort-header-icon-color-active: var(--color-primary);
}

/* Striped table */
.table-striped tbody tr:nth-child(even) {
	background-color: var(--color-surface-secondary, #f9fafb);
}

/* Bordered table */
.table-bordered {
	--table-listing-border: 1px solid var(--color-border);
}

.table-bordered .table-listing__table {
	border: var(--table-listing-border);
}

.table-bordered .table-listing__table th,
.table-bordered .table-listing__table td {
	border: 1px solid var(--color-border);
}
```

Usage in Svelte:

```svelte
<TableListing {columns} {data} tableContainerClass="table-primary" />
```

### 3. Row State Variants

```css
/* Hover variants */
.table-hover-none .table-row--hoverable:hover {
	background-color: transparent;
}

.table-hover-primary .table-row--hoverable:hover {
	background-color: rgba(5, 172, 105, 0.1);
}

/* Selection variants */
.table-selection-primary .table-row--selected {
	background-color: rgba(5, 172, 105, 0.15);
	border-left: 3px solid var(--color-primary);
}

.table-selection-accent .table-row--selected {
	background-color: rgba(59, 130, 246, 0.15);
	border-left: 3px solid #3b82f6;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific table instances:

```css
/* Dashboard tables */
.dashboard-table {
	--table-listing-hover-bg: rgba(5, 172, 105, 0.05);
	--table-listing-selected-bg: rgba(5, 172, 105, 0.1);
}

.dashboard-table .table-listing__table {
	border-radius: 0.75rem;
	overflow: hidden;
}

/* Compact tables */
.compact-table {
	--sort-header-padding-x: 0.5rem;
	--sort-header-padding-y: 0.375rem;
}

.compact-table .table-listing__table td {
	padding: 0.5rem;
}

/* Minimal tables */
.minimal-table {
	--table-listing-hover-bg: transparent;
	--table-listing-selected-bg: rgba(0, 0, 0, 0.02);
}

.minimal-table .table-listing__table {
	border: none;
}

.minimal-table .table-listing__header {
	border-bottom: 1px solid var(--color-border);
}
```

### 2. Interactive States

```css
/* Custom hover effects */
.table-lift .table-row--hoverable:hover {
	transform: translateY(-1px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-glow .table-row--selected {
	box-shadow: 0 0 0 2px rgba(5, 172, 105, 0.2);
}

/* Custom clickable effects */
.table-bounce .table-row--clickable:active {
	transform: scale(0.98);
}

/* Custom drag and drop effects */
.table-drag-highlight .table-row--dragging {
	opacity: 0.3;
	transform: scale(0.95);
}

.table-drag-highlight .table-row--drag-over {
	border-top: 3px solid var(--color-primary);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const tableTheme = {
	primary: {
		'--table-listing-hover-bg': 'rgba(5, 172, 105, 0.1)',
		'--table-listing-selected-bg': 'rgba(5, 172, 105, 0.15)',
		'--color-primary': '#05ac69'
	},
	secondary: {
		'--table-listing-hover-bg': 'rgba(59, 130, 246, 0.1)',
		'--table-listing-selected-bg': 'rgba(59, 130, 246, 0.15)',
		'--color-primary': '#3b82f6'
	}
};

// Usage in Svelte component
let theme = 'primary';
$: tableStyles = Object.entries(tableTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<TableListing
	{columns}
	{data}
	cssVariables={Object.fromEntries(
		Object.entries(tableTheme[theme]).map(([key, value]) => [key.replace('--', ''), value])
	)}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive table styling */
:root {
	--table-listing-padding-mobile: 0.5rem;
	--table-listing-padding-desktop: 1rem;
	--sort-header-padding-x-mobile: 0.5rem;
	--sort-header-padding-x-desktop: 0.75rem;
}

@media (max-width: 640px) {
	.table-listing__table td,
	.table-listing__table th {
		padding: var(--table-listing-padding-mobile);
	}

	.sort-header__content {
		padding: var(--sort-header-padding-y) var(--sort-header-padding-x-mobile);
	}
}

@media (min-width: 641px) {
	.table-listing__table td,
	.table-listing__table th {
		padding: var(--table-listing-padding-desktop);
	}

	.sort-header__content {
		padding: var(--sort-header-padding-y) var(--sort-header-padding-x-desktop);
	}
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.table-smooth {
	--table-listing-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.table-fast {
	--table-listing-transition: background-color 100ms ease-in-out;
	--sort-header-transition-duration: 100ms;
}

/* Custom row animations */
.table-fade-in tbody tr {
	animation: fadeInRow 0.3s ease-in-out;
}

@keyframes fadeInRow {
	from {
		opacity: 0;
		transform: translateY(-5px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to table properties */
:root {
	/* Design System Tokens */
	--ds-color-primary-500: #05ac69;
	--ds-color-surface-100: #ffffff;
	--ds-color-surface-200: #f9fafb;
	--ds-color-surface-300: #f3f4f6;
	--ds-space-4: 1rem;
	--ds-space-6: 1.5rem;

	/* Table Mappings */
	--table-listing-hover-bg: var(--ds-color-surface-300);
	--table-listing-selected-bg: var(--ds-color-surface-200);
	--color-primary: var(--ds-color-primary-500);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.table-tailwind {
	@apply bg-white rounded-lg border border-gray-200;
	--table-listing-hover-bg: theme('colors.gray.50');
	--table-listing-selected-bg: theme('colors.blue.50');
	--color-primary: theme('colors.blue.500');
}

/* Bootstrap Integration */
.table-bootstrap {
	--table-listing-hover-bg: var(--bs-table-hover-bg);
	--table-listing-selected-bg: var(--bs-table-active-bg);
	--color-primary: var(--bs-primary);
}
```

## SortHeader Component Styling

The SortHeader component has its own CSS custom properties:

```css
:root {
	/* Sort Header Colors */
	--sort-header-bg: transparent;
	--sort-header-bg-hover: var(--color-surface-hover, #f3f4f6);
	--sort-header-text-color: var(--color-text, #111827);
	--sort-header-text-color-hover: var(--color-text, #111827);
	--sort-header-icon-color: var(--color-text-muted, #9ca3af);
	--sort-header-icon-color-hover: var(--color-text-secondary, #6b7280);
	--sort-header-icon-color-active: var(--color-text, #111827);

	/* Sort Header Spacing */
	--sort-header-padding-x: 0.75rem;
	--sort-header-padding-y: 0.5rem;
	--sort-header-gap: 0.25rem;

	/* Sort Header Transitions */
	--sort-header-transition-duration: 200ms;
	--sort-header-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Custom SortHeader Variants

```css
/* Primary sort header */
.sort-header-primary {
	--sort-header-icon-color-active: var(--color-primary);
	--sort-header-bg-hover: rgba(5, 172, 105, 0.1);
}

/* Minimal sort header */
.sort-header-minimal {
	--sort-header-bg-hover: transparent;
	--sort-header-icon-color: transparent;
}

.sort-header-minimal:hover {
	--sort-header-icon-color: var(--sort-header-icon-color-hover);
}
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and transitions consistent across your design system
4. **Test Accessibility**: Ensure sufficient color contrast and focus indicators in all themes
5. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage
6. **Performance**: Minimize the number of custom properties to avoid performance issues
7. **Row States**: Use distinct colors for hover, selected, and drag states to maintain clarity

## Complete Example

Here's a complete example integrating all concepts:

```css
/* Global theme setup */
:root {
	/* Design tokens */
	--color-primary: #05ac69;
	--color-surface: #ffffff;
	--color-surface-hover: #f3f4f6;
	--color-surface-secondary: #f9fafb;

	/* Table defaults */
	--table-listing-hover-bg: var(--color-surface-hover);
	--table-listing-selected-bg: var(--color-surface-secondary);
	--sort-header-bg-hover: var(--color-surface-hover);
}

/* Semantic variants */
.table-primary {
	--table-listing-hover-bg: rgba(5, 172, 105, 0.1);
	--table-listing-selected-bg: rgba(5, 172, 105, 0.15);
}
.table-striped tbody tr:nth-child(even) {
	background-color: var(--color-surface-secondary);
}

/* Dark theme */
[data-theme='dark'] {
	--table-listing-hover-bg: #374151;
	--table-listing-selected-bg: #111827;
	--sort-header-bg-hover: #374151;
}
```

```svelte
<!-- Usage in components -->
<TableListing
	{columns}
	{data}
	tableContainerClass="table-primary table-striped"
	enableHover={true}
	selectable={true}
/>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
