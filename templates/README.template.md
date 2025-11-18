# [ComponentName] Component

[Brief description of the component's purpose and key value proposition. Explain what problem it solves and why developers should use it.]

## Features

- 🎨 **[Feature 1]**: [Brief description of visual/styling capabilities]
- 📏 **[Feature 2]**: [Brief description of size/layout options]
- 🎯 **[Feature 3]**: [Brief description of interaction/behavior features]
- 🔗 **[Feature 4]**: [Brief description of integration capabilities]
- ♿ **[Feature 5]**: [Brief description of accessibility features]
- 🎭 **[Feature 6]**: [Brief description of state management]
- 🎨 **[Feature 7]**: [Brief description of theming capabilities]
- 🔧 **[Feature 8]**: [Brief description of TypeScript/developer experience]

## User Interface Structure

[Brief explanation of the component's layout philosophy and rendering approach]

```
<[element] class="[component-class] [component-class]--{variant} [component-class]--{size}">
  ├── [Conditional State 1] (when [condition])
  │   └── .[component-class]__[element]
  │       ├── .[component-class]__[sub-element] ([description])
  │       └── .[component-class]__[sub-element] ([description])
  │
  └── [Default State] (when [condition])
      └── .[component-class]__[element][data-attribute="{value}"]
          ├── slot="[slot-name]" (when [condition])
          ├── .[component-class]__[element] (when [condition])
          │   └── slot ([default content/label])
          └── slot="[slot-name]" (when [condition])
```

### Layout Behavior

- **Container**: [Description of container layout behavior - flexbox, grid, etc.]
- **Content Flow**: [Description of how content flows and arranges]
- **[Specific Behavior]**: [Description of unique layout characteristics]
- **State Switching**: [Description of how different states affect layout]
- **Responsive**: [Description of responsive behavior and breakpoints]

## Basic Usage

```svelte
<script>
  import { [ComponentName] } from '@your-org/kit';
</script>

<!-- Basic [component] -->
<[ComponentName] [primaryProp]="[value]" />

<!-- [Component] with [interaction] -->
<[ComponentName] 
  [primaryProp]="[value]" 
  on:[primaryEvent]={[handlerFunction]} 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `[primaryProp]` | `string` | `"[default]"` | [Primary prop description] |
| `[variantProp]` | `'[option1]' \| '[option2]' \| '[option3]'` | `'[default]'` | [Variant prop description] |
| `[sizeProp]` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | [Size prop description] |
| `[stateProp]` | `'[state1]' \| '[state2]' \| '[state3]'` | `'[default]'` | [State prop description] |
| `disabled` | `boolean` | `false` | [Disabled state description] |
| `loading` | `boolean` | `false` | [Loading state description] |
| `className` | `string` | `""` | [Additional CSS classes description] |
| `[customProp1]` | `[type]` | `[default]` | [Custom prop description] |
| `[customProp2]` | `[type]` | `[default]` | [Custom prop description] |
| `[customProp3]` | `string` | `undefined` | [Optional prop description] |
| `[eventProp]` | `boolean` | `false` | [Event-related prop description] |

## Variants

### [Variant1] (Default)
[Description of when to use this variant and its visual characteristics]

```svelte
<[ComponentName] variant="[variant1]" [primaryProp]="[Variant1] [Component]" />
```

### [Variant2]
[Description of when to use this variant and its visual characteristics]

```svelte
<[ComponentName] variant="[variant2]" [primaryProp]="[Variant2] [Component]" />
```

### [Variant3]
[Description of when to use this variant and its visual characteristics]

```svelte
<[ComponentName] variant="[variant3]" [primaryProp]="[Variant3] [Component]" />
```

### [Variant4]
[Description of when to use this variant and its visual characteristics]

```svelte
<[ComponentName] variant="[variant4]" [primaryProp]="[Variant4] [Component]" />
```

## Sizes

```svelte
<[ComponentName] size="sm" [primaryProp]="Small" />
<[ComponentName] size="md" [primaryProp]="Medium" />
<[ComponentName] size="lg" [primaryProp]="Large" />
<[ComponentName] size="xl" [primaryProp]="Extra Large" />
```

## States

```svelte
<[ComponentName] state="[state1]" [primaryProp]="[State1]" />
<[ComponentName] state="[state2]" [primaryProp]="[State2]" />
<[ComponentName] state="[state3]" [primaryProp]="[State3]" />
```

## [Major Feature 1 - e.g., Icons, Slots, etc.]

[Description of the feature and when to use it]

```svelte
<script>
  import { [ComponentName] } from '@your-org/kit';
  import [IconComponent] from './[IconComponent].svelte';
</script>

<!-- [Feature description] -->
<[ComponentName] [primaryProp]="[Value]" [featureProp]="[setting]">
  <[IconComponent] name="[icon-name]" slot="[slot-name]" />
</[ComponentName]>

<!-- [Alternative usage] -->
<[ComponentName] [primaryProp]="[Value]" [featureProp]="[different-setting]">
  <[IconComponent] name="[different-icon]" slot="[slot-name]" />
</[ComponentName]>

<!-- [Special case] -->
<[ComponentName] [featureProp]="[special-setting]" [ariaLabel]="[Descriptive label]">
  <[IconComponent] name="[icon]" slot="[slot-name]" />
</[ComponentName]>
```

## [Major Feature 2 - e.g., Loading States]

[Description of loading behavior and use cases]

```svelte
<script>
  let loading = false;
  
  async function [handleAction]() {
    loading = true;
    try {
      await [asyncOperation]();
    } finally {
      loading = false;
    }
  }
</script>

<!-- Basic loading -->
<[ComponentName] 
  [primaryProp]="[Action]" 
  {loading} 
  [loadingMessage]="[Loading text]..."
  on:[primaryEvent]={[handleAction]} 
/>

<!-- Custom loading content -->
<[ComponentName] [primaryProp]="[Action]" {loading} on:[primaryEvent]={[handleAction]}>
  <div slot="loading" let:[loadingData]>
    <[CustomSpinner] />
    <span>{[loadingData]}</span>
  </div>
</[ComponentName]>
```

## [Major Feature 3 - e.g., Links, Forms, etc.]

[Description of the feature and integration scenarios]

```svelte
<!-- [Usage scenario 1] -->
<[ComponentName] [linkProp]="[/internal-path]" [primaryProp]="[Link Text]" />

<!-- [Usage scenario 2] -->
<[ComponentName] [linkProp]="[https://external.com]" [primaryProp]="[External Link]" />

<!-- [Usage scenario 3] -->
<[ComponentName] 
  [linkProp]="[/path]" 
  [targetProp]="[_blank]" 
  [relProp]="[noopener]" 
  [primaryProp]="[Custom Link]" 
/>
```

## Custom Colors

[Description of color customization capabilities]

```svelte
<[ComponentName] 
  [primaryProp]="Custom Colors"
  [colorProp1]="#[hex-color]"
  [colorProp2]="#[hex-color]"
  [colorProp3]="#[hex-color]"
/>
```

## Events

The [ComponentName] component dispatches several events:

```svelte
<[ComponentName] 
  [primaryProp]="Interactive [Component]"
  on:[primaryEvent]={[handlePrimaryEvent]}
  on:[secondaryEvent]={[handleSecondaryEvent]}
  on:[tertiaryEvent]={[handleTertiaryEvent]}
  on:[quaternaryEvent]={[handleQuaternaryEvent]}
  on:[specialEvent]={[handleSpecialEvent]}
/>
```

## Accessibility

The [ComponentName] component is fully accessible by default:

- Proper semantic markup (`<[element]>` or `<[alternative]>`)
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- [State] announcements

```svelte
<!-- Accessible [special case] -->
<[ComponentName] 
  [specialProp]="[special-value]" 
  [ariaLabel]="[Descriptive action]"
  on:[primaryEvent]={[actionHandler]}
>
  <[IconComponent] slot="[slot]" />
</[ComponentName]>
```

## Advanced Usage

### Dynamic Content

```svelte
<[ComponentName] on:[event]={[toggleFunction]}>
  <span slot="[slot]">
    {#if [condition]}
      <[ConditionalComponent1] />
    {:else}
      <[ConditionalComponent2] />
    {/if}
  </span>
  {[condition] ? '[Text1]' : '[Text2]'}
</[ComponentName]>
```

### Conditional Rendering

```svelte
<[ComponentName] 
  variant={[conditionalVariant] ? '[variant1]' : '[variant2]'}
  state={[currentState]}
  disabled={![validationCondition]}
  [primaryProp]={[conditionalValue] ? '[Value1]' : '[Value2]'}
/>
```

### Form Integration

```svelte
<form on:submit|preventDefault={[handleSubmit]}>
  <[ComponentName] 
    [formProp]="[form-value]"
    [primaryProp]="[Submit Action]"
    loading={[submittingState]}
    disabled={![formValidState]}
  />
</form>
```

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { [ComponentName]Props, [ComponentName][Variant], [ComponentName][Size], [ComponentName][State] } from '@your-org/kit';

const [componentConfig]: [ComponentName]Props = {
  variant: '[variant]',
  size: '[size]',
  state: '[state]',
  [primaryProp]: '[Typed Component]'
};
```
