# [ComponentName] Component - Global Styling Guide

This guide covers how to customize the [ComponentName] component's appearance using CSS custom properties (CSS variables) for global theming and design system integration.

## CSS Custom Properties Overview

The [ComponentName] component uses an extensive system of CSS custom properties that allow you to:
- Create consistent design systems
- Implement dark/light themes
- Customize colors, spacing, and typography
- Override styles at different specificity levels

## Global Theme Setup

### 1. Basic Theme Configuration

Create a global CSS file (e.g., `app.css` or `theme.css`) and define your design tokens:

```css
:root {
  /* Color Palette */
  --color-primary: #[primary-color];
  --color-primary-hover: #[primary-hover-color];
  --color-primary-active: #[primary-active-color];
  
  --color-secondary: #[secondary-color];
  --color-secondary-hover: #[secondary-hover-color];
  --color-secondary-active: #[secondary-active-color];
  
  --color-success: #[success-color];
  --color-warning: #[warning-color];
  --color-danger: #[danger-color];
  
  --color-surface: #[surface-color];
  --color-surface-hover: #[surface-hover-color];
  --color-on-surface: #[on-surface-color];
  
  /* Typography */
  --font-family-base: '[font-family]', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-medium: [weight-value];
  --font-weight-semibold: [weight-value];
  
  /* Spacing */
  --spacing-xs: [spacing-value];
  --spacing-sm: [spacing-value];
  --spacing-md: [spacing-value];
  --spacing-lg: [spacing-value];
  --spacing-xl: [spacing-value];
  
  /* Border Radius */
  --radius-sm: [radius-value];
  --radius-md: [radius-value];
  --radius-lg: [radius-value];
  --radius-full: 9999px;
}
```

### 2. [ComponentName]-Specific Global Styles

Override [ComponentName] component defaults globally:

