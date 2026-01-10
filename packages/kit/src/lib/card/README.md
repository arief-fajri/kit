# Card Component

A flexible and customizable card component for displaying content in a contained, visually distinct container. Perfect for dashboards, content cards, product displays, and interactive UI elements.

## Features

- 🎨 **4 Visual Variants**: default, outlined, elevated, filled
- 📏 **3 Size Options**: sm, md, lg
- 🎯 **Flexible Padding**: none, sm, md, lg, xl
- 🔗 **Interactive States**: hover effects, clickable support, disabled state
- ♿ **Accessibility**: Full ARIA support and semantic HTML
- 🎭 **Customizable**: CSS custom properties for easy theming
- 🔧 **TypeScript**: Full type safety with comprehensive interfaces

## User Interface Structure

The Card component uses a flexible container that can render as either a `<div>` or `<button>` element based on the `clickable` prop.

```
<{elementTag} class="card card--{variant} card--{size} card--padding-{padding}">
  └── <slot />
      └── Card content (any HTML/Svelte components)
```

### Layout Behavior

- **Container**: Flexbox column layout with configurable gap
- **Content Flow**: Vertical stacking of slot content
- **Element Type**: Automatically switches between `<div>` and `<button>` based on `clickable` prop
- **State Switching**: Visual feedback for hover, active, and disabled states
- **Responsive**: Adapts to container width automatically

## Basic Usage

```svelte
<script>
  import { Card } from '@rief/kit';
</script>

<!-- Basic card -->
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

<!-- Card with variant and size -->
<Card 
  styling={{
    variant: "elevated",
    size: "lg"
  }}
>
  <h3>Elevated Card</h3>
  <p>This card has a shadow effect</p>
</Card>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| *(No core props - Card uses only styling and behavior)* | | | |

### Styling Props (`styling` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling.variant` | `'default' \| 'outlined' \| 'elevated' \| 'filled'` | `'default'` | Visual style variant |
| `styling.size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size |
| `styling.padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding size |
| `styling.className` | `string` | `""` | Additional CSS classes |
| `styling.style` | `string` | `""` | Additional inline styles |
| `styling.backgroundColor` | `string` | `undefined` | Custom background color |
| `styling.borderColor` | `string` | `undefined` | Custom border color |
| `styling.shadowColor` | `string` | `undefined` | Custom shadow color |
| `styling.rounded` | `boolean` | `true` | Apply rounded corners |
| `styling.borderRadius` | `string` | `undefined` | Custom border radius |

### Behavior Props (`behavior` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `behavior.disabled` | `boolean` | `false` | Disable card interaction |
| `behavior.interactive` | `boolean` | `false` | Enable hover effects |
| `behavior.clickable` | `boolean` | `false` | Make card clickable (renders as button) |

### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | Accessibility label (required when clickable) |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference |

## Variants

### Default
Clean, minimal style with transparent background and subtle border. Best for most use cases.

```svelte
<Card styling={{ variant: "default" }}>
  <h3>Default Card</h3>
  <p>Content here</p>
</Card>
```

### Outlined
Card with prominent border outline. Emphasizes the card boundaries.

```svelte
<Card styling={{ variant: "outlined" }}>
  <h3>Outlined Card</h3>
  <p>Content here</p>
</Card>
```

### Elevated
Card with shadow effect. Creates depth and visual hierarchy.

```svelte
<Card styling={{ variant: "elevated" }}>
  <h3>Elevated Card</h3>
  <p>Content here</p>
</Card>
```

### Filled
Card with background color. Provides visual separation from surrounding content.

```svelte
<Card styling={{ variant: "filled" }}>
  <h3>Filled Card</h3>
  <p>Content here</p>
</Card>
```

## Sizes

```svelte
<Card styling={{ size: "sm" }}>Small Card</Card>
<Card styling={{ size: "md" }}>Medium Card</Card>
<Card styling={{ size: "lg" }}>Large Card</Card>
```

## Padding Options

```svelte
<Card styling={{ padding: "none" }}>No Padding</Card>
<Card styling={{ padding: "sm" }}>Small Padding</Card>
<Card styling={{ padding: "md" }}>Medium Padding</Card>
<Card styling={{ padding: "lg" }}>Large Padding</Card>
<Card styling={{ padding: "xl" }}>Extra Large Padding</Card>
```

## Interactive Cards

### Hover Effects

