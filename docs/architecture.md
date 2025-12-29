# Snake Game - Frontend Architecture Document

## Template and Framework Selection

### Starter Template Decision

**Selected Starter:** Vite + React + TypeScript template

**Rationale:**
- Vite provides extremely fast development server with HMR (Hot Module Replacement)
- Native TypeScript support out of the box
- Optimized production builds with Rollup
- Minimal configuration required
- Perfect for single-page game applications
- No server-side rendering needed (pure client-side game)

**Command to Initialize:**
```bash
npm create vite@latest snake-game -- --template react-ts
```

**Constraints from Starter:**
- ESM modules only (no CommonJS)
- React 18+ with new JSX transform
- TypeScript strict mode recommended
- Vite-specific environment variable prefix (`VITE_`)

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2024-12-28 | 1.0 | Initial frontend architecture | Architect Agent |

---

## Frontend Tech Stack

### Technology Stack Table

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

---

## Project Structure

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

---

## Component Standards

### Component Template

```typescript
// src/components/ui/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          // Base styles
          'font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          // Variant styles
          {
            'bg-primary text-white hover:bg-primary-dark focus:ring-primary':
              variant === 'primary',
            'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary':
              variant === 'secondary',
            'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary':
              variant === 'tertiary',
          },
          // Size styles
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-lg': size === 'md',
            'px-8 py-4 text-xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `GameBoard.tsx`, `ScoreDisplay.tsx` |
| Hooks | camelCase with `use` prefix | `useGameLoop.ts`, `useAudio.ts` |
| Stores | camelCase with `Store` suffix | `gameStore.ts`, `settingsStore.ts` |
| Utilities | camelCase | `cn.ts`, `storage.ts` |
| Types/Interfaces | PascalCase | `GameState`, `Position`, `Theme` |
| Constants | SCREAMING_SNAKE_CASE | `GRID_SIZE`, `INITIAL_SPEED` |
| CSS classes | kebab-case (Tailwind) | `bg-primary`, `text-lg` |
| Event handlers | camelCase with `handle` prefix | `handleKeyDown`, `handlePause` |
| Boolean props | camelCase with `is`/`has` prefix | `isPlaying`, `hasSoundEnabled` |

---

## State Management

### Store Structure

```plaintext
src/stores/
├── gameStore.ts         # Snake position, food, score, game status
├── settingsStore.ts     # Theme, audio settings, game mode
├── leaderboardStore.ts  # High scores array
└── index.ts             # Combined exports
```

### State Management Template

```typescript
// src/stores/gameStore.ts
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Position, Direction, GameStatus } from '@/types/game';
import { GRID_SIZE, INITIAL_SNAKE_LENGTH } from '@/utils/constants';

interface GameState {
  // State
  status: GameStatus;
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  currentSpeed: number;

  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  setDirection: (direction: Direction) => void;
  moveSnake: () => void;
  eatFood: () => void;
  spawnFood: () => void;
  incrementScore: (points: number) => void;
  updateSpeed: (newSpeed: number) => void;
}

const getInitialSnake = (): Position[] => {
  const centerX = Math.floor(GRID_SIZE / 2);
  const centerY = Math.floor(GRID_SIZE / 2);
  return Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
    x: centerX - i,
    y: centerY,
  }));
};

