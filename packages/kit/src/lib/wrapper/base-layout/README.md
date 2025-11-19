# BaseLayoutWrapper Component

A foundational layout wrapper that provides a full-viewport fixed container with reactive window dimension tracking. Perfect for creating full-screen applications, dashboards, desktop-style apps, and any application that needs viewport-aware layout management with CSS custom properties for dynamic sizing.

## Features

- 📐 **Reactive Dimensions**: Automatically tracks and updates window dimensions as CSS custom properties
- 🎯 **Full-Viewport Layout**: Fixed positioning covering the entire viewport with flexible content area
- 🎨 **Fully Themeable**: Comprehensive CSS custom properties for complete customization
- 🔧 **TypeScript Native**: Full type safety with intelligent IntelliSense support
- ♿ **SSR Safe**: Handles server-side rendering gracefully with fallback values
- 🎨 **Flexible Styling**: Customizable via props and CSS variables
- 📦 **Zero Dependencies**: No external dependencies, pure Svelte component
- 🔄 **Reactive Updates**: Automatically responds to window resize events

## User Interface Structure

The BaseLayoutWrapper creates a two-layer container structure optimized for full-viewport applications.

```
<div class="base-layout">
  └── .base-layout__body
      └── slot (your application content)
```

### Layout Behavior

- **Fixed Container**: Positioned fixed to cover entire viewport (0, 0, width, height)
- **Flex Layout**: Uses flexbox for flexible content arrangement
- **Dynamic Dimensions**: Window dimensions exposed as CSS variables (`--base-layout-width`, `--base-layout-height`)
- **Content Stretch**: Inner body container stretches to fill available space
- **Responsive**: Automatically updates on window resize events

## Basic Usage

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
</script>

<!-- Basic full-viewport layout -->
<BaseLayoutWrapper>
  <div>Your application content here</div>
</BaseLayoutWrapper>

<!-- With custom styling -->
<BaseLayoutWrapper 
  layoutClassName="my-layout"
  bodyClassName="my-content"
  layoutStyle="background: #f0f0f0;"
  bodyStyle="padding: 2rem;"
>
  <div>Custom styled content</div>
</BaseLayoutWrapper>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layoutClassName` | `string` | `""` | Additional CSS classes for the outer layout container |
| `layoutStyle` | `string` | `""` | Inline styles for the outer layout container |
| `bodyClassName` | `string` | `""` | Additional CSS classes for the inner body container |
| `bodyStyle` | `string` | `""` | Inline styles for the inner body container |

## CSS Custom Properties

The component exposes window dimensions as CSS custom properties that can be used throughout your application:

- `--base-layout-width`: Current window width in pixels
- `--base-layout-height`: Current window height in pixels

These are automatically updated when the window is resized.

## Styling Options

### Using CSS Custom Properties

```svelte
<BaseLayoutWrapper>
  <div style="width: var(--base-layout-width); height: var(--base-layout-height);">
    Full viewport sized content
  </div>
</BaseLayoutWrapper>
```

### Using Props for Customization

```svelte
<BaseLayoutWrapper 
  layoutStyle="background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);"
  bodyStyle="padding: 2rem; max-width: 1200px; margin: 0 auto;"
>
  <div>Centered content with gradient background</div>
</BaseLayoutWrapper>
```

### Using CSS Classes

```svelte
<BaseLayoutWrapper layoutClassName="app-container" bodyClassName="app-content">
  <div>Content with custom classes</div>
</BaseLayoutWrapper>
```

```css
.app-container {
  --base-layout-bg: #1a1a1a;
  --base-layout-z-index: 1;
}

.app-content {
  --base-layout-body-padding: 2rem;
  --base-layout-text-color: #ffffff;
}
```

## Advanced Usage

### Dashboard Layout

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
</script>

<BaseLayoutWrapper 
  bodyClassName="dashboard-layout"
  bodyStyle="display: grid; grid-template-columns: 250px 1fr; gap: 1rem;"
>
  <aside class="sidebar">
    <nav>Navigation</nav>
  </aside>
  <main class="dashboard-content">
    <h1>Dashboard</h1>
    <!-- Dashboard widgets -->
  </main>
</BaseLayoutWrapper>
```

### Full-Screen Application

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
</script>

<BaseLayoutWrapper 
  layoutStyle="background: #000;"
  bodyStyle="display: flex; flex-direction: column;"
>
  <header style="height: 60px; background: #1a1a1a;">
    <nav>App Header</nav>
  </header>
  <main style="flex: 1; overflow: auto;">
    <div style="height: var(--base-layout-height);">
      Main content area
    </div>
  </main>
