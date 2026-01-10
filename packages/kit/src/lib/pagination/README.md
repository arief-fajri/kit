# Pagination Component

A fully customizable, accessible pagination component for navigating through paginated data. Perfect for tables, lists, search results, and any content that requires pagination.

## Features

- 🎨 **3 Visual Variants**: default, outlined, minimal
- 📏 **3 Size Options**: sm, md, lg
- 🎯 **Flexible Display**: Configurable first/last, previous/next, ellipsis, and page info
- 🔗 **Offset-Based**: Uses offset (0-based) instead of page numbers for flexibility
- ♿ **Fully Accessible**: ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **Customizable Icons**: Slot-based icon customization
- 🎨 **Customizable Styling**: CSS custom properties for easy theming
- 🔧 **TypeScript**: Full type safety with comprehensive interfaces

## User Interface Structure

The Pagination component uses a horizontal navigation layout with configurable buttons and page numbers.

```
<nav class="pagination pagination--{size} pagination--{variant}">
  ├── .pagination__container
  │   ├── .pagination__button--first (when showFirstLast)
  │   ├── .pagination__button--previous (when showPreviousNext)
  │   ├── .pagination__pages
  │   │   ├── .pagination__ellipsis (when showStartEllipsis)
  │   │   ├── .pagination__button--page (multiple)
  │   │   └── .pagination__ellipsis (when showEndEllipsis)
  │   ├── .pagination__button--next (when showPreviousNext)
  │   └── .pagination__button--last (when showFirstLast)
  │
  └── .pagination__info (when showPageInfo)
      └── Page information text
```

### Layout Behavior

- **Container**: Flexbox column layout with centered alignment
- **Button Flow**: Horizontal arrangement with configurable gaps
- **Page Numbers**: Dynamic calculation with ellipsis support
- **State Switching**: Visual feedback for active, disabled, and hover states
- **Responsive**: Wraps buttons on smaller screens

## Basic Usage

```svelte
<script>
	import { Pagination } from '@rief/kit';

	let currentOffset = 0;
	let limit = 10;
	let totalRows = 100;

	function handlePageChange(event) {
		currentOffset = event.detail.offset;
		console.log('New offset:', currentOffset);
	}
</script>

<Pagination bind:currentOffset {limit} {totalRows} on:pageChange={handlePageChange} />
```

## Props

### Core Props

| Prop            | Type     | Default | Description              |
| --------------- | -------- | ------- | ------------------------ |
| `currentOffset` | `number` | `0`     | Current offset (0-based) |
| `limit`         | `number` | `10`    | Items per page           |
| `totalRows`     | `number` | `0`     | Total number of items    |

### Styling Props (`styling` object)

| Prop                            | Type                                   | Default     | Description                   |
| ------------------------------- | -------------------------------------- | ----------- | ----------------------------- |
| `styling.size`                  | `'sm' \| 'md' \| 'lg'`                 | `'md'`      | Pagination size               |
| `styling.variant`               | `'default' \| 'outlined' \| 'minimal'` | `'default'` | Visual style variant          |
| `styling.className`             | `string`                               | `""`        | Additional CSS classes        |
| `styling.style`                 | `string`                               | `""`        | Additional inline styles      |
| `styling.backgroundColor`       | `string`                               | `undefined` | Custom background color       |
| `styling.textColor`             | `string`                               | `undefined` | Custom text color             |
| `styling.borderColor`           | `string`                               | `undefined` | Custom border color           |
| `styling.activeBackgroundColor` | `string`                               | `undefined` | Custom active page background |
| `styling.activeTextColor`       | `string`                               | `undefined` | Custom active page text color |
| `styling.borderRadius`          | `string`                               | `undefined` | Custom border radius          |
| `styling.gap`                   | `string`                               | `undefined` | Custom gap between buttons    |

### Behavior Props (`behavior` object)

| Prop                         | Type                                                                     | Default     | Description                    |
| ---------------------------- | ------------------------------------------------------------------------ | ----------- | ------------------------------ |
| `behavior.disabled`          | `boolean`                                                                | `false`     | Disable pagination             |
| `behavior.visiblePages`      | `number`                                                                 | `5`         | Number of visible page buttons |
| `behavior.showFirstLast`     | `boolean`                                                                | `true`      | Show first/last page buttons   |
| `behavior.showPreviousNext`  | `boolean`                                                                | `true`      | Show previous/next buttons     |
| `behavior.showEllipsis`      | `boolean`                                                                | `true`      | Show ellipsis for page ranges  |
| `behavior.showPageInfo`      | `boolean`                                                                | `false`     | Show page information text     |
| `behavior.pageInfoFormatter` | `(currentPage: number, totalPages: number, totalRows: number) => string` | `undefined` | Custom page info formatter     |

### Accessibility Props

| Prop              | Type     | Default                   | Description                 |
| ----------------- | -------- | ------------------------- | --------------------------- |
| `ariaLabel`       | `string` | `"Pagination navigation"` | Accessibility label         |
| `ariaDescribedBy` | `string` | `undefined`               | ARIA described by reference |

## Variants

### Default

Standard pagination with borders and background colors.

```svelte
<Pagination bind:currentOffset {limit} {totalRows} styling={{ variant: 'default' }} />
```

### Outlined

Pagination with thicker borders for emphasis.

```svelte
<Pagination bind:currentOffset {limit} {totalRows} styling={{ variant: 'outlined' }} />
```

### Minimal

Minimal style with no borders, perfect for clean interfaces.

```svelte
<Pagination bind:currentOffset {limit} {totalRows} styling={{ variant: 'minimal' }} />
```

## Sizes

