# DatePicker Component

A comprehensive and fully customizable date picker component that supports single date selection, date ranges, and multiple date selection with extensive theming capabilities and accessibility features.

## Features

- 🎨 **Multiple Variants**: Default, minimal, rounded, and bordered styles
- 📏 **Flexible Sizes**: Small, medium, and large size options
- 🎯 **Selection Modes**: Single date, date range, and multiple date selection
- 🔗 **Easy Integration**: Simple API with comprehensive TypeScript support
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🎭 **State Management**: Loading, disabled, and validation states
- 🎨 **Theming**: Extensive CSS custom properties for complete customization
- 🔧 **Developer Experience**: Composable architecture with clear separation of concerns

## User Interface Structure

The DatePicker component follows a clean, hierarchical structure optimized for usability and accessibility.

```
<div class="date-picker date-picker--{variant} date-picker--{size}">
  ├── Loading State (when loading)
  │   └── .date-picker__loading
  │       └── .date-picker__spinner
  │
  └── Default State (when not loading)
      ├── .date-picker__header
      │   ├── .date-picker__navigation
      │   │   ├── .date-picker__nav-button--month (calendar view)
      │   │   └── .date-picker__nav-button--year
      │   └── .date-picker__controls
      │       ├── .date-picker__control-button--today (when showToday)
      │       ├── .date-picker__control-button--clear (when showClear)
      │       ├── .date-picker__nav-button--prev
      │       └── .date-picker__nav-button--next
      │
      └── .date-picker__content
          ├── .date-picker__calendar (calendar view)
          │   └── CalendarGrid component
          ├── .date-picker__month-grid (month selection)
          │   └── .date-picker__month-button elements
          └── .date-picker__year-grid (year selection)
              └── .date-picker__year-button elements
```

### Layout Behavior

- **Container**: Block-level component with configurable width and padding
- **Content Flow**: Flexbox-based header with grid-based content areas
- **View Switching**: Smooth transitions between calendar, month, and year views
- **State Switching**: Loading state overlays content, disabled state prevents interaction
- **Responsive**: Adapts to container width with scalable cell sizes

## Basic Usage

```svelte
<script>
  import { DatePicker } from '@rief/kit';
  
  let selectedDate = null;
  let dateRange = [null, null];
  let multipleDates = [];
</script>

<!-- Basic single date picker -->
<DatePicker bind:value={selectedDate} />

<!-- Date range picker -->
<DatePicker 
  mode="range" 
  bind:rangeValue={dateRange}
  on:change={handleDateChange} 
/>

<!-- Multiple date selection -->
<DatePicker 
  mode="multiple" 
  bind:multipleValue={multipleDates}
  on:change={handleDateChange} 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| string \| null` | `null` | Selected date for single mode |
| `rangeValue` | `[DateValue, DateValue]` | `[null, null]` | Selected date range for range mode |
| `multipleValue` | `DateValue[]` | `[]` | Selected dates for multiple mode |
| `mode` | `'single' \| 'range' \| 'multiple'` | `'single'` | Selection mode |
| `variant` | `'default' \| 'minimal' \| 'rounded' \| 'bordered'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `minDate` | `Date \| string \| null` | `null` | Minimum selectable date |
| `maxDate` | `Date \| string \| null` | `null` | Maximum selectable date |
| `disabledDates` | `DateValue[] \| ((date: Date) => boolean)` | `undefined` | Disabled dates array or function |
| `firstDayOfWeek` | `0 \| 1` | `0` | First day of week (0=Sunday, 1=Monday) |
| `showWeekNumbers` | `boolean` | `false` | Show ISO week numbers |
| `showToday` | `boolean` | `true` | Show today button |
| `showClear` | `boolean` | `true` | Show clear button |
| `closeOnSelect` | `boolean` | `true` | Close picker on date selection |
| `labels` | `DatePickerLabels` | `{}` | Custom labels for internationalization |
| `className` | `string` | `""` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `locale` | `string` | `'en-US'` | Locale for date formatting |

## Variants

### Default
Standard date picker with border and background styling.

```svelte
<DatePicker variant="default" value={selectedDate} />
```

### Minimal
Clean design without borders, suitable for inline usage.

```svelte
<DatePicker variant="minimal" value={selectedDate} />
```

### Rounded
Rounded corners for a softer appearance.

```svelte
<DatePicker variant="rounded" value={selectedDate} />
```

### Bordered
Emphasized border styling for prominent placement.

```svelte
<DatePicker variant="bordered" value={selectedDate} />
```

## Sizes

```svelte
<DatePicker size="sm" value={smallDate} />
<DatePicker size="md" value={mediumDate} />
<DatePicker size="lg" value={largeDate} />
```

## Selection Modes

### Single Date Selection
Select one date at a time.

```svelte
<script>
  let selectedDate = null;
  
  function handleChange(event) {
    console.log('Selected:', event.detail.value);
    console.log('Formatted:', event.detail.formatted);
  }
