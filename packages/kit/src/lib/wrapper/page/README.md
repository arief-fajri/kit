# PageWrapper Component

A scrollable page container component designed to work within `BaseLayoutWrapper` for full-viewport applications. Provides a flexible, scrollable content area with optional content centering, footer support, and comprehensive theming via CSS custom properties.

## Features

- 📜 **Scrollable Container**: Full-height scrollable page wrapper with smooth scrolling
- 🎯 **Content Centering**: Optional vertical and horizontal content centering
- 🎨 **Fully Themeable**: Comprehensive CSS custom properties for complete customization
- 🔧 **TypeScript Native**: Full type safety with intelligent IntelliSense support
- ♿ **SSR Safe**: Handles server-side rendering gracefully
- 🎨 **Flexible Styling**: Customizable via props and CSS variables
- 📦 **Zero Dependencies**: No external dependencies, pure Svelte component
- 🎭 **Overlay Integration**: Automatically prevents scrolling when overlays are active
- 📊 **Scroll Events**: Dispatches detailed scroll events with position data

## User Interface Structure

The PageWrapper creates a three-layer container structure optimized for scrollable page content.

```
<div class="page-wrapper">
  └── .page-content
      └── slot (your page content)
  └── .page-footer (optional)
      └── slot name="footer" (footer content)
```

### Layout Behavior

- **Scrollable Container**: Flex column layout with vertical scrolling
- **Content Area**: Flexible content container with optional max-width
- **Footer Support**: Optional footer slot that only renders when content is provided
- **Overlay Aware**: Automatically disables scrolling when `.overlay-active` class is present on parent
- **Smooth Scrolling**: Configurable scroll behavior via CSS custom properties

## Basic Usage

```svelte
<script>
	import { BaseLayoutWrapper, PageWrapper } from '@rief/kit';
</script>

<BaseLayoutWrapper>
	<PageWrapper>
		<div>Your page content here</div>
	</PageWrapper>
</BaseLayoutWrapper>
```

### With Footer

```svelte
<BaseLayoutWrapper>
	<PageWrapper>
		<div>Main content</div>

		<svelte:fragment slot="footer">
			<div>Footer content</div>
		</svelte:fragment>
	</PageWrapper>
</BaseLayoutWrapper>
```

### With Centered Content

```svelte
<BaseLayoutWrapper>
	<PageWrapper behavior={{ center: true }}>
		<div>Centered content</div>
	</PageWrapper>
</BaseLayoutWrapper>
```

### With Custom Styling

```svelte
<BaseLayoutWrapper>
	<PageWrapper
		styling={{
			wrapperClassName: 'my-page',
			contentClassName: 'my-content',
			wrapperStyle: 'background: #f0f0f0;',
			contentStyle: 'padding: 2rem; max-width: 1200px; margin: 0 auto;'
		}}
	>
		<div>Custom styled content</div>
	</PageWrapper>
</BaseLayoutWrapper>
```

## Props

### Core Props

| Prop         | Type          | Default     | Description                               |
| ------------ | ------------- | ----------- | ----------------------------------------- |
| `pageElm`    | `HTMLElement` | `undefined` | Reference to the page wrapper DOM element |
| `contentElm` | `HTMLElement` | `undefined` | Reference to the content DOM element      |
| `footerElm`  | `HTMLElement` | `undefined` | Reference to the footer DOM element       |

### Styling Props (`styling` object)

| Prop                       | Type     | Default | Description                                           |
| -------------------------- | -------- | ------- | ----------------------------------------------------- |
| `styling.className`        | `string` | `""`    | Additional CSS classes for root element               |
| `styling.style`            | `string` | `""`    | Additional inline styles                              |
| `styling.wrapperClassName` | `string` | `""`    | Additional CSS classes for the page wrapper container |
| `styling.wrapperStyle`     | `string` | `""`    | Inline styles for the page wrapper container          |
| `styling.contentClassName` | `string` | `""`    | Additional CSS classes for the content container      |
| `styling.contentStyle`     | `string` | `""`    | Inline styles for the content container               |
| `styling.footerClassName`  | `string` | `""`    | Additional CSS classes for the footer container       |
| `styling.footerStyle`      | `string` | `""`    | Inline styles for the footer container                |

### Behavior Props (`behavior` object)

