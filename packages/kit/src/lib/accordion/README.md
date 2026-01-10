# Accordion Component

A flexible and accessible accordion component for organizing and displaying collapsible content sections. Perfect for FAQs, content organization, and progressive disclosure patterns.

## Features

- 🎨 **Multiple Variants**: Default, filled, and outlined styles for different design contexts
- 📏 **Size Options**: Small, medium, and large sizes to match your design system
- 🎯 **Flexible Content**: Support for simple props, item objects, or custom slots
- 🔗 **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
- ♿ **Fully Accessible**: ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **State Management**: Built-in expand/collapse state with event callbacks
- 🎨 **Customizable Styling**: CSS custom properties for easy theming and overrides
- 🔧 **TypeScript Support**: Fully typed with comprehensive type definitions

## User Interface Structure

The Accordion component uses a vertical layout with a clickable header that toggles the visibility of content below. The header contains a title, optional subtitle, and an expand/collapse icon.

```
<div class="accordion accordion--{size} accordion--variant-{variant}">
  ├── .accordion__header-wrapper
  │   └── <button class="accordion__header">
  │       ├── .accordion__icon (when iconPosition === 'left')
  │       ├── slot="header" (default: .accordion__header-content)
  │       │   ├── .accordion__title
  │       │   └── .accordion__subtitle (optional)
  │       └── .accordion__icon (when iconPosition === 'right')
  │
  └── .accordion__content (when expanded)
      └── slot="content" (default: {@html content})
```

### Layout Behavior

- **Container**: Flexbox column layout with full width
- **Content Flow**: Header always visible, content slides in/out when toggled
- **Icon Animation**: Icon rotates 180° when expanded
- **State Switching**: Smooth slide transition for content reveal/hide
- **Responsive**: Adapts to container width automatically

## Basic Usage

```svelte
<script>
	import { Accordion } from '@rief/kit';
</script>

<!-- Basic accordion with item prop -->
<Accordion
	content={{
		item: {
			title: 'Frequently Asked Questions',
			subtitle: 'Common questions and answers',
			content: '<p>This is the answer to your question.</p>'
		}
	}}
/>

<!-- Accordion with direct props -->
<Accordion
	content={{
		title: 'How does it work?',
		subtitle: 'Learn more about the process',
		content: '<p>Detailed explanation here.</p>'
	}}
/>

<!-- Controlled accordion -->
<Accordion expanded={isOpen} on:toggle={(e) => console.log('Toggled:', e.detail)} />
```

## Props

| Prop              | Type                   | Default     | Description                                  |
| ----------------- | ---------------------- | ----------- | -------------------------------------------- |
| `expanded`        | `boolean \| undefined` | `undefined` | Expanded state for controlled mode           |
| `defaultExpanded` | `boolean`              | `false`     | Default expanded state for uncontrolled mode |
| `styling`         | `AccordionStyling`     | `{}`        | Styling configuration object                 |
| `behavior`        | `AccordionBehavior`    | `{}`        | Behavioral configuration options             |
| `content`         | `AccordionContent`     | `{}`        | Content configuration object                 |

### Styling Configuration (`styling` prop)

| Property             | Type                                  | Default     | Description                               |
| -------------------- | ------------------------------------- | ----------- | ----------------------------------------- |
| `size`               | `'sm' \| 'md' \| 'lg'`                | `'md'`      | Accordion size variant                    |
| `variant`            | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual style variant                      |
| `className`          | `string`                              | `""`        | Additional CSS classes for root element   |
| `headerWrapperClass` | `string`                              | `""`        | Additional CSS classes for header wrapper |
| `headerButtonClass`  | `string`                              | `""`        | Additional CSS classes for header button  |
| `contentClass`       | `string`                              | `""`        | Additional CSS classes for content area   |
| `iconClass`          | `string`                              | `""`        | Additional CSS classes for icon           |
| `wrapperStyle`       | `string`                              | `""`        | Inline styles for wrapper element         |

### Behavior Configuration (`behavior` prop)

| Property             | Type                | Default   | Description                           |
| -------------------- | ------------------- | --------- | ------------------------------------- |
| `disabled`           | `boolean`           | `false`   | Disable accordion interaction         |
| `showIcon`           | `boolean`           | `true`    | Show expand/collapse icon             |
| `iconPosition`       | `'left' \| 'right'` | `'right'` | Position of the expand/collapse icon  |
| `transitionDuration` | `number`            | `300`     | Transition duration in milliseconds   |
| `titleUnderline`     | `boolean`           | `false`   | Show border under title when expanded |

### Content Configuration (`content` prop)

| Property   | Type            | Default     | Description                                  |
| ---------- | --------------- | ----------- | -------------------------------------------- |
| `item`     | `AccordionItem` | `undefined` | Accordion item data object                   |
| `title`    | `string`        | `""`        | Title text (alternative to item.title)       |
| `subtitle` | `string`        | `undefined` | Subtitle text (alternative to item.subtitle) |
| `content`  | `string`        | `undefined` | HTML content (alternative to item.content)   |

### AccordionItem Interface

| Property   | Type                  | Description                              |
| ---------- | --------------------- | ---------------------------------------- |
| `title`    | `string`              | Accordion title (required)               |
| `subtitle` | `string`              | Optional subtitle text                   |
| `content`  | `string`              | HTML content string                      |
| `disabled` | `boolean`             | Disable this specific item               |
| `metadata` | `Record<string, any>` | Additional metadata for custom use cases |

## Variants

### Default (Default)

Clean, minimal style with transparent background. Best for most use cases.

```svelte
<Accordion
	styling={{ variant: 'default' }}
	content={{ title: 'Default Accordion', content: '<p>Content here</p>' }}
/>
```