</script>

<DatePicker 
  mode="single" 
  bind:value={selectedDate}
  on:change={handleChange}
/>
```

### Date Range Selection
Select a start and end date.

```svelte
<script>
  let dateRange = [null, null];
  
  function handleRangeChange(event) {
    const [start, end] = event.detail.value;
    console.log('Range:', { start, end });
  }
</script>

<DatePicker 
  mode="range" 
  bind:rangeValue={dateRange}
  on:change={handleRangeChange}
/>
```

### Multiple Date Selection
Select multiple individual dates.

```svelte
<script>
  let multipleDates = [];
  
  function handleMultipleChange(event) {
    console.log('Selected dates:', event.detail.value);
  }
</script>

<DatePicker 
  mode="multiple" 
  bind:multipleValue={multipleDates}
  on:change={handleMultipleChange}
/>
```

## Date Constraints

Control which dates can be selected using various constraint options.

```svelte
<script>
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  
  // Disable weekends
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  
  // Specific disabled dates
  const holidays = [
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 0, 1),   // New Year
  ];
</script>

<!-- Date range constraints -->
<DatePicker 
  value={selectedDate}
  minDate={today}
  maxDate={nextMonth}
/>

<!-- Function-based constraints -->
<DatePicker 
  value={selectedDate}
  disabledDates={isWeekend}
/>

<!-- Array of disabled dates -->
<DatePicker 
  value={selectedDate}
  disabledDates={holidays}
/>
```

## Internationalization

Customize labels and locale settings for different languages.

```svelte
<script>
  const germanLabels = {
    selectMonth: "Monat auswählen",
    selectYear: "Jahr auswählen",
    prev: "Vorheriger Monat",
    next: "Nächster Monat",
    today: "Heute",
    clear: "Löschen",
    weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ]
  };
</script>

<DatePicker 
  value={selectedDate}
  locale="de-DE"
  labels={germanLabels}
  firstDayOfWeek={1}
/>
```

## Advanced Features

### Week Numbers
Display ISO week numbers alongside the calendar.

```svelte
<DatePicker 
  value={selectedDate}
  showWeekNumbers={true}
  firstDayOfWeek={1}
/>
```

### Loading States
Show loading indicator during async operations.

```svelte
<script>
  let loading = false;
  let selectedDate = null;
  
  async function handleDateChange(event) {
    loading = true;
    try {
      await saveDate(event.detail.value);
      selectedDate = event.detail.value;
    } finally {
      loading = false;
    }
  }
</script>

<DatePicker 
  bind:value={selectedDate}
  {loading}
  on:change={handleDateChange}
/>
```

### Custom Styling
Apply custom styles using CSS custom properties.

```svelte
<DatePicker 
  value={selectedDate}
  className="custom-datepicker"
  style="--dp-primary-color: #10b981; --dp-border-radius: 1rem;"
/>
```

## Events

The DatePicker component dispatches a single `change` event with comprehensive information:

```svelte
<DatePicker 
  value={selectedDate}
  on:change={handleChange}
/>

<script>
  function handleChange(event) {
    const { value, mode, formatted } = event.detail;
    
    // value: Date | [Date, Date] | Date[] | null
    // mode: 'single' | 'range' | 'multiple'
    // formatted: string | string[]
    
    console.log('Selected value:', value);
    console.log('Selection mode:', mode);
    console.log('Formatted date(s):', formatted);
  }
</script>
```

## Accessibility

The DatePicker component is fully accessible by default:

- Proper semantic markup with appropriate ARIA attributes
- Full keyboard navigation support (arrow keys, Enter, Escape, Tab)
- Screen reader announcements for date selection and navigation
- Focus management between different views
- High contrast mode support

```svelte
<!-- Accessible date picker with custom labels -->
<DatePicker 
  value={selectedDate}
  labels={{
    selectMonth: "Choose month",
    selectYear: "Choose year",
    prev: "Go to previous month",
    next: "Go to next month"
  }}
  on:change={handleAccessibleChange}
/>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { 
  DatePickerProps, 
  DatePickerVariant, 
  DatePickerSize, 
  DatePickerMode,
  DatePickerChangeEvent,
  DatePickerLabels
} from '@rief/kit';

const datePickerConfig: DatePickerProps = {
  variant: 'default',
  size: 'md',
  mode: 'single',
  value: new Date()
};
```
