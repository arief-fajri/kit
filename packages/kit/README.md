# @rief/kit

A modern Svelte component library built with TypeScript, featuring a standardized props pattern for consistency and developer experience.

## Installation

```bash
npm install @rief/kit
```

## Peer Dependencies

This library requires `svelte` version 4.0.0 or higher as a peer dependency.

```bash
npm install svelte@^4.0.0
```

## Standardized Props Pattern

All components in `@rief/kit` follow a consistent props structure for better developer experience:

### Props Organization

1. **Core Props** (flat): Essential component data
   - `value`, `label`, `name`, `id`, etc.

2. **Styling** (grouped): Visual customization
   - `styling.variant`, `styling.size`, `styling.className`, `styling.style`, etc.

3. **Behavior** (grouped): Component behavior
   - `behavior.disabled`, `behavior.loading`, component-specific behaviors

4. **Validation** (grouped, form components): Form validation
   - `validation.required`, `validation.isError`, `validation.errorMessage`

5. **Accessibility** (flat): ARIA attributes
   - `ariaLabel`, `ariaDescribedBy`

### Usage Example

```svelte
<script>
	import { Button } from '@rief/kit';
</script>

<!-- Basic usage with grouped props -->
<Button 
	label="Click me" 
	styling={{
		variant: "filled",
		size: "lg"
	}}
	behavior={{
		disabled: false,
		loading: false
	}}
	ariaLabel="Submit form"
	on:click={() => console.log('Clicked!')}
/>

<!-- Form input example -->
<script>
	import { InputText } from '@rief/kit';
</script>

<InputText
	value={email}
	label="Email"
	name="email"
	styling={{
		variant: "default",
		size: "md"
	}}
	validation={{
		required: true,
		isError: hasError,
		errorMessage: errorMessage
	}}
	behavior={{
		disabled: false
	}}
	ariaLabel="Email address"
/>
```

## Component Documentation

Each component has comprehensive documentation:

- **README.md**: API reference, usage examples, and features
- **STYLING.md**: Theming guide with CSS custom properties

Browse component documentation in `packages/kit/src/lib/[component-name]/README.md`

## Available Components

- **Buttons**: `Button`
- **Forms**: `InputText`, `TextArea`, `Checkbox`, `Radiobox`, `Switch`, `SelectOption`, `Tags`, `InputDatePicker`
- **Layout**: `BaseLayoutWrapper`, `PageWrapper`, `SidebarWrapper`, `DropdownWrapper`
- **Data Display**: `Card`, `TableListing`, `Pagination`
- **Feedback**: `Drawer`, `Accordion`
- **Utilities**: `DragLine`

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type { 
	ButtonProps, 
	ButtonStyling, 
	ButtonBehavior,
	InputTextProps,
	InputTextStyling,
	InputTextValidation,
	InputTextBehavior
} from '@rief/kit';
```

## License

MIT
