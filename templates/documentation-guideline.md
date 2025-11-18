# Component Documentation Guidelines

This document provides a systematic approach to documenting UI components in our design system. Following these guidelines ensures consistency, completeness, and developer-friendly documentation across all components.

## Documentation Structure Overview

Each component should have **two primary documentation files**:

1. **`README.md`** - Functional documentation (API, usage, examples)
2. **`STYLING.md`** - Theming and customization documentation

## File Organization

```
src/lib/[component-name]/
├── [ComponentName].svelte          # Component implementation
├── README.md                       # Functional documentation
├── STYLING.md                      # Styling/theming documentation
└── utils.ts                        # (if needed) Utility functions
```

---

## README.md Structure

### 1. Header Section

```markdown
# [Component Name] Component

[Brief description of the component's purpose and key value proposition]

## Features

- 🎨 **[Feature 1]**: Brief description
- 📏 **[Feature 2]**: Brief description
- 🎯 **[Feature 3]**: Brief description
- 🔗 **[Feature 4]**: Brief description
- ♿ **[Feature 5]**: Brief description
- 🎭 **[Feature 6]**: Brief description
- 🎨 **[Feature 7]**: Brief description
- 🔧 **[Feature 8]**: Brief description
```

**Guidelines:**
- Use emojis for visual appeal and quick scanning
- Limit to 6-8 key features
- Focus on user benefits, not implementation details
- Keep descriptions concise (1-2 words + brief explanation)

### 2. User Interface Structure

```markdown
## User Interface Structure

[Brief explanation of the component's layout philosophy]

```
[ASCII diagram showing DOM hierarchy and conditional states]
```

### Layout Behavior

- **[Aspect 1]**: Description of layout behavior
- **[Aspect 2]**: Description of responsive behavior
- **[Aspect 3]**: Description of state changes
- **[Aspect 4]**: Description of content flow
```

**Guidelines:**
- Include ASCII art diagram showing DOM structure
- Explain conditional rendering (loading states, variants, etc.)
- Describe layout behavior (flexbox, grid, positioning)
- Mention responsive considerations

### 3. Basic Usage

```markdown
## Basic Usage

```svelte
<script>
  import { [ComponentName] } from '@your-org/kit';
</script>

<!-- Basic example -->
<[ComponentName] [basicProp]="[value]" />

<!-- Example with handler -->
<[ComponentName] 
  [prop]="[value]" 
  on:[event]={[handler]} 
/>
```
```

**Guidelines:**
- Start with the simplest possible usage
- Show import statement
- Include one basic example and one with event handler
- Use realistic prop values

### 4. Props Table

```markdown
## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `[prop1]` | `[type]` | `[default]` | [Description] |
| `[prop2]` | `'option1' \| 'option2'` | `'option1'` | [Description] |
| `[prop3]` | `boolean` | `false` | [Description] |
```

**Guidelines:**
- Include ALL props, even optional ones
- Use TypeScript union types for enums
- Provide meaningful defaults
- Keep descriptions concise but complete
- Order by importance (required first, then by usage frequency)

### 5. Variants Section

```markdown
## Variants

### [Variant Name]
[Brief description of when to use this variant]

```svelte
<[ComponentName] variant="[variantName]" [prop]="[value]" />
```
```

**Guidelines:**
- Document each variant separately
- Explain when to use each variant
- Provide visual context in descriptions
- Include working code examples

### 6. Feature-Specific Sections

Create individual sections for major features:

```markdown
## [Feature Name]

[Brief explanation of the feature and its purpose]

```svelte
<script>
  [Any necessary script setup]
</script>

<!-- [Description of example] -->
<[ComponentName] 
  [relevantProps]
  on:[event]={[handler]}
>
  [slot content if applicable]
</[ComponentName]>
```
```

**Common feature sections:**
- Sizes
- States  
- Icons/Slots
- Loading States
- Links (if applicable)
- Custom Colors
- Events
- Accessibility

### 7. Advanced Usage

```markdown
## Advanced Usage

### [Advanced Pattern Name]

```svelte
[Complex usage example with explanation]
```

### [Another Advanced Pattern]

```svelte
[Another complex example]
```
```

**Guidelines:**
- Show real-world integration patterns
- Include dynamic content examples
- Demonstrate conditional rendering
- Show form integration if applicable

### 8. Cross-References

```markdown
## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

The component exports comprehensive TypeScript types:

```typescript
import type { [ComponentName]Props, [Type1], [Type2] } from '@your-org/kit';
```
```

---

## STYLING.md Structure

### 1. Overview Section

```markdown
# [Component Name] Component - Global Styling Guide

This guide covers how to customize the [Component Name] component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The [Component Name] component uses an extensive system of CSS custom properties that allow you to:
- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and typography
- Override styles at different specificity levels
```

### 2. Global Theme Setup

```markdown
## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
  /* Color Palette */
  --color-primary: #[value];
  --color-secondary: #[value];
  
  /* Typography */
  --font-family-base: [value];
  
  /* Spacing */
  --spacing-sm: [value];
  
  /* Border Radius */
  --radius-md: [value];
}
```

