# SelectOption Component

A comprehensive and accessible select/dropdown component with advanced features including search filtering, multi-selection, keyboard navigation, and extensive customization options. Built with TypeScript and designed for modern web applications.

## Features

- 🎨 **Multiple Variants**: Default, filled, and outlined styles for different design contexts
- 📏 **Flexible Sizing**: Small, medium, and large size options with responsive design
- 🎯 **Selection Modes**: Single and multi-select support with toggle functionality
- 🔍 **Search & Filter**: Built-in searchable dropdown with debounced filtering
- ♿ **Full Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- 🎭 **State Management**: Error states, loading indicators, and validation feedback
- 🎨 **Theming System**: Extensive CSS custom properties for design system integration
- 🔧 **TypeScript Ready**: Comprehensive type definitions and IntelliSense support

## User Interface Structure

The SelectOption component follows a flexible, slot-based architecture that supports various selection configurations and states.

```
<div class="select-option select-option--{variant} select-option--{size}">
  ├── slot="label" (when label provided)
  │   └── .select-option__label
  │       └── .select-option__required (when required=true)
  │
  └── .select-option__container
      ├── .select-option__wrapper[role="combobox"]
      │   ├── (when openDropdown && isSearchable)
      │   │   └── InputText.select-option__search-input
      │   │       └── slot="suffix"
      │   │           ├── .select-option__clear-btn (when inputSearch)
      │   │           └── .select-option__chevron
      │   │
      │   └── (when !openDropdown || !isSearchable)
      │       └── button.select-option__trigger
      │           ├── .select-option__trigger-text
      │           └── .select-option__chevron
      │
      │   └── DropdownWrapper
      │       └── .select-option__dropdown[role="listbox"]
      │           ├── slot="loading" (when loading)
      │           │   └── .select-option__loading
      │           │
      │           ├── (when listOptions.length)
      │           │   └── {#each listOptions}
      │           │       └── slot="option" (per option)
      │           │           └── .select-option__item
      │           │               └── Button.select-option__item-button
      │           │                   ├── .select-option__item-label
      │           │                   └── .select-option__check-icon (when selected)
      │           │
      │           └── slot="empty" (when !listOptions.length)
      │               └── .select-option__empty
      │
      └── slot="error" (when isError && errorMessage)
          └── .select-option__error
```

### Layout Behavior

- **Container**: Full-width block element with flexible internal layout
- **Content Flow**: Vertical flow with label, trigger/search input, dropdown, and error message
- **Dropdown Positioning**: Uses DropdownWrapper for intelligent positioning relative to trigger
- **State Switching**: Smooth transitions between closed, open, search, and loading states
- **Responsive**: Adapts to container width with configurable dropdown max-height

## Basic Usage

```svelte
<script>
  import { SelectOption } from '@rief/kit';
  
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];
  
  let selected = null;
</script>

<!-- Basic select -->
<SelectOption 
  {options}
  bind:value={selected}
  label="Choose an option"
/>

<!-- Select with event handling -->
<SelectOption 
  {options}
  label="Choose an option"
  on:update={(e) => {
    console.log('Selected:', e.detail);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOptionItem[]` | `[]` | Array of selectable options |
| `value` | `SelectOptionItem \| SelectOptionItem[] \| null` | `null` | Selected value(s) - controlled mode |
| `defaultValue` | `SelectOptionItem \| SelectOptionItem[] \| null` | `null` | Default value(s) - uncontrolled mode |
| `label` | `string` | `""` | Label text displayed above select |
| `name` | `string` | `""` | Field name for form integration |
| `id` | `string` | `""` | Field ID for label association |
| `fetchFn` | `Function \| null` | `null` | Async function to fetch options dynamically |
| `limit` | `number` | `15` | Number of options to fetch per request (when using fetchFn) |
| `styling` | `SelectOptionStyling` | `{}` | Styling configuration object |
| `validation` | `SelectOptionValidation` | `{}` | Validation rules and error handling |
| `behavior` | `SelectOptionBehavior` | `{}` | Behavioral configuration options |

### Styling Configuration (`styling` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select size variant |
| `variant` | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual style variant |
| `wrapperClass` | `string` | `""` | Additional CSS classes for wrapper |
| `inputClass` | `string` | `""` | Additional CSS classes for trigger/input |
| `labelClass` | `string` | `""` | Additional CSS classes for label |
| `wrapperStyle` | `string` | `""` | Inline styles for wrapper element |

