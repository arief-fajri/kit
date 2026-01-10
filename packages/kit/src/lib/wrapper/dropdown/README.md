# DropdownWrapper Component

A sophisticated, reusable dropdown container that provides intelligent positioning, smooth animations, and comprehensive user interaction handling. Perfect for creating menus, select dropdowns, tooltips, and any floating UI elements that need to be anchored to other elements.

## Features

- 🎯 **Smart Positioning**: Auto-placement with collision detection and viewport awareness
- 📏 **Flexible Sizing**: Predefined size variants (sm, md, lg, xl) with responsive behavior
- 🎨 **Multiple Variants**: Four distinct visual styles (default, minimal, elevated, outlined)
- 🔗 **Portal Rendering**: Renders outside DOM hierarchy to prevent z-index issues
- ♿ **Accessibility Ready**: ARIA attributes, keyboard navigation, and focus management
- 🎭 **Smooth Animations**: Built-in scale and fade transitions with customizable timing
- 🎨 **Fully Themeable**: Comprehensive CSS custom properties for complete customization
- 🔧 **TypeScript Native**: Full type safety with intelligent IntelliSense support

## User Interface Structure

The DropdownWrapper creates a floating container that positions itself relative to an anchor element with automatic viewport collision detection.

```
<div class="dropdown dropdown--{variant} dropdown--{size}">
  ├── Portal Rendering (to document.body)
  │   └── .dropdown[role="menu"][aria-hidden]
  │       ├── slot (when content provided)
  │       └── .dropdown__fallback (when no content)
  │
  └── Positioning Logic
      ├── Auto-placement detection
      ├── Viewport collision handling  
      ├── Scroll compensation
      └── Dynamic transform origin
```

### Layout Behavior

- **Portal Container**: Renders outside normal DOM flow using Svelte portal action
- **Absolute Positioning**: Dynamically positioned relative to anchor element with scroll compensation
- **Collision Detection**: Automatically flips position when approaching viewport edges
- **Responsive Sizing**: Min/max width constraints that adapt to content and viewport
- **Animation Origin**: Transform origin adjusts based on final placement for natural animations

## Basic Usage

```svelte
<script>
  import { DropdownWrapper } from '@rief/kit';
  
  let dropdownVisible = false;
  let buttonElement;
</script>

<!-- Basic dropdown -->
<button bind:this={buttonElement} on:click={() => dropdownVisible = !dropdownVisible}>
  Toggle Dropdown
</button>

<DropdownWrapper bind:visible={dropdownVisible} anchor={buttonElement}>
  <div style="padding: 12px;">
    <p>Dropdown content goes here</p>
  </div>
</DropdownWrapper>

<!-- Dropdown with event handling -->
<DropdownWrapper 
  bind:visible={dropdownVisible}
  anchor={buttonElement}
  styling={{ variant: "elevated" }}
  behavior={{ placement: "bottom-start" }}
  on:close={() => dropdownVisible = false}
  on:open={() => console.log('Dropdown opened')}
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Controls dropdown visibility state |
| `anchor` | `HTMLElement \| null` | `null` | Element to position dropdown relative to |

### Styling Props (`styling` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling.variant` | `'default' \| 'minimal' \| 'elevated' \| 'outlined'` | `'default'` | Visual style variant |
| `styling.size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size preset affecting width constraints |
| `styling.className` | `string` | `""` | Additional CSS classes |
| `styling.style` | `string` | `""` | Additional inline styles |

### Behavior Props (`behavior` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `behavior.placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'auto'` | `'bottom-start'` | Preferred placement relative to anchor |
| `behavior.offset` | `{ x: number; y: number }` | `{ x: 0, y: 4 }` | Pixel offset from anchor element |
| `behavior.closeOnClickOutside` | `boolean` | `true` | Whether to close when clicking outside dropdown |
| `behavior.closeOnEscape` | `boolean` | `true` | Whether to close when pressing Escape key |
| `behavior.isFullAnchorWidth` | `boolean` | `true` | Make dropdown full width of anchor |

### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference |

## Variants

### Default
Standard dropdown appearance with subtle border and shadow. Perfect for most use cases.

```svelte
<DropdownWrapper 
  bind:visible={isOpen} 
  anchor={buttonEl}
  styling={{ variant: "default" }}
>
  <div>Standard dropdown content</div>
</DropdownWrapper>
```

### Minimal
Clean appearance with reduced visual weight. Ideal for subtle UI elements.

```svelte
<DropdownWrapper 
  bind:visible={isOpen} 
  anchor={buttonEl}
  styling={{ variant: "minimal" }}
>
  <div>Minimal dropdown content</div>
</DropdownWrapper>
```

### Elevated
Enhanced shadow for prominent floating elements. Great for important actions.

```svelte
<DropdownWrapper 
  bind:visible={isOpen} 
  anchor={buttonEl}
  styling={{ variant: "elevated" }}
