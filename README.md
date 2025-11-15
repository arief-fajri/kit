# Kit Monorepo

A modern Svelte component library built with TypeScript, managed with Turborepo.

## Structure

This monorepo contains:

- **`packages/kit`** - The main component library
- **`apps/docs`** - Documentation and playground site

## Getting Started

### Install Dependencies

First, make sure you have pnpm installed:

```bash
npm install -g pnpm
# or
corepack enable
corepack prepare pnpm@latest --activate
```

Then install dependencies:

```bash
pnpm install
```

### Development

Run all packages in development mode:

```bash
pnpm run dev
```

Or run specific packages:

```bash
# Run docs site
pnpm --filter @kit/docs dev

# Build library
pnpm --filter @rief/kit build
```

### Build

Build all packages:

```bash
pnpm run build
```

### Linting & Formatting

```bash
# Check linting
pnpm run lint

# Format code
pnpm run format
```

### Type Checking

```bash
pnpm run check
```

## Packages

### @rief/kit

The main component library. See [packages/kit/README.md](./packages/kit/README.md) for details.

### @kit/docs

Documentation and playground site. Access it at `http://localhost:5173` when running `npm run dev`.

## Publishing

The library is published to npm via GitHub Actions. To publish:

1. Update version in `packages/kit/package.json`
2. Create a GitHub release or use the workflow dispatch
3. The CI/CD pipeline will automatically publish to npm

## License

MIT
