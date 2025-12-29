# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Framework | React | 18.2+ | UI library | Industry standard, excellent ecosystem, hooks-based architecture |
| Language | TypeScript | 5.3+ | Type safety | Catch errors at compile time, better IDE support, self-documenting code |
| Build Tool | Vite | 5.0+ | Development & bundling | Fastest dev server, optimized builds, native ESM |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS | Rapid development, consistent spacing/colors, small production bundle |
| State Management | Zustand | 4.4+ | Global state | Minimal boilerplate, works outside React lifecycle (game loop), TypeScript friendly |
| Routing | React Router | 6.20+ | Client-side routing | Standard React routing, simple API for our few screens |
| Audio | Howler.js | 2.2+ | Sound management | Cross-browser audio, sprite support, volume control, reliable playback |
| Animation | Framer Motion | 10.16+ | UI animations | Declarative animations, gesture support, exit animations |
| Testing | Vitest | 1.0+ | Unit/integration tests | Vite-native, Jest-compatible API, fast execution |
| Testing Library | React Testing Library | 14.1+ | Component testing | Best practices for testing React components |
| Linting | ESLint | 8.55+ | Code quality | Catch errors, enforce consistency |
| Formatting | Prettier | 3.1+ | Code formatting | Consistent code style across team |
| Icons | Lucide React | 0.294+ | Icon library | Tree-shakeable, consistent style, TypeScript support |

## Starter Template

**Selected Starter:** Vite + React + TypeScript template

**Command to Initialize:**
```bash
npm create vite@latest snake-game -- --template react-ts
```

**Constraints from Starter:**
- ESM modules only (no CommonJS)
- React 18+ with new JSX transform
- TypeScript strict mode recommended
- Vite-specific environment variable prefix (`VITE_`)

## Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.0",
    "howler": "^2.2.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/howler": "^2.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0"
  }
}
```
