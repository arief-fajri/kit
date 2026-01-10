# DragLine Component

A reusable drag detection component for Svelte applications. DragLine provides a low-level drag detection system that emits events with position data, allowing parent components to handle positioning and layout logic.

## Features

- 🖱️ **Mouse & Touch Support**: Works with both mouse and touch events
- 📏 **Tolerance Threshold**: Prevents accidental drags with configurable tolerance
- 🎯 **Orientation Support**: Horizontal and vertical drag modes
- ♿ **Accessibility**: ARIA attributes for screen readers
- 🎨 **Theming**: CSS custom properties for easy styling
- 🔧 **TypeScript**: Full type safety with comprehensive interfaces
- 🧹 **Cleanup**: Automatic event listener cleanup on component destroy

## User Interface Structure

The DragLine component renders as a flexible wrapper container that detects drag gestures and emits events. It uses a slot-based architecture allowing any content to be placed inside as the drag handle.

```
<div
  class="dragline {className}"
  class:dragging={isDragging}
  class:isVertical={isVertical}
  class:disabled={disabled}
  role="separator"
  aria-orientation="{horizontal|vertical}"
  aria-label="{ariaLabel}"
  aria-disabled={disabled}
>
  └── <slot />
      └── [User-provided drag handle content]
```

### Layout Behavior

- **Container**: Relative positioning with full width and height to fill parent
- **Content Flow**: Slot-based content allows any element to serve as drag handle
- **State Classes**: Dynamic classes applied based on drag state (dragging, isVertical, disabled)
- **Event Handling**: Document-level event listeners ensure drag continues even if cursor leaves element
- **Responsive**: Adapts to parent container dimensions while maintaining drag detection area

## Basic Usage

```svelte
<script>
	import { DragLine } from '@rief/kit';

	let drawerWidth = '400px';
	let initialWidth = 400;

	function handleDragStart(e) {
		initialWidth = e.detail.elem.offsetWidth;
	}

	function handleDragging(e) {
		drawerWidth = initialWidth - e.detail.diffX + 'px';
	}
</script>

<DragLine
	on:dragstart={handleDragStart}
	on:dragging={handleDragging}
	on:dragstop={() => console.log('Drag stopped')}
>
	<div class="drag-handle">Drag me</div>
</DragLine>
```

## Props

### Core Props

| Prop                                                        | Type | Default | Description |
| ----------------------------------------------------------- | ---- | ------- | ----------- |
| _(No core props - DragLine uses only styling and behavior)_ |      |         |             |

### Styling Props (`styling` object)

| Prop                | Type     | Default | Description                 |
| ------------------- | -------- | ------- | --------------------------- |
| `styling.className` | `string` | `""`    | Additional CSS classes      |
| `styling.style`     | `string` | `""`    | Additional inline styles    |
| `styling.zIndex`    | `number` | `101`   | Z-index of the drag element |

### Behavior Props (`behavior` object)

| Prop                  | Type      | Default | Description                                   |
| --------------------- | --------- | ------- | --------------------------------------------- |
| `behavior.disabled`   | `boolean` | `false` | Disable drag functionality                    |
| `behavior.tolerance`  | `number`  | `0`     | Minimum movement in pixels before drag starts |
| `behavior.isVertical` | `boolean` | `false` | Vertical drag orientation (changes cursor)    |

### Accessibility Props

| Prop              | Type     | Default     | Description                 |
| ----------------- | -------- | ----------- | --------------------------- |
| `ariaLabel`       | `string` | `undefined` | Accessibility label         |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference |

## Events

The DragLine component dispatches three events:

### dragstart

Dispatched when drag operation begins (after tolerance threshold is met).

```svelte
<DragLine
	on:dragstart={(e) => {
		console.log('Drag started', e.detail);
		// e.detail.event - Original MouseEvent or TouchEvent
		// e.detail.elem - HTMLElement reference
	}}
/>
```

### dragging

Dispatched continuously during drag movement.

```svelte
<DragLine
	on:dragging={(e) => {
		console.log('Dragging', e.detail);
		// e.detail.event - Original MouseEvent or TouchEvent
		// e.detail.elem - HTMLElement reference
		// e.detail.diffX - Horizontal movement delta from start
		// e.detail.diffY - Vertical movement delta from start
	}}
/>
```

### dragstop

Dispatched when drag operation ends.

```svelte
<DragLine
	on:dragstop={(e) => {
		console.log('Drag stopped', e.detail);
		// e.detail.event - Original MouseEvent or TouchEvent
		// e.detail.elem - HTMLElement reference
	}}
/>
```

## Orientation

### Horizontal (Default)

```svelte
<DragLine>
	<div class="drag-handle">Horizontal drag</div>
</DragLine>
```

### Vertical

```svelte
<DragLine behavior={{ isVertical: true }}>
	<div class="drag-handle">Vertical drag</div>
</DragLine>
```

## Tolerance

The `tolerance` prop prevents accidental drags by requiring a minimum movement before the drag starts:

```svelte
<!-- Require 5px movement before drag starts -->
<DragLine behavior={{ tolerance: 5 }}>
	<div class="drag-handle">Drag me</div>
</DragLine>
```

## Disabled State

```svelte
<DragLine behavior={{ disabled: isLocked }}>
	<div class="drag-handle">Drag me</div>
</DragLine>
```

## Custom Styling

Use the `styling` prop to add custom classes:

```svelte
<DragLine styling={{ className: 'my-custom-dragline' }}>
	<div class="drag-handle">Drag me</div>
</DragLine>
```

For global theming, see the [Styling Guide](./STYLING.md).

## Accessibility

The component includes ARIA attributes for accessibility:

```svelte
<DragLine ariaLabel="Resize panel" behavior={{ isVertical: true }}>
	<div class="drag-handle">Drag to resize</div>
</DragLine>
```

## Advanced Usage

### Resizable Panel

```svelte
<script>
	import { DragLine } from '@rief/kit';

	let panelWidth = 400;
	let initialWidth = 400;

	function handleDragStart() {
		initialWidth = panelWidth;
	}

	function handleDragging(e) {
		panelWidth = Math.max(200, initialWidth - e.detail.diffX);
	}
</script>

<div class="panel" style="width: {panelWidth}px">
	<div class="content">Panel content</div>
	<DragLine on:dragstart={handleDragStart} on:dragging={handleDragging}>
		<div class="resize-handle"></div>
	</DragLine>
</div>
```

### Split View

```svelte
<script>
	import { DragLine } from '@rief/kit';

	let leftWidth = 300;
	let initialWidth = 300;

	function handleDragStart() {
		initialWidth = leftWidth;
	}

	function handleDragging(e) {
		leftWidth = Math.max(100, Math.min(600, initialWidth + e.detail.diffX));
	}
</script>

<div class="split-view">
	<div class="left-panel" style="width: {leftWidth}px">Left content</div>
	<DragLine on:dragstart={handleDragStart} on:dragging={handleDragging}>
		<div class="split-handle"></div>
	</DragLine>
	<div class="right-panel">Right content</div>
</div>
```

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { DragLineProps, DragLineStyling, DragLineBehavior } from '@rief/kit';

const dragLineConfig: DragLineProps = {
	styling: {
		className: 'custom-dragline',
		zIndex: 200
	},
	behavior: {
		tolerance: 5,
		isVertical: false,
		disabled: false
	},
	ariaLabel: 'Resize panel'
};
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options using CSS custom properties.
