# Drawer Component

A flexible, accessible drawer/sidebar component for Svelte applications. The Drawer component slides in from any edge (top, bottom, left, right) with optional drag-to-resize functionality and overlay backdrop.

## Features

- 🎯 **5 Positions**: top, bottom, left, right, center
- 🎨 **Customizable Styling**: Extensive CSS custom properties
- 🖱️ **Drag-to-Resize**: Resizable width for left/right drawers
- ⌨️ **Keyboard Support**: ESC key to close
- ♿ **Accessibility**: Full ARIA support and focus management
- 🎭 **Animations**: Smooth slide and fade transitions
- 🔧 **TypeScript**: Full type safety with comprehensive interfaces
- 📡 **Event System**: Open, close, and resize events

## Basic Usage

```svelte
<script>
  import { Drawer } from '@rief/kit';
  
  let isOpen = false;
</script>

<button on:click={() => isOpen = true}>Open Drawer</button>

<Drawer 
  bind:visible={isOpen}
  position="right"
  on:close={(e) => console.log('Drawer closed:', e.detail)}
>
  <h2>Drawer Content</h2>
  <p>Your content here</p>
</Drawer>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Controls drawer visibility |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'right'` | Drawer slide position |
| `preventClose` | `boolean` | `false` | Prevent closing when clicking overlay |
| `bgPanel` | `string` | `"var(--color-surface, #F6F6F6)"` | Background color of panel |
| `isDraggable` | `boolean` | `true` | Enable drag-to-resize (left/right only) |
| `className` | `string` | `""` | Additional CSS classes |
| `overlay` | `boolean` | `true` | Show overlay backdrop |
| `closeOnEscape` | `boolean` | `true` | Close drawer on ESC key press |
| `ariaLabel` | `string` | `undefined` | Accessibility label for drawer |

## Positions

### Right (Default)
Drawer slides in from the right side.

```svelte
<Drawer visible={true} position="right">
  <div>Content</div>
</Drawer>
```

### Left
Drawer slides in from the left side.

```svelte
<Drawer visible={true} position="left">
  <div>Content</div>
</Drawer>
```

### Top
Drawer slides down from the top.

```svelte
<Drawer visible={true} position="top">
  <div>Content</div>
</Drawer>
```

### Bottom
Drawer slides up from the bottom.

```svelte
<Drawer visible={true} position="bottom">
  <div>Content</div>
</Drawer>
```

### Center
Drawer appears in the center of the screen with scale animation.

```svelte
<Drawer visible={true} position="center">
  <div>Content</div>
</Drawer>
```

## Events

### `open`
Dispatched when drawer opens.

```svelte
<Drawer 
  visible={isOpen}
  on:open={(e) => {
    console.log('Opened at:', e.detail.timestamp);
    console.log('Position:', e.detail.position);
  }}
/>
```

**Event Detail:**
```typescript
{
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  timestamp: number;
}
```

### `close`
Dispatched when drawer closes.

```svelte
<Drawer 
  visible={isOpen}
  on:close={(e) => {
    console.log('Closed:', e.detail.reason);
    console.log('Position:', e.detail.position);
  }}
/>
```

**Event Detail:**
```typescript
{
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  timestamp: number;
  reason: 'overlay' | 'escape' | 'programmatic';
}
```

### `resize`
Dispatched during drag-to-resize (left/right drawers only).

```svelte
<Drawer 
  visible={isOpen}
  position="right"
  isDraggable={true}
  on:resize={(e) => {
    console.log('New width:', e.detail.width);
  }}
/>
```

**Event Detail:**
```typescript
{
  position: 'left' | 'right';
  timestamp: number;
  width?: number;
  height?: number;
}
```

## Drag-to-Resize

The drawer supports drag-to-resize functionality for left and right positioned drawers. A drag handle appears on the inner edge of the drawer.

```svelte
<Drawer 
  visible={isOpen}
  position="right"
  isDraggable={true}
  on:resize={(e) => {
    // Handle resize
    console.log('Width:', e.detail.width);
  }}
>
  <div>Resizable content</div>
</Drawer>
```

**Note:** Drag-to-resize is only available for `left` and `right` positions.

## Keyboard Support

- **ESC**: Closes the drawer (if `closeOnEscape` is `true`)
- **Tab**: Focus management within drawer
- **Enter/Space on overlay**: Closes drawer (if `preventClose` is `false`)

## Accessibility

The Drawer component includes:

- `role="dialog"` for screen readers
- `aria-modal="true"` to indicate modal behavior
- `aria-label` support for custom labels
- Focus management (stores and restores focus)
- Keyboard navigation support

## Examples

### Basic Drawer with Close Button

```svelte
<script>
  import { Drawer, Button } from '@rief/kit';
  
  let isOpen = false;
</script>

<Button label="Open Drawer" on:click={() => isOpen = true} />

<Drawer bind:visible={isOpen} position="right">
  <div style="padding: 1rem;">
    <h2>My Drawer</h2>
    <p>Drawer content goes here.</p>
    <Button label="Close" on:click={() => isOpen = false} />
  </div>
</Drawer>
```

### Prevent Close on Overlay Click

```svelte
<Drawer 
  visible={isOpen}
  preventClose={true}
  position="right"
>
  <div>This drawer cannot be closed by clicking the overlay</div>
</Drawer>
```

### Without Overlay

```svelte
<Drawer 
  visible={isOpen}
  overlay={false}
  position="left"
>
  <div>Drawer without backdrop overlay</div>
</Drawer>
```

### Custom Styling

```svelte
<Drawer 
  visible={isOpen}
  bgPanel="#FFFFFF"
  className="my-custom-drawer"
  position="right"
>
  <div>Custom styled drawer</div>
</Drawer>
```

## TypeScript Support

The component is fully typed. Import types for use in your TypeScript code:

```typescript
import type { 
  DrawerProps, 
  DrawerPosition,
  DrawerEventDetail,
  DrawerResizeEventDetail 
} from '@rief/kit';
```