| Prop              | Type      | Default | Description                                |
| ----------------- | --------- | ------- | ------------------------------------------ |
| `behavior.center` | `boolean` | `false` | Center content vertically and horizontally |

### Accessibility Props

| Prop              | Type     | Default     | Description                  |
| ----------------- | -------- | ----------- | ---------------------------- |
| `ariaLabel`       | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference  |

## Events

### `scroll`

Dispatched when the page wrapper is scrolled. The event detail contains scroll position information.

```typescript
interface PageWrapperScrollEventDetail {
	scrollTop: number; // Current scroll position from top
	scrollLeft: number; // Current scroll position from left
	scrollHeight: number; // Total scrollable height
	clientHeight: number; // Visible height of the scrollable area
	target: HTMLElement; // The scrollable element
}
```

**Example:**

```svelte
<script>
	import { PageWrapper } from '@rief/kit';
	import type { PageWrapperScrollEventDetail } from '@rief/kit';

	function handleScroll(event: CustomEvent<PageWrapperScrollEventDetail>) {
		const { scrollTop, scrollHeight, clientHeight } = event.detail;
		const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
		console.log(`Scrolled ${scrollPercentage.toFixed(1)}%`);
	}
</script>

<PageWrapper on:scroll={handleScroll}>
	<div>Scrollable content</div>
</PageWrapper>
```

## CSS Custom Properties

The component uses CSS custom properties for easy theming and customization. See [STYLING.md](./STYLING.md) for comprehensive styling documentation.

| Property                         | Default                             | Description                                   |
| -------------------------------- | ----------------------------------- | --------------------------------------------- |
| `--page-wrapper-bg`              | `var(--color-surface, transparent)` | Background color of the page wrapper          |
| `--page-wrapper-padding`         | `0`                                 | Padding of the page wrapper                   |
| `--page-wrapper-scroll-behavior` | `smooth`                            | Scroll behavior (`smooth`, `auto`, `instant`) |
| `--page-content-max-width`       | `none`                              | Maximum width of the content area             |
| `--page-content-padding`         | `0`                                 | Padding of the content area                   |
| `--page-footer-bg`               | `transparent`                       | Background color of the footer                |
| `--page-footer-padding`          | `0`                                 | Padding of the footer                         |

## Advanced Usage

### Scroll Tracking

```svelte
<script>
	import { PageWrapper } from '@rief/kit';
	import type { PageWrapperScrollEventDetail } from '@rief/kit';

	let scrollPosition = 0;
	let isScrolling = false;

	function handleScroll(event: CustomEvent<PageWrapperScrollEventDetail>) {
		scrollPosition = event.detail.scrollTop;
		isScrolling = true;

		// Reset scrolling flag after scroll ends
		clearTimeout(window.scrollTimeout);
		window.scrollTimeout = setTimeout(() => {
			isScrolling = false;
		}, 150);
	}
</script>

<PageWrapper on:scroll={handleScroll}>
	<div>Scroll position: {scrollPosition}px</div>
	{#if isScrolling}
		<div>Scrolling...</div>
	{/if}
</PageWrapper>
```

### Infinite Scroll

```svelte
<script>
	import { PageWrapper } from '@rief/kit';
	import type { PageWrapperScrollEventDetail } from '@rief/kit';

	let items = Array.from({ length: 20 }, (_, i) => i + 1);
	let loading = false;

	async function handleScroll(event: CustomEvent<PageWrapperScrollEventDetail>) {
		const { scrollTop, scrollHeight, clientHeight } = event.detail;
		const threshold = scrollHeight - clientHeight - 100; // 100px before bottom

		if (scrollTop >= threshold && !loading) {
			loading = true;
			// Load more items
			await new Promise((resolve) => setTimeout(resolve, 500));
			items = [...items, ...Array.from({ length: 10 }, (_, i) => items.length + i + 1)];
			loading = false;
		}
	}
</script>

<PageWrapper on:scroll={handleScroll}>
	{#each items as item}
		<div>Item {item}</div>
	{/each}
	{#if loading}
		<div>Loading more...</div>
	{/if}
</PageWrapper>
```

### Programmatic Scroll Control

```svelte
<script>
	import { PageWrapper } from '@rief/kit';

	let pageRef: HTMLElement;

	function scrollToTop() {
		pageRef?.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function scrollToBottom() {
		pageRef?.scrollTo({ top: pageRef.scrollHeight, behavior: 'smooth' });
	}
</script>

<PageWrapper bind:pageElm={pageRef}>
	<div>Content</div>
</PageWrapper>

<button on:click={scrollToTop}>Scroll to Top</button>
<button on:click={scrollToBottom}>Scroll to Bottom</button>
```