>
  <div>Elevated dropdown content</div>
</DropdownWrapper>
```

### Outlined
Strong border emphasis without shadow. Perfect for high-contrast interfaces.

```svelte
<DropdownWrapper 
  bind:visible={isOpen} 
  anchor={buttonEl}
  styling={{ variant: "outlined" }}
>
  <div>Outlined dropdown content</div>
</DropdownWrapper>
```

## Sizes

```svelte
<DropdownWrapper styling={{ size: "sm" }} bind:visible={isOpen} anchor={buttonEl}>Small dropdown</DropdownWrapper>
<DropdownWrapper styling={{ size: "md" }} bind:visible={isOpen} anchor={buttonEl}>Medium dropdown</DropdownWrapper>
<DropdownWrapper styling={{ size: "lg" }} bind:visible={isOpen} anchor={buttonEl}>Large dropdown</DropdownWrapper>
<DropdownWrapper styling={{ size: "xl" }} bind:visible={isOpen} anchor={buttonEl}>Extra large dropdown</DropdownWrapper>
```

## Placement Options

The dropdown automatically positions itself relative to the anchor element with intelligent collision detection.

```svelte
<script>
  let placement = 'auto'; // Automatically chooses best position
</script>

<!-- Auto-placement (recommended) -->
<DropdownWrapper 
  bind:visible={isOpen} 
  anchor={buttonEl}
  behavior={{ placement: "auto" }}
>
  <div>Auto-positioned content</div>
</DropdownWrapper>

<!-- Manual placement options -->
<DropdownWrapper behavior={{ placement: "bottom-start" }} bind:visible={isOpen} anchor={buttonEl}>Bottom-left aligned</DropdownWrapper>
<DropdownWrapper behavior={{ placement: "bottom-end" }} bind:visible={isOpen} anchor={buttonEl}>Bottom-right aligned</DropdownWrapper>
<DropdownWrapper behavior={{ placement: "top-start" }} bind:visible={isOpen} anchor={buttonEl}>Top-left aligned</DropdownWrapper>
<DropdownWrapper behavior={{ placement: "top-end" }} bind:visible={isOpen} anchor={buttonEl}>Top-right aligned</DropdownWrapper>
```

## Offset Positioning

Fine-tune dropdown position with pixel-perfect offset control.

```svelte
<script>
  // Custom offset for precise positioning
  const customOffset = { x: 8, y: 12 };
</script>

<DropdownWrapper 
  bind:visible={isOpen} 
  anchor={buttonEl}
  behavior={{ offset: customOffset }}
>
  <div>Precisely positioned content</div>
</DropdownWrapper>

<!-- Common offset patterns -->
<DropdownWrapper behavior={{ offset: { x: 0, y: 8 } }}>Increased vertical gap</DropdownWrapper>
<DropdownWrapper behavior={{ offset: { x: -16, y: 4 } }}>Left-shifted position</DropdownWrapper>
<DropdownWrapper behavior={{ offset: { x: 16, y: 0 } }}>Right-shifted position</DropdownWrapper>
```

## Behavior Control

Customize interaction behavior for different use cases.

```svelte
<script>
  let tooltipVisible = false;
  let menuVisible = false;
</script>

<!-- Tooltip-style (no click outside close) -->
<DropdownWrapper 
  bind:visible={tooltipVisible}
  anchor={hoverElement}
  styling={{ variant: "minimal", size: "sm" }}
  behavior={{
    closeOnClickOutside: false,
    closeOnEscape: true
  }}
>
  <div>Tooltip content</div>
</DropdownWrapper>

<!-- Modal-style (no escape close) -->
<DropdownWrapper 
  bind:visible={menuVisible}
  anchor={menuButton}
  styling={{ variant: "elevated" }}
  behavior={{
    closeOnClickOutside: true,
    closeOnEscape: false
  }}
>
  <div>Modal-like menu</div>
</DropdownWrapper>

<!-- Persistent dropdown (manual close only) -->
<DropdownWrapper 
  bind:visible={persistentVisible}
  anchor={triggerEl}
  behavior={{
    closeOnClickOutside: false,
    closeOnEscape: false
  }}
>
  <div>
    <p>Persistent content</p>
    <button on:click={() => persistentVisible = false}>Close</button>
  </div>
</DropdownWrapper>
```

## Events

The DropdownWrapper component dispatches several events for integration with your application state:

```svelte
<script>
  function handleOpen() {
    console.log('Dropdown opened');
    // Track analytics, focus management, etc.
  }
  
  function handleClose() {
    console.log('Dropdown closed');
    // Cleanup, save state, etc.
  }
  
  function handlePositionChange(event) {
    const { placement, top, left } = event.detail;
    console.log(`Positioned at ${placement}: ${left}, ${top}`);
    // Debug positioning, adjust other UI elements, etc.
  }
</script>