### Validation Configuration (`validation` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `required` | `boolean` | `false` | Mark field as required with visual indicator |
| `isError` | `boolean` | `false` | Display error state styling |
| `errorMessage` | `string` | `""` | Error message to display below select |

### Behavior Configuration (`behavior` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable select interaction |
| `isMultiOption` | `boolean` | `false` | Enable multi-selection mode |
| `isSearchable` | `boolean` | `true` | Enable search/filter functionality |
| `closeOnSelect` | `boolean` | `true` | Close dropdown on selection (single mode only) |
| `debounceMs` | `number` | `300` | Search debounce delay in milliseconds |
| `maxHeight` | `number` | `240` | Maximum dropdown height in pixels |
| `placeholder` | `string` | `"Select an option"` | Placeholder text when no selection |
| `emptyMessage` | `string` | `"No items found"` | Message when no options match search |
| `loading` | `boolean` | `false` | Show loading state in dropdown |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'auto'` | `'bottom-start'` | Dropdown placement position |
| `dropdownClass` | `string` | `""` | Additional CSS classes for dropdown |
| `isFullAnchorWidth` | `boolean` | `true` | Make dropdown full width of trigger element |

### SelectOptionItem Interface

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string \| number` | Unique option identifier (required) |
| `label` | `string` | Display text (optional, falls back to value) |
| `disabled` | `boolean` | Disable this specific option |
| `group` | `string` | Optional group/category for organization |
| `metadata` | `Record<string, any>` | Additional metadata for custom use cases |

## Variants

### Default
Clean, minimal styling with subtle borders and focus states. Perfect for most form contexts.

```svelte
<SelectOption 
  options={options}
  styling={{ variant: "default" }}
  label="Default Select"
/>
```

### Filled
Filled background style that works well in dense interfaces or dark themes.

```svelte
<SelectOption 
  options={options}
  styling={{ variant: "filled" }}
  label="Filled Select"
/>
```

### Outlined
Prominent border styling for emphasis or when selects need to stand out.

```svelte
<SelectOption 
  options={options}
  styling={{ variant: "outlined" }}
  label="Outlined Select"
/>
```

## Sizes

```svelte
<SelectOption 
  options={options}
  styling={{ size: "sm" }}
  label="Small"
/>
<SelectOption 
  options={options}
  styling={{ size: "md" }}
  label="Medium"
/>
<SelectOption 
  options={options}
  styling={{ size: "lg" }}
  label="Large"
/>
```

## Selection Modes

### Single Selection

```svelte
<script>
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
  ];
  
  let selectedCountry = null;
</script>

<SelectOption 
  options={countries}
  bind:value={selectedCountry}
  label="Country"
  behavior={{ isMultiOption: false }}
/>
```

### Multi-Selection

```svelte
<script>
  const skills = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'svelte', label: 'Svelte' }
  ];
  
  let selectedSkills = [];
</script>

<SelectOption 
  options={skills}
  bind:value={selectedSkills}
  label="Skills"
  behavior={{ 
    isMultiOption: true,
    closeOnSelect: false 
  }}
/>
```

## Search and Filtering

### Basic Search

```svelte
<SelectOption 
  options={largeOptionsList}
  label="Search Options"
  behavior={{ 
    isSearchable: true,
    debounceMs: 300 
  }}
/>
```

### Custom Search Behavior

```svelte
<script>
  let searchQuery = "";
  
  function handleSearch(e) {
    searchQuery = e.detail.query;
    // Custom search logic can be implemented here
  }
</script>

<SelectOption 
  options={options}
  label="Searchable Select"
  behavior={{ isSearchable: true }}
  on:search={handleSearch}
/>
```

### Non-Searchable Select

```svelte
<SelectOption 
  options={smallOptionsList}
  label="Simple Select"
  behavior={{ isSearchable: false }}
/>
```

## Validation and Error Handling

### Basic Validation

```svelte
<script>
  let selected = null;
  let hasError = false;
  
  function validateSelection() {
    hasError = selected === null;
  }
</script>

<SelectOption 
  options={options}
  bind:value={selected}
  label="Required Field"
  validation={{
    required: true,
    isError: hasError,
    errorMessage: hasError ? "Please select an option" : ""
  }}
  on:update={validateSelection}
/>
```

### Error State Styling

```svelte
<SelectOption 
  options={options}
  label="Field with Error"
  validation={{
    isError: true,
    errorMessage: "This field is required"
  }}
/>
```

## Loading States

### Basic Loading

