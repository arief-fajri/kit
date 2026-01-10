# Component Documentation Pattern

This document outlines the standard structure and pattern for component documentation pages in the docs app.

## Page Structure

### 1. Hero Section
- Component name (h1 with `text-2xl md:text-4xl font-bold mb-3 md:mb-4`)
- Brief description (1-2 sentences with `text-base md:text-lg text-gray-600 dark:text-gray-400`)
- Wrapped in a `<div>` with appropriate spacing

### 2. Tab Navigation
- Five tabs: "Features", "Example", "Playground", "Reference", "Styling System"
- Tab configuration:
  ```typescript
  const listTabs = [
    { name: "Features", value: "features" },
    { name: "Example", value: "example" },
    { name: "Playground", value: "playground" },
    { name: "Reference", value: "reference" },
    { name: "Styling System", value: "styling" }
  ];
  let activeTab = "features"; // Default tab
  ```
- Use `Button` components with `variant: "text"` styling
- Active tab uses `state: "active"`, inactive uses `state: "default"`
- Tabs wrapped in a flex container with border-bottom
- Store active tab in a reactive variable
- Use conditional rendering with `{#if activeTab === "value"}` blocks

### 3. Features Tab
- Uses `DocSection` wrapper with `title="Features"`
- Uses `FeaturesList` component with array of feature strings
- Features should use emojis for visual interest
- Keep concise (5-8 items)
- Conditional: `{#if activeTab === "features"}`

### 4. Example Tab
- Uses `DocSection` wrapper with `title="Examples"`
- Uses `ExampleCard` components for each example
- Each `ExampleCard` requires:
  - `title`: Example name
  - `code`: Code string (copy-paste ready)
  - Preview slot: Live component preview
  - Optional: `previewClassName` for custom preview styling
- Conditional: `{:else if activeTab === "example"}`

Organize examples by category:

##### Basic Usage
- Minimal working example
- Copy-paste ready code

##### Variants
- Show all visual variants (filled, outlined, text, etc.)
- Live preview with code

##### Sizes
- Show all size options
- Side-by-side comparison (use `previewClassName="items-center"`)

##### Semantic Colors
- Show semantic color schemes
- When to use each

##### States
- Show different states (default, active, selected, highlight)
- Use cases for each

##### Icons
- Icon positioning examples (left, right, icon-only)
- Icon slot usage
- Include icon SVG strings for examples

##### Loading States
- Basic loading example
- Custom loading message example

##### Links
- Internal link example
- External link example
- Custom target example

##### Custom Styling
- Custom colors example
- Full rounded example
- Custom classes example

### 5. Playground Tab
- Uses `ComponentPlayground` component
- Requires:
  - `fields`: Array of `PlaygroundField` objects defining form controls
  - `state`: Reactive object bound with `bind:state`
  - `generateCode`: Function that takes state and returns code string
- Preview slot: Live component preview with current state
- All component props should be configurable through playground fields
- Conditional: `{#if activeTab === "playground"}`

### 6. Styling System Tab
- Uses `DocSection` wrapper with `title="Styling System"`
- Uses `InfoCard` component for overview description
- Uses `CodeExample` components for styling patterns
- Should comprehensively cover:
  - **CSS Custom Properties Overview**: List all available CSS variables with naming convention
  - **Global Theme Setup**: How to set up global theming in CSS
  - **Dark Theme**: Dark theme implementation using `[data-theme="dark"]`
  - **Component-Specific Overrides**: How to create custom classes for specific instances
  - **Using Custom Classes**: Examples of applying custom styling via `className`
  - **Design System Integration**: How to map design tokens to component properties
  - **Responsive Theming**: Responsive styling patterns
  - **Animation Customization**: Custom transitions and animations
  - **Dynamic Theming**: JavaScript-based dynamic theming examples
- Include best practices and link to component's STYLING.md file if available
- All code examples should be copy-paste ready
- Conditional: `{:else if activeTab === "styling"}`

