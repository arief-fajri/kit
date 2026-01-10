# Tags Component

A powerful and flexible tags input component with autocomplete support, keyboard navigation, paste/drop functionality, and extensive customization options. Perfect for collecting multiple values, categories, or selections in a user-friendly interface.

## Features

- 🎨 **Autocomplete Support**: Static arrays, functions, or async functions for dynamic suggestions
- 📏 **Flexible Input**: Support for string tags or object-based tags with custom display keys
- 🎯 **Keyboard Navigation**: Full keyboard support with arrow keys, enter, backspace, and escape
- 🔗 **Paste & Drop**: Paste comma-separated values or drag-and-drop text to add multiple tags
- ♿ **Accessible**: Proper focus management, keyboard navigation, and ARIA-friendly structure
- 🎭 **Validation**: Unique tags, maximum tag limits, minimum character requirements, and number-only mode
- 🎨 **Theming System**: Extensive CSS custom properties for design system integration
- 🔧 **TypeScript Ready**: Comprehensive type definitions and IntelliSense support

## User Interface Structure

The Tags component uses a flexible layout that adapts to content with an inline input field and tag display.

```
<div class="tags">
  ├── slot="label" (when label provided)
  │   └── .tags__label
  │       └── .tags__required (when required=true)
  │
  └── .tags__container[class:tags__container--error={isError}]
      └── .tags__wrapper[class:tags__wrapper--disabled={disable}][class:tags__wrapper--readonly={readonly}]
          ├── .tags__layout
          │   ├── .tags__tag (for each tag in tags array)
          │   │   ├── slot="tag-label" (custom tag display)
          │   │   └── .tags__tag-remove (when !disable && !readonly)
          │   │
          │   └── input.tags__input[class:tags__input--hidden={maxTags === tags.length}]
          │
          ├── .tags__loading (when isLoading)
          │   └── .tags__loading-icon
          │
          └── ul.tags__dropdown (when autoComplete && matches exist)
              └── li.tags__dropdown-item[class:tags__dropdown-item--focus={index === autoCompleteIndex}]
                  └── slot (custom autocomplete item display)
```

### Layout Behavior

- **Container**: Full-width block element with relative positioning for dropdown
- **Content Flow**: Flexbox layout with wrapping tags and inline input field
- **Tags Display**: Inline-flex tags that wrap to new lines as needed
- **Dropdown**: Absolutely positioned autocomplete dropdown with smart positioning
- **State Switching**: Smooth transitions between normal, error, disabled, and readonly states
- **Responsive**: Adapts to container width with flexible tag wrapping

## Basic Usage

```svelte
<script>
	import { Tags } from '@rief/kit';

	let myTags = [];
</script>

<!-- Basic tags input -->
<Tags bind:tags={myTags} placeholder="Add tags..." />

<!-- Tags with label and validation -->
<Tags
	bind:tags={myTags}
	label="Categories"
	validation={{ required: true }}
	behavior={{
		placeholder: 'Add categories...',
		maxTags: 10,
		onlyUnique: true
	}}
/>
```

## Props

### Core Props

| Prop    | Type                                | Default               | Description                                        |
| ------- | ----------------------------------- | --------------------- | -------------------------------------------------- |
| `tags`  | `Array<string \| number \| object>` | `[]`                  | Array of tags (reactive, two-way binding)          |
| `name`  | `string`                            | `"svelte-tags-input"` | HTML name attribute for form submission            |
| `id`    | `string`                            | `""`                  | HTML id attribute (auto-generated if not provided) |
| `label` | `string`                            | `""`                  | Label text displayed above input                   |

### Styling Props (`styling` object)

| Prop                   | Type                                  | Default     | Description                             |
| ---------------------- | ------------------------------------- | ----------- | --------------------------------------- |
| `styling.size`         | `'sm' \| 'md' \| 'lg'`                | `'md'`      | Component size variant                  |
| `styling.variant`      | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual style variant                    |
| `styling.className`    | `string`                              | `""`        | Additional CSS classes for root element |
| `styling.style`        | `string`                              | `""`        | Additional inline styles                |
| `styling.labelClass`   | `string`                              | `""`        | Additional CSS classes for label        |
| `styling.wrapperClass` | `string`                              | `""`        | Additional CSS classes for wrapper      |
| `styling.hoverColor`   | `string`                              | `undefined` | Custom hover background color           |