const getRandomFoodPosition = (snake: Position[]): Position => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((segment) => segment.x === position.x && segment.y === position.y));
  return position;
};

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    status: 'idle',
    snake: getInitialSnake(),
    food: { x: 15, y: 10 },
    direction: 'right',
    nextDirection: 'right',
    score: 0,
    currentSpeed: 150,

    // Actions
    startGame: () => {
      const snake = getInitialSnake();
      set({
        status: 'playing',
        snake,
        food: getRandomFoodPosition(snake),
        direction: 'right',
        nextDirection: 'right',
        score: 0,
        currentSpeed: 150,
      });
    },

    pauseGame: () => set({ status: 'paused' }),
    
    resumeGame: () => set({ status: 'playing' }),
    
    endGame: () => set({ status: 'gameOver' }),
    
    resetGame: () => {
      const snake = getInitialSnake();
      set({
        status: 'idle',
        snake,
        food: getRandomFoodPosition(snake),
        direction: 'right',
        nextDirection: 'right',
        score: 0,
        currentSpeed: 150,
      });
    },

    setDirection: (direction) => {
      const current = get().direction;
      const opposites: Record<Direction, Direction> = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
      };
      // Prevent 180-degree turns
      if (opposites[direction] !== current) {
        set({ nextDirection: direction });
      }
    },

    moveSnake: () => {
      const { snake, nextDirection } = get();
      const head = snake[0];
      const newHead: Position = { ...head };

      switch (nextDirection) {
        case 'up':
          newHead.y -= 1;
          break;
        case 'down':
          newHead.y += 1;
          break;
        case 'left':
          newHead.x -= 1;
          break;
        case 'right':
          newHead.x += 1;
          break;
      }

      const newSnake = [newHead, ...snake.slice(0, -1)];
      set({ snake: newSnake, direction: nextDirection });
    },

    eatFood: () => {
      const { snake } = get();
      const tail = snake[snake.length - 1];
      set({ snake: [...snake, { ...tail }] });
    },

    spawnFood: () => {
      const { snake } = get();
      set({ food: getRandomFoodPosition(snake) });
    },

    incrementScore: (points) => set((state) => ({ score: state.score + points })),
    
    updateSpeed: (newSpeed) => set({ currentSpeed: newSpeed }),
  }))
);
```

```typescript
// src/stores/settingsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeId, GameMode } from '@/types';

interface SettingsState {
  // State
  theme: ThemeId;
  gameMode: GameMode;
  sfxEnabled: boolean;
  musicEnabled: boolean;
  sfxVolume: number;
  musicVolume: number;

  // Actions
  setTheme: (theme: ThemeId) => void;
  setGameMode: (mode: GameMode) => void;
  toggleSfx: () => void;
  toggleMusic: () => void;
  setSfxVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'jungle',
      gameMode: 'classic',
      sfxEnabled: true,
      musicEnabled: true,
      sfxVolume: 0.7,
      musicVolume: 0.5,

      setTheme: (theme) => set({ theme }),
      setGameMode: (mode) => set({ gameMode: mode }),
      toggleSfx: () => set((state) => ({ sfxEnabled: !state.sfxEnabled })),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      setSfxVolume: (volume) => set({ sfxVolume: volume }),
      setMusicVolume: (volume) => set({ musicVolume: volume }),
    }),
    {
      name: 'snake-settings',
    }
  )
);
```

```typescript
// src/stores/leaderboardStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameMode } from '@/types';

interface ScoreEntry {
  score: number;
  mode: GameMode;
  date: string;
}

interface LeaderboardState {
  scores: ScoreEntry[];
  addScore: (score: number, mode: GameMode) => boolean; // Returns true if high score
  clearScores: () => void;
}

const MAX_SCORES = 10;