```svelte
<script>
  let isLoading = false;
  let options = [];
  
  async function loadOptions() {
    isLoading = true;
    try {
      options = await fetchOptions();
    } finally {
      isLoading = false;
    }
  }
</script>

<SelectOption 
  options={options}
  label="Async Options"
  behavior={{ loading: isLoading }}
/>
```

### Custom Loading Content

```svelte
<SelectOption 
  options={options}
  label="Loading Select"
  behavior={{ loading: true }}
>
  <div slot="loading">
    <CustomSpinner />
    <span>Loading options...</span>
  </div>
</SelectOption>
```

## Slots and Custom Content

### Custom Label

```svelte
<SelectOption options={options}>
  <div slot="label" class="custom-label">
    <span>Custom Label</span>
    <span class="help-icon" title="Help text">?</span>
  </div>
</SelectOption>
```

### Custom Option Rendering

```svelte
<SelectOption 
  options={options}
  bind:value={selected}
>
  {#each options as option}
    <div slot="option" let:item let:isSelected>
      <div class="custom-option">
        <span class="option-icon">{item.icon}</span>
        <span class="option-label">{item.label}</span>
        {#if isSelected}
          <span class="selected-badge">Selected</span>
        {/if}
      </div>
    </div>
  {/each}
</SelectOption>
```

### Custom Empty State

```svelte
<SelectOption 
  options={filteredOptions}
  label="Search Results"
>
  <div slot="empty" class="custom-empty">
    <svg><!-- No results icon --></svg>
    <p>No matching options found</p>
    <button on:click={clearSearch}>Clear search</button>
  </div>
</SelectOption>
```

### Custom Error Message

```svelte
<SelectOption 
  options={options}
  validation={{ isError: true }}
>
  <div slot="error" class="custom-error">
    <svg><!-- Error icon --></svg>
    <span>Custom error message here</span>
  </div>
</SelectOption>
```

## Events

The SelectOption component dispatches several events for comprehensive interaction handling:

```svelte
<SelectOption 
  options={options}
  on:update={handleUpdate}
  on:select={handleSelect}
  on:deselect={handleDeselect}
  on:search={handleSearch}
  on:open={handleOpen}
  on:close={handleClose}
  on:clear={handleClear}
/>
```

### Event Details

- **`update`**: Fired when selection changes (provides new value: `SelectOptionItem | SelectOptionItem[] | null`)
- **`select`**: Fired when an option is selected (provides `{ option: SelectOptionItem, isMulti: boolean }`)
- **`deselect`**: Fired when an option is deselected (provides `{ option: SelectOptionItem }`)
- **`search`**: Fired when search query changes (provides `{ query: string }`)
- **`open`**: Fired when dropdown opens
- **`close`**: Fired when dropdown closes
- **`clear`**: Fired when selection is cleared

### Event Usage Examples

```svelte
<script>
  function handleUpdate(e) {
    console.log('Selection updated:', e.detail);
    // e.detail is SelectOptionItem | SelectOptionItem[] | null
  }
  
  function handleSelect(e) {
    console.log('Option selected:', e.detail.option);
    console.log('Is multi-select:', e.detail.isMulti);
  }
  
  function handleSearch(e) {
    console.log('Search query:', e.detail.query);
    // Could trigger API call for server-side filtering
  }
</script>

<SelectOption 
  options={options}
  on:update={handleUpdate}
  on:select={handleSelect}
  on:search={handleSearch}
/>
```

## Keyboard Navigation

The SelectOption component provides full keyboard navigation support:

- **Enter** / **Space**: Open dropdown or select focused option
- **Escape**: Close dropdown
- **Arrow Down**: Open dropdown or move focus down
- **Arrow Up**: Move focus up in dropdown
- **Tab**: Close dropdown and move to next element

```svelte
<SelectOption 
  options={options}
  label="Keyboard Navigable"
  behavior={{ isSearchable: true }}
/>
```

## Accessibility

The SelectOption component is fully accessible by default:

- Proper semantic markup with `role="combobox"` and `role="listbox"`
- ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-label`)
- Keyboard navigation support for all interactions
- Focus management with visible focus indicators
- Screen reader announcements for state changes
- Proper labeling and form associations

```svelte
<!-- Accessible select with error state -->
<SelectOption 
  options={options}
  label="Country"
  id="country-select"
  validation={{
    required: true,
    isError: true,
    errorMessage: "Please select a country"
  }}
  aria-describedby="country-help"
/>
<div id="country-help">
  Select your country of residence for tax purposes.
</div>
```

## Advanced Usage

### Controlled vs Uncontrolled

```svelte
<!-- Controlled mode (recommended) -->
<script>
  let selected = null;