### Validation Props (`validation` object)

| Prop                  | Type      | Default | Description                                  |
| --------------------- | --------- | ------- | -------------------------------------------- |
| `validation.required` | `boolean` | `false` | Mark field as required with visual indicator |
| `validation.isError`  | `boolean` | `false` | Display error state styling                  |

### Behavior Props (`behavior` object)

| Prop                             | Type                         | Default    | Description                                                   |
| -------------------------------- | ---------------------------- | ---------- | ------------------------------------------------------------- |
| `behavior.disabled`              | `boolean`                    | `false`    | Disable all interactions                                      |
| `behavior.readonly`              | `boolean`                    | `false`    | Make input read-only (tags can still be removed)              |
| `behavior.placeholder`           | `string`                     | `""`       | Placeholder text for input field                              |
| `behavior.maxTags`               | `number \| false`            | `false`    | Maximum number of tags allowed                                |
| `behavior.onlyUnique`            | `boolean`                    | `false`    | Prevent duplicate tags                                        |
| `behavior.minChars`              | `number`                     | `0`        | Minimum characters required before autocomplete triggers      |
| `behavior.numberOnly`            | `boolean`                    | `false`    | Restrict input to numbers only                                |
| `behavior.allowDecimal`          | `boolean`                    | `false`    | Allow decimal numbers (requires numberOnly=true)              |
| `behavior.autoComplete`          | `Array \| Function \| false` | `false`    | Autocomplete source (array, sync function, or async function) |
| `behavior.autoCompleteKey`       | `string \| false`            | `false`    | Key to extract value from object-based autocomplete items     |
| `behavior.autoCompleteMarkupKey` | `string \| false`            | `false`    | Key to use for highlighted markup in autocomplete             |
| `behavior.autoCompleteShowKey`   | `string \| false`            | `false`    | Key to display in tags when using object-based tags           |
| `behavior.onlyAutocomplete`      | `boolean`                    | `false`    | Only allow tags from autocomplete suggestions                 |
| `behavior.allowPaste`            | `boolean`                    | `false`    | Enable paste functionality to add multiple tags               |
| `behavior.allowDrop`             | `boolean`                    | `false`    | Enable drag-and-drop functionality                            |
| `behavior.splitWith`             | `string`                     | `","`      | Delimiter for splitting pasted/dropped text                   |
| `behavior.addKeys`               | `Array<number>`              | `[13]`     | Key codes that trigger tag addition (default: Enter)          |
| `behavior.removeKeys`            | `Array<number>`              | `[8]`      | Key codes that trigger tag removal (default: Backspace)       |
| `behavior.allowBlur`             | `boolean`                    | `false`    | Add tag on blur if input has value                            |
| `behavior.onTagClick`            | `Function`                   | `() => {}` | Callback function when a tag is clicked                       |
| `behavior.debounceMs`            | `number`                     | `500`      | Debounce delay for autocomplete search (milliseconds)         |

### Accessibility Props

| Prop              | Type     | Default     | Description                  |
| ----------------- | -------- | ----------- | ---------------------------- |
| `ariaLabel`       | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described by reference  |

## Autocomplete

The Tags component supports three types of autocomplete sources:

### Static Array

```svelte
<script>
	import { Tags } from '@rief/kit';

	let tags = [];
	const suggestions = ['JavaScript', 'TypeScript', 'Svelte', 'React', 'Vue'];
</script>

<Tags
	bind:tags
	behavior={{
		autoComplete: suggestions,
		placeholder: 'Select a language...'
	}}
/>
```

### Function (Synchronous)

