# Table Component

A comprehensive, feature-rich table component for displaying structured data with sorting, pagination, selection, drag-and-drop, and server-side support. Perfect for data tables, admin panels, and data-heavy applications.

## Features

- 🎨 **Sortable Columns**: Click-to-sort with ascending/descending indicators
- 📏 **Pagination Integration**: Built-in pagination with configurable options
- 🎯 **Row Selection**: Single and multiple row selection support
- 🔗 **Drag and Drop**: Reorderable rows with drop validation
- ♿ **Fully Accessible**: ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **Loading States**: Built-in loading and empty state handling
- 🎨 **Customizable Styling**: CSS custom properties and class customization
- 🔧 **TypeScript**: Full type safety with comprehensive interfaces
- 🌐 **Server-Side Support**: Client-side and server-side pagination/sorting

## Components

The Table package consists of three components:

1. **TableListing**: Main table component with full functionality
2. **SortHeader**: Sortable column header component
3. **TableLoading**: Loading skeleton component

## User Interface Structure

The TableListing component uses a standard HTML table structure with enhanced functionality.

```
<div class="table-listing">
  ├── .table-listing__scroll-wrapper
  │   └── <table class="table-listing__table">
  │       ├── <thead class="table-listing__header">
  │       │   └── <tr>
  │       │       ├── <th> (checkbox column if selectable)
  │       │       └── <SortHeader /> (for each column)
  │       │
  │       └── <tbody class="table-listing__body">
  │           ├── Loading state (when loading)
  │           ├── Empty state (when no data)
  │           └── <tr> (for each row)
  │               ├── <td> (checkbox cell if selectable)
  │               └── <td> (for each column)
  │
  └── .table-listing__pagination (when showPagination)
      └── <Pagination />
```

### Layout Behavior

- **Container**: Flexbox column layout with scrollable table area
- **Table**: Standard HTML table with responsive horizontal scroll
- **Header**: Sticky header with sortable columns
- **Rows**: Interactive rows with hover, click, selection, and drag support
- **Pagination**: Integrated pagination component at the bottom

## Basic Usage

```svelte
<script>
  import { TableListing } from '@rief/kit';
  
  const columns = [
    { field: 'id', title: 'ID', sortable: true },
    { field: 'name', title: 'Name', sortable: true },
    { field: 'email', title: 'Email', sortable: true }
  ];
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  
  let sort = '';
  let currentOffset = 0;
  
  function handleSortChange(event) {
    sort = event.detail.sort;
    console.log('Sort changed:', sort);
  }
  
  function handlePageChange(event) {
    currentOffset = event.detail.offset;
    console.log('Page changed:', currentOffset);
  }
</script>

<TableListing 
  {columns}
  {data}
  bind:sort
  bind:currentOffset
  limit={10}
  on:sortChange={handleSortChange}
  on:pageChange={handlePageChange}
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `data` | `TableRow[]` | `[]` | Data rows |
| `sort` | `string` | `""` | Current sort string (e.g., "-created_at" or "+name") |
| `currentOffset` | `number` | `0` | Current offset for pagination (0-based) |
| `limit` | `number` | `10` | Items per page |
| `emptyMessage` | `string` | `"Tidak ada data"` | Empty state message |
| `tableId` | `string` | `undefined` | Table ID for accessibility |

### Styling Props (`styling` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `styling.className` | `string` | `""` | Additional CSS classes for root element |
| `styling.style` | `string` | `""` | Additional inline styles |
| `styling.tableContainerClass` | `string` | `""` | Custom CSS class for table wrapper |
| `styling.headerClass` | `string` | `""` | Custom CSS class for header |
| `styling.rowClass` | `string \| function` | `""` | Custom CSS class for rows |
| `styling.cellClass` | `string \| function` | `""` | Custom CSS class for cells |
| `styling.tbodyClass` | `string` | `""` | Custom tbody class |
| `styling.paginationClass` | `string` | `""` | Custom pagination wrapper class |
| `styling.cssVariables` | `Record<string, string>` | `{}` | Custom CSS variables |
| `styling.hoverColor` | `string` | `undefined` | Custom hover background color |

### Behavior Props (`behavior` object)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `behavior.showPagination` | `boolean` | `true` | Show pagination component |
| `behavior.paginationSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Pagination size |
| `behavior.paginationVariant` | `'default' \| 'minimal'` | `'default'` | Pagination variant |
| `behavior.paginationShowFirstLast` | `boolean` | `true` | Show first/last buttons in pagination |
| `behavior.paginationShowPageInfo` | `boolean` | `false` | Show page info in pagination |
| `behavior.autoResetOffsetOnSort` | `boolean` | `true` | Reset offset when sort changes |
| `behavior.scrollToTopOnPageChange` | `boolean` | `true` | Scroll to top on page change |
| `behavior.customSortFn` | `function` | `undefined` | Custom sort function |
| `behavior.rowClickable` | `boolean` | `false` | Enable row click handling |
| `behavior.loading` | `boolean` | `false` | Loading state |
| `behavior.selectable` | `boolean` | `false` | Enable row selection |
| `behavior.selectedRows` | `(string \| number)[]` | `[]` | Selected row IDs/indices |
| `behavior.enableHover` | `boolean` | `true` | Enable hover effect on rows |
| `behavior.draggable` | `boolean` | `false` | Enable drag and drop |
| `behavior.canDrop` | `function` | `undefined` | Function to validate drops |
| `behavior.serverSide` | `boolean` | `false` | Enable server-side pagination/sorting |
| `behavior.totalRows` | `number` | `undefined` | Total rows (required for server-side) |

### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `undefined` | ARIA label for table |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference |

## Column Definition

The `columns` prop accepts an array of `TableColumn` objects:

```typescript
interface TableColumn<T = Record<string, unknown>> {
  /** Field name in the data object */
  field: keyof T | string;
  /** Alternative field names (key, field) */
  key?: keyof T | string;
  /** Display label (title, label, name, alias) */
  title?: string;
  label?: string;
  name?: string;
  alias?: string;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Column width */
  width?: number;
  /** Minimum column width */
  minWidth?: number;
  /** Custom CSS class */
  className?: string;
  /** Custom CSS class for column */
  colClass?: string;
  /** Custom inline styles */
  style?: string;
}
```

### Column Examples

```svelte
<script>
  const columns = [
    { 
      field: 'id', 
      title: 'ID', 
      sortable: true,
      width: 100
    },
    { 
      field: 'name', 
      title: 'Name', 
      sortable: true,
      className: 'font-bold'
    },
    { 
      field: 'email', 
      title: 'Email', 
      sortable: false
    }
  ];
</script>
```

## Events

The TableListing component dispatches several events:

```svelte
<TableListing 
  {columns}
  {data}
  on:sortChange={(e) => console.log('Sort:', e.detail.sort)}
  on:pageChange={(e) => console.log('Offset:', e.detail.offset)}
  on:rowClick={(e) => console.log('Row clicked:', e.detail)}
  on:rowSelect={(e) => console.log('Row selected:', e.detail)}
  on:dragStart={(e) => console.log('Drag started:', e.detail)}
  on:dragEnd={(e) => console.log('Drag ended:', e.detail)}
  on:drop={(e) => console.log('Dropped:', e.detail)}
/>
```

### Event Details

- **`sortChange`**: Dispatched when sort changes
  - `{ sort: string }`
- **`pageChange`**: Dispatched when page changes
  - `{ offset: number }`
- **`rowClick`**: Dispatched when row is clicked (requires `rowClickable={true}`)
  - `{ row: TableRow, index: number }`
- **`rowSelect`**: Dispatched when row selection changes (requires `selectable={true}`)
  - `{ row: TableRow, index: number, selected: boolean }`
- **`dragStart`**: Dispatched when drag starts (requires `draggable={true}`)
  - `{ row: TableRow, index: number }`
