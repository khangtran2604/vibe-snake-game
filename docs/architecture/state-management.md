# State Management

## Store Structure

```plaintext
src/stores/
├── gameStore.ts         # Snake position, food, score, game status
├── settingsStore.ts     # Theme, audio settings, game mode
├── leaderboardStore.ts  # High scores array
└── index.ts             # Combined exports
```

## Game Store

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
      if (opposites[direction] !== current) {
        set({ nextDirection: direction });
      }
    },

    moveSnake: () => {
      const { snake, nextDirection } = get();
      const head = snake[0];
      const newHead: Position = { ...head };

      switch (nextDirection) {
        case 'up': newHead.y -= 1; break;
        case 'down': newHead.y += 1; break;
        case 'left': newHead.x -= 1; break;
        case 'right': newHead.x += 1; break;
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

## Settings Store

```typescript
// src/stores/settingsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeId, GameMode } from '@/types';

interface SettingsState {
  theme: ThemeId;
  gameMode: GameMode;
  sfxEnabled: boolean;
  musicEnabled: boolean;
  sfxVolume: number;
  musicVolume: number;

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
    { name: 'snake-settings' }
  )
);
```

## Leaderboard Store

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
  addScore: (score: number, mode: GameMode) => boolean;
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
        return newScores.some((s) => s.score === score && s.date === newEntry.date);
      },

      clearScores: () => set({ scores: [] }),
    }),
    { name: 'snake-leaderboard' }
  )
);
```

## Type Definitions

```typescript
// src/types/game.ts
export interface Position {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

export type GameMode = 'classic' | 'speed';
```
