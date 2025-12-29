import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Position, Direction, GameStatus } from '@/types';
import {
  GRID_SIZE,
  INITIAL_SNAKE_LENGTH,
  INITIAL_SPEED,
  SPEED_MODE_INITIAL,
  POINTS_PER_FOOD,
} from '@/utils/constants';
import { moveSnake, getNextHeadPosition, isOppositeDirection } from '@/game/snake';
import { spawnFood } from '@/game/food';
import { calculateSpeed } from '@/game/speed';
import { checkFoodCollision, checkWallCollision, checkSelfCollision } from '@/game/collision';
import { useSettingsStore } from './settingsStore';
import { useLeaderboardStore } from './leaderboardStore';

export type GameMode = 'classic' | 'speed';

/**
 * Creates the initial snake position in the center of the board.
 * Snake faces right, so segments extend to the left of the head.
 */
function createInitialSnake(): Position[] {
  const centerX = Math.floor(GRID_SIZE / 2);
  const centerY = Math.floor(GRID_SIZE / 2);

  return Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, index) => ({
    x: centerX - index,
    y: centerY,
  }));
}

/**
 * Creates initial food position, avoiding the snake.
 */
function createInitialFood(snake: Position[]): Position {
  return spawnFood(snake);
}

interface GameState {
  // State
  gameStatus: GameStatus;
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction | null; // Queued direction for next tick
  score: number;
  currentMode: GameMode;
  speed: number;
  foodEaten: number;
  isNewHighScore: boolean;

  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  setDirection: (direction: Direction) => void;
  tick: () => { died: boolean; ateFood: boolean };
}

const initialSnake = createInitialSnake();

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    // Initial State
    gameStatus: 'idle',
    snake: initialSnake,
    food: createInitialFood(initialSnake),
    direction: 'RIGHT',
    nextDirection: null,
    score: 0,
    currentMode: 'classic',
    speed: INITIAL_SPEED,
    foodEaten: 0,
    isNewHighScore: false,

    // Actions
    startGame: () => {
      const mode = useSettingsStore.getState().gameMode;
      const initialSpeed = mode === 'classic' ? INITIAL_SPEED : SPEED_MODE_INITIAL;
      const newSnake = createInitialSnake();

      set({
        gameStatus: 'playing',
        snake: newSnake,
        food: createInitialFood(newSnake),
        direction: 'RIGHT',
        nextDirection: null,
        score: 0,
        currentMode: mode,
        speed: initialSpeed,
        foodEaten: 0,
        isNewHighScore: false,
      });
    },

    pauseGame: () => {
      set({ gameStatus: 'paused' });
    },

    resumeGame: () => {
      set({ gameStatus: 'playing' });
    },

    endGame: () => {
      const { score, currentMode } = get();
      const isHighScore = useLeaderboardStore.getState().addScore(score, currentMode);
      set({
        gameStatus: 'gameOver',
        isNewHighScore: isHighScore,
      });
    },

    resetGame: () => {
      const mode = useSettingsStore.getState().gameMode;
      const initialSpeed = mode === 'classic' ? INITIAL_SPEED : SPEED_MODE_INITIAL;
      const newSnake = createInitialSnake();

      set({
        gameStatus: 'playing',
        snake: newSnake,
        food: createInitialFood(newSnake),
        direction: 'RIGHT',
        nextDirection: null,
        score: 0,
        currentMode: mode,
        speed: initialSpeed,
        foodEaten: 0,
        isNewHighScore: false,
      });
    },

    setDirection: (newDirection: Direction) => {
      const { direction, nextDirection } = get();

      // Check against the queued direction if one exists
      if (nextDirection) {
        // If there's already a queued direction, check if new direction is opposite to it
        if (isOppositeDirection(nextDirection, newDirection)) {
          return; // Reject opposite of queued direction
        }

        // Also must not be opposite of current direction (prevents overwriting queue with invalid direction)
        if (isOppositeDirection(direction, newDirection)) {
          return; // Reject opposite of current direction
        }

        // Only update queue if different from queued direction
        if (newDirection !== nextDirection) {
          set({ nextDirection: newDirection });
        }
      } else {
        // No queued direction, check against current direction
        if (isOppositeDirection(direction, newDirection)) {
          return; // Reject opposite of current direction
        }

        // Only queue if different from current direction
        if (newDirection !== direction) {
          set({ nextDirection: newDirection });
        }
      }
    },

    tick: () => {
      const { snake, direction, nextDirection, food, score, foodEaten, currentMode } = get();

      // Apply queued direction change at the start of this tick
      const actualDirection = nextDirection || direction;

      const nextHead = getNextHeadPosition(snake[0], actualDirection);

      // Check for wall collision
      if (checkWallCollision(nextHead)) {
        return { died: true, ateFood: false };
      }

      // Check for self collision (next head against current body excluding head)
      if (checkSelfCollision(nextHead, snake.slice(1))) {
        return { died: true, ateFood: false };
      }

      // Check for food collision
      const ateFood = checkFoodCollision(nextHead, food);

      if (ateFood) {
        const newSnake = moveSnake(snake, actualDirection, true);
        const newFood = spawnFood([...snake, nextHead]);
        const newFoodEaten = foodEaten + 1;
        const newSpeed = calculateSpeed(newFoodEaten, currentMode);

        set({
          snake: newSnake,
          food: newFood,
          direction: actualDirection,
          nextDirection: null, // Clear queued direction
          score: score + POINTS_PER_FOOD,
          foodEaten: newFoodEaten,
          speed: newSpeed,
        });

        return { died: false, ateFood: true };
      }

      // Normal movement
      set({
        snake: moveSnake(snake, actualDirection, false),
        direction: actualDirection,
        nextDirection: null, // Clear queued direction
      });

      return { died: false, ateFood: false };
    },
  }))
);