<DropdownWrapper 
  bind:visible={isOpen}
  anchor={buttonEl}
  on:open={handleOpen}
  on:close={handleClose}
  on:positionChange={handlePositionChange}
>
  <div>Event-aware dropdown</div>
</DropdownWrapper>
```

## Accessibility

The DropdownWrapper component is fully accessible by default:

- Proper semantic markup with `role="menu"` attribute
- ARIA attributes for screen readers (`aria-hidden`)
- Keyboard navigation support (Escape key)
- Focus management preparation
- Event-driven state announcements

```svelte
<!-- Accessible menu dropdown -->
<button 
  bind:this={menuButton}
  on:click={() => menuOpen = !menuOpen}
  aria-expanded={menuOpen}
  aria-haspopup="menu"
>
  Menu
</button>

<DropdownWrapper 
  bind:visible={menuOpen}
  anchor={menuButton}
  on:close={() => menuOpen = false}
>
  <div role="menu">
    <button role="menuitem">Action 1</button>
    <button role="menuitem">Action 2</button>
    <button role="menuitem">Action 3</button>
  </div>
</DropdownWrapper>
```

## Advanced Usage

### Dynamic Content

```svelte
<script>
  let selectedOption = null;
  let options = ['Option 1', 'Option 2', 'Option 3'];
</script>

<DropdownWrapper bind:visible={selectOpen} anchor={selectButton}>
  <div class="select-menu">
    {#each options as option}
      <button 
        class="select-option"
        class:selected={selectedOption === option}
        on:click={() => {
          selectedOption = option;
          selectOpen = false;
        }}
      >
        {option}
      </button>
    {/each}
  </div>
</DropdownWrapper>
```

### Conditional Rendering

```svelte
<DropdownWrapper 
  styling={{
    variant: isDarkMode ? 'elevated' : 'default',
    size: isMobile ? 'sm' : 'md'
  }}
  behavior={{
    placement: isRTL ? 'bottom-end' : 'bottom-start'
  }}
  bind:visible={isOpen}
  anchor={triggerElement}
>
  <div class="responsive-content">
    {#if loading}
      <div class="loading-spinner">Loading...</div>
    {:else if error}
      <div class="error-message">{error}</div>
    {:else}
      <div class="content">{content}</div>
    {/if}
  </div>
</DropdownWrapper>
```

### Form Integration

```svelte
<script>
  let formData = { category: '' };
  let categoryDropdownOpen = false;
  let categoryButton;
  
  const categories = ['Technology', 'Design', 'Business'];
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="category">Category</label>
  <button 
    type="button"
    bind:this={categoryButton}
    on:click={() => categoryDropdownOpen = !categoryDropdownOpen}
    class="form-select-trigger"
  >
    {formData.category || 'Select category...'}
  </button>
  
  <DropdownWrapper 
    bind:visible={categoryDropdownOpen}
    anchor={categoryButton}
    styling={{ variant: "outlined" }}
    on:close={() => categoryDropdownOpen = false}
  >
    <div class="category-options">
      {#each categories as category}
        <button 
          type="button"
          on:click={() => {
            formData.category = category;
            categoryDropdownOpen = false;
          }}
        >
          {category}
        </button>
      {/each}
    </div>
  </DropdownWrapper>
  
  <button type="submit" disabled={!formData.category}>Submit</button>
</form>
```

### Multi-Level Dropdowns

```svelte
<script>
  let mainMenuOpen = false;
  let subMenuOpen = false;
  let mainButton, subButton;
</script>

<!-- Main dropdown -->
<DropdownWrapper bind:visible={mainMenuOpen} anchor={mainButton}>
  <div class="main-menu">
    <button on:click={() => handleAction('action1')}>Action 1</button>
    <button 
      bind:this={subButton}
      on:click={() => subMenuOpen = true}
    >
      More Options →
    </button>
  </div>
</DropdownWrapper>

<!-- Sub dropdown -->
<DropdownWrapper 
  bind:visible={subMenuOpen} 
  anchor={subButton}
  styling={{ variant: "elevated" }}
  behavior={{ placement: "bottom-end" }}
>
  <div class="sub-menu">
    <button on:click={() => handleAction('sub1')}>Sub Action 1</button>
    <button on:click={() => handleAction('sub2')}>Sub Action 2</button>
  </div>
</DropdownWrapper>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { 
  DropdownWrapperProps,
  DropdownWrapperStyling,
  DropdownWrapperBehavior
} from '@rief/kit';

const dropdownConfig: DropdownWrapperProps = {
  styling: {
    variant: 'elevated',
    size: 'lg'
  },
  behavior: {
    placement: 'auto',
    closeOnClickOutside: true,
    closeOnEscape: true
  }
};

// Event handler types
function handlePositionChange(event: CustomEvent<{ 
  placement: Placement; 
  top: number; 
  left: number; 
}>) {
  // Fully typed event handling
}
```
