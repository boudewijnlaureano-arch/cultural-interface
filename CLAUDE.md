# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive React application demonstrating cultural design differences between American and Chinese social media interfaces. The app displays two synchronized phone screens side-by-side, with hover interactions revealing cultural design explanations.

## Essential Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (includes TypeScript type checking)
npm run build

# Lint codebase
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Dual-Phone Layout Pattern

The core architecture in [App.tsx](src/App.tsx) implements a synchronized dual-phone interface:

- **Left phone**: American-style social media (sparse, linear design)
- **Right phone**: Chinese-style social media (dense, exploratory design)
- **Synchronization**: Bi-directional scroll syncing using `activeScrollerRef` to prevent infinite loops
- **Hover system**: Mouse hover on content blocks triggers side panels with cultural explanations

### State Management & Interaction

**Hover Tracking System:**
- State tracks `hoveredBlock` with `{ id, side, triggerCenterY }`
- [hoverInfo.ts](src/hoverInfo.ts) maps block IDs to cultural design explanations
- Side panels (`SideInfo` components) fade in/out based on hover state

**Scroll Synchronization:**
```typescript
// Pattern to prevent scroll loops
activeScrollerRef.current = 'left'
rightScrollRef.current.scrollTop = (scrollPercentage / 100) * maxScroll
```

**Intersection Observer:**
- Custom hook `useInfoBlocksInView` detects visible content blocks
- Used to trigger scroll-based information panels

### Component Structure

**Reusable Components:**
- `ContentCard` ([ContentCard.tsx](src/components/ContentCard.tsx)): Social media post with image, profile, description
- `NavBar` ([NavBar.tsx](src/components/NavBar.tsx)): Navigation bar with icon buttons (different per side)
- `Phone` (in App.tsx): Android phone frame wrapper with overflow handling

**Data-Only Types:**
- `HoverInfoBlock` ([HoverInfoBlock.tsx](src/components/HoverInfoBlock.tsx)): Type interface for hover panel data
- `ScrollInfoBlock` ([ScrollInfoBlock.tsx](src/components/ScrollInfoBlock.tsx)): Type interface for scroll panel data

### Asset Organization

```
public/assets/
├── Content/     # Content images (toronto.jpeg, kipepeo.jpeg, etc.)
├── icons/       # SVG navigation icons (home, play, search, user, inbox)
└── PFPs/        # Profile picture images
```

## Technical Configuration

### Path Aliases

The import alias `@/` maps to `./src/` (configured in [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json)):

```typescript
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
```

### TypeScript Strict Mode

[tsconfig.app.json](tsconfig.app.json) enables aggressive linting:
- `noUnusedLocals`: true
- `noUnusedParameters`: true
- `noFallthroughCasesInSwitch`: true
- `noUncheckedSideEffectImports`: true

Remove unused imports and variables immediately.

### Styling Approach

**Tailwind CSS 4 + shadcn/ui:**
- Component library: shadcn/ui (New York style, neutral base color)
- Utility function: `cn()` in [lib/utils.ts](src/lib/utils.ts) merges classes with tailwind-merge
- Theme variables: CSS custom properties in [index.css](src/index.css) (`--background`, `--primary`, etc.)
- Dark mode: Supported via `.dark` class

**Custom Scrollbar Styling:**
Grid areas use custom scrollbar CSS (see `.custom-scrollbar` class in App.tsx)

### Component Variants

Components use Class Variance Authority (CVA) for variant management:

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", destructive: "..." },
      size: { default: "...", sm: "..." }
    }
  }
)
```

## Development Notes

### Vite Configuration

- **React Fast Refresh**: Enabled via `@vitejs/plugin-react`
- **Tailwind Plugin**: Uses `@tailwindcss/vite` (Tailwind 4 native integration)
- **Remote Access**: Configured to allow ngrok host (`2bbeb36f1982.ngrok-free.app`)

### ESLint

Uses flat config format (ESLint 9+). See [eslint.config.js](eslint.config.js).

### Testing

No test framework is currently configured. The project has no test files or testing dependencies.

## Key Implementation Patterns

### Adding New Content Blocks

1. Add content data to the appropriate array in [App.tsx](src/App.tsx) (left or right side)
2. If hover info needed, add mapping in [hoverInfo.ts](src/hoverInfo.ts)
3. Place assets in appropriate `public/assets/` subdirectory

### Creating New UI Components

Follow shadcn/ui patterns:
1. Place in `src/components/ui/` for reusable UI primitives
2. Use CVA for variants
3. Export component with type definitions
4. Use `cn()` utility for class merging

### Modifying Navigation

Navigation icons and behavior are defined in the `NavBar` component. Each side (American/Chinese) can have different navigation items.