```svelte
<Pagination styling={{ size: 'sm' }} bind:currentOffset {limit} {totalRows} />
<Pagination styling={{ size: 'md' }} bind:currentOffset {limit} {totalRows} />
<Pagination styling={{ size: 'lg' }} bind:currentOffset {limit} {totalRows} />
```

## Display Options

### Hide First/Last Buttons

```svelte
<Pagination bind:currentOffset {limit} {totalRows} behavior={{ showFirstLast: false }} />
```

### Hide Previous/Next Buttons

```svelte
<Pagination bind:currentOffset {limit} {totalRows} behavior={{ showPreviousNext: false }} />
```

### Hide Ellipsis

```svelte
<Pagination bind:currentOffset {limit} {totalRows} behavior={{ showEllipsis: false }} />
```

### Show Page Info

```svelte
<Pagination bind:currentOffset {limit} {totalRows} behavior={{ showPageInfo: true }} />
```

## Custom Page Info Formatter

```svelte
<script>
	function customFormatter(currentPage, totalPages, totalRows) {
		return `Page ${currentPage} of ${totalPages} (${totalRows} items)`;
	}
</script>

<Pagination
	bind:currentOffset
	{limit}
	{totalRows}
	behavior={{
		showPageInfo: true,
		pageInfoFormatter: customFormatter
	}}
/>
```

## Events

The Pagination component dispatches several events:

```svelte
<Pagination
	bind:currentOffset
	{limit}
	{totalRows}
	on:pageChange={(e) => console.log('Page changed:', e.detail)}
	on:firstPage={(e) => console.log('First page:', e.detail)}
	on:previousPage={(e) => console.log('Previous page:', e.detail)}
	on:nextPage={(e) => console.log('Next page:', e.detail)}
	on:lastPage={(e) => console.log('Last page:', e.detail)}
/>
```

### Event Details

- **`pageChange`**: Dispatched on any page change
  - `{ offset: number, page: number }`
- **`firstPage`**: Dispatched when first page is clicked
  - `{ offset: number, page: number }`
- **`previousPage`**: Dispatched when previous page is clicked
  - `{ offset: number, page: number }`
- **`nextPage`**: Dispatched when next page is clicked
  - `{ offset: number, page: number }`
- **`lastPage`**: Dispatched when last page is clicked
  - `{ offset: number, page: number }`

## Slots

### Custom Icons

Replace default icons with custom ones:

```svelte
<Pagination bind:currentOffset {limit} {totalRows}>
	<CustomFirstIcon slot="first-icon" />
	<CustomPreviousIcon slot="previous-icon" />
	<CustomNextIcon slot="next-icon" />
	<CustomLastIcon slot="last-icon" />
</Pagination>
```

### Custom Page Numbers

Customize the appearance of page number buttons:

```svelte
<Pagination bind:currentOffset {limit} {totalRows}>
	<span slot="page" let:pageNum let:currentPage let:totalPages>
		<strong>{pageNum}</strong>
	</span>
</Pagination>
```

### Custom Ellipsis

Customize ellipsis appearance:

```svelte
<Pagination bind:currentOffset {limit} {totalRows}>
	<span slot="ellipsis-start">...</span>
	<span slot="ellipsis-end">...</span>
</Pagination>
```

### Custom Page Info

Customize page information display:

```svelte
<Pagination bind:currentOffset {limit} {totalRows} behavior={{ showPageInfo: true }}>
	<div slot="page-info" let:currentPage let:totalPages let:totalRows let:offset let:limit>
		<strong>{currentPage}</strong> / {totalPages} pages
		<br />
		Showing {offset + 1} to {Math.min(offset + limit, totalRows)} of {totalRows} items
	</div>
</Pagination>
```

## Custom Colors

Override colors using the styling props:

```svelte
<Pagination
	bind:currentOffset
	{limit}
	{totalRows}
	styling={{
		backgroundColor: '#f0f0f0',
		textColor: '#333',
		activeBackgroundColor: '#3b82f6',
		activeTextColor: '#fff',
		borderColor: '#e5e7eb'
	}}
/>
```

## Disabled State

```svelte
<Pagination bind:currentOffset {limit} {totalRows} behavior={{ disabled: isLoading }} />
```

## Accessibility

The Pagination component is fully accessible by default:

- Proper semantic markup (`<nav>` with ARIA label)
- ARIA attributes (`aria-label`, `aria-disabled`, `aria-current`)
- Keyboard navigation support
- Focus management
- Screen reader announcements

```svelte
<Pagination bind:currentOffset {limit} {totalRows} ariaLabel="Navigate through search results" />
```

## Advanced Usage

### Server-Side Pagination

```svelte
<script>
	let currentOffset = 0;
	let limit = 10;
	let totalRows = 0;
	let data = [];

	async function loadData() {
		const response = await fetch(`/api/data?offset=${currentOffset}&limit=${limit}`);
		const result = await response.json();
		data = result.data;
		totalRows = result.total;
	}

	function handlePageChange(event) {
		currentOffset = event.detail.offset;
		loadData();
	}

	$: if (currentOffset !== undefined) {
		loadData();
	}
</script>

<Pagination bind:currentOffset {limit} {totalRows} on:pageChange={handlePageChange} />
```

### Two-Way Binding

```svelte
<script>
	let currentOffset = 0;
	let limit = 20;
	let totalRows = 500;
</script>

<Pagination bind:currentOffset {limit} {totalRows} />
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { PaginationProps, PaginationStyling, PaginationBehavior } from '@rief/kit';

const paginationConfig: PaginationProps = {
	currentOffset: 0,
	limit: 10,
	totalRows: 100,
	styling: {
		size: 'md',
		variant: 'default'
	},
	behavior: {
		showFirstLast: true,
		showPreviousNext: true,
		showPageInfo: false
	}
};
```
