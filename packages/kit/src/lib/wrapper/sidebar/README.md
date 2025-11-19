# SidebarWrapper Component

A flexible, resizable sidebar component designed for layout applications. Provides drag-to-resize functionality, collapse/expand states, width persistence, and comprehensive theming via CSS custom properties.

## Features

- 📏 **Resizable Sidebar**: Drag-to-resize functionality with configurable min/max width constraints
- 🎯 **Collapsible**: Smooth collapse/expand transitions with customizable collapse width
- 💾 **Width Persistence**: Optional localStorage persistence to remember user preferences
- 🎨 **Fully Themeable**: Comprehensive CSS custom properties for complete customization
- 🔧 **TypeScript Native**: Full type safety with intelligent IntelliSense support
- ♿ **SSR Safe**: Handles server-side rendering gracefully
- 🎭 **Position Flexible**: Support for left or right positioning
- 📊 **Event System**: Dispatches resize and drag events for integration

## User Interface Structure

The SidebarWrapper creates a semantic sidebar container with optional drag handle for resizing.

```
<aside class="sidebar sidebar--{collapsed} sidebar--{draggable}">
  ├── slot (main sidebar content)
  │
  ├── .sidebar__drag-overlay (when dragging)
  │   └── Full overlay to prevent mouse capture
  │
  └── .sidebar__drag-handle (when isDraggable && !collapsed)
      └── DragLine component
          └── .sidebar__drag-handle-indicator
              └── .sidebar__drag-handle-visual
                  └── .sidebar__drag-handle-line
```

### Layout Behavior

- **Flex Container**: Flex column layout with no grow/shrink, maintaining fixed width
- **Width Management**: Dynamic width controlled by collapse state, drag operations, or default width
- **Transition**: Smooth 300ms width transitions for all state changes
- **Drag Handle**: 8px wide drag handle positioned at left or right edge
- **Overlay Protection**: Full overlay during drag prevents child elements from capturing mouse events

## Basic Usage

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
</script>

<!-- Basic sidebar -->
<SidebarWrapper>
  <nav>
    <ul>
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
    </ul>
  </nav>
</SidebarWrapper>

<!-- Collapsible sidebar -->
<SidebarWrapper collapsed={isCollapsed}>
  <nav>Navigation</nav>
</SidebarWrapper>

<!-- Draggable sidebar -->
<SidebarWrapper isDraggable={true} defaultWidth={300}>
  <nav>Resizable Navigation</nav>
</SidebarWrapper>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | `false` | Collapsed state of the sidebar |
| `collapseWidth` | `string` | `"0"` | Width when collapsed (CSS value) |
| `isDraggable` | `boolean` | `false` | Enable drag-to-resize functionality |
| `defaultWidth` | `number` | `321` | Default width in pixels |
| `position` | `'left' \| 'right'` | `'left'` | Drag handle position |
| `minWidth` | `number` | `320` | Minimum width in pixels when dragging |
| `maxWidth` | `string` | `"25%"` | Maximum width (CSS value: px, %, etc.) |
| `persistWidth` | `boolean` | `false` | Persist width to localStorage |
| `storageKey` | `string` | `"sidebar-width"` | localStorage key for width persistence |
| `sidebarClassName` | `string` | `""` | Additional CSS classes for sidebar |
| `sidebarStyle` | `string` | `""` | Inline styles for sidebar |
| `class` | `string` | `"border-r"` | Custom CSS class (exported as class) |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `sidebarElm` | `HTMLElement` | `undefined` | Reference to sidebar DOM element |

## Collapsible Sidebar

Control the sidebar's collapsed state programmatically:

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
  
  let isCollapsed = false;
  
  function toggleSidebar() {
    isCollapsed = !isCollapsed;
  }
</script>

