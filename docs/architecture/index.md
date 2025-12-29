# Architecture Shards Index

This directory contains the sharded architecture documentation for easy reference during development.

## Architecture Documents

| Document | Purpose |
|----------|---------|
| [tech-stack.md](tech-stack.md) | Technology choices and versions |
| [source-tree.md](source-tree.md) | Project structure and directories |
| [coding-standards.md](coding-standards.md) | Naming conventions, patterns, rules |
| [state-management.md](state-management.md) | Zustand stores and state patterns |
| [game-loop.md](game-loop.md) | Game loop and collision detection |
| [theme-system.md](theme-system.md) | Theme configuration and switching |
| [audio-system.md](audio-system.md) | Sound effects and music management |
| [testing-patterns.md](testing-patterns.md) | Testing templates and best practices |

## Quick Reference

### Setup Commands

```bash
# Create new project
npm create vite@latest snake-game -- --template react-ts
cd snake-game

# Install dependencies
npm install react-router-dom zustand howler framer-motion lucide-react clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer @types/howler vitest @testing-library/react

# Initialize Tailwind
npx tailwindcss init -p
```

### Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run tests
npm run lint         # Lint code
```

### Key Files

| File | Purpose |
|------|---------|
| `src/stores/gameStore.ts` | Core game state |
| `src/hooks/useGameLoop.ts` | Game loop hook |
| `src/game/collision.ts` | Collision detection |
| `src/themes/index.ts` | Theme registry |
| `src/utils/audio.ts` | Audio manager |

## Links

- [Main Architecture Doc](../architecture.md) - Full architecture document
- [PRD](../prd.md) - Requirements document
- [Front-End Spec](../front-end-spec.md) - UI/UX specification
