# Packages Analysis - @rief/kit Monorepo

## Overview

This monorepo contains a modern Svelte component library ecosystem built with TypeScript. The project uses **pnpm workspaces** and **Turborepo** for efficient monorepo management, enabling shared code, optimized builds, and streamlined development workflows.

## Monorepo Structure

```
kit/
├── packages/
│   ├── kit/          # Main Svelte component library (@rief/kit)
│   └── utils/        # Shared utility functions (@rief/utils)
├── apps/             # Application packages (e.g., documentation site)
├── turbo.json        # Turborepo configuration
└── pnpm-workspace.yaml # pnpm workspace configuration
```

---

## Package 1: @rief/kit

### Overview
**@rief/kit** is the main Svelte component library package. It provides a comprehensive set of reusable, accessible, and customizable UI components built with Svelte 4+ and TypeScript.

### Package Details
- **Name**: `@rief/kit`
- **Version**: `0.1.0`
- **Type**: Svelte component library
- **Build Tool**: `svelte-package` (SvelteKit package mode)
- **Peer Dependencies**: `svelte@^4.0.0 || ^5.0.0`
- **Dependencies**: 
  - `@rief/utils` (workspace dependency)
  - `lucide-svelte` (icon library)

### Architecture & Design Philosophy

#### 1. Standardized Props Pattern
All components follow a consistent, well-organized props structure:

```
Component Props Structure:
├── Core Props (flat)
│   ├── value, label, name, id
│   └── Component-specific data
│
├── Styling (grouped object)
│   ├── variant, size, className, style
│   └── Component-specific styling options
│
├── Behavior (grouped object)
│   ├── disabled, loading
│   └── Component-specific behaviors
│
├── Validation (grouped object - form components)
│   ├── required, isError, errorMessage
│   └── Component-specific validation
│
└── Accessibility (flat)
    ├── ariaLabel, ariaDescribedBy
    └── ARIA attributes
```

**Benefits:**
- **Consistency**: Similar components have similar APIs
- **Discoverability**: Developers can predict prop names
- **Type Safety**: Comprehensive TypeScript types for all props
- **Maintainability**: Easier to update and extend components

#### 2. Type System
The library uses a sophisticated TypeScript type system defined in `src/lib/types.ts`:

- **Base Types**: Common interfaces like `BaseStyling`, `BaseBehavior`, `BaseAccessibility`
- **Component-Specific Types**: Each component has its own prop types (e.g., `ButtonProps`, `InputTextProps`)
- **Event Types**: Typed custom events with detailed event payloads
- **Utility Types**: Reusable type patterns across components

#### 3. Component Organization

```
src/lib/
├── accordion/          # Accordion component
├── button/             # Button component
├── card/               # Card component
├── drag-line/          # Drag line utility
├── drawer/             # Drawer/side panel component
├── input-fields/       # Form input components
│   ├── checkbox/
│   ├── date-picker/    # Complex date picker with calendar
│   ├── radiobox/
│   ├── select-option/
│   ├── switch/
│   ├── tags/
│   ├── text/
│   └── textarea/
├── pagination/         # Pagination component
├── table/              # Table components
│   ├── TableListing.svelte
│   ├── TableLoading.svelte
│   └── SortHeader.svelte
├── wrapper/            # Layout wrapper components
│   ├── base-layout/
│   ├── dropdown/
│   ├── page/
│   └── sidebar/
├── helpers/            # Shared helper utilities
│   ├── ariaHelpers.ts
│   ├── errorHandling.ts
│   └── propValidation.ts
├── types.ts            # Comprehensive type definitions
├── index.ts            # Main export file
└── default-style.css   # Default CSS styles
```

### Component Categories

#### Form Input Components
- **InputText**: Text input with validation, error states, and styling variants
- **TextArea**: Multi-line text input with similar features
- **Checkbox**: Checkbox with custom styling and states
- **Radiobox**: Radio button with grouping support
- **Switch**: Toggle switch component
- **SelectOption**: Dropdown/select component
- **Tags**: Tag input component for multiple values
- **DatePicker**: Calendar-based date picker
- **InputDatePicker**: Text input with integrated date picker

