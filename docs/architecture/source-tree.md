# Source Tree

```plaintext
snake-game/
├── public/
│   ├── favicon.ico
│   ├── og-image.png                # Social media preview image
│   └── audio/                      # Audio assets
│       ├── eat.mp3
│       ├── game-over.mp3
│       ├── click.mp3
│       ├── high-score.mp3
│       └── background-music.mp3
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Root component with routing
│   ├── index.css                   # Global styles & Tailwind imports
│   ├── vite-env.d.ts               # Vite type declarations
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Overlay.tsx
│   │   │   └── index.ts            # Barrel export
│   │   ├── game/                   # Game-specific components
│   │   │   ├── GameBoard.tsx
│   │   │   ├── Snake.tsx
│   │   │   ├── Food.tsx
│   │   │   ├── ScoreDisplay.tsx
│   │   │   ├── DPadControls.tsx
│   │   │   └── index.ts
│   │   └── layout/                 # Layout components
│   │       ├── GameLayout.tsx
│   │       ├── MenuLayout.tsx
│   │       └── index.ts
│   │
│   ├── screens/                    # Full page/screen components
│   │   ├── MainMenu.tsx
│   │   ├── GameScreen.tsx
│   │   ├── LeaderboardScreen.tsx
│   │   ├── ThemeSelector.tsx
│   │   └── index.ts
│   │
│   ├── stores/                     # Zustand state stores
│   │   ├── gameStore.ts            # Game state (snake, food, score, status)
│   │   ├── settingsStore.ts        # Settings (audio, theme, mode)
│   │   ├── leaderboardStore.ts     # High scores
│   │   └── index.ts
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useGameLoop.ts          # Game loop with requestAnimationFrame
│   │   ├── useKeyboardControls.ts  # Keyboard input handling
│   │   ├── useTouchControls.ts     # Touch/swipe handling
│   │   ├── useAudio.ts             # Audio playback hook
│   │   ├── useLocalStorage.ts      # LocalStorage wrapper
│   │   └── index.ts
│   │
│   ├── game/                       # Core game logic (non-React)
│   │   ├── engine.ts               # Game loop controller
│   │   ├── snake.ts                # Snake movement & growth logic
│   │   ├── collision.ts            # Collision detection
│   │   ├── food.ts                 # Food spawning logic
│   │   ├── speed.ts                # Speed calculation per mode
│   │   └── types.ts                # Game-specific types
│   │
│   ├── themes/                     # Theme configurations
│   │   ├── types.ts                # Theme type definitions
│   │   ├── jungle.ts
│   │   ├── ocean.ts
│   │   ├── space.ts
│   │   ├── candy.ts
│   │   ├── neon.ts
│   │   ├── desert.ts
│   │   ├── winter.ts
│   │   └── index.ts                # Theme registry
│   │
│   ├── utils/                      # Utility functions
│   │   ├── cn.ts                   # Tailwind class merger (clsx + twMerge)
│   │   ├── storage.ts              # LocalStorage helpers
│   │   ├── audio.ts                # Audio manager singleton
│   │   └── constants.ts            # Game constants
│   │
│   ├── types/                      # Global TypeScript types
│   │   ├── game.ts                 # Game entity types
│   │   ├── theme.ts                # Theme types
│   │   └── index.ts
│   │
│   └── assets/                     # Static assets imported in code
│       └── fonts/                  # Custom fonts (if not using CDN)
│
├── tests/                          # Test files
│   ├── setup.ts                    # Test setup
│   ├── components/                 # Component tests
│   ├── game/                       # Game logic tests
│   └── stores/                     # Store tests
│
├── .eslintrc.cjs                   # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript config for Node
├── vite.config.ts                  # Vite configuration
├── index.html                      # HTML entry point
├── package.json
└── README.md
```

## Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `public/` | Static assets served as-is (audio files, favicon) |
| `src/components/` | Reusable UI components organized by type |
| `src/screens/` | Full page components (routes) |
| `src/stores/` | Zustand state management stores |
| `src/hooks/` | Custom React hooks |
| `src/game/` | Pure game logic functions (non-React) |
| `src/themes/` | Theme configurations and utilities |
| `src/utils/` | Helper functions and constants |
| `src/types/` | TypeScript type definitions |
| `tests/` | Test files mirroring src structure |