- **`dragEnd`**: Dispatched when drag ends (requires `draggable={true}`)
  - `{ row: TableRow, index: number }`
- **`drop`**: Dispatched when row is dropped (requires `draggable={true}`)
  - `{ draggedRow: TableRow, targetRow: TableRow, draggedIndex: number, targetIndex: number }`

## Sorting

### Basic Sorting

```svelte
<script>
  let sort = '';
  
  function handleSortChange(event) {
    sort = event.detail.sort;
    // sort format: "-field" (descending) or "+field" (ascending) or "" (no sort)
  }
</script>

<TableListing 
  {columns}
  {data}
  bind:sort
  on:sortChange={handleSortChange}
/>
```

### Custom Sort Function

```svelte
<script>
  function customSort(data, sortKey, isDescending) {
    // Custom sorting logic
    return data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      // Your custom comparison logic
      return isDescending ? bVal - aVal : aVal - bVal;
    });
  }
</script>

<TableListing 
  {columns}
  {data}
  behavior={{ customSortFn }}
/>
```

## Pagination

### Client-Side Pagination

```svelte
<script>
  let currentOffset = 0;
  let limit = 10;
</script>

<TableListing 
  {columns}
  {data}
  bind:currentOffset
  {limit}
/>
```

### Server-Side Pagination

```svelte
<script>
  let currentOffset = 0;
  let limit = 10;
  let totalRows = 0;
  let data = [];
  let sort = '';
  
  async function loadData() {
    const response = await fetch(
      `/api/data?offset=${currentOffset}&limit=${limit}&sort=${sort}`
    );
    const result = await response.json();
    data = result.data;
    totalRows = result.total;
  }
  
  function handlePageChange(event) {
    currentOffset = event.detail.offset;
    loadData();
  }
  
  function handleSortChange(event) {
    sort = event.detail.sort;
    currentOffset = 0; // Reset to first page
    loadData();
  }
  
  $: if (currentOffset !== undefined) {
    loadData();
  }
</script>

<TableListing 
  {columns}
  {data}
  bind:currentOffset
  {limit}
  behavior={{
    totalRows: totalRows,
    serverSide: true
  }}
  bind:sort
  on:pageChange={handlePageChange}
  on:sortChange={handleSortChange}
/>
```

## Row Selection

```svelte
<script>
  let selectedRows = [];
  
  function handleRowSelect(event) {
    const { row, index, selected } = event.detail;
    const rowId = row.id ?? index;
    
    if (selected) {
      selectedRows = [...selectedRows, rowId];
    } else {
      selectedRows = selectedRows.filter(id => id !== rowId);
    }
  }
</script>

<TableListing 
  {columns}
  {data}
  behavior={{
    selectable: true,
    selectedRows: selectedRows
  }}
  bind:selectedRows
  on:rowSelect={handleRowSelect}
/>
```

## Row Click Handling

```svelte
<script>
  function handleRowClick(event) {
    const { row, index } = event.detail;
    console.log('Row clicked:', row);
    // Navigate to detail page, open modal, etc.
  }
</script>

<TableListing 
  {columns}
  {data}
  behavior={{ rowClickable: true }}
  on:rowClick={handleRowClick}
/>
```

## Drag and Drop

```svelte
<script>
  function handleDrop(event) {
    const { draggedRow, targetRow, draggedIndex, targetIndex } = event.detail;
    // Reorder data array
    const newData = [...data];
    const [removed] = newData.splice(draggedIndex, 1);
    newData.splice(targetIndex, 0, removed);
    data = newData;
  }
  
  function canDrop(draggedRow, targetRow) {
    // Custom validation logic
    return draggedRow.category === targetRow.category;
  }
</script>

<TableListing 
  {columns}
  {data}
  behavior={{
    draggable: true,
    canDrop: canDrop
  }}
  on:drop={handleDrop}
/>
```

## Loading State

```svelte
<script>
  let loading = false;
  
  async function loadData() {
    loading = true;
    try {
      const data = await fetchData();
      // Update data
    } finally {
      loading = false;
    }
  }
</script>

<TableListing 
  {columns}
  {data}
  behavior={{ loading }}
/>
```