#### Layout Components
- **BaseLayoutWrapper**: Base layout container
- **PageWrapper**: Page content wrapper with scroll handling
- **SidebarWrapper**: Resizable sidebar with drag support
- **DropdownWrapper**: Dropdown/popover wrapper

#### Data Display Components
- **Card**: Card container component
- **TableListing**: Full-featured table with sorting, filtering, pagination
- **TableLoading**: Loading state for tables
- **SortHeader**: Sortable table header
- **Pagination**: Pagination controls

#### Interactive Components
- **Button**: Button with multiple variants, states, and loading support
- **Accordion**: Collapsible content sections
- **Drawer**: Slide-out panel component
- **DragLine**: Draggable divider/resizer

### Key Features

#### 1. Accessibility (A11y)
- **ARIA Support**: Comprehensive ARIA attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper semantic HTML and ARIA labels
- **Focus Management**: Proper focus handling and trapping

#### 2. Theming & Styling
- **CSS Custom Properties**: Extensive use of CSS variables for theming
- **Variant System**: Multiple visual variants per component
- **Size System**: Consistent size scale (sm, md, lg, xl)
- **Customizable**: Style overrides via props and CSS variables
- **Default Styles**: Optional default stylesheet

#### 3. Developer Experience
- **TypeScript**: Full type safety with comprehensive types
- **Documentation**: Each component has README.md and STYLING.md
- **Validation**: Runtime prop validation in development
- **Error Handling**: Graceful error handling with helpful messages
- **Event System**: Typed custom events with detailed payloads

#### 4. Form Integration
- **Validation**: Built-in validation support
- **Error States**: Visual error indicators
- **Form Utilities**: Integration with `@rief/utils` form helpers
- **Native Form Support**: Works with native HTML forms

### Helper Utilities

The `helpers/` directory contains shared utilities:

1. **propValidation.ts**: 
   - `validateRequiredProp()`: Ensures required props are provided
   - `validateEnumProp()`: Validates enum values
   - `validateNumberRange()`: Validates numeric ranges

2. **ariaHelpers.ts**:
   - ARIA attribute generation
   - ID management for accessibility

3. **errorHandling.ts**:
   - Component error creation and logging
   - Development vs production error handling

### Build & Development

- **Build**: Uses `svelte-package` to create distributable package
- **Type Checking**: `svelte-check` for type validation
- **Linting**: ESLint + Prettier
- **Documentation**: TypeDoc for API documentation
- **Output**: ESM module with TypeScript definitions

### Export Structure

The package exports:
- All components as named exports
- All TypeScript types
- Form utilities from `@rief/utils`
- Helper utilities from `helpers/`

---

## Package 2: @rief/utils

### Overview
**@rief/utils** is a shared utility library containing pure TypeScript functions used across the monorepo. It provides common utilities for DOM manipulation, form handling, string/number formatting, and more.

### Package Details
- **Name**: `@rief/utils`
- **Version**: `1.0.0`
- **Type**: Utility library (TypeScript)
- **Build Tool**: TypeScript compiler (`tsc`)
- **Dependencies**: None (pure utilities)

### Utility Categories

#### 1. Function Utilities (`src/function/`)
- **debounce**: Debounce function calls
- **throttle**: Throttle function calls
- **noop**: No-operation function placeholder

#### 2. Class Name Utilities (`src/classname/`)
- **classNames / cn**: Conditional class name combination
  - Supports strings, arrays, objects
  - Filters out falsy values
  - Essential for dynamic styling

#### 3. Type Guards (`src/type-guards/`)
- **isFunction**: Check if value is a function
- **isObject**: Check if value is an object

#### 4. Object Utilities (`src/object/`)
- **omit**: Remove properties from object
- **pick**: Select specific properties from object
- **merge**: Deep merge objects
- **isEmpty**: Check if object/array is empty

#### 5. String Utilities (`src/string/`)
- **toSnakeCase**: Convert string to snake_case
- **fromSnakeCase**: Convert snake_case to normal
- **parseIfJSON**: Parse string if it's valid JSON
- **stripAnyBraces**: Remove brackets/braces from string
- **objStringify**: Stringify object with options