Enable hover effects with the `interactive` prop:

```svelte
<Card behavior={{ interactive: true }}>
  <h3>Interactive Card</h3>
  <p>Hover over me!</p>
</Card>
```

### Clickable Cards

Make cards clickable by using the `clickable` prop. The card will render as a `<button>` element:

```svelte
<script>
  function handleCardClick() {
    console.log('Card clicked!');
  }
</script>

<Card 
  behavior={{ clickable: true }}
  ariaLabel="Click to view details"
  on:click={handleCardClick}
>
  <h3>Clickable Card</h3>
  <p>Click anywhere on this card</p>
</Card>
```

## Custom Colors

Override colors using the styling props:

```svelte
<Card 
  styling={{
    backgroundColor: "#f0f0f0",
    borderColor: "#3b82f6",
    shadowColor: "rgba(59, 130, 246, 0.3)"
  }}
>
  <h3>Custom Colored Card</h3>
  <p>Content here</p>
</Card>
```

## Disabled State

```svelte
<Card 
  behavior={{
    disabled: true,
    clickable: true
  }}
>
  <h3>Disabled Card</h3>
  <p>This card cannot be clicked</p>
</Card>
```

## Events

The Card component dispatches several events:

```svelte
<Card 
  clickable
  on:click={(e) => console.log('Clicked:', e.detail)}
  on:mouseenter={(e) => console.log('Mouse enter:', e.detail)}
  on:mouseleave={(e) => console.log('Mouse leave:', e.detail)}
  on:focus={(e) => console.log('Focused:', e.detail)}
  on:blur={(e) => console.log('Blurred:', e.detail)}
>
  <h3>Event Handling Card</h3>
</Card>
```

### Event Details

- **`click`**: Dispatched when card is clicked (only when `clickable` is true)
  - `MouseEvent`
- **`mouseenter`**: Dispatched when mouse enters the card
  - `MouseEvent`
- **`mouseleave`**: Dispatched when mouse leaves the card
  - `MouseEvent`
- **`focus`**: Dispatched when card receives focus (only when `clickable` is true)
  - `FocusEvent`
- **`blur`**: Dispatched when card loses focus (only when `clickable` is true)
  - `FocusEvent`

## Accessibility

The Card component is fully accessible by default:

- Proper semantic markup (`<div>` or `<button>` based on `clickable` prop)
- ARIA attributes for screen readers
- Keyboard navigation support (when `clickable` is true)
- Focus management
- Disabled state handling

```svelte
<!-- Accessible clickable card -->
<Card 
  clickable 
  ariaLabel="View product details"
  on:click={handleViewDetails}
>
  <h3>Product Card</h3>
  <p>Click to view details</p>
</Card>
```

## Advanced Usage

### Dynamic Content

```svelte
<script>
  let cards = [
    { title: "Card 1", content: "Content 1" },
    { title: "Card 2", content: "Content 2" },
    { title: "Card 3", content: "Content 3" }
  ];
</script>

{#each cards as card}
  <Card variant="elevated" interactive>
    <h3>{card.title}</h3>
    <p>{card.content}</p>
  </Card>
{/each}
```

### Conditional Styling

```svelte
<Card 
  styling={{
    variant: isActive ? 'elevated' : 'default'
  }}
  behavior={{
    interactive: !isDisabled,
    disabled: isDisabled
  }}
>
  <h3>Conditional Card</h3>
  <p>Content here</p>
</Card>
```

### Custom Border Radius

```svelte
<Card 
  styling={{
    rounded: false,
    borderRadius: "1rem"
  }}
>
  <h3>Custom Border Radius</h3>
  <p>Content here</p>
</Card>
```

### Card Grid Layout

```svelte
<div class="grid grid-cols-3 gap-4">
  <Card styling={{ variant: "elevated", size: "md" }}>
    <h3>Card 1</h3>
  </Card>
  <Card styling={{ variant: "elevated", size: "md" }}>
    <h3>Card 2</h3>
  </Card>
  <Card styling={{ variant: "elevated", size: "md" }}>
    <h3>Card 3</h3>
  </Card>
</div>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { 
  CardProps, 
  CardStyling, 
  CardBehavior 
} from '@rief/kit';

const cardConfig: CardProps = {
  styling: {
    variant: 'elevated',
    size: 'lg',
    padding: 'md'
  },
  behavior: {
    interactive: true,
    clickable: false
  }
};
```
