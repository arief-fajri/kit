# Drawer Component - Global Styling Guide

This guide covers how to customize the Drawer component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The Drawer component uses CSS custom properties that allow you to:

- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and dimensions
- Override styles at different specificity levels

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
	/* Color Palette */
	--color-primary: #3b82f6;
	--color-primary-200: #bfdbfe;
	--color-surface: #ffffff;
	--color-surface-secondary: #f6f6f6;

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
	--radius-xl: 0.75rem;
}
```

### 2. Drawer-Specific Global Styles

Override Drawer component defaults globally:

```css
:root {
	/* === OVERLAY === */
	--drawer-overlay-bg: rgba(55, 53, 60, 0.5);
	--drawer-overlay-blur: 4px;
	--drawer-overlay-z-index: 1000;

	/* === PANEL === */
	--drawer-z-index: 1000;
	--drawer-min-width: 320px;
	--drawer-max-width: 90%;
	--drawer-min-height: 4rem;
	--drawer-border-radius: 12px;

	/* === DRAG HANDLE === */
	--drawer-handle-width: 6px;
	--color-primary-200: #bfdbfe;
}
```

## Component-Level Overrides

Override styles for a specific drawer instance:

```svelte
<Drawer visible={isOpen} className="my-drawer">
	<div>Content</div>
</Drawer>
```

```css
.my-drawer {
	--drawer-border-radius: 16px;
	--drawer-min-width: 400px;
}
```

## Custom Properties Reference

### Overlay Properties

| Property                   | Default                 | Description              |
| -------------------------- | ----------------------- | ------------------------ |
| `--drawer-overlay-bg`      | `rgba(55, 53, 60, 0.5)` | Overlay background color |
| `--drawer-overlay-blur`    | `4px`                   | Backdrop blur amount     |
| `--drawer-overlay-z-index` | `1000`                  | Overlay z-index          |

### Panel Properties

| Property                 | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| `--drawer-z-index`       | `1000`  | Panel z-index                          |
| `--drawer-min-width`     | `320px` | Minimum panel width                    |
| `--drawer-max-width`     | `90%`   | Maximum panel width                    |
| `--drawer-min-height`    | `4rem`  | Minimum panel height                   |
| `--drawer-border-radius` | `12px`  | Border radius for top/bottom positions |

### Drag Handle Properties

| Property                | Default   | Description               |
| ----------------------- | --------- | ------------------------- |
| `--drawer-handle-width` | `6px`     | Width of drag handle      |
| `--color-primary-200`   | `#bfdbfe` | Color of handle indicator |

## Theming Examples

### Dark Theme

```css
:root {
	--drawer-overlay-bg: rgba(0, 0, 0, 0.7);
	--color-surface: #1a1a1a;
	--color-surface-secondary: #2a2a2a;
}
```

### Custom Brand Colors

```css
:root {
	--drawer-overlay-bg: rgba(59, 130, 246, 0.3);
	--color-primary-200: #93c5fd;
	--drawer-border-radius: 16px;
}
```

### Minimal Style

```css
:root {
	--drawer-overlay-bg: rgba(0, 0, 0, 0.2);
	--drawer-overlay-blur: 0px;
	--drawer-border-radius: 0px;
}
```

## Position-Specific Styling

The drawer automatically applies position-specific classes:

- `.drawer-panel--top` - Top position
- `.drawer-panel--bottom` - Bottom position
- `.drawer-panel--left` - Left position
- `.drawer-panel--right` - Right position
- `.drawer-panel--center` - Center position

You can target specific positions:

```css
.drawer-panel--top {
	--drawer-border-radius: 0px;
}

.drawer-panel--right {
	--drawer-min-width: 400px;
}
```

## Advanced Customization

### Custom Drag Handle

The drag handle uses the `--color-primary-200` variable. Override it for custom styling:

```css
.my-drawer .drawer-handle-line {
	background: #your-color;
	width: 2px;
	height: 32px;
}
```

### Custom Overlay

```css
.my-drawer-overlay {
	--drawer-overlay-bg: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
	--drawer-overlay-blur: 8px;
}
```

## Integration with Design System

The Drawer component integrates with the global design system tokens from `default-style.css`:

```css
:root {
	/* Uses global tokens */
	--drawer-overlay-bg: rgba(55, 53, 60, 0.5);
	--color-primary-200: var(--color-primary-200, #bfdbfe);
}
```

Override at the component level or globally as needed for your design system.