```css
:root {
  /* === [VARIANT1] VARIANT === */
  --[component-prefix]-bg-[variant1]: var(--color-primary);
  --[component-prefix]-bg-[variant1]-hover: var(--color-primary-hover);
  --[component-prefix]-bg-[variant1]-active: var(--color-primary-active);
  --[component-prefix]-text-[variant1]: #[text-color];
  --[component-prefix]-text-[variant1]-hover: #[text-hover-color];
  --[component-prefix]-text-[variant1]-active: #[text-active-color];
  
  /* === [VARIANT2] VARIANT === */
  --[component-prefix]-bg-[variant2]-hover: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-bg-[variant2]-active: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-border-[variant2]: var(--color-primary);
  --[component-prefix]-border-[variant2]-hover: var(--color-primary-hover);
  --[component-prefix]-border-[variant2]-active: var(--color-primary-active);
  --[component-prefix]-text-[variant2]: var(--color-primary);
  --[component-prefix]-text-[variant2]-hover: var(--color-primary-hover);
  --[component-prefix]-text-[variant2]-active: var(--color-primary-active);
  
  /* === [VARIANT3] VARIANT === */
  --[component-prefix]-bg-[variant3]-hover: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-bg-[variant3]-active: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-text-[variant3]: var(--color-primary);
  --[component-prefix]-text-[variant3]-hover: var(--color-primary-hover);
  --[component-prefix]-text-[variant3]-active: var(--color-primary-active);
  
  /* === [VARIANT4] VARIANT === */
  --[component-prefix]-text-[variant4]: var(--color-primary);
  --[component-prefix]-text-[variant4]-hover: var(--color-primary-hover);
  --[component-prefix]-text-[variant4]-active: var(--color-primary-active);
  
  /* === SIZES === */
  /* Small */
  --[component-prefix]-padding-x-sm: [padding-value];
  --[component-prefix]-padding-y-sm: [padding-value];
  --[component-prefix]-min-height-sm: [height-value];
  --[component-prefix]-font-size-sm: [font-size-value];
  --[component-prefix]-gap-sm: [gap-value];
  --[component-prefix]-border-radius-sm: var(--radius-sm);
  
  /* Medium */
  --[component-prefix]-padding-x-md: [padding-value];
  --[component-prefix]-padding-y-md: [padding-value];
  --[component-prefix]-min-height-md: [height-value];
  --[component-prefix]-font-size-md: [font-size-value];
  --[component-prefix]-gap-md: [gap-value];
  --[component-prefix]-border-radius-md: var(--radius-md);
  
  /* Large */
  --[component-prefix]-padding-x-lg: [padding-value];
  --[component-prefix]-padding-y-lg: [padding-value];
  --[component-prefix]-min-height-lg: [height-value];
  --[component-prefix]-font-size-lg: [font-size-value];
  --[component-prefix]-gap-lg: [gap-value];
  --[component-prefix]-border-radius-lg: var(--radius-lg);
  
  /* Extra Large */
  --[component-prefix]-padding-x-xl: [padding-value];
  --[component-prefix]-padding-y-xl: [padding-value];
  --[component-prefix]-min-height-xl: [height-value];
  --[component-prefix]-font-size-xl: [font-size-value];
  --[component-prefix]-gap-xl: [gap-value];
  --[component-prefix]-border-radius-xl: var(--radius-lg);
  
  /* === STATES === */
  --[component-prefix]-bg-[state1]: var(--color-surface-hover);
  --[component-prefix]-text-[state1]: var(--color-on-surface);
  
  --[component-prefix]-bg-[state2]: #[state-bg-color];
  --[component-prefix]-text-[state2]: #[state-text-color];
  --[component-prefix]-border-[state2]: #[state-border-color];
  
  /* === DISABLED STATE === */
  --[component-prefix]-bg-disabled: #[disabled-bg-color];
  --[component-prefix]-text-disabled: #[disabled-text-color];
  --[component-prefix]-border-disabled: #[disabled-border-color];
  
  /* === FOCUS === */
  --[component-prefix]-focus-ring-color: var(--color-primary);
  --[component-prefix]-focus-ring-width: [width-value];
  --[component-prefix]-focus-ring-offset: [offset-value];
  
  /* === TYPOGRAPHY === */
  --[component-prefix]-font-family: var(--font-family-base);
  --[component-prefix]-font-weight: var(--font-weight-medium);
  --[component-prefix]-line-height: [line-height-value];
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --color-surface: #[dark-surface-color];
  --color-surface-hover: #[dark-surface-hover-color];
  --color-on-surface: #[dark-on-surface-color];
  
  /* Dark theme [component] overrides */
  --[component-prefix]-bg-[variant1]: var(--color-primary);
  --[component-prefix]-bg-[variant2]-hover: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-bg-[variant3]-hover: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-bg-disabled: #[dark-disabled-bg];
  --[component-prefix]-text-disabled: #[dark-disabled-text];
  --[component-prefix]-border-disabled: #[dark-disabled-border];
}

/* Usage in Svelte */
/* <div data-theme="dark"> */
/*   <[ComponentName] [primaryProp]="Dark Theme [Component]" /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic [component] variants:

```css
/* Success [components] */
.[component-prefix]-success {
  --[component-prefix]-bg: var(--color-success);
  --[component-prefix]-bg-hover: #[success-hover-color];
  --[component-prefix]-bg-active: #[success-active-color];
  --[component-prefix]-text: #[success-text-color];
  --[component-prefix]-border: var(--color-success);
  --[component-prefix]-border-hover: #[success-hover-color];
  --[component-prefix]-focus-ring-color: var(--color-success);
}

/* Warning [components] */
.[component-prefix]-warning {
  --[component-prefix]-bg: var(--color-warning);
  --[component-prefix]-bg-hover: #[warning-hover-color];
  --[component-prefix]-bg-active: #[warning-active-color];
  --[component-prefix]-text: #[warning-text-color];
  --[component-prefix]-border: var(--color-warning);
  --[component-prefix]-border-hover: #[warning-hover-color];
  --[component-prefix]-focus-ring-color: var(--color-warning);
}

/* Danger [components] */
.[component-prefix]-danger {
  --[component-prefix]-bg: var(--color-danger);
  --[component-prefix]-bg-hover: #[danger-hover-color];
  --[component-prefix]-bg-active: #[danger-active-color];
  --[component-prefix]-text: #[danger-text-color];
  --[component-prefix]-border: var(--color-danger);
  --[component-prefix]-border-hover: #[danger-hover-color];
  --[component-prefix]-focus-ring-color: var(--color-danger);
}
```

Usage in Svelte:

```svelte
<[ComponentName] [primaryProp]="Save" className="[component-prefix]-success" />
<[ComponentName] [primaryProp]="Warning" className="[component-prefix]-warning" />
<[ComponentName] [primaryProp]="Delete" className="[component-prefix]-danger" />
```

### 3. Size Variants

Create custom size variants:

```css
/* Compact size */
.[component-prefix]-compact {
  --[component-prefix]-padding-x: [compact-padding-x];
  --[component-prefix]-padding-y: [compact-padding-y];
  --[component-prefix]-min-height: [compact-height];
  --[component-prefix]-font-size: [compact-font-size];
  --[component-prefix]-gap: [compact-gap];
  --[component-prefix]-border-radius: [compact-radius];
}

