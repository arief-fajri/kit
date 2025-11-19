# Switch Component - Global Styling Guide

This guide covers how to customize the Switch component using CSS custom properties so you can align toggles with any design system, theme, or brand palette.

## CSS Custom Properties Overview

Switch exposes a compact yet powerful set of CSS variables to control sizing, spacing, animation, and colors. Override them globally, per-theme, or per-instance for total styling control.

## Global Theme Setup

### 1. Basic Theme Configuration

Define your design tokens in a global stylesheet (`app.css`, `theme.css`, etc.):

```css
:root {
  /* Color Palette */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-active: #1d4ed8;

  --color-secondary: #6b7280;
  --color-secondary-hover: #4b5563;
  --color-secondary-active: #374151;

  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --color-surface: #ffffff;
  --color-surface-hover: #f9fafb;
  --color-on-surface: #111827;

  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}
```

### 2. Switch-Specific Global Styles

Override Switch defaults globally by adjusting the dedicated variables:

```css
:root {
  /* === CORE DIMENSIONS === */
  --switch-width-base: 32px;
  --switch-height-base: 18px;
  --switch-slider-size-base: 14px;
  --switch-slider-offset: 2px;
  --switch-size: 1; /* multiplier applied per size preset */

  /* === TRANSITIONS === */
  --switch-transition-duration: 0.4s;
  --switch-transition-timing: ease;

  /* === COLORS === */
  --switch-bg-unchecked: #888888;
  --switch-bg-unchecked-hover: #4f4f4f;
  --switch-bg-checked: #1b1c21;
  --switch-slider-color: #ffffff;
  --switch-disabled-opacity: 0.5;

  /* === FOCUS === */
  --switch-focus-ring-color: var(--color-primary);
  --switch-focus-ring-width: 2px;
  --switch-focus-ring-offset: 2px;

  /* === LAYOUT === */
  --switch-gap: var(--spacing-sm);

  /* === VARIANTS === */
  --switch-color-primary: var(--color-primary);
  --switch-color-success: var(--color-success);
  --switch-color-error: var(--color-danger);
  --switch-color-warning: var(--color-warning);
}
```

## Theme Variants

### 1. Dark Theme

```css
[data-theme="dark"] {
  --switch-bg-unchecked: #4b5563;
  --switch-bg-unchecked-hover: #6b7280;
  --switch-bg-checked: #1f2937;
  --switch-slider-color: #f9fafb;
  --switch-disabled-opacity: 0.35;
  --switch-focus-ring-color: #60a5fa;
}

/* Usage */
/* <div data-theme="dark"> */
/*   <Switch label="Dark mode" /> */
/* </div> */
```

### 2. Brand Color Variants

Create semantic helper classes that override variant colors per instance:

```css
.switch-brand-success {
  --switch-bg-checked: var(--color-success);
  --switch-focus-ring-color: var(--color-success);
}

.switch-brand-warning {
  --switch-bg-checked: var(--color-warning);
  --switch-focus-ring-color: var(--color-warning);
}

.switch-brand-danger {
  --switch-bg-checked: var(--color-danger);
  --switch-focus-ring-color: var(--color-danger);
}
```

```svelte
<Switch class="switch-brand-success" label="Auto backup" />
<Switch class="switch-brand-warning" label="Beta mode" />
<Switch class="switch-brand-danger" label="Critical toggle" />
```

### 3. Size Variants

Switch sizes are just multipliers; you can add custom classes that point to bespoke multipliers:

```css
.switch-compact {
  --switch-size: 0.85;
  --switch-gap: 0.25rem;
}

.switch-hero {
  --switch-size: 1.35;
  --switch-gap: 0.75rem;
  --switch-transition-duration: 0.5s;
}
```

## Component-Specific Overrides

### 1. Scoped Styling

```css
.settings-toggle {
  --switch-bg-unchecked: #e2e8f0;
  --switch-bg-checked: linear-gradient(90deg, #6366f1, #8b5cf6);
  --switch-slider-color: #0f172a;
  --switch-focus-ring-color: #a855f7;
}

.minimal-toggle {
  --switch-bg-unchecked: transparent;
  --switch-bg-unchecked-hover: rgba(148, 163, 184, 0.4);
  --switch-bg-checked: rgba(59, 130, 246, 0.25);
  --switch-slider-color: #3b82f6;
}
```