export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      scores: [],

      addScore: (score, mode) => {
        const { scores } = get();
        const newEntry: ScoreEntry = {
          score,
          mode,
          date: new Date().toISOString().split('T')[0],
        };

        const newScores = [...scores, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, MAX_SCORES);

        set({ scores: newScores });

        // Return true if this score made it to the leaderboard
        return newScores.some(
          (s) => s.score === score && s.date === newEntry.date
        );
      },

      clearScores: () => set({ scores: [] }),
    }),
    {
      name: 'snake-leaderboard',
    }
  )
);
```

---

## API Integration

### Service Template

This game is a client-only application with no backend API. All data is stored in localStorage. However, here's the pattern for localStorage "services":

```typescript
// src/utils/storage.ts
const STORAGE_KEYS = {
  SETTINGS: 'snake-settings',
  LEADERBOARD: 'snake-leaderboard',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const storage = {
  get<T>(key: StorageKey): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  },

  set<T>(key: StorageKey, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  },

  remove(key: StorageKey): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },

  clear(): void {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
```

### Audio Manager

```typescript
// src/utils/audio.ts
import { Howl, Howler } from 'howler';

type SoundName = 'eat' | 'gameOver' | 'click' | 'highScore';

class AudioManager {
  private sounds: Map<SoundName, Howl> = new Map();
  private music: Howl | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;

    // Load sound effects
    this.sounds.set('eat', new Howl({ src: ['/audio/eat.mp3'], volume: 0.7 }));
    this.sounds.set('gameOver', new Howl({ src: ['/audio/game-over.mp3'], volume: 0.6 }));
    this.sounds.set('click', new Howl({ src: ['/audio/click.mp3'], volume: 0.5 }));
    this.sounds.set('highScore', new Howl({ src: ['/audio/high-score.mp3'], volume: 0.8 }));

    // Load background music
    this.music = new Howl({
      src: ['/audio/background-music.mp3'],
      volume: 0.5,
      loop: true,
    });

    this.initialized = true;
  }

  playSfx(name: SoundName) {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.play();
    }
  }

  playMusic() {
    if (this.music && !this.music.playing()) {
      this.music.play();
    }
  }

  pauseMusic() {
    if (this.music) {
      this.music.pause();
    }
  }

  stopMusic() {
    if (this.music) {
      this.music.stop();
    }
  }

  setSfxVolume(volume: number) {
    this.sounds.forEach((sound) => sound.volume(volume));
  }

  setMusicVolume(volume: number) {
    if (this.music) {
      this.music.volume(volume);
    }
  }

  mute(muted: boolean) {
    Howler.mute(muted);
  }
}

export const audioManager = new AudioManager();
```

---

## Routing

### Route Configuration

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainMenu } from '@/screens/MainMenu';
import { GameScreen } from '@/screens/GameScreen';
import { LeaderboardScreen } from '@/screens/LeaderboardScreen';
import { ThemeSelector } from '@/screens/ThemeSelector';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/play" element={<GameScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/themes" element={<ThemeSelector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

**Route Summary:**

| Route | Screen | Purpose |
|-------|--------|---------|
| `/` | MainMenu | Home screen with play button and navigation |
| `/play` | GameScreen | Active gameplay |
| `/leaderboard` | LeaderboardScreen | View high scores |
| `/themes` | ThemeSelector | Choose visual theme |

---

## Styling Guidelines

### Styling Approach

**Tailwind CSS with Custom Theme Configuration**

- Use Tailwind utility classes for all styling
- Custom colors defined in `tailwind.config.js` mapped to CSS variables
- CSS variables updated dynamically when theme changes
- Use `cn()` utility (clsx + tailwind-merge) for conditional classes

### Global Theme Variables

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Jungle Theme (Default) */
    --color-primary: 76 175 80;      /* #4CAF50 */
    --color-primary-dark: 56 142 60; /* #388E3C */
    --color-secondary: 139 195 74;   /* #8BC34A */
    --color-accent: 255 235 59;      /* #FFEB3B */
    --color-background: 27 94 32;    /* #1B5E20 */
    --color-surface: 46 125 50;      /* #2E7D32 */
    --color-text: 255 255 255;       /* #FFFFFF */
    --color-text-secondary: 200 230 201; /* #C8E6C9 */
    --color-snake: 76 175 80;        /* #4CAF50 */
    --color-snake-head: 56 142 60;   /* #388E3C */
    --color-food: 244 67 54;         /* #F44336 */
    --color-board: 27 94 32;         /* #1B5E20 */
    --color-board-cell: 46 125 50;   /* #2E7D32 */

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;

    /* Animation */
    --duration-fast: 100ms;
    --duration-normal: 200ms;
    --duration-slow: 300ms;
    --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer components {
  .game-board {
    @apply grid gap-px bg-board-cell rounded-lg overflow-hidden;
  }

  .snake-segment {
    @apply bg-snake rounded-sm;
  }

  .snake-head {
    @apply bg-snake-head rounded-sm;
  }

  .food-item {
    @apply bg-food rounded-full animate-pulse;
  }
}
```

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
        },
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        },
        snake: {
          DEFAULT: 'rgb(var(--color-snake) / <alpha-value>)',
          head: 'rgb(var(--color-snake-head) / <alpha-value>)',
        },
        food: 'rgb(var(--color-food) / <alpha-value>)',
        board: {
          DEFAULT: 'rgb(var(--color-board) / <alpha-value>)',
          cell: 'rgb(var(--color-board-cell) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-small': 'bounce-small 0.3s ease-out',
        'pop': 'pop 0.2s ease-out',
      },
      keyframes: {
        'bounce-small': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## Testing Requirements

### Component Test Template

```typescript
// tests/components/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies secondary variant styles when specified', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

```typescript
// tests/game/collision.test.ts
import { describe, it, expect } from 'vitest';
import { checkWallCollision, checkSelfCollision } from '@/game/collision';
import type { Position } from '@/types/game';

describe('Collision Detection', () => {
  describe('checkWallCollision', () => {
    it('returns true when snake hits left wall', () => {
      const head: Position = { x: -1, y: 10 };
      expect(checkWallCollision(head, 20)).toBe(true);
    });

    it('returns true when snake hits right wall', () => {
      const head: Position = { x: 20, y: 10 };
      expect(checkWallCollision(head, 20)).toBe(true);
    });

    it('returns false when snake is within bounds', () => {
      const head: Position = { x: 10, y: 10 };
      expect(checkWallCollision(head, 20)).toBe(false);
    });
  });

  describe('checkSelfCollision', () => {
    it('returns true when head collides with body', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 5 }, // collision with head
      ];
      expect(checkSelfCollision(snake)).toBe(true);
    });

    it('returns false when no self collision', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
      ];
      expect(checkSelfCollision(snake)).toBe(false);
    });
  });
});
```

### Testing Best Practices

1. **Unit Tests**: Test individual components and game logic functions in isolation
2. **Integration Tests**: Test component interactions (e.g., game flow from start to game over)
3. **E2E Tests**: Test critical user flows using Playwright or Cypress (optional for MVP)
4. **Coverage Goals**: Aim for 80% code coverage on game logic, 60% on components
5. **Test Structure**: Follow Arrange-Act-Assert pattern
6. **Mock External Dependencies**: Mock audio, localStorage, and timers in tests

---

## Environment Configuration

```bash
# .env.example
# No required environment variables for this static game