</BaseLayoutWrapper>
```

### Responsive Layout with Breakpoints

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
  
  $: isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
</script>

<BaseLayoutWrapper 
  bodyStyle={isMobile ? 'padding: 1rem;' : 'padding: 2rem;'}
>
  <div class="responsive-content">
    {#if isMobile}
      <div>Mobile layout</div>
    {:else}
      <div>Desktop layout</div>
    {/if}
  </div>
</BaseLayoutWrapper>
```

### Canvas-Based Application

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
</script>

<BaseLayoutWrapper bodyStyle="display: flex; align-items: center; justify-content: center;">
  <canvas 
    width={typeof window !== 'undefined' ? window.innerWidth : 0}
    height={typeof window !== 'undefined' ? window.innerHeight : 0}
    style="border: 1px solid #ccc;"
  >
    Canvas content
  </canvas>
</BaseLayoutWrapper>
```

### Conditional Styling

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
  
  let darkMode = false;
  $: layoutBg = darkMode ? '#1a1a1a' : '#ffffff';
  $: textColor = darkMode ? '#ffffff' : '#000000';
</script>

<BaseLayoutWrapper 
  layoutStyle={`background: ${layoutBg};`}
  bodyStyle={`color: ${textColor}; padding: 2rem;`}
>
  <div>Theme-aware content</div>
</BaseLayoutWrapper>
```

## Integration Examples

### With SvelteKit

```svelte
<!-- app.html or +layout.svelte -->
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
</script>

<BaseLayoutWrapper>
  <slot />
</BaseLayoutWrapper>
```

### With Routing

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
  import { page } from '$app/stores';
</script>

<BaseLayoutWrapper 
  bodyClassName="app-body"
  bodyStyle="padding: 0;"
>
  {#if $page.url.pathname === '/dashboard'}
    <Dashboard />
  {:else if $page.url.pathname === '/settings'}
    <Settings />
  {:else}
    <Home />
  {/if}
</BaseLayoutWrapper>
```

### With State Management

```svelte
<script>
  import { BaseLayoutWrapper } from '@rief/kit';
  import { writable } from 'svelte/store';
  
  const sidebarOpen = writable(false);
</script>

<BaseLayoutWrapper 
  bodyClassName="app-layout"
  bodyStyle="display: grid; grid-template-columns: {sidebarOpen ? '250px' : '0'} 1fr; transition: grid-template-columns 0.3s;"
>
  <aside class="sidebar">Sidebar</aside>
  <main>Main content</main>
</BaseLayoutWrapper>
```

## Accessibility

The BaseLayoutWrapper component provides a semantic structure for full-viewport applications:

- Uses semantic HTML (`<div>` containers)
- Supports ARIA attributes via props if needed
- Maintains proper document flow
- Keyboard navigation works naturally with content

For better accessibility, consider adding semantic elements within the body:

```svelte
<BaseLayoutWrapper>
  <header role="banner">App Header</header>
  <main role="main">Main Content</main>
  <footer role="contentinfo">App Footer</footer>
</BaseLayoutWrapper>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options using CSS custom properties.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { BaseLayoutWrapperProps } from '@rief/kit';

const layoutConfig: BaseLayoutWrapperProps = {
  layoutClassName: 'my-layout',
  layoutStyle: 'background: #f0f0f0;',
  bodyClassName: 'my-content',
  bodyStyle: 'padding: 2rem;'
};
```

## Performance Considerations

- **Window Resize**: The component uses Svelte's `svelte:window` binding which efficiently handles resize events
- **SSR**: Dimensions are initialized with safe fallback values (0) for server-side rendering
- **CSS Variables**: Dimension updates use CSS custom properties for optimal performance
- **No Re-renders**: Style updates don't trigger component re-renders, only CSS variable updates

## Best Practices

1. **Use CSS Variables**: Leverage `--base-layout-width` and `--base-layout-height` for responsive sizing
2. **Semantic HTML**: Add semantic elements (header, main, footer) within the body slot
3. **Theme Integration**: Use CSS custom properties for consistent theming
4. **Performance**: Avoid heavy computations in style props; use CSS classes when possible
5. **Accessibility**: Ensure proper ARIA labels and semantic structure for screen readers

## Common Use Cases

- **Full-Screen Applications**: Desktop-style apps that need viewport coverage
- **Dashboards**: Admin panels and data visualization interfaces
- **Canvas Applications**: Drawing apps, games, or interactive visualizations
- **Mobile Apps**: Progressive web apps with full-screen experience
- **Presentation Apps**: Slide shows, demos, or kiosk applications

