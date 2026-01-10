# DragLine Component - Global Styling Guide

This guide covers how to customize the DragLine component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The DragLine component uses CSS custom properties that allow you to:

- Create consistent design systems
- Implement dark/light themes
- Customize cursors, opacity, and transitions
- Override styles at different specificity levels

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
	/* Cursor Styles */
	--dragline-cursor-horizontal: ew-resize;
	--dragline-cursor-vertical: ns-resize;

	/* Z-Index */
	--dragline-z-index: 101;

	/* Opacity */
	--dragline-opacity: 1;
	--dragline-hover-opacity: 1;
	--dragline-dragging-opacity: 1;
	--dragline-disabled-opacity: 0.5;

	/* Transitions */
	--dragline-transition: opacity 0.2s ease;
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme='dark'] {
	--dragline-opacity: 0.8;
	--dragline-hover-opacity: 1;
	--dragline-disabled-opacity: 0.3;
}
```

### 2. Custom Cursor Styles

```css
/* Custom resize cursors */
:root {
	--dragline-cursor-horizontal: col-resize;
	--dragline-cursor-vertical: row-resize;
}

/* Move cursor for both directions */
.dragline-move {
	--dragline-cursor-horizontal: move;
	--dragline-cursor-vertical: move;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific DragLine instances:

```css
/* Specific component styling */
.panel-resizer {
	--dragline-opacity: 0.6;
	--dragline-hover-opacity: 1;
	--dragline-z-index: 200;
}

.sidebar-resizer {
	--dragline-cursor-horizontal: col-resize;
	--dragline-opacity: 0.5;
}
```

### 2. State-Specific Overrides

```css
/* Custom dragging state */
.dragline-active {
	--dragline-dragging-opacity: 0.9;
	--dragline-transition: opacity 0.1s ease;
}

/* Custom disabled state */
.dragline-locked {
	--dragline-disabled-opacity: 0.2;
	cursor: not-allowed;
}
```

## Advanced Theming Patterns

### 1. Responsive Theming

```css
/* Mobile-first responsive opacity */
:root {
	--dragline-opacity-mobile: 0.8;
	--dragline-opacity-desktop: 1;
}

.dragline {
	opacity: var(--dragline-opacity-mobile);
}

@media (min-width: 768px) {
	.dragline {
		opacity: var(--dragline-opacity-desktop);
	}
}
```

### 2. Animation Customization

```css
/* Smooth transitions */
.dragline-smooth {
	--dragline-transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Quick transitions */
.dragline-fast {
	--dragline-transition: opacity 0.1s ease;
}

/* No transitions */
.dragline-instant {
	--dragline-transition: none;
}
```

### 3. Visual Feedback

```css
/* Hover effect with background */
.dragline-with-bg {
	--dragline-opacity: 0.3;
	--dragline-hover-opacity: 0.6;
	background: rgba(59, 130, 246, 0.1);
	transition:
		background 0.2s ease,
		opacity 0.2s ease;
}

.dragline-with-bg:hover {
	background: rgba(59, 130, 246, 0.2);
}

/* Border highlight on hover */
.dragline-border {
	border: 2px solid transparent;
	transition: border-color 0.2s ease;
}

.dragline-border:hover {
	border-color: var(--color-primary, #3b82f6);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to DragLine properties */
:root {
	/* Design System Tokens */
	--ds-z-index-overlay: 1000;
	--ds-z-index-modal: 2000;
	--ds-opacity-disabled: 0.5;
	--ds-transition-fast: 0.15s ease;

	/* DragLine Mappings */
	--dragline-z-index: var(--ds-z-index-overlay);
	--dragline-disabled-opacity: var(--ds-opacity-disabled);
	--dragline-transition: opacity var(--ds-transition-fast);
}
```

### 2. Component Library Integration

```css
/* Tailwind CSS Integration */
.dragline-tailwind {
	--dragline-opacity: theme('opacity.60');
	--dragline-hover-opacity: theme('opacity.100');
	--dragline-z-index: theme('zIndex.50');
}

/* Bootstrap Integration */
.dragline-bootstrap {
	--dragline-z-index: var(--bs-zindex-dropdown);
	--dragline-opacity: var(--bs-opacity);
}
```

## Complete Example

Here's a complete example integrating all concepts:

```css
/* Global theme setup */
:root {
	/* Design tokens */
	--color-primary: #3b82f6;
	--opacity-default: 1;
	--opacity-hover: 0.9;
	--opacity-disabled: 0.5;

	/* DragLine defaults */
	--dragline-cursor-horizontal: ew-resize;
	--dragline-cursor-vertical: ns-resize;
	--dragline-z-index: 101;
	--dragline-opacity: var(--opacity-default);
	--dragline-hover-opacity: var(--opacity-hover);
	--dragline-disabled-opacity: var(--opacity-disabled);
	--dragline-transition: opacity 0.2s ease;
}

/* Dark theme */
[data-theme='dark'] {
	--dragline-opacity: 0.8;
	--dragline-hover-opacity: 1;
	--dragline-disabled-opacity: 0.3;
}

/* Custom variants */
.dragline-primary {
	--dragline-opacity: 0.6;
	--dragline-hover-opacity: 0.9;
}

.dragline-subtle {
	--dragline-opacity: 0.3;
	--dragline-hover-opacity: 0.6;
}
```

```svelte
<!-- Usage in components -->
<DragLine className="dragline-primary">
	<div class="drag-handle">Primary dragline</div>
</DragLine>

<DragLine className="dragline-subtle" disabled={isLocked}>
	<div class="drag-handle">Subtle dragline</div>
</DragLine>
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep opacity, transitions, and z-index consistent across your design system
4. **Test Accessibility**: Ensure sufficient visual feedback in all themes
5. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage
6. **Performance**: Minimize the number of custom properties to avoid performance issues

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