# Optional: Analytics (future)
# VITE_ANALYTICS_ID=UA-XXXXX-X

# Optional: Feature flags (future)
# VITE_ENABLE_SOUND=true
# VITE_ENABLE_MUSIC=true
```

**Note:** This game requires no environment variables. All configuration is handled through localStorage and in-code constants.

---

## Frontend Developer Standards

### Critical Coding Rules

1. **Never mutate state directly** - Always use Zustand actions or React setState
2. **Keep game logic separate from React** - Core game functions in `/game` should be pure functions
3. **Use TypeScript strictly** - No `any` types, define interfaces for all data structures
4. **Handle all edge cases** - Check bounds, null values, empty arrays
5. **Optimize game loop** - Avoid creating new objects/arrays in the render loop
6. **Respect reduced motion** - Check `prefers-reduced-motion` for animations
7. **Test game logic thoroughly** - Collision detection, scoring, and speed calculations must be tested
8. **Use semantic HTML** - Proper button elements, headings hierarchy
9. **Ensure keyboard accessibility** - All actions available via keyboard
10. **Keep components small** - Max 150 lines per component, extract logic to hooks

### Quick Reference

**Common Commands:**
```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run with coverage report

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix auto-fixable issues
npm run format       # Run Prettier
```

**Key Import Patterns:**
```typescript
// Path aliases (configured in tsconfig.json and vite.config.ts)
import { Button } from '@/components/ui';
import { useGameStore } from '@/stores';
import { useGameLoop } from '@/hooks';
import type { Position, Direction } from '@/types';
import { GRID_SIZE } from '@/utils/constants';
```

**File Naming:**
- Components: `PascalCase.tsx` (e.g., `GameBoard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useGameLoop.ts`)
- Utils/Services: `camelCase.ts` (e.g., `audio.ts`)
- Types: `camelCase.ts` (e.g., `game.ts`)
- Tests: `ComponentName.test.tsx` or `module.test.ts`

**Constants File:**
```typescript
// src/utils/constants.ts
export const GRID_SIZE = 20;
export const INITIAL_SNAKE_LENGTH = 3;
export const INITIAL_SPEED = 150; // ms per tick
export const MIN_SPEED = 50; // fastest possible
export const POINTS_PER_FOOD = 10;
export const SPEED_INCREMENT = 5; // ms faster per threshold
export const FOOD_PER_SPEED_INCREASE = 3; // Classic mode
export const SPEED_MODE_INITIAL = 100;
export const SPEED_MODE_INCREMENT = 8;
export const SPEED_MODE_FOOD_THRESHOLD = 2;
```

---

## Game Loop Architecture

### Core Game Loop Hook

```typescript
// src/hooks/useGameLoop.ts
import { useRef, useEffect, useCallback } from 'react';
import { useGameStore } from '@/stores';
import { checkWallCollision, checkSelfCollision, checkFoodCollision } from '@/game/collision';
import { calculateSpeed } from '@/game/speed';
import { audioManager } from '@/utils/audio';
import { useSettingsStore } from '@/stores';
import { GRID_SIZE, POINTS_PER_FOOD } from '@/utils/constants';