### Filled

Accordion with background color. Provides visual separation from surrounding content.

```svelte
<Accordion
	styling={{ variant: 'filled' }}
	content={{ title: 'Filled Accordion', content: '<p>Content here</p>' }}
/>
```

### Outlined

Accordion with border outline. Emphasizes the accordion boundaries.

```svelte
<Accordion
	styling={{ variant: 'outlined' }}
	content={{ title: 'Outlined Accordion', content: '<p>Content here</p>' }}
/>
```

## Sizes

```svelte
<Accordion styling={{ size: 'sm' }} content={{ title: 'Small', content: '<p>Content</p>' }} />
<Accordion styling={{ size: 'md' }} content={{ title: 'Medium', content: '<p>Content</p>' }} />
<Accordion styling={{ size: 'lg' }} content={{ title: 'Large', content: '<p>Content</p>' }} />
```

## Slots

### Header Slot

Customize the header content completely:

```svelte
<Accordion>
	<div slot="header" let:isExpanded let:disabled>
		<h3>Custom Header {isExpanded ? '▼' : '▶'}</h3>
		<span>Status: {disabled ? 'Disabled' : 'Active'}</span>
	</div>
	<div slot="content">
		<p>Custom content here</p>
	</div>
</Accordion>
```

### Content Slot

Customize the content area:

```svelte
<Accordion content={{ title: 'Custom Content' }}>
	<div slot="content" let:isExpanded>
		{#if isExpanded}
			<p>This content is only visible when expanded!</p>
		{/if}
	</div>
</Accordion>
```

## Controlled vs Uncontrolled

### Controlled Mode

Manage the expanded state externally:

```svelte
<script>
	let isExpanded = false;

	function handleToggle(e) {
		isExpanded = e.detail.expanded;
		console.log('Previous state:', e.detail.previousState);
		console.log('New state:', e.detail.expanded);
	}
</script>

<Accordion
	expanded={isExpanded}
	on:toggle={handleToggle}
	content={{ title: 'Controlled Accordion', content: '<p>Content</p>' }}
/>
```

### Uncontrolled Mode

Let the component manage its own state:

```svelte
<Accordion
	defaultExpanded={true}
	content={{ title: 'Uncontrolled Accordion', content: '<p>Content</p>' }}
/>
```

## Events

The Accordion component dispatches several events:

```svelte
<Accordion
	content={{ title: 'Interactive Accordion', content: '<p>Content</p>' }}
	on:expand={(e) => console.log('Expanded:', e.detail.expanded)}
	on:collapse={(e) => console.log('Collapsed:', e.detail.expanded)}
	on:toggle={(e) => console.log('Toggled:', e.detail)}
	on:click={(e) => console.log('Clicked:', e.detail)}
/>
```

### Event Details

- **`expand`**: Dispatched when accordion expands
  - `{ expanded: boolean }`
- **`collapse`**: Dispatched when accordion collapses
  - `{ expanded: boolean }`
- **`toggle`**: Dispatched on any state change
  - `{ expanded: boolean, previousState: boolean }`
- **`click`**: Dispatched when header is clicked
  - `boolean` (new expanded state)

## Accessibility

The Accordion component is fully accessible by default:

- Proper semantic markup (`<button>` for header, `<div role="region">` for content)
- ARIA attributes (`aria-expanded`, `aria-controls`, `aria-disabled`)
- Keyboard navigation support (Enter and Space keys)
- Focus management
- Screen reader announcements

```svelte
<!-- Accessible accordion -->
<Accordion
	content={{ title: 'Accessible Accordion', content: '<p>Content</p>' }}
	behavior={{ disabled: false }}
/>
```

## Advanced Usage

### Dynamic Content

```svelte
<script>
	let items = [
		{ title: 'Item 1', content: '<p>Content 1</p>' },
		{ title: 'Item 2', content: '<p>Content 2</p>' },
		{ title: 'Item 3', content: '<p>Content 3</p>' }
	];
</script>

{#each items as item}
	<Accordion content={{ item }} />
{/each}
```

### Conditional Rendering

```svelte
<Accordion
	expanded={showDetails}
	styling={{
		variant: isActive ? 'filled' : 'default',
		size: isMobile ? 'sm' : 'md'
	}}
	behavior={{ disabled: !isActive }}
	content={{ title: 'Conditional Accordion', content: '<p>Content</p>' }}
/>
```

### Icon Customization

```svelte
<!-- Icon on the left -->
<Accordion
	behavior={{ iconPosition: 'left' }}
	content={{ title: 'Left Icon', content: '<p>Content</p>' }}
/>

<!-- Hide icon -->
<Accordion
	behavior={{ showIcon: false }}
	content={{ title: 'No Icon', content: '<p>Content</p>' }}
/>
```

### Custom Styling

```svelte
<Accordion
	styling={{
		className: 'my-custom-accordion',
		headerButtonClass: 'custom-header',
		contentClass: 'custom-content',
		wrapperStyle: '--accordion-text: #custom-color;'
	}}
	content={{ title: 'Custom Styled', content: '<p>Content</p>' }}
/>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type {
	AccordionProps,
	AccordionStyling,
	AccordionBehavior,
	AccordionContent,
	AccordionItem,
	AccordionSize,
	AccordionVariant
} from '@rief/kit';

const accordionConfig: AccordionProps = {
	expanded: false,
	defaultExpanded: false,
	styling: {
		size: 'md',
		variant: 'default',
		className: 'my-accordion'
	},
	behavior: {
		disabled: false,
		showIcon: true,
		iconPosition: 'right',
		transitionDuration: 300
	},
	content: {
		title: 'Typed Accordion',
		content: '<p>Content</p>'
	}
};
```