<button on:click={toggleSidebar}>
  {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
</button>

<SidebarWrapper 
  collapsed={isCollapsed}
  collapseWidth="0"
>
  <nav>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </nav>
</SidebarWrapper>
```

### Custom Collapse Width

```svelte
<SidebarWrapper 
  collapsed={isCollapsed}
  collapseWidth="60px"
>
  <nav>
    <div class="icon-only-menu">
      <!-- Icon-only menu items -->
    </div>
  </nav>
</SidebarWrapper>
```

## Drag-to-Resize

Enable drag-to-resize functionality with configurable constraints:

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
</script>

<!-- Basic draggable sidebar -->
<SidebarWrapper 
  isDraggable={true}
  defaultWidth={300}
  minWidth={250}
  maxWidth="30%"
>
  <nav>Resizable Navigation</nav>
</SidebarWrapper>

<!-- Right-positioned draggable sidebar -->
<SidebarWrapper 
  isDraggable={true}
  position="right"
  defaultWidth={350}
  minWidth={280}
  maxWidth="40%"
>
  <aside>Right Sidebar Content</aside>
</SidebarWrapper>
```

### Width Constraints

The sidebar enforces min/max width constraints during drag operations:

```svelte
<SidebarWrapper 
  isDraggable={true}
  defaultWidth={400}
  minWidth={300}      <!-- Minimum 300px -->
  maxWidth="50%"      <!-- Maximum 50% of parent width -->
>
  <nav>Constrained Sidebar</nav>
</SidebarWrapper>
```

## Width Persistence

Save and restore sidebar width across page reloads:

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
</script>

<!-- Persist width with default key -->
<SidebarWrapper 
  isDraggable={true}
  persistWidth={true}
  defaultWidth={300}
>
  <nav>Persistent Sidebar</nav>
</SidebarWrapper>

<!-- Custom storage key -->
<SidebarWrapper 
  isDraggable={true}
  persistWidth={true}
  storageKey="my-app-sidebar-width"
  defaultWidth={350}
>
  <nav>Custom Key Sidebar</nav>
</SidebarWrapper>
```

## Position Options

### Left Position (Default)

```svelte
<SidebarWrapper position="left" isDraggable={true}>
  <nav>Left Sidebar</nav>
</SidebarWrapper>
```

### Right Position

```svelte
<SidebarWrapper position="right" isDraggable={true}>
  <aside>Right Sidebar</aside>
</SidebarWrapper>
```

## Events

The SidebarWrapper component dispatches several events:

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
  
  function handleResize(event) {
    console.log('Width changed:', event.detail.width, 'px');
  }
  
  function handleDragStart(event) {
    console.log('Drag started from:', event.detail.initialWidth, 'px');
  }
  
  function handleDragEnd(event) {
    console.log('Drag ended:', {
      initial: event.detail.initialWidth,
      final: event.detail.finalWidth
    });
  }
</script>

<SidebarWrapper 
  isDraggable={true}
  on:resize={handleResize}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
>
  <nav>Event-Aware Sidebar</nav>
</SidebarWrapper>
```

### Event Details

- **`resize`**: Fires when sidebar width changes
  - `width`: Current width in pixels (number)
  - `widthPx`: Current width as CSS string (string)

- **`dragstart`**: Fires when drag operation begins
  - `initialWidth`: Width at drag start (number)

- **`dragend`**: Fires when drag operation ends
  - `initialWidth`: Width at drag start (number)
  - `finalWidth`: Width at drag end (number)

## Accessibility

The SidebarWrapper component provides accessibility features:

- Semantic HTML (`<aside>` element)
- ARIA label support via `ariaLabel` prop
- Proper role attributes
- Keyboard-friendly (inherits from DragLine component)

```svelte
<SidebarWrapper 
  ariaLabel="Main navigation sidebar"
  collapsed={isCollapsed}
>
  <nav>
    <ul role="navigation">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</SidebarWrapper>
```

## Advanced Usage

### Dynamic Width Control

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
  
  let sidebarRef;
  let currentWidth = 300;
  
  function setWidth(width) {
    if (sidebarRef) {
      sidebarRef.style.width = `${width}px`;
    }
  }
</script>

<SidebarWrapper 
  bind:sidebarElm={sidebarRef}
  defaultWidth={currentWidth}
  isDraggable={true}
  on:resize={(e) => currentWidth = e.detail.width}
>
  <nav>Dynamic Sidebar</nav>
</SidebarWrapper>

<button on:click={() => setWidth(400)}>Set to 400px</button>
<button on:click={() => setWidth(250)}>Set to 250px</button>
```

### Integration with Layout Wrappers

```svelte
<script>
  import { BaseLayoutWrapper, PageWrapper, SidebarWrapper } from '@rief/kit';
  
  let sidebarCollapsed = false;
</script>

<BaseLayoutWrapper>
  <div style="display: grid; grid-template-columns: {sidebarCollapsed ? '0' : 'auto'} 1fr;">
    <SidebarWrapper 
      collapsed={sidebarCollapsed}
      isDraggable={true}
      defaultWidth={300}
    >
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Profile</li>
        </ul>
      </nav>
    </SidebarWrapper>
    
    <PageWrapper>
      <main>Main Content</main>
    </PageWrapper>
  </div>
</BaseLayoutWrapper>
```

### Responsive Sidebar

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
  import { onMount } from 'svelte';
  
  let isMobile = false;
  
  onMount(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        isMobile = window.innerWidth < 768;
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  });
</script>

<SidebarWrapper 
  collapsed={isMobile}
  isDraggable={!isMobile}
  defaultWidth={isMobile ? 0 : 300}
>
  <nav>Responsive Sidebar</nav>
</SidebarWrapper>
```

### Custom Styling

```svelte
<SidebarWrapper 
  sidebarClassName="custom-sidebar"
  sidebarStyle="background: linear-gradient(to bottom, #667eea, #764ba2);"
  class="shadow-lg"
>
  <nav class="text-white">
    <ul>
      <li>Styled Sidebar</li>
    </ul>
  </nav>
</SidebarWrapper>
```

### Multiple Sidebars

```svelte
<script>
  import { BaseLayoutWrapper, SidebarWrapper } from '@rief/kit';
</script>

<BaseLayoutWrapper>
  <div style="display: grid; grid-template-columns: auto 1fr auto;">
    <SidebarWrapper 
      position="right"
      isDraggable={true}
      defaultWidth={250}
      storageKey="left-sidebar-width"
    >
      <nav>Left Sidebar</nav>
    </SidebarWrapper>
    
    <main>Main Content</main>
    
    <SidebarWrapper 
      position="left"
      isDraggable={true}
      defaultWidth={300}
      storageKey="right-sidebar-width"
    >
      <aside>Right Sidebar</aside>
    </SidebarWrapper>
  </div>
</BaseLayoutWrapper>
```

## Integration Examples

### With SvelteKit

```svelte
<!-- +layout.svelte -->
<script>
  import { BaseLayoutWrapper, PageWrapper, SidebarWrapper } from '@rief/kit';
  import { page } from '$app/stores';
</script>

<BaseLayoutWrapper>
  <div style="display: grid; grid-template-columns: auto 1fr;">
    <SidebarWrapper 
      isDraggable={true}
      persistWidth={true}
      defaultWidth={280}
    >
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </SidebarWrapper>
    
    <PageWrapper>
      <slot />
    </PageWrapper>
  </div>
</BaseLayoutWrapper>
```

### With State Management

```svelte
<script>
  import { SidebarWrapper } from '@rief/kit';
  import { writable } from 'svelte/store';
  
  const sidebarWidth = writable(300);
  const sidebarCollapsed = writable(false);
</script>

<SidebarWrapper 
  collapsed={$sidebarCollapsed}
  isDraggable={true}
  defaultWidth={$sidebarWidth}
  persistWidth={true}
  on:resize={(e) => sidebarWidth.set(e.detail.width)}
>
  <nav>State-Managed Sidebar</nav>
</SidebarWrapper>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options using CSS custom properties.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { 
  SidebarWrapperProps, 
  SidebarPosition,
  SidebarResizeEventDetail,
  SidebarDragEventDetail
} from '@rief/kit';

const sidebarConfig: SidebarWrapperProps = {
  collapsed: false,
  isDraggable: true,
  defaultWidth: 300,
  position: 'left',
  minWidth: 250,
  maxWidth: '30%',
  persistWidth: true,
  storageKey: 'my-sidebar-width'
};
```

### Event Handler Types

```typescript
import type { SidebarResizeEventDetail, SidebarDragEventDetail } from '@rief/kit';

function handleResize(event: CustomEvent<SidebarResizeEventDetail>) {
  const { width, widthPx } = event.detail;
  console.log(`Sidebar resized to ${width}px (${widthPx})`);
}

function handleDragEnd(event: CustomEvent<SidebarDragEventDetail>) {
  const { initialWidth, finalWidth } = event.detail;
  console.log(`Dragged from ${initialWidth}px to ${finalWidth}px`);
}
```