/* Hero size */
.[component-prefix]-hero {
  --[component-prefix]-padding-x: [hero-padding-x];
  --[component-prefix]-padding-y: [hero-padding-y];
  --[component-prefix]-min-height: [hero-height];
  --[component-prefix]-font-size: [hero-font-size];
  --[component-prefix]-gap: [hero-gap];
  --[component-prefix]-border-radius: [hero-radius];
  --[component-prefix]-font-weight: var(--font-weight-semibold);
}
```

## Component-Specific Overrides

### 1. Scoped Styling

Target specific [component] instances:

```css
/* Specific component styling */
.[context]-[component] {
  --[component-prefix]-bg: linear-gradient([gradient-definition]);
  --[component-prefix]-bg-hover: linear-gradient([hover-gradient-definition]);
  --[component-prefix]-text: #[text-color];
  --[component-prefix]-border-radius: var(--radius-full);
  --[component-prefix]-padding-x: [custom-padding];
}

.[context]-[component] {
  --[component-prefix]-bg: transparent;
  --[component-prefix]-bg-hover: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-text: var(--color-on-surface);
  --[component-prefix]-text-hover: var(--color-primary);
  --[component-prefix]-border-radius: var(--radius-sm);
  --[component-prefix]-justify-content: [alignment];
}
```

### 2. State-Specific Overrides

```css
/* Custom [state1] state */
.[component-prefix]-[custom-state1] {
  --[component-prefix]-bg-[state1]: var(--color-success);
  --[component-prefix]-text-[state1]: #[state-text-color];
  --[component-prefix]-border-[state1]: var(--color-success);
}

