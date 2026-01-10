# SidebarWrapper Component - Global Styling Guide

This guide covers how to customize the SidebarWrapper component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The SidebarWrapper component uses an extensive system of CSS custom properties that allow you to:

- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and transitions
- Override styles at different specificity levels
- Control drag handle appearance and behavior

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
	/* Color Palette */
	--color-primary: #3b82f6;
	--color-primary-hover: #2563eb;
	--color-primary-active: #1d4ed8;

	--color-surface: #ffffff;
	--color-surface-secondary: #f9fafb;
	--color-on-surface: #111827;

	--color-border: #d1d5db;
	--color-border-light: #e5e7eb;

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
}
```

### 2. SidebarWrapper-Specific Global Styles

Override SidebarWrapper component defaults globally:

```css
:root {
	/* === SIDEBAR BASE === */
	--sidebar-bg: var(--color-surface, #ffffff);
	--sidebar-border-color: var(--color-border, #d1d5db);
	--sidebar-transition-duration: 300ms;

	/* === DRAG HANDLE === */
	--sidebar-drag-handle-width: 8px;
	--sidebar-drag-handle-z-index: 10;
	--sidebar-drag-handle-bg: #ffffff;
	--sidebar-drag-handle-border: 1px solid
		var(--sidebar-drag-handle-border-color, rgba(59, 130, 246, 0.2));
	--sidebar-drag-handle-border-color: var(--color-primary-200, rgba(59, 130, 246, 0.2));
	--sidebar-drag-handle-line-color: var(--color-primary-200, rgba(59, 130, 246, 0.2));
	--sidebar-drag-handle-transition: opacity 0.3s;
	--sidebar-drag-handle-hover-opacity: 1;

	/* === DRAG OVERLAY === */
	--sidebar-drag-overlay-z-index: 100;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--sidebar-bg: #1f2937;
	--sidebar-border-color: #374151;
	--sidebar-drag-handle-bg: #1f2937;
	--sidebar-drag-handle-border-color: rgba(59, 130, 246, 0.3);
	--sidebar-drag-handle-line-color: rgba(59, 130, 246, 0.3);
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <SidebarWrapper> */
/*     <nav>Dark Theme Sidebar</nav> */
/*   </SidebarWrapper> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic sidebar variants:

```css
/* Primary sidebar */
.sidebar-primary {
	--sidebar-bg: var(--color-primary);
	--sidebar-border-color: var(--color-primary-hover);
	--sidebar-drag-handle-border-color: rgba(255, 255, 255, 0.3);
	--sidebar-drag-handle-line-color: rgba(255, 255, 255, 0.3);
}

/* Secondary sidebar */
.sidebar-secondary {
	--sidebar-bg: var(--color-surface-secondary, #f9fafb);
	--sidebar-border-color: var(--color-border-light, #e5e7eb);
	--sidebar-drag-handle-bg: var(--color-surface-secondary, #f9fafb);
}

/* Accent sidebar */
.sidebar-accent {
	--sidebar-bg: linear-gradient(to bottom, #667eea, #764ba2);
	--sidebar-border-color: transparent;
	--sidebar-drag-handle-bg: rgba(255, 255, 255, 0.1);
	--sidebar-drag-handle-border-color: rgba(255, 255, 255, 0.3);
	--sidebar-drag-handle-line-color: rgba(255, 255, 255, 0.3);
}
```

Usage in Svelte:

```svelte
<SidebarWrapper sidebarClassName="sidebar-primary">
	<nav>Primary Sidebar</nav>
</SidebarWrapper>

<SidebarWrapper sidebarClassName="sidebar-secondary">
	<nav>Secondary Sidebar</nav>
</SidebarWrapper>

<SidebarWrapper sidebarClassName="sidebar-accent">
	<nav>Accent Sidebar</nav>
</SidebarWrapper>
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact sidebar */
.sidebar-compact {
	--sidebar-transition-duration: 200ms;
	--sidebar-drag-handle-width: 6px;
}

/* Wide sidebar */
.sidebar-wide {
	--sidebar-drag-handle-width: 12px;
	--sidebar-drag-handle-bg: var(--color-surface-secondary);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific sidebar instances:

```css
/* Navigation sidebar */
.nav-sidebar {
	--sidebar-bg: #1e293b;
	--sidebar-border-color: #334155;
	--sidebar-drag-handle-bg: #1e293b;
	--sidebar-drag-handle-border-color: rgba(148, 163, 184, 0.3);
	--sidebar-drag-handle-line-color: rgba(148, 163, 184, 0.3);
}

/* Settings sidebar */
.settings-sidebar {
	--sidebar-bg: var(--color-surface-secondary);
	--sidebar-border-color: var(--color-border);
	--sidebar-drag-handle-bg: var(--color-surface-secondary);
}
```

### 2. State-Specific Overrides

```css
/* Collapsed state styling */
.sidebar--collapsed {
	--sidebar-bg: var(--color-surface-secondary);
}

/* Draggable state styling */
.sidebar--draggable {
	--sidebar-border-color: var(--color-primary);
}

/* Custom collapsed variant */
.sidebar-minimal.sidebar--collapsed {
	--sidebar-bg: transparent;
	--sidebar-border-color: transparent;
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const sidebarTheme = {
	dark: {
		'--sidebar-bg': '#1f2937',
		'--sidebar-border-color': '#374151',
		'--sidebar-drag-handle-bg': '#1f2937',
		'--sidebar-drag-handle-border-color': 'rgba(59, 130, 246, 0.3)',
		'--sidebar-drag-handle-line-color': 'rgba(59, 130, 246, 0.3)'
	},
	light: {
		'--sidebar-bg': '#ffffff',
		'--sidebar-border-color': '#d1d5db',
		'--sidebar-drag-handle-bg': '#ffffff',
		'--sidebar-drag-handle-border-color': 'rgba(59, 130, 246, 0.2)',
		'--sidebar-drag-handle-line-color': 'rgba(59, 130, 246, 0.2)'
	}
};

// Usage in Svelte component
let theme = 'light';
$: sidebarStyles = Object.entries(sidebarTheme[theme])
	.map(([key, value]) => `${key}: ${value}`)
	.join('; ');
```

```svelte
<SidebarWrapper sidebarStyle={sidebarStyles}>
	<nav>Dynamic Theme Sidebar</nav>
</SidebarWrapper>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive sidebar */
:root {
	--sidebar-transition-duration-responsive: 200ms;
	--sidebar-drag-handle-width-responsive: 6px;
}

@media (min-width: 640px) {
	:root {
		--sidebar-transition-duration-responsive: 300ms;
		--sidebar-drag-handle-width-responsive: 8px;
	}
}

@media (min-width: 1024px) {
	:root {
		--sidebar-transition-duration-responsive: 400ms;
		--sidebar-drag-handle-width-responsive: 10px;
	}
}

.sidebar-responsive {
	--sidebar-transition-duration: var(--sidebar-transition-duration-responsive);
	--sidebar-drag-handle-width: var(--sidebar-drag-handle-width-responsive);
}
```

### 3. Animation Customization

```css
/* Smooth transitions */
.sidebar-smooth {
	--sidebar-transition-duration: 500ms;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Instant transitions */
.sidebar-instant {
	--sidebar-transition-duration: 0ms;
}

/* Bouncy transitions */
.sidebar-bouncy {
	--sidebar-transition-duration: 400ms;
	transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Custom drag handle hover effects */
.sidebar-glow .sidebar__drag-handle:hover {
	box-shadow: 0 0 10px var(--color-primary);
}

.sidebar-lift .sidebar__drag-handle:hover {
	transform: translateX(-2px);
}
```

### 4. Drag Handle Customization

```css
/* Minimal drag handle */
.sidebar-minimal-handle {
	--sidebar-drag-handle-width: 4px;
	--sidebar-drag-handle-bg: transparent;
	--sidebar-drag-handle-border: none;
	--sidebar-drag-handle-line-color: var(--color-border);
}

/* Prominent drag handle */
.sidebar-prominent-handle {
	--sidebar-drag-handle-width: 12px;
	--sidebar-drag-handle-bg: var(--color-primary);
	--sidebar-drag-handle-border: 2px solid var(--color-primary-hover);
	--sidebar-drag-handle-line-color: #ffffff;
	--sidebar-drag-handle-hover-opacity: 0.9;
}

/* Invisible drag handle (still functional) */
.sidebar-invisible-handle {
	--sidebar-drag-handle-width: 8px;
	--sidebar-drag-handle-bg: transparent;
	--sidebar-drag-handle-border: none;
	--sidebar-drag-handle-line-color: transparent;
}

.sidebar-invisible-handle .sidebar__drag-handle:hover {
	--sidebar-drag-handle-bg: rgba(0, 0, 0, 0.05);
	--sidebar-drag-handle-line-color: var(--color-border);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to SidebarWrapper properties */
:root {
	/* Design System Tokens */
	--ds-color-surface: #ffffff;
	--ds-color-border: #e5e7eb;
	--ds-spacing-unit: 0.25rem;
	--ds-transition-base: 200ms;

	/* SidebarWrapper Mappings */
	--sidebar-bg: var(--ds-color-surface);
	--sidebar-border-color: var(--ds-color-border);
	--sidebar-transition-duration: var(--ds-transition-base);
	--sidebar-drag-handle-width: calc(var(--ds-spacing-unit) * 2);
}
```

### 2. Component Library Integration

```css
/* Tailwind CSS Integration */
.sidebar-tailwind {
	@apply bg-white border-r border-gray-200;
	--sidebar-bg: theme('colors.white');
	--sidebar-border-color: theme('colors.gray.200');
	--sidebar-drag-handle-bg: theme('colors.white');
	--sidebar-drag-handle-border-color: theme('colors.blue.200');
}

/* Material Design Integration */
.sidebar-material {
	--sidebar-bg: var(--mdc-theme-surface);
	--sidebar-border-color: var(--mdc-theme-outline);
	--sidebar-drag-handle-bg: var(--mdc-theme-surface);
	--sidebar-transition-duration: 250ms;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Complete CSS Custom Properties Reference

### Sidebar Base

| Property                        | Default                         | Description               |
| ------------------------------- | ------------------------------- | ------------------------- |
| `--sidebar-bg`                  | `var(--color-surface, #ffffff)` | Background color          |
| `--sidebar-border-color`        | `var(--color-border, #d1d5db)`  | Border color              |
| `--sidebar-transition-duration` | `300ms`                         | Width transition duration |

### Drag Handle

| Property                              | Default                                                  | Description            |
| ------------------------------------- | -------------------------------------------------------- | ---------------------- |
| `--sidebar-drag-handle-width`         | `8px`                                                    | Width of drag handle   |
| `--sidebar-drag-handle-z-index`       | `10`                                                     | Z-index of drag handle |
| `--sidebar-drag-handle-bg`            | `#ffffff`                                                | Background color       |
| `--sidebar-drag-handle-border`        | `1px solid var(--sidebar-drag-handle-border-color, ...)` | Border style           |
| `--sidebar-drag-handle-border-color`  | `var(--color-primary-200, rgba(59, 130, 246, 0.2))`      | Border color           |
| `--sidebar-drag-handle-line-color`    | `var(--color-primary-200, rgba(59, 130, 246, 0.2))`      | Line color             |
| `--sidebar-drag-handle-transition`    | `opacity 0.3s`                                           | Transition property    |
| `--sidebar-drag-handle-hover-opacity` | `1`                                                      | Opacity on hover       |

### Drag Overlay

| Property                         | Default | Description             |
| -------------------------------- | ------- | ----------------------- |
| `--sidebar-drag-overlay-z-index` | `100`   | Z-index of drag overlay |

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance

   ```css
   .nav-sidebar {
   	/* Good */
   }
   .blue-sidebar {
   	/* Avoid */
   }
   ```

2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles

   ```css
   :root {
   	/* Global defaults */
   }
   [data-theme='dark'] {
   	/* Theme overrides */
   }
   .nav-sidebar {
   	/* Component-specific */
   }
   ```

3. **Maintain Consistency**: Keep colors, spacing, and transitions consistent across your design system

   ```css
   :root {
   	--sidebar-transition-duration: var(--transition-base, 300ms);
   	--sidebar-bg: var(--color-surface, #ffffff);
   }
   ```

4. **Test Accessibility**: Ensure sufficient color contrast and visible drag handles in all themes

   ```css
   [data-theme='dark'] {
   	--sidebar-drag-handle-line-color: rgba(255, 255, 255, 0.5); /* High contrast */
   }
   ```

5. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage

6. **Performance**: Minimize the number of custom properties to avoid performance issues

## Complete Example

Here's a complete example integrating all concepts:

```css
/* Global theme setup */
:root {
	/* Design tokens */
	--color-primary: #3b82f6;
	--color-surface: #ffffff;
	--color-border: #d1d5db;

	/* SidebarWrapper defaults */
	--sidebar-bg: var(--color-surface);
	--sidebar-border-color: var(--color-border);
	--sidebar-transition-duration: 300ms;
	--sidebar-drag-handle-width: 8px;
	--sidebar-drag-handle-bg: var(--color-surface);
	--sidebar-drag-handle-border-color: rgba(59, 130, 246, 0.2);
	--sidebar-drag-handle-line-color: rgba(59, 130, 246, 0.2);
}

/* Dark theme */
[data-theme='dark'] {
	--sidebar-bg: #1f2937;
	--sidebar-border-color: #374151;
	--sidebar-drag-handle-bg: #1f2937;
	--sidebar-drag-handle-border-color: rgba(59, 130, 246, 0.3);
	--sidebar-drag-handle-line-color: rgba(59, 130, 246, 0.3);
}

/* Semantic variants */
.sidebar-primary {
	--sidebar-bg: var(--color-primary);
	--sidebar-drag-handle-border-color: rgba(255, 255, 255, 0.3);
	--sidebar-drag-handle-line-color: rgba(255, 255, 255, 0.3);
}

.sidebar-minimal {
	--sidebar-drag-handle-width: 4px;
	--sidebar-drag-handle-bg: transparent;
	--sidebar-drag-handle-border: none;
}
```

```svelte
<!-- Usage in components -->
<SidebarWrapper sidebarClassName="sidebar-primary">
	<nav>Primary Sidebar</nav>
</SidebarWrapper>

<SidebarWrapper sidebarClassName="sidebar-minimal">
	<nav>Minimal Sidebar</nav>
</SidebarWrapper>

<div data-theme="dark">
	<SidebarWrapper>
		<nav>Dark Theme Sidebar</nav>
	</SidebarWrapper>
</div>
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
