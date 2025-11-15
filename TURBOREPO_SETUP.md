# Turborepo Setup Guide

This project uses Turborepo to manage a monorepo containing the component library and documentation site.

## Project Structure

```
kit/
├── apps/
│   └── docs/              # SvelteKit documentation & playground site
│       ├── src/
│       │   ├── routes/
│       │   │   ├── +page.svelte      # Homepage with component showcase
│       │   │   └── playground/
│       │   │       └── +page.svelte  # Interactive playground
│       │   └── app.css
│       └── package.json
├── packages/
│   └── kit/              # Component library
│       ├── src/
│       │   ├── lib/      # Components
│       │   └── index.ts  # Main exports
│       └── package.json
├── turbo.json            # Turborepo configuration
└── package.json          # Root workspace configuration
```

## Getting Started

### 1. Install Dependencies

First, make sure you have pnpm installed:

```bash
npm install -g pnpm
# or use corepack (recommended)
corepack enable
corepack prepare pnpm@latest --activate
```

Then install dependencies:

```bash
pnpm install
```

This will install dependencies for all workspaces using pnpm workspaces.

### 2. Development

Run all packages in development mode:

```bash
pnpm run dev
```

This uses Turborepo to run the `dev` script in parallel across all packages.

The docs site will be available at `http://localhost:5173` (or the next available port).

### 3. Build

Build all packages:

```bash
pnpm run build
```

Turborepo will:
- Build packages in the correct dependency order
- Cache builds for faster subsequent runs
- Only rebuild what changed

### 4. Run Specific Package

```bash
# Build just the library
cd packages/kit && npm run build

# Run just the docs site
cd apps/docs && npm run dev
```

## Turborepo Features

### Task Pipeline

The `turbo.json` defines the task pipeline:

- **build**: Depends on dependencies being built first (`^build`)
- **dev**: Runs in watch mode (not cached)
- **lint/check**: Depends on builds completing
- **docs**: Generates documentation after builds

### Caching

Turborepo caches task outputs. If inputs haven't changed, tasks are skipped:

```bash
# First run - builds everything
pnpm run build

# Second run - uses cache (instant!)
pnpm run build
```

### Parallel Execution

Tasks that don't depend on each other run in parallel for maximum speed.

## Workspace Dependencies

The docs app depends on the kit package:

```json
{
  "dependencies": {
    "@rief/kit": "workspace:*"
  }
}
```

The `workspace:*` protocol tells pnpm to use the local package from the monorepo.

## CI/CD

The GitHub Actions workflows are configured to:

1. **CI**: Run tests, linting, and builds on every push/PR
2. **Docs Deployment**: Deploy the docs site to GitHub Pages on main branch
3. **Publish**: Publish the library to npm when a release is created

## Adding New Packages

1. Create a new directory in `packages/` or `apps/`
2. Add a `package.json` with a unique name
3. The workspace will automatically pick it up
4. Add tasks to `turbo.json` if needed

## Troubleshooting

### Clear Cache

```bash
pnpm run clean
# or
rm -rf .turbo
```

### Reset Everything

```bash
rm -rf node_modules packages/*/node_modules apps/*/node_modules .turbo
pnpm install
```