#### 6. Number Utilities (`src/number/`)
- **formatNumber**: Format number with locale support
- **formatNumberCompact**: Compact number formatting (1K, 1M, etc.)
- **convertNumber**: Convert between number formats

#### 7. DOM Utilities (`src/dom/`)
- **portal**: Portal elements to different DOM locations
- **clickOutside**: Detect clicks outside element
- **intersect**: Intersection Observer utilities
- **copyToClipboard**: Copy text to clipboard
- **sanitizeHtml**: Sanitize HTML content

#### 8. Form Utilities (`src/form/`)
- **getFormData**: Get FormData from form element
- **getFormDataAsObject**: Convert FormData to plain object
- **validateRequiredFields**: Validate required form fields
- **getFormErrors**: Extract validation errors from form

#### 9. Async Utilities (`src/async/`)
- **sleep**: Delay execution (promise-based)

#### 10. ID Utilities (`src/id/`)
- **uniqueId**: Generate unique IDs

#### 11. JSON Utilities (`src/json/`)
- **isJson**: Check if string is valid JSON

#### 12. SSR Utilities (`src/ssr/`)
- **isBrowser**: Check if code is running in browser
- **safeUniqueId**: Generate unique ID safe for SSR

#### 13. Input Utilities (`src/input/`)
- **applyMask**: Apply input mask pattern
- **removeMask**: Remove mask from input
- **getPatternLength**: Get length of mask pattern
- **getPatternSeparators**: Extract separators from pattern
- **sanitizeNumericInput**: Clean numeric input
- **isValidNumericKey**: Validate numeric keypress
- **shouldPreventInput**: Determine if input should be prevented
- **parseAndFormatNumber**: Parse and format numbers
- **formatNumberLocale**: Format number with locale

#### 14. Table Utilities (`src/table/`)
- **isDateValue**: Check if value is a date
- **compareValues**: Compare values for sorting
- **normalizeTableColumn**: Normalize table column configuration

### Design Principles

1. **Pure Functions**: Most utilities are pure (no side effects)
2. **Type Safety**: Full TypeScript support with proper types
3. **Tree-Shakable**: ESM exports allow tree-shaking
4. **Framework Agnostic**: No framework dependencies
5. **SSR Safe**: Utilities work in both browser and server environments

### Usage in @rief/kit

The `@rief/kit` package imports and re-exports several utilities:
- Form utilities (`getFormData`, `getFormDataAsObject`, `validateRequiredFields`, `getFormErrors`)
- This allows consumers to use both component library and utilities from a single import

---

## Monorepo Management

### Turborepo Configuration

The `turbo.json` file defines the build pipeline:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // Build dependencies first
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Key Features:**
- **Dependency Graph**: Automatically builds packages in correct order
- **Caching**: Caches build outputs for faster rebuilds
- **Parallel Execution**: Runs independent tasks in parallel
- **Task Dependencies**: `^build` means "build all dependencies first"

### pnpm Workspaces

The `pnpm-workspace.yaml` defines workspace structure:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**Benefits:**
- Shared dependencies at root level
- Workspace protocol for internal dependencies (`workspace:*`)
- Single `node_modules` with symlinks
- Efficient dependency resolution

### Build Pipeline

1. **@rief/utils** builds first (no dependencies)
2. **@rief/kit** builds second (depends on @rief/utils)
3. **Apps** build last (depend on packages)

---

## Development Workflow

### Scripts (Root Level)

- `pnpm dev`: Run all packages in development mode
- `pnpm build`: Build all packages
- `pnpm lint`: Lint all packages
- `pnpm check`: Type check all packages
- `pnpm format`: Format code with Prettier
- `pnpm docs`: Generate documentation
- `pnpm clean`: Clean build artifacts

### Package-Specific Scripts

**@rief/kit:**
- `build`: Build package with svelte-package
- `check`: Type check with svelte-check
- `docs`: Generate TypeDoc documentation
- `lint`: Lint with ESLint and Prettier

**@rief/utils:**
- `build`: Compile TypeScript
- `dev`: Watch mode compilation

---

## Type System Architecture

### Type Organization