### 7. Reference Tab
Contains the following sections in order:
- Conditional: `{:else if activeTab === "reference"}`

#### API Reference Section
- Uses `DocSection` wrapper with `title="API Reference"`
- Uses `APIReference` component with `sections` prop
- Sections array should include:
  - **Core Props**: Main component props (label, ariaLabel, etc.)
  - **Styling Props**: All styling-related props (variant, size, semantic, etc.)
  - **Behavior Props**: All behavior-related props (disabled, loading, state, etc.)
  - **Events**: All dispatched events with event types
- Each section contains `PropRow[]` with: `prop`, `type`, `default`, `description`

#### Events Section
- Uses `DocSection` wrapper with `title="Events"`
- Uses `InfoCard` component with description
- Uses `CodeBlock` component to show event handler examples
- Include all events with proper event types

#### Accessibility Section
- Uses `DocSection` wrapper with `title="Accessibility"`
- Uses `InfoCard` component with description
- Bulleted list of accessibility features
- Code example showing accessible usage
- Use `CodeBlock` for code examples

#### Advanced Usage Section
- Uses `DocSection` wrapper with `title="Advanced Usage"`
- Uses `CodeExample` components (not `ExampleCard`)
- Each `CodeExample` requires:
  - `title`: Example name
  - `code`: Code string
  - `language`: Code language (usually "svelte")
- Examples include:
  - Form integration
  - Dynamic content
  - Conditional rendering

#### TypeScript Section
- Uses `DocSection` wrapper with `title="TypeScript"`
- Uses `InfoCard` component with description
- Uses `CodeBlock` to show type imports and usage
- Show type-safe examples with proper TypeScript syntax

## Required Imports

```svelte
<script lang="ts">
  import { ComponentName, Card, InputText, Checkbox, SelectOption } from '@rief/kit';
  import type { SelectOptionItem, ComponentNameProps } from '@rief/kit';
  import CodeBlock from '../../../lib/components/CodeBlock.svelte';
  import ComponentPlayground from '../../../lib/components/ComponentPlayground.svelte';
  import type { PlaygroundField } from '../../../lib/components/playground/types';
  import {
    DocSection,
    FeaturesList,
    APIReference,
    ExampleCard,
    CodeExample,
    InfoCard
  } from '../../../lib/components';
  import type { PropRow, APISection } from '../../../lib/components';
</script>
```

## Script Section Structure

### 1. Type Definitions
```typescript
type ComponentStyling = NonNullable<ComponentNameProps['styling']>;
type ComponentBehavior = NonNullable<ComponentNameProps['behavior']>;
```

### 2. Playground State
- Individual reactive variables for each prop
- A `playgroundState` object that binds to `ComponentPlayground`
- Reactive statements to sync individual variables with `playgroundState`

### 3. Tab Configuration
```typescript
const listTabs = [
  { name: "Features", value: "features" },
  { name: "Example", value: "example" },
  { name: "Playground", value: "playground" },
  { name: "Reference", value: "reference" },
  { name: "Styling System", value: "styling" }
];
let activeTab = "features"; // Default to Features tab
```

### 4. Code Generation Function
```typescript
function generateComponentCode(state: Record<string, any>): string {
  const lines: string[] = [];
  // Build script tag
  // Build component with props
  return lines.join('\n');
}
```

### 5. SelectOption Configurations
- Define options arrays for each select field
- Use `SelectOptionItem[]` type
- Include empty/default option where appropriate

### 6. Playground Fields Configuration
```typescript
const playgroundFields: PlaygroundField[] = [
  { type: 'text', key: 'label', label: 'Label', placeholder: 'Enter label' },
  { type: 'select', key: 'variant', label: 'Variant', options: variantOptions },
  { type: 'checkbox', key: 'disabled', label: 'Disabled' },
  {
    type: 'text',
    key: 'customProp',
    label: 'Custom Prop',
    placeholder: 'Enter value',
    showWhen: (s: Record<string, any>) => s.someCondition === true
  }
];
```

