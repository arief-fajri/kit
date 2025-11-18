# Component Template Usage Guide

This directory contains skeleton templates for creating new components following our documentation guidelines.

## Templates Available

- **`README.template.md`** - Documentation template for component functionality
- **`STYLING.template.md`** - Documentation template for theming and customization
- **`Component.template.svelte`** - Svelte component structure template
- **`types.template.ts`** - TypeScript types template

## How to Use Templates

### 1. Copy Templates to Your Component Directory

```bash
# Create new component directory
mkdir src/lib/[component-name]

# Copy templates
cp templates/README.template.md src/lib/[component-name]/README.md
cp templates/STYLING.template.md src/lib/[component-name]/STYLING.md
cp templates/Component.template.svelte src/lib/[component-name]/[ComponentName].svelte
```

### 2. Replace Template Placeholders

Search and replace the following placeholders throughout all files:

#### Component Identity
- `[ComponentName]` → Your component name (PascalCase, e.g., `Button`, `InputText`)
- `[component-name]` → Kebab-case version (e.g., `button`, `input-text`)
- `[component-class]` → CSS class prefix (e.g., `btn`, `input`)
- `[component-prefix]` → CSS custom property prefix (e.g., `btn`, `input`)

#### Props and API
- `[primaryProp]` → Main prop name (e.g., `label`, `value`, `title`)
- `[variantProp]` → Variant prop name (usually `variant`)
- `[sizeProp]` → Size prop name (usually `size`)
- `[stateProp]` → State prop name (usually `state`)
- `[customProp1]`, `[customProp2]`, etc. → Your custom prop names

#### Variants and Options
- `[variant1]`, `[variant2]`, etc. → Your variant names (e.g., `filled`, `outlined`)
- `[state1]`, `[state2]`, etc. → Your state names (e.g., `active`, `selected`)
- `[option1]`, `[option2]`, etc. → Enum option values

#### Events
- `[primaryEvent]` → Main event name (e.g., `click`, `change`, `input`)
- `[secondaryEvent]`, `[tertiaryEvent]` → Additional events
- `[EventType]` → Event type (e.g., `MouseEvent`, `InputEvent`)

#### Styling Values
- `[default-*]` → Default CSS values (colors, sizes, etc.)
- `[variant1-*]`, `[variant2-*]` → Variant-specific values
- `[sm-*]`, `[md-*]`, `[lg-*]`, `[xl-*]` → Size-specific values

#### Content and Descriptions
- `[Brief description...]` → Component description
- `[Feature 1]`, `[Feature 2]`, etc. → Feature descriptions
- `[Usage scenario...]` → Usage examples

### 3. Add Types to Main Types File

Add your component types to `src/lib/types.ts`:

```typescript
// Import from your types template
export type { [ComponentName]Props, [ComponentName]Variant, [ComponentName]Size } from './[component-name]/types.js';
```

### 4. Update Main Index File

Add your component to `src/lib/index.ts`:

```typescript
export { default as [ComponentName] } from './[component-name]/[ComponentName].svelte';
export type { [ComponentName]Props } from './types.js';
```

## Example: Creating a Badge Component

### 1. Setup
```bash
mkdir src/lib/badge
cp templates/README.template.md src/lib/badge/README.md
cp templates/STYLING.template.md src/lib/badge/STYLING.md
cp templates/Component.template.svelte src/lib/badge/Badge.svelte
```

### 2. Replace Placeholders
- `[ComponentName]` → `Badge`
- `[component-name]` → `badge`
- `[component-class]` → `badge`
- `[component-prefix]` → `badge`
- `[primaryProp]` → `label`
- `[variant1]` → `solid`
- `[variant2]` → `outlined`
- `[variant3]` → `soft`
- `[primaryEvent]` → `click`

### 3. Customize Content
Update descriptions, features, and examples specific to the Badge component.

## Template Customization Tips

### README.md Template
- Update the feature list with component-specific capabilities
- Modify the UI structure diagram to match your component's DOM
- Add or remove sections based on component complexity
- Include realistic code examples

### STYLING.md Template
- Define CSS custom properties that make sense for your component
- Create semantic color variants appropriate for your use case
- Document any unique styling behaviors

### Component.svelte Template
- Implement your component's specific logic
- Update the CSS structure to match your design
- Add or remove props based on functionality
- Customize event handling

### Types Template
- Define accurate TypeScript types for your props
- Add component-specific interfaces if needed
- Document all props with JSDoc comments

## Quality Checklist

Before publishing your new component:

- [ ] All template placeholders replaced
- [ ] Component functionality implemented
- [ ] Documentation examples tested
- [ ] CSS custom properties defined
- [ ] TypeScript types accurate
- [ ] Accessibility considerations addressed
- [ ] Component exported from main index
- [ ] Types exported from types file

## Best Practices

1. **Start Simple**: Begin with basic functionality, then add complexity
2. **Test Examples**: Ensure all documentation examples work
3. **Follow Patterns**: Match existing components' structure and naming
4. **Document Edge Cases**: Include error states, loading states, etc.
5. **Consider Accessibility**: Add ARIA attributes and keyboard support
6. **Performance**: Use CSS custom properties efficiently

This template system ensures consistency across all components while providing flexibility for unique requirements.
