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
<Card variant="elevated" size="lg">
  <h3>Elevated Card</h3>
  <p>This card has a shadow effect</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outlined' \| 'elevated' \| 'filled'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Card size |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding size |
| `className` | `string` | `""` | Additional CSS classes |
| `customStyle` | `string` | `""` | Additional inline styles (CSS string) |
| `interactive` | `boolean` | `false` | Enable hover effects |
| `clickable` | `boolean` | `false` | Make card clickable (renders as button) |
| `backgroundColor` | `string` | `undefined` | Custom background color |
| `borderColor` | `string` | `undefined` | Custom border color |
| `shadowColor` | `string` | `undefined` | Custom shadow color |
| `rounded` | `boolean` | `true` | Apply rounded corners |
| `borderRadius` | `string` | `undefined` | Custom border radius |
| `disabled` | `boolean` | `false` | Disable card interaction |
| `ariaLabel` | `string` | `undefined` | Accessibility label (required when clickable) |

## Variants

### Default
Clean, minimal style with transparent background and subtle border. Best for most use cases.

```svelte
<Card variant="default">
  <h3>Default Card</h3>
  <p>Content here</p>
</Card>
```

### Outlined
Card with prominent border outline. Emphasizes the card boundaries.

```svelte
<Card variant="outlined">
  <h3>Outlined Card</h3>
  <p>Content here</p>
</Card>
```

### Elevated
Card with shadow effect. Creates depth and visual hierarchy.

```svelte
<Card variant="elevated">
  <h3>Elevated Card</h3>
  <p>Content here</p>
</Card>
```

### Filled
Card with background color. Provides visual separation from surrounding content.

```svelte
<Card variant="filled">
  <h3>Filled Card</h3>
  <p>Content here</p>
</Card>
```

## Sizes

```svelte
<Card size="sm">Small Card</Card>
<Card size="md">Medium Card</Card>
<Card size="lg">Large Card</Card>
```

## Padding Options

```svelte
<Card padding="none">No Padding</Card>
<Card padding="sm">Small Padding</Card>
<Card padding="md">Medium Padding</Card>
<Card padding="lg">Large Padding</Card>
<Card padding="xl">Extra Large Padding</Card>
```

## Interactive Cards

### Hover Effects

Enable hover effects with the `interactive` prop:

```svelte
<Card interactive>
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
  clickable 
  ariaLabel="Click to view details"
  on:click={handleCardClick}
>
  <h3>Clickable Card</h3>
  <p>Click anywhere on this card</p>
</Card>
```

## Custom Colors

Override colors using the color props:

```svelte
<Card 
  backgroundColor="#f0f0f0"
  borderColor="#3b82f6"
  shadowColor="rgba(59, 130, 246, 0.3)"
>
  <h3>Custom Colored Card</h3>
  <p>Content here</p>
</Card>
```

## Disabled State

```svelte
<Card disabled clickable>
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
  variant={isActive ? 'elevated' : 'default'}
  interactive={!isDisabled}
  disabled={isDisabled}
>
  <h3>Conditional Card</h3>
  <p>Content here</p>
</Card>
```

### Custom Border Radius

```svelte
<Card 
  rounded={false}
  borderRadius="1rem"
>
  <h3>Custom Border Radius</h3>
  <p>Content here</p>
</Card>
```

### Card Grid Layout

```svelte
<div class="grid grid-cols-3 gap-4">
  <Card variant="elevated" size="md">
    <h3>Card 1</h3>
  </Card>
  <Card variant="elevated" size="md">
    <h3>Card 2</h3>
  </Card>
  <Card variant="elevated" size="md">
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
  CardVariant, 
  CardSize, 
  CardPadding 
} from '@rief/kit';

const cardConfig: CardProps = {
  variant: 'elevated',
  size: 'lg',
  padding: 'md',
  interactive: true,
  clickable: false
};
```