### Responsive Content Width

```svelte
<PageWrapper
	styling={{ contentStyle: 'max-width: min(100%, 1200px); margin: 0 auto; padding: 2rem;' }}
>
	<div>Responsive centered content</div>
</PageWrapper>
```

## Integration Examples

### With SvelteKit

```svelte
<!-- +layout.svelte -->
<script>
	import { BaseLayoutWrapper, PageWrapper } from '@rief/kit';
</script>

<BaseLayoutWrapper>
	<PageWrapper>
		<slot />
	</PageWrapper>
</BaseLayoutWrapper>
```

### With Routing

```svelte
<script>
	import { BaseLayoutWrapper, PageWrapper } from '@rief/kit';
	import { page } from '$app/stores';
</script>

<BaseLayoutWrapper>
	<PageWrapper
		styling={{
			contentClassName: 'app-content',
			contentStyle: 'padding: 2rem;'
		}}
	>
		{#if $page.url.pathname === '/dashboard'}
			<Dashboard />
		{:else if $page.url.pathname === '/settings'}
			<Settings />
		{:else}
			<Home />
		{/if}
	</PageWrapper>
</BaseLayoutWrapper>
```

### With State Management

```svelte
<script>
	import { BaseLayoutWrapper, PageWrapper } from '@rief/kit';
	import { writable } from 'svelte/store';

	const sidebarOpen = writable(false);
</script>

<BaseLayoutWrapper>
	<PageWrapper
		styling={{
			contentStyle:
				"display: grid; grid-template-columns: {$sidebarOpen ? '250px' : '0'} 1fr; transition: grid-template-columns 0.3s;"
		}}
	>
		<aside class="sidebar">Sidebar</aside>
		<main>Main content</main>
	</PageWrapper>
</BaseLayoutWrapper>
```

## Accessibility

The PageWrapper component provides a semantic structure for scrollable page content:

- Uses semantic HTML (`<div>` for wrapper, `<footer>` for footer)
- Maintains proper document flow
- Keyboard navigation works naturally with content
- Scroll events provide detailed information for assistive technologies

For better accessibility, consider adding semantic elements within the content:

```svelte
<PageWrapper>
	<main role="main">
		<h1>Page Title</h1>
		<article>Main content</article>
	</main>

	<svelte:fragment slot="footer">
		<footer role="contentinfo">Footer content</footer>
	</svelte:fragment>
</PageWrapper>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options using CSS custom properties.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { PageWrapperProps, PageWrapperStyling, PageWrapperBehavior } from '@rief/kit';

const pageConfig: PageWrapperProps = {
	styling: {
		wrapperClassName: 'my-page',
		contentClassName: 'my-content',
		wrapperStyle: 'background: #f0f0f0;',
		contentStyle: 'padding: 2rem;'
	},
	behavior: {
		center: false
	}
};

function handleScroll(event: CustomEvent<PageWrapperScrollEventDetail>) {
	console.log('Scroll position:', event.detail.scrollTop);
}
```

## Performance Considerations

- **Scroll Events**: Scroll events are dispatched efficiently without throttling. Consider throttling in your event handlers if needed.
- **SSR**: Component handles server-side rendering gracefully with window checks
- **CSS Variables**: Style updates use CSS custom properties for optimal performance
- **Conditional Footer**: Footer only renders when slot content is provided, reducing DOM overhead

## Best Practices

1. **Use CSS Variables**: Leverage CSS custom properties for consistent theming
2. **Semantic HTML**: Add semantic elements (main, article, section) within the content slot
3. **Theme Integration**: Use CSS custom properties for consistent theming across your application
4. **Performance**: Throttle scroll event handlers if processing heavy operations
5. **Accessibility**: Ensure proper ARIA labels and semantic structure for screen readers

## Common Use Cases

- **Full-Screen Applications**: Scrollable pages within full-viewport layouts
- **Dashboards**: Admin panels with scrollable content areas
- **Documentation Sites**: Long-form content with footers
- **Mobile Apps**: Progressive web apps with scrollable pages
- **Landing Pages**: Marketing pages with centered content and footers