</script>

<SelectOption 
  options={options}
  bind:value={selected}
/>

<!-- Uncontrolled mode with defaultValue -->
<SelectOption 
  options={options}
  defaultValue={options[0]}
  on:update={(e) => {
    console.log('Changed to:', e.detail);
  }}
/>
```

### Dynamic Options

```svelte
<script>
  let category = null;
  let products = [];
  
  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' }
  ];
  
  $: if (category) {
    // Load products based on category
    products = loadProductsForCategory(category.value);
  }
</script>

<SelectOption 
  options={categories}
  bind:value={category}
  label="Category"
/>

<SelectOption 
  options={products}
  label="Product"
  behavior={{ disabled: !category }}
/>
```

### Server-Side Search with fetchFn

Use the `fetchFn` prop for async option loading with built-in pagination support:

```svelte
<script>
  async function fetchOptions(query, callback) {
    const response = await fetch(`/api/options?q=${query.query}&offset=${query.offset}&limit=${query.limit}`);
    const data = await response.json();
    callback(data.items, data.total);
  }
</script>

<SelectOption 
  fetchFn={fetchOptions}
  limit={20}
  label="Async Options"
  behavior={{ 
    isSearchable: true,
    loading: isLoading 
  }}
/>
```

### Server-Side Search (Manual)

Alternatively, handle search events manually:

```svelte
<script>
  let options = [];
  let searchQuery = "";
  
  async function handleSearch(e) {
    searchQuery = e.detail.query;
    if (searchQuery.length > 2) {
      options = await fetchOptionsFromAPI(searchQuery);
    }
  }
</script>

<SelectOption 
  options={options}
  label="Search Products"
  behavior={{ 
    isSearchable: true,
    loading: isLoading 
  }}
  on:search={handleSearch}
/>
```

### Conditional Rendering

```svelte
<SelectOption 
  options={options}
  styling={{
    variant: isError ? "outlined" : "default",
    size: isMobile ? "lg" : "md"
  }}
  validation={{
    required: true,
    isError: !isValid,
    errorMessage: errorMessage
  }}
  behavior={{
    disabled: isLoading,
    isSearchable: options.length > 10
  }}
/>
```

### Form Integration

```svelte
<script>
  let formData = {
    country: null,
    skills: []
  };
  
  function handleSubmit() {
    console.log('Form data:', formData);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <SelectOption 
    options={countries}
    bind:value={formData.country}
    label="Country"
    name="country"
    validation={{ required: true }}
  />
  
  <SelectOption 
    options={skills}
    bind:value={formData.skills}
    label="Skills"
    name="skills"
    behavior={{ isMultiOption: true }}
  />
  
  <button type="submit" disabled={!formData.country}>
    Submit
  </button>
</form>
```

### Custom Styling Integration

```svelte
<SelectOption 
  options={options}
  label="Branded Select"
  styling={{
    variant: "outlined",
    wrapperClass: "custom-select-wrapper",
    inputClass: "custom-select-trigger",
    labelClass: "custom-label"
  }}
/>

<style>
  :global(.custom-select-wrapper) {
    --select-option-border-focus: #your-brand-color;
    --select-option-shadow-focus: 0 0 0 3px rgba(your-brand-rgb, 0.1);
  }
  
  :global(.custom-select-trigger) {
    font-family: 'Your Custom Font', sans-serif;
  }
  
  :global(.custom-label) {
    color: #your-brand-color;
    font-weight: 600;
  }
</style>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options and CSS custom property documentation.

## TypeScript

The component exports comprehensive TypeScript types for full type safety:

```typescript
import type { 
  SelectOptionProps, 
  SelectOptionItem,
  SelectOptionStyling, 
  SelectOptionValidation, 
  SelectOptionBehavior,
  SelectOptionSize,
  SelectOptionVariant 
} from '@rief/kit';

const selectConfig: SelectOptionProps = {
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ],
  styling: {
    variant: 'outlined',
    size: 'lg'
  },
  validation: {
    required: true
  },
  behavior: {
    isMultiOption: false,
    isSearchable: true,
    debounceMs: 300
  }
};

// Type-safe option handling
function handleSelection(item: SelectOptionItem | SelectOptionItem[] | null) {
  if (Array.isArray(item)) {
    // Multi-select mode
    item.forEach(option => {
      console.log(option.value, option.label);
    });
  } else if (item) {
    // Single-select mode
    console.log(item.value, item.label);
  }
}
```