```svelte
<script>
	import { Tags } from '@rief/kit';

	let tags = [];

	function searchLanguages(query) {
		const all = ['JavaScript', 'TypeScript', 'Svelte', 'React', 'Vue', 'Angular'];
		return all.filter((lang) => lang.toLowerCase().includes(query.toLowerCase()));
	}
</script>

<Tags
	bind:tags
	behavior={{
		autoComplete: searchLanguages,
		minChars: 2,
		placeholder: 'Search languages...'
	}}
/>
```

### Async Function

```svelte
<script>
	import { Tags } from '@rief/kit';

	let tags = [];

	async function searchAPI(query, signal) {
		const response = await fetch(`/api/search?q=${query}`, { signal });
		return response.json();
	}
</script>

<Tags
	bind:tags
	behavior={{
		autoComplete: searchAPI,
		minChars: 3,
		placeholder: 'Search...'
	}}
/>
```

### Object-Based Autocomplete

```svelte
<script>
	import { Tags } from '@rief/kit';

	let tags = [];

	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
	];
</script>

<Tags
	bind:tags
	behavior={{
		autoComplete: users,
		autoCompleteKey: 'name',
		autoCompleteShowKey: 'name',
		placeholder: 'Select users...'
	}}
/>
```

## Validation

### Unique Tags

Prevent duplicate tags from being added:

```svelte
<Tags bind:tags onlyUnique placeholder="No duplicates allowed..." />
```

### Maximum Tags

Limit the number of tags that can be added:

```svelte
<Tags bind:tags maxTags={5} placeholder="Maximum 5 tags..." />
```

### Minimum Characters

Require a minimum number of characters before autocomplete triggers:

```svelte
<Tags
	bind:tags
	autoComplete={suggestions}
	minChars={3}
	placeholder="Type at least 3 characters..."
/>
```

### Number Only

Restrict input to numbers only:

```svelte
<Tags bind:tags numberOnly placeholder="Enter numbers only..." />

<!-- With decimals -->
<Tags bind:tags numberOnly allowDecimal placeholder="Enter numbers (decimals allowed)..." />
```

## Paste and Drop

Enable paste and drag-and-drop functionality to add multiple tags at once:

```svelte
<Tags
	bind:tags
	behavior={{
		allowPaste: true,
		allowDrop: true,
		splitWith: ',',
		placeholder: 'Paste or drop comma-separated values...'
	}}
/>
```

## Custom Tag Display

Use slots to customize how tags are displayed:

```svelte
<Tags bind:tags>
	<div slot="tag-label" let:tag>
		{#if typeof tag === 'object'}
			<strong>{tag.name}</strong> - {tag.email}
		{:else}
			{tag}
		{/if}
	</div>
</Tags>
```

## Custom Autocomplete Display

Customize how autocomplete items are displayed:

```svelte
<Tags
	bind:tags
	behavior={{
		autoComplete: users,
		autoCompleteKey: 'name'
	}}
>
	<div slot="default" let:element>
		<div class="user-item">
			<strong>{@html element.search}</strong>
			<span class="email">{element.label.email}</span>
		</div>
	</div>
</Tags>
```

## Keyboard Navigation

The Tags component supports comprehensive keyboard navigation:

- **Enter**: Add current tag or selected autocomplete item
- **Backspace**: Remove last tag when input is empty
- **Arrow Up/Down**: Navigate autocomplete suggestions
- **Escape**: Close autocomplete dropdown
- **Tab**: Move focus (can be configured via `addKeys`)

```svelte
<Tags
	bind:tags
	behavior={{
		addKeys: [13, 9], // Enter and Tab
		removeKeys: [8] // Backspace
	}}
/>
```

## Events

The Tags component dispatches the following events:

```svelte
<Tags
	bind:tags
	on:tags={(e) => {
		console.log('Tags changed:', e.detail);
		// e.detail contains the updated tags array
	}}
	on:keyup={(e) => {
		console.log('Keyup event:', e.detail);
		// e.detail contains the current input value
	}}
/>
```

### `tags` Event

Dispatched whenever the tags array changes (add, remove, or modify).

```svelte
<script>
	function handleTagsChange(event) {
		const updatedTags = event.detail.tags;
		console.log('Tags updated:', updatedTags);
	}
</script>

<Tags bind:tags on:tags={handleTagsChange} />
```

