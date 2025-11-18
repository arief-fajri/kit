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
  import { DropdownWrapper } from '@your-org/kit';
  
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
  placement="bottom-start"
  variant="elevated"
  on:close={() => dropdownVisible = false}
  on:open={() => console.log('Dropdown opened')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | `false` | Controls dropdown visibility state |
| `anchor` | `HTMLElement \| null` | `null` | Element to position dropdown relative to |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'auto'` | `'bottom-start'` | Preferred placement relative to anchor |
| `offset` | `{ x: number; y: number }` | `{ x: 0, y: 4 }` | Pixel offset from anchor element |
| `variant` | `'default' \| 'minimal' \| 'elevated' \| 'outlined'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size preset affecting width constraints |
| `closeOnClickOutside` | `boolean` | `true` | Whether to close when clicking outside dropdown |
| `closeOnEscape` | `boolean` | `true` | Whether to close when pressing Escape key |
| `class` | `string` | `""` | Additional CSS classes to apply |

## Variants

### Default
Standard dropdown appearance with subtle border and shadow. Perfect for most use cases.

```svelte
<DropdownWrapper variant="default" bind:visible={isOpen} anchor={buttonEl}>
  <div>Standard dropdown content</div>
</DropdownWrapper>
```

### Minimal
Clean appearance with reduced visual weight. Ideal for subtle UI elements.

```svelte
<DropdownWrapper variant="minimal" bind:visible={isOpen} anchor={buttonEl}>
  <div>Minimal dropdown content</div>
</DropdownWrapper>
```

### Elevated
Enhanced shadow for prominent floating elements. Great for important actions.

```svelte
<DropdownWrapper variant="elevated" bind:visible={isOpen} anchor={buttonEl}>
  <div>Elevated dropdown content</div>
</DropdownWrapper>
```

### Outlined
Strong border emphasis without shadow. Perfect for high-contrast interfaces.

```svelte
<DropdownWrapper variant="outlined" bind:visible={isOpen} anchor={buttonEl}>
  <div>Outlined dropdown content</div>
</DropdownWrapper>
```

## Sizes

```svelte
<DropdownWrapper size="sm" bind:visible={isOpen} anchor={buttonEl}>Small dropdown</DropdownWrapper>
<DropdownWrapper size="md" bind:visible={isOpen} anchor={buttonEl}>Medium dropdown</DropdownWrapper>
<DropdownWrapper size="lg" bind:visible={isOpen} anchor={buttonEl}>Large dropdown</DropdownWrapper>
<DropdownWrapper size="xl" bind:visible={isOpen} anchor={buttonEl}>Extra large dropdown</DropdownWrapper>
```

## Placement Options

The dropdown automatically positions itself relative to the anchor element with intelligent collision detection.

```svelte
<script>
  let placement = 'auto'; // Automatically chooses best position
</script>

<!-- Auto-placement (recommended) -->
<DropdownWrapper placement="auto" bind:visible={isOpen} anchor={buttonEl}>
  <div>Auto-positioned content</div>
</DropdownWrapper>

<!-- Manual placement options -->
<DropdownWrapper placement="bottom-start" bind:visible={isOpen} anchor={buttonEl}>Bottom-left aligned</DropdownWrapper>
<DropdownWrapper placement="bottom-end" bind:visible={isOpen} anchor={buttonEl}>Bottom-right aligned</DropdownWrapper>
<DropdownWrapper placement="top-start" bind:visible={isOpen} anchor={buttonEl}>Top-left aligned</DropdownWrapper>
<DropdownWrapper placement="top-end" bind:visible={isOpen} anchor={buttonEl}>Top-right aligned</DropdownWrapper>
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
  offset={customOffset}
>
  <div>Precisely positioned content</div>
</DropdownWrapper>

<!-- Common offset patterns -->
<DropdownWrapper offset={{ x: 0, y: 8 }}>Increased vertical gap</DropdownWrapper>
<DropdownWrapper offset={{ x: -16, y: 4 }}>Left-shifted position</DropdownWrapper>
<DropdownWrapper offset={{ x: 16, y: 0 }}>Right-shifted position</DropdownWrapper>
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
  closeOnClickOutside={false}
  closeOnEscape={true}
  variant="minimal"
  size="sm"
>
  <div>Tooltip content</div>
</DropdownWrapper>

<!-- Modal-style (no escape close) -->
<DropdownWrapper 
  bind:visible={menuVisible}
  anchor={menuButton}
  closeOnClickOutside={true}
  closeOnEscape={false}
  variant="elevated"
>
  <div>Modal-like menu</div>
</DropdownWrapper>

<!-- Persistent dropdown (manual close only) -->
<DropdownWrapper 
  bind:visible={persistentVisible}
  anchor={triggerEl}
  closeOnClickOutside={false}
  closeOnEscape={false}
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
  variant={isDarkMode ? 'elevated' : 'default'}
  size={isMobile ? 'sm' : 'md'}
  placement={isRTL ? 'bottom-end' : 'bottom-start'}
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
    variant="outlined"
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
  placement="bottom-end"
  variant="elevated"
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
  Placement,
  Variant,
  Size 
} from '@your-org/kit';

const dropdownConfig: DropdownWrapperProps = {
  variant: 'elevated',
  size: 'lg',
  placement: 'auto',
  closeOnClickOutside: true,
  closeOnEscape: true
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