1. **Base Types** (`types.ts`):
   - Common interfaces used across components
   - `BaseStyling`, `BaseBehavior`, `BaseAccessibility`
   - Shared enums like `ComponentSize`

2. **Component Types**:
   - Each component has its own type file or section
   - Props interfaces (e.g., `ButtonProps`)
   - Styling interfaces (e.g., `ButtonStyling`)
   - Behavior interfaces (e.g., `ButtonBehavior`)
   - Event types (e.g., `ButtonEventDetail`)

3. **Utility Types**:
   - Reusable type patterns
   - Generic types for common patterns

### Type Safety Features

- **Strict TypeScript**: Full type checking
- **Prop Validation**: Runtime validation with TypeScript types
- **Event Typing**: Typed custom events with detailed payloads
- **Generic Types**: Flexible generic types for reusable patterns

---

## Documentation System

### Component Documentation Structure

Each component has:
1. **README.md**: 
   - Component overview and features
   - API reference (props, events, slots)
   - Usage examples
   - Accessibility notes

2. **STYLING.md**:
   - Theming guide
   - CSS custom properties reference
   - Styling examples
   - Variant documentation

### Documentation Templates

The `templates/` directory contains:
- `README.template.md`: Template for component README
- `STYLING.template.md`: Template for styling documentation
- `Component.template.svelte`: Component structure template
- `types.template.ts`: TypeScript types template

---

## Key Design Patterns

### 1. Composition Over Configuration
Components are designed to be composed together rather than configured with many options.

### 2. Props Grouping
Related props are grouped into objects (`styling`, `behavior`, `validation`) for better organization.

### 3. Event-Driven Architecture
Components use Svelte's custom events with typed payloads for communication.

### 4. Slot-Based Content
Components use Svelte slots for flexible content insertion.

### 5. CSS Custom Properties
Extensive use of CSS variables for theming without requiring JavaScript.

### 6. Progressive Enhancement
Components work with basic HTML and enhance with JavaScript.

---

## Dependencies & Peer Dependencies

### @rief/kit Dependencies
- **@rief/utils**: Internal utility library
- **lucide-svelte**: Icon library

### @rief/kit Peer Dependencies
- **svelte**: Required by consumers (^4.0.0 || ^5.0.0)

### @rief/utils Dependencies
- None (pure TypeScript utilities)

---

## Build Output

### @rief/kit
- **dist/index.js**: Main ESM bundle
- **dist/index.d.ts**: TypeScript definitions
- **dist/default-style.css**: Default stylesheet

### @rief/utils
- **dist/index.js**: Main ESM bundle
- **dist/index.d.ts**: TypeScript definitions
- Individual utility files in dist

---

## Usage Example

```svelte
<script>
  import { Button, InputText } from '@rief/kit';
  import { getFormDataAsObject } from '@rief/kit'; // Re-exported from utils
  
  let email = '';
  let error = false;
  
  function handleSubmit() {
    const form = document.querySelector('form');
    const data = getFormDataAsObject(form);
    console.log(data);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <InputText
    bind:value={email}
    label="Email"
    name="email"
    styling={{ variant: 'outlined', size: 'md' }}
    validation={{
      required: true,
      isError: error,
      errorMessage: error ? 'Invalid email' : undefined
    }}
  />
  
  <Button
    label="Submit"
    styling={{ variant: 'filled', size: 'lg' }}
    behavior={{ loading: false }}
    type="submit"
  />
</form>
```

---

## Summary

This monorepo provides:

1. **@rief/kit**: A comprehensive, type-safe Svelte component library with:
   - 20+ reusable components
   - Consistent API design
   - Full TypeScript support
   - Accessibility features
   - Extensive theming capabilities

2. **@rief/utils**: A utility library with:
   - 50+ utility functions
   - Framework-agnostic design
   - Full TypeScript support
   - Tree-shakable exports

3. **Monorepo Infrastructure**:
   - Efficient build system (Turborepo)
   - Workspace management (pnpm)
   - Shared code and types
   - Optimized development workflow

The architecture emphasizes **developer experience**, **type safety**, **accessibility**, and **maintainability**, making it suitable for building large-scale Svelte applications.