/* Custom [state2] state */
.[component-prefix]-[custom-state2] {
  --[component-prefix]-bg-[state2]: var(--color-primary);
  --[component-prefix]-text-[state2]: #[state-text-color];
  --[component-prefix]-border-[state2]: var(--color-primary);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

For dynamic theming with JavaScript:

```javascript
// theme.js
export const [component]Theme = {
  primary: {
    '--[component-prefix]-bg': '#[primary-color]',
    '--[component-prefix]-bg-hover': '#[primary-hover-color]',
    '--[component-prefix]-text': '#[primary-text-color]'
  },
  secondary: {
    '--[component-prefix]-bg': '#[secondary-color]',
    '--[component-prefix]-bg-hover': '#[secondary-hover-color]',
    '--[component-prefix]-text': '#[secondary-text-color]'
  }
};

// Usage in Svelte component
let theme = 'primary';
$: [component]Styles = Object.entries([component]Theme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<[ComponentName] 
  [primaryProp]="Dynamic Theme" 
  style={[component]Styles}
/>
```

### 2. Responsive Theming

```css
/* Mobile-first responsive [component] sizing */
:root {
  --[component-prefix]-padding-x-responsive: [mobile-padding-x];
  --[component-prefix]-padding-y-responsive: [mobile-padding-y];
  --[component-prefix]-font-size-responsive: [mobile-font-size];
}

@media (min-width: 640px) {
  :root {
    --[component-prefix]-padding-x-responsive: [tablet-padding-x];
    --[component-prefix]-padding-y-responsive: [tablet-padding-y];
    --[component-prefix]-font-size-responsive: [tablet-font-size];
  }
}

@media (min-width: 1024px) {
  :root {
    --[component-prefix]-padding-x-responsive: [desktop-padding-x];
    --[component-prefix]-padding-y-responsive: [desktop-padding-y];
    --[component-prefix]-font-size-responsive: [desktop-font-size];
  }
}

.[component-prefix]-responsive {
  --[component-prefix]-padding-x: var(--[component-prefix]-padding-x-responsive);
  --[component-prefix]-padding-y: var(--[component-prefix]-padding-y-responsive);
  --[component-prefix]-font-size: var(--[component-prefix]-font-size-responsive);
}
```

### 3. Animation Customization

```css
/* Custom transitions */
.[component-prefix]-smooth {
  --[component-prefix]-transition-duration: [duration];
  --[component-prefix]-transition-timing: cubic-bezier([timing-values]);
}

.[component-prefix]-bouncy {
  --[component-prefix]-transition-duration: [duration];
  --[component-prefix]-transition-timing: cubic-bezier([bouncy-timing-values]);
}

/* Custom hover effects */
.[component-prefix]-lift:hover {
  transform: translateY([lift-distance]);
  box-shadow: [lift-shadow];
}

.[component-prefix]-glow:hover {
  box-shadow: [glow-shadow];
}
```

## Design System Integration

### 1. Design Token Mapping

```css
/* Map design system tokens to [component] properties */
:root {
  /* Design System Tokens */
  --ds-color-primary-500: #[ds-primary];
  --ds-color-primary-600: #[ds-primary-hover];
  --ds-color-primary-700: #[ds-primary-active];
  --ds-space-2: [ds-space-2];
  --ds-space-3: [ds-space-3];
  --ds-space-4: [ds-space-4];
  --ds-radius-md: [ds-radius];
  --ds-text-sm: [ds-text-sm];
  --ds-text-base: [ds-text-base];
  
  /* [ComponentName] Mappings */
  --[component-prefix]-bg-[variant1]: var(--ds-color-primary-500);
  --[component-prefix]-bg-[variant1]-hover: var(--ds-color-primary-600);
  --[component-prefix]-bg-[variant1]-active: var(--ds-color-primary-700);
  --[component-prefix]-padding-x-md: var(--ds-space-4);
  --[component-prefix]-padding-y-md: var(--ds-space-2);
  --[component-prefix]-border-radius-md: var(--ds-radius-md);
  --[component-prefix]-font-size-md: var(--ds-text-base);
}
```

### 2. Component Library Integration

```css
/* Integrate with popular CSS frameworks */

/* Tailwind CSS Integration */
.[component-prefix]-tailwind {
  @apply inline-flex items-center justify-center;
  --[component-prefix]-bg: theme('colors.blue.500');
  --[component-prefix]-bg-hover: theme('colors.blue.600');
  --[component-prefix]-text: theme('colors.white');
  --[component-prefix]-border-radius: theme('borderRadius.md');
  --[component-prefix]-padding-x: theme('spacing.4');
  --[component-prefix]-padding-y: theme('spacing.2');
}

/* Bootstrap Integration */
.[component-prefix]-bootstrap {
  --[component-prefix]-bg: var(--bs-primary);
  --[component-prefix]-bg-hover: var(--bs-primary-hover);
  --[component-prefix]-text: var(--bs-white);
  --[component-prefix]-border-radius: var(--bs-border-radius);
  --[component-prefix]-padding-x: var(--bs-[component]-padding-x);
  --[component-prefix]-padding-y: var(--bs-[component]-padding-y);
}
```

## Best Practices

1. **Use Semantic Naming**: Create meaningful class names that describe purpose, not appearance
2. **Layer Your Overrides**: Use CSS specificity wisely - global defaults, theme overrides, component-specific styles
3. **Maintain Consistency**: Keep spacing, colors, and typography consistent across your design system
4. **Test Accessibility**: Ensure sufficient color contrast and focus indicators in all themes
5. **Document Your Tokens**: Maintain clear documentation of your design tokens and their usage
6. **Performance**: Minimize the number of custom properties to avoid performance issues

## Complete Example

Here's a complete example integrating all concepts:

```css
/* Global theme setup */
:root {
  /* Design tokens */
  --color-primary: #[primary-color];
  --color-success: #[success-color];
  --color-warning: #[warning-color];
  --color-danger: #[danger-color];
  
  /* [ComponentName] defaults */
  --[component-prefix]-bg-[variant1]: var(--color-primary);
  --[component-prefix]-focus-ring-color: var(--color-primary);
  --[component-prefix]-border-radius-md: [radius-value];
  --[component-prefix]-font-weight: [weight-value];
}

/* Semantic variants */
.[component-prefix]-primary { --[component-prefix]-bg: var(--color-primary); }
.[component-prefix]-success { --[component-prefix]-bg: var(--color-success); }
.[component-prefix]-warning { --[component-prefix]-bg: var(--color-warning); }
.[component-prefix]-danger { --[component-prefix]-bg: var(--color-danger); }

/* Dark theme */
[data-theme="dark"] {
  --[component-prefix]-bg-[variant2]-hover: rgba([r], [g], [b], [alpha]);
  --[component-prefix]-bg-disabled: #[dark-disabled-bg];
}
```

```svelte
<!-- Usage in components -->
<[ComponentName] [primaryProp]="Primary Action" className="[component-prefix]-primary" />
<[ComponentName] [primaryProp]="Delete" variant="[variant2]" className="[component-prefix]-danger" />
<[ComponentName] [primaryProp]="Save" className="[component-prefix]-success" loading={saving} />
```

This styling system provides maximum flexibility while maintaining consistency and performance across your application.