## Slots

### Custom Cell Content

```svelte
<TableListing {columns} {data}>
  <div slot="cell" let:column let:row let:rowIndex let:colIndex>
    {#if column.field === 'status'}
      <span class="badge badge-{row.status}">{row.status}</span>
    {:else if column.field === 'actions'}
      <button on:click={() => handleAction(row)}>Edit</button>
    {:else}
      {row[column.field]}
    {/if}
  </div>
</TableListing>
```

### Custom Loading State

```svelte
<TableListing {columns} {data} {loading}>
  <div slot="loading">
    <CustomSpinner />
    <p>Loading data...</p>
  </div>
</TableListing>
```

### Custom Empty State

```svelte
<TableListing {columns} {data}>
  <div slot="empty">
    <EmptyIcon />
    <p>No data available</p>
    <button on:click={refreshData}>Refresh</button>
  </div>
</TableListing>
```

### Custom Checkbox

```svelte
<TableListing 
  {columns}
  {data}
  behavior={{ selectable: true }}
>
  <CustomCheckbox slot="row-checkbox" let:row let:isSelected />
  <CustomCheckbox slot="header-checkbox" />
</TableListing>
```

## Custom Styling

### Row Classes

```svelte
<script>
  function getRowClass(row, index) {
    let classes = [];
    if (row.status === 'active') classes.push('row-active');
    if (row.priority === 'high') classes.push('row-high-priority');
    return classes.join(' ');
  }
</script>

<TableListing 
  {columns}
  {data}
  styling={{ rowClass: getRowClass }}
/>
```

### Cell Classes

```svelte
<script>
  function getCellClass(column, row) {
    if (column.field === 'amount' && row.amount < 0) {
      return 'text-red-500';
    }
    return '';
  }
</script>

<TableListing 
  {columns}
  {data}
  styling={{ cellClass: getCellClass }}
/>
```

### CSS Variables

```svelte
<TableListing 
  {columns}
  {data}
  styling={{
    cssVariables: {
      'table-listing-hover-bg': '#f0f0f0',
      'table-listing-selected-bg': '#e0e0e0'
    }
  }}
/>
```

## Accessibility

The TableListing component is fully accessible by default:

- Proper semantic markup (`<table>`, `<thead>`, `<tbody>`)
- ARIA attributes (`aria-label`, `aria-rowcount`, `aria-colcount`, `aria-selected`)
- Keyboard navigation support
- Focus management
- Screen reader announcements

```svelte
<TableListing 
  {columns}
  {data}
  tableId="users-table"
  ariaLabel="User data table"
/>
```

## SortHeader Component

The SortHeader component is used internally but can be used standalone:

```svelte
<script>
  import { SortHeader } from '@rief/kit';
  
  let sort = '';
</script>

<SortHeader 
  name="Name"
  key="name"
  bind:sort
  on:sorting={() => console.log('Sorting changed')}
/>
```

### SortHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `undefined` | Column header text |
| `key` | `string` | `""` | Sort key/field name |
| `sort` | `string` | `""` | Current sort string |
| `disable` | `boolean` | `false` | Disable sorting |
| `class` | `string` | `""` | Additional CSS classes |
| `colClass` | `string` | `""` | Column content CSS class |

## TableLoading Component

A simple loading skeleton component:

```svelte
<script>
  import { TableLoading } from '@rief/kit';
</script>

<TableLoading totalColumns={5} />
```

### TableLoading Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalColumns` | `number` | `4` | Number of columns to display |
| `borderNone` | `boolean` | `true` | Remove borders from skeleton cells |

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { 
  TableColumn, 
  TableRow,
  TableListingProps
} from '@rief/kit';

const columns: TableColumn[] = [
  { field: 'id', title: 'ID', sortable: true },
  { field: 'name', title: 'Name', sortable: true }
];

const data: TableRow[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];
```