### 7. Computed Props
- Create computed styling and behavior objects from playground state
- Use reactive statements (`$:`) to update when state changes

### 8. Documentation Data
- `features`: Array of feature strings
- `coreProps`: `PropRow[]` for core props
- `stylingProps`: `PropRow[]` for styling props
- `behaviorProps`: `PropRow[]` for behavior props
- `eventsRows`: `PropRow[]` for events
- `apiSections`: `APISection[]` combining all prop sections

## Code Example Format

### ExampleCard Format
```svelte
<ExampleCard
  title="Example Title"
  code={`<script>
  import { ComponentName } from '@rief/kit';
</script>

<ComponentName prop="value" />`}
>
  <svelte:fragment slot="preview">
    <ComponentName prop="value" />
  </svelte:fragment>
</ExampleCard>
```

### CodeExample Format (Advanced Usage)
```svelte
<CodeExample
  title="Advanced Pattern"
  code={`<script>
  // Advanced code here
</script>

<ComponentName />`}
  language="svelte"
/>
```

### CodeBlock Format
```svelte
<CodeBlock
  code={`// Code here`}
  language="svelte"
/>
```

## Best Practices

1. **Keep it practical**: Show real-world usage patterns
2. **Progressive disclosure**: Start simple, add complexity
3. **Copy-paste ready**: All examples should work when copied
4. **Visual examples**: Show live previews when possible
5. **Type information**: Always show TypeScript types
6. **Accessibility**: Always mention accessibility features
7. **Consistent structure**: Follow this pattern for all components
8. **Tab organization**: Use 5 tabs to organize content:
   - **Features**: Quick overview of component capabilities
   - **Example**: Visual examples and use cases
   - **Playground**: Interactive component configuration
   - **Reference**: API documentation and technical details
   - **Styling System**: Comprehensive theming guide
9. **Default tab**: Set default tab to "features" for better first impression
10. **Reactive state**: Use Svelte reactivity to keep playground state in sync
11. **Code generation**: Generate accurate, copyable code from playground state
12. **Conditional rendering**: Use `{:else if}` blocks for clean tab switching

## Playground Requirements

- All props should be configurable through `playgroundFields`
- Use appropriate field types: `text`, `select`, `checkbox`
- Use `showWhen` for conditional field visibility
- Live preview updates in real-time via reactive statements
- Generated code should be accurate and match the preview
- Code should be copyable
- Responsive layout
- Clear visual separation between preview and code
- Support for icon slots and other complex features

## Page Layout Structure

```svelte
<div class="space-y-6">
  <!-- Hero Section -->
  <div>
    <h1 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Component Name</h1>
    <p class="text-base md:text-lg text-gray-600 dark:text-gray-400">
      Description here
    </p>
  </div>

  <!-- Tab Navigation -->
  <div class="w-full flex items-center px-2 border-b gap-2">
    {#each listTabs as tab}
      <Button
        label={tab.name}
        styling={{
          variant: "text",
          className: "!rounded-b-none"
        }}
        behavior={{ state: activeTab === tab.value ? "active" : "default" }}
        on:click={() => {
          activeTab = tab.value;
        }}
      />
    {/each}
  </div>

  <!-- Tab Content -->
  {#if activeTab === "playground"}
    <ComponentPlayground ... />
  {:else if activeTab === "features"}
    <DocSection title="Features">
      <FeaturesList {features} />
    </DocSection>
  {:else if activeTab === "example"}
    <DocSection title="Examples">
      <!-- Example cards -->
    </DocSection>
  {:else if activeTab === "styling"}
    <DocSection title="Styling System">
      <!-- Styling documentation -->
    </DocSection>
  {:else if activeTab === "reference"}
    <DocSection title="API Reference">
      <APIReference sections={apiSections} />
    </DocSection>
    <!-- Additional reference sections: Events, Accessibility, Advanced Usage, TypeScript -->
  {/if}
</div>
```

## Head Section

```svelte
<svelte:head>
  <title>Component Name - @rief/kit</title>
</svelte:head>
```