export function useGameLoop() {
  const lastUpdateRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  const {
    status,
    snake,
    food,
    currentSpeed,
    moveSnake,
    eatFood,
    spawnFood,
    incrementScore,
    updateSpeed,
    endGame,
  } = useGameStore();

  const { gameMode, sfxEnabled } = useSettingsStore();

  const gameLoop = useCallback(
    (timestamp: number) => {
      if (status !== 'playing') return;

      const elapsed = timestamp - lastUpdateRef.current;

      if (elapsed >= currentSpeed) {
        lastUpdateRef.current = timestamp;

        // Move snake
        moveSnake();

        // Get updated snake position
        const currentSnake = useGameStore.getState().snake;
        const head = currentSnake[0];

        // Check wall collision
        if (checkWallCollision(head, GRID_SIZE)) {
          endGame();
          if (sfxEnabled) audioManager.playSfx('gameOver');
          return;
        }

        // Check self collision
        if (checkSelfCollision(currentSnake)) {
          endGame();
          if (sfxEnabled) audioManager.playSfx('gameOver');
          return;
        }

        // Check food collision
        if (checkFoodCollision(head, food)) {
          eatFood();
          spawnFood();
          incrementScore(POINTS_PER_FOOD);
          if (sfxEnabled) audioManager.playSfx('eat');

          // Calculate new speed
          const newSnakeLength = currentSnake.length + 1;
          const newSpeed = calculateSpeed(gameMode, newSnakeLength);
          updateSpeed(newSpeed);
        }
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    },
    [status, food, currentSpeed, gameMode, sfxEnabled]
  );

  useEffect(() => {
    if (status === 'playing') {
      lastUpdateRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status, gameLoop]);
}
```

### Theme System Implementation

```typescript
// src/themes/types.ts
export interface Theme {
  id: ThemeId;
  name: string;
  emoji: string;
  colors: ThemeColors;
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  snake: string;
  snakeHead: string;
  food: string;
  board: string;
  boardCell: string;
}

export type ThemeId = 'jungle' | 'ocean' | 'space' | 'candy' | 'neon' | 'desert' | 'winter';
```

```typescript
// src/themes/index.ts
import { jungleTheme } from './jungle';
import { oceanTheme } from './ocean';
import { spaceTheme } from './space';
import { candyTheme } from './candy';
import { neonTheme } from './neon';
import { desertTheme } from './desert';
import { winterTheme } from './winter';
import type { Theme, ThemeId } from './types';

export const themes: Record<ThemeId, Theme> = {
  jungle: jungleTheme,
  ocean: oceanTheme,
  space: spaceTheme,
  candy: candyTheme,
  neon: neonTheme,
  desert: desertTheme,
  winter: winterTheme,
};

export function applyTheme(themeId: ThemeId) {
  const theme = themes[themeId];
  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variable names
    const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    // Convert hex to RGB values for Tailwind alpha support
    const rgb = hexToRgb(value);
    root.style.setProperty(cssVar, rgb);
  });
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}
```

---

**Workflow Status:** Stage 4 of 6 | **Next:** PO validates all artifacts
