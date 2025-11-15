# @rief/kit

A modern Svelte component library built with TypeScript.

## Installation

```bash
npm install @rief/kit
```

## Peer Dependencies

This library requires `svelte` version 4.0.0 or higher as a peer dependency.

```bash
npm install svelte@^4.0.0
```

## Usage

```svelte
<script>
	import { Button, Card } from '@rief/kit';
</script>

<Card title="Welcome" subtitle="Get started with Kit">
	<Button variant="primary" size="lg" on:click={() => console.log('Clicked!')}>Click me</Button>
</Card>
```

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**

- `label` (string, optional): Button text content
- `variant` ('primary' | 'secondary' | 'outline', default: 'primary'): Button style variant
- `size` ('sm' | 'md' | 'lg', default: 'md'): Button size
- `disabled` (boolean, default: false): Disabled state

**Example:**

```svelte
<Button variant="primary" size="lg" disabled={false}>Click me</Button>
```

### Card

A flexible card component for displaying content.

**Props:**

- `title` (string, optional): Card title
- `subtitle` (string, optional): Card subtitle

**Example:**

```svelte
<Card title="Card Title" subtitle="Card Subtitle">
	<p>Card content goes here</p>
</Card>
```

## License

MIT