### 2. State-Specific Overrides

```css
.switch-filled-on-check input:checked + .switch-slider {
  --switch-bg-checked: var(--color-primary);
  --switch-slider-color: #ffffff;
}

.switch-outline input:not(:checked) + .switch-slider {
  background-color: transparent;
  box-shadow: inset 0 0 0 2px var(--color-border);
}
```

## Advanced Theming Patterns

### 1. CSS-in-JS Integration

```ts
// switchTheme.ts
export const switchTheme = {
  cobalt: {
    '--switch-bg-unchecked': '#1e293b',
    '--switch-bg-checked': '#2563eb',
    '--switch-slider-color': '#e2e8f0'
  },
  sunset: {
    '--switch-bg-unchecked': '#92400e',
    '--switch-bg-checked': '#f97316',
    '--switch-slider-color': '#fff7ed'
  }
} as const;

// Usage in Svelte
let theme = 'cobalt';
$: switchStyles = Object.entries(switchTheme[theme])
  .map(([key, value]) => `${key}: ${value}`)
  .join('; ');
```

```svelte
<Switch label="Dynamic Theme" style={switchStyles} />
```

### 2. Responsive Theming

```css
:root {
  --switch-size-responsive: 0.9;
}

@media (min-width: 640px) {
  :root {
    --switch-size-responsive: 1;
  }
}

@media (min-width: 1024px) {
  :root {
    --switch-size-responsive: 1.1;
  }
}

.switch-responsive {
  --switch-size: var(--switch-size-responsive);
}
```

### 3. Animation Customization

```css
.switch-smooth {
  --switch-transition-duration: 0.3s;
  --switch-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.switch-bouncy {
  --switch-transition-duration: 0.45s;
  --switch-transition-timing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.switch-glow:hover .switch-slider {
  box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.15);
}
```

## Design System Integration

### 1. Design Token Mapping

```css
:root {
  --ds-color-primary-500: #2563eb;
  --ds-color-primary-400: #3b82f6;
  --ds-radius-pill: 9999px;

  --switch-bg-checked: var(--ds-color-primary-500);
  --switch-focus-ring-color: var(--ds-color-primary-400);
  --switch-slider-offset: 3px;
}
```

### 2. Component Library Integration

```css
.switch-tailwind {
  @apply inline-flex items-center;
  --switch-bg-checked: theme('colors.blue.500');
  --switch-bg-unchecked: theme('colors.gray.400');
  --switch-slider-color: theme('colors.white');
}

.switch-bootstrap {
  --switch-bg-checked: var(--bs-primary);
  --switch-bg-unchecked: var(--bs-secondary);
  --switch-slider-color: var(--bs-white);
}
```

## Best Practices

1. Layer overrides: start with design tokens, then component defaults, then scoped classes.
2. Keep contrast high enough for toggles to remain legible in both states.
3. Mirror spacing and typography tokens across form controls for consistency.
4. Use semantic variant variables to keep logic aligned with your brand palette.
5. Prefer CSS variables over deep selectors—Switch is designed for token-driven overrides.

## Complete Example

```css
/* Global tokens */
:root {
  --color-primary: #6366f1;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --switch-bg-unchecked: #cbd5f5;
  --switch-bg-checked: var(--color-primary);
  --switch-focus-ring-color: rgba(99, 102, 241, 0.5);
}

/* Semantic helpers */
.switch-primary { --switch-bg-checked: var(--color-primary); }
.switch-success { --switch-bg-checked: var(--color-success); }
.switch-warning { --switch-bg-checked: var(--color-warning); }
.switch-danger { --switch-bg-checked: var(--color-danger); }

/* Dark theme */
[data-theme="dark"] {
  --switch-bg-unchecked: #475569;
  --switch-bg-checked: #22d3ee;
  --switch-slider-color: #0f172a;
}
```

```svelte
<Switch class="switch-primary" label="Primary" />
<Switch class="switch-success" label="Success" />
<Switch data-theme="dark" label="Dark themed" />
```

These patterns ensure Switch stays visually consistent while remaining easy to restyle for any brand or product experience.