### 2. [Component]-Specific Global Styles

Override [Component] component defaults globally:

```css
:root {
  /* === [VARIANT 1] === */
  --[component]-[property]: [value];
  
  /* === [VARIANT 2] === */
  --[component]-[property]: [value];
}
```
```

### 3. Theme Variants

```markdown
## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --[component]-[property]: [value];
}
```

### 2. Brand Color Variants

```css
/* [Semantic name] */
.[component]-[semantic-name] {
  --[component]-[property]: [value];
}
```
```

### 4. Advanced Theming Patterns

```markdown
## Advanced Theming Patterns

### 1. CSS-in-JS Integration
### 2. Responsive Theming  
### 3. Animation Customization
### 4. Design System Integration
```

### 5. Best Practices

```markdown
## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and typography consistent across your design system
4. **Test Accessibility**: Ensure sufficient color contrast and focus indicators in all themes
5. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage
6. **Performance**: Minimize the number of custom properties to avoid performance issues
```

---

## Content Guidelines

### Writing Style

- **Tone**: Professional but approachable
- **Voice**: Active voice, direct instructions
- **Tense**: Present tense for descriptions, imperative for instructions
- **Perspective**: Second person ("you can", "your component")

### Code Examples

- **Completeness**: All examples should be copy-paste ready
- **Realism**: Use realistic data and meaningful variable names
- **Imports**: Always show import statements
- **Comments**: Include helpful comments explaining complex patterns
- **Formatting**: Use consistent indentation and spacing

### TypeScript Integration

- **Type Exports**: Document all exported types
- **Interface Usage**: Show how to use interfaces in practice
- **Generic Examples**: Provide typed examples where relevant

### Accessibility Documentation

- **ARIA Attributes**: Document accessibility features
- **Keyboard Navigation**: Explain keyboard interaction patterns
- **Screen Reader Support**: Mention screen reader considerations
- **Focus Management**: Document focus behavior

---

## Quality Checklist

Before publishing component documentation, verify:

### README.md Checklist

- [ ] Header with component name and description
- [ ] Feature list with emojis (6-8 items)
- [ ] UI structure diagram with ASCII art
- [ ] Basic usage examples with imports
- [ ] Complete props table with all properties
- [ ] All variants documented with examples
- [ ] Major features have dedicated sections
- [ ] Advanced usage patterns included
- [ ] Events documented with examples
- [ ] Accessibility considerations covered
- [ ] TypeScript types documented
- [ ] Cross-references to STYLING.md

### STYLING.md Checklist

- [ ] Overview of CSS custom properties system
- [ ] Global theme setup with complete examples
- [ ] Component-specific CSS variables documented
- [ ] Dark theme variant provided
- [ ] Brand color variants shown
- [ ] Advanced theming patterns covered
- [ ] Design system integration examples
- [ ] Best practices section included
- [ ] Complete working examples provided
- [ ] Performance considerations mentioned

### Code Quality Checklist

- [ ] All code examples are tested and working
- [ ] Import statements are correct
- [ ] TypeScript types are accurate
- [ ] CSS custom properties follow naming conventions
- [ ] Examples use realistic data
- [ ] Accessibility attributes are included
- [ ] Comments explain complex patterns

---

## Templates

### README.md Template

```markdown
# [Component Name] Component

[Component description and value proposition]

## Features

- 🎨 **[Feature]**: Description
[... 6-8 features total]

## User Interface Structure

[Layout explanation]

```
[ASCII diagram]
```

### Layout Behavior

- **[Aspect]**: Description

## Basic Usage

```svelte
<script>
  import { [Component] } from '@your-org/kit';
</script>

<[Component] [prop]="[value]" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `[prop]` | `[type]` | `[default]` | [description] |

## [Variants/Features sections...]

## Advanced Usage

[Complex examples]

## Global Styling

See the [Global Styling Guide](./STYLING.md) for comprehensive theming options.

## TypeScript

```typescript
import type { [Component]Props } from '@your-org/kit';
```
```

### STYLING.md Template

```markdown
# [Component Name] Component - Global Styling Guide

## CSS Custom Properties Overview

[Explanation of theming system]

## Global Theme Setup

### 1. Basic Theme Configuration

```css
:root {
  /* Design tokens */
}
```

### 2. [Component]-Specific Global Styles

```css
:root {
  /* Component overrides */
}
```

## Theme Variants

### 1. Dark Theme
### 2. Brand Color Variants

## Advanced Theming Patterns

## Best Practices

## Complete Example
```

---

## Maintenance

### Regular Updates

- Review documentation when component API changes
- Update examples when new features are added
- Verify all code examples still work
- Update TypeScript types as needed

### Version Management

- Document breaking changes in component updates
- Maintain backward compatibility examples when possible
- Update migration guides for major version changes

### Community Contributions

- Encourage community examples and use cases
- Review and incorporate feedback on documentation clarity
- Maintain consistency across all component documentation

---

This guideline ensures that every component in our design system has comprehensive, consistent, and developer-friendly documentation that serves both as reference material and learning resource.
