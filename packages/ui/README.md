# @rief/ui

A Svelte UI component library providing reusable components for building modern web applications.

## Installation

```bash
npm install @rief/ui
# or
pnpm add @rief/ui
# or
yarn add @rief/ui
```

## Components

### Card

A flexible card component with multiple variants and customization options.

```svelte
<script>
  import { Card } from '@rief/ui';
</script>

<Card variant="elevated" padding="lg">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

### Pagination

A pagination component for navigating through paginated data.

```svelte
<script>
  import { Pagination } from '@rief/ui';
  
  let currentOffset = 0;
  let limit = 10;
  let totalRows = 100;
</script>

<Pagination
  bind:currentOffset
  {limit}
  {totalRows}
  on:pageChange={(e) => console.log(e.detail)}
/>
```

### TableListing

A feature-rich table component with sorting, pagination, and selection.

```svelte
<script>
  import { TableListing } from '@rief/ui';
  import type { TableColumn, TableRow } from '@rief/ui';
  
  const columns: TableColumn[] = [
    { field: 'name', label: 'Name', sortable: true },
    { field: 'email', label: 'Email', sortable: true }
  ];
  
  const data: TableRow[] = [
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' }
  ];
</script>

<TableListing {columns} {data} />
```

## TypeScript Support

This package includes TypeScript definitions. Import types as needed:

```typescript
import type {
  CardProps,
  PaginationProps,
  TableColumn,
  TableRow
} from '@rief/ui';
```

## License

MIT