### `input` Event

Dispatched during autocomplete search with the current input value.

```svelte
<script>
	function handleInput(event) {
		const searchValue = event.detail.value;
		console.log('Searching for:', searchValue);
	}
</script>

<Tags bind:tags behavior={{ autoComplete: searchFunction }} on:input={handleInput} />
```

### Other Events

The Tags component also supports native input events:

- `on:focus` - Fired when input gains focus
- `on:blur` - Fired when input loses focus
- `on:paste` - Fired when content is pasted (if allowPaste is true)
- `on:drop` - Fired when content is dropped (if allowDrop is true)
- `on:keydown` - Fired on key press

## Accessibility

The Tags component is fully accessible by default:

- Proper semantic markup with `<input>` and `<ul>` elements
- Keyboard navigation support (arrow keys, enter, escape)
- Focus management and visual focus indicators
- ARIA-friendly structure for screen readers
- Disabled and readonly states properly handled

```svelte
<Tags
	bind:tags
	label="Categories"
	validation={{ required: true }}
	behavior={{ placeholder: 'Add categories...' }}
	id="categories-input"
	name="categories"
/>
```

## Advanced Usage

### Dynamic Autocomplete with API

```svelte
<script>
	import { Tags } from '@rief/kit';

	let tags = [];
	let controller = null;

	async function searchAPI(query, signal) {
		try {
			const response = await fetch(`/api/tags?q=${encodeURIComponent(query)}`, {
				signal
			});
			const data = await response.json();
			return data.results;
		} catch (error) {
			if (error.name !== 'AbortError') {
				console.error('Search error:', error);
			}
			return [];
		}
	}
</script>

<Tags
	bind:tags
	behavior={{
		autoComplete: searchAPI,
		minChars: 2,
		debounceMs: 300,
		placeholder: 'Search and add tags...'
	}}
/>
```

### Form Integration

```svelte
<script>
	import { Tags } from '@rief/kit';

	let formTags = [];
	let isSubmitting = false;

	function handleSubmit() {
		isSubmitting = true;
		// Submit form with tags
		console.log('Submitting tags:', formTags);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Tags
		bind:tags={formTags}
		label="Tags"
		validation={{ required: true }}
		behavior={{
			maxTags: 10,
			onlyUnique: true,
			disabled: isSubmitting,
			placeholder: 'Add up to 10 unique tags...'
		}}
	/>

	<button type="submit" disabled={isSubmitting}> Submit </button>
</form>
```

### Conditional Rendering

```svelte
<script>
	import { Tags } from '@rief/kit';

	let tags = [];
	let mode = 'simple'; // 'simple' | 'advanced'
</script>

{#if mode === 'simple'}
	<Tags bind:tags behavior={{ placeholder: 'Add tags...' }} />
{:else}
	<Tags
		bind:tags
		behavior={{
			autoComplete: suggestions,
			maxTags: 20,
			onlyUnique: true,
			allowPaste: true,
			placeholder: 'Advanced tag input...'
		}}
	/>
{/if}
```

### Tag Click Handler

```svelte
<script>
	import { Tags } from '@rief/kit';

	let tags = ['JavaScript', 'TypeScript', 'Svelte'];

	function handleTagClick(tag) {
		console.log('Tag clicked:', tag);
		// Navigate to tag page, show details, etc.
	}
</script>

<Tags
	bind:tags
	behavior={{
		onTagClick: handleTagClick,
		placeholder: 'Click tags for details...'
	}}
/>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component is written in JavaScript but can be used with TypeScript. For type safety, you can define your own types:

```typescript
import type { ComponentProps } from 'svelte';

type TagsProps = ComponentProps<Tags>;

interface TagItem {
	id: string;
	name: string;
	category?: string;
}

const tagsConfig: TagsProps = {
	tags: [] as TagItem[],
	behavior: {
		autoCompleteKey: 'name',
		autoCompleteShowKey: 'name',
		maxTags: 10,
		onlyUnique: true
	}
};
```
