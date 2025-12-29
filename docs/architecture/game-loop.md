# Game Loop Architecture

## Core Game Loop Hook

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

## Collision Detection

```typescript
// src/game/collision.ts
import type { Position } from '@/types/game';

export function checkWallCollision(head: Position, gridSize: number): boolean {
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
}

export function checkSelfCollision(snake: Position[]): boolean {
  const head = snake[0];
  return snake.slice(1).some(
    (segment) => segment.x === head.x && segment.y === head.y
  );
}

export function checkFoodCollision(head: Position, food: Position): boolean {
  return head.x === food.x && head.y === food.y;
}
```

## Speed Calculation

```typescript
// src/game/speed.ts
import type { GameMode } from '@/types';
import {
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_INCREMENT,
  FOOD_PER_SPEED_INCREASE,
  SPEED_MODE_INITIAL,
  SPEED_MODE_INCREMENT,
  SPEED_MODE_FOOD_THRESHOLD,
  INITIAL_SNAKE_LENGTH,
} from '@/utils/constants';

export function calculateSpeed(mode: GameMode, snakeLength: number): number {
  const foodEaten = snakeLength - INITIAL_SNAKE_LENGTH;

  if (mode === 'classic') {
    const speedReductions = Math.floor(foodEaten / FOOD_PER_SPEED_INCREASE);
    const newSpeed = INITIAL_SPEED - speedReductions * SPEED_INCREMENT;
    return Math.max(newSpeed, MIN_SPEED);
  } else {
    // Speed mode
    const speedReductions = Math.floor(foodEaten / SPEED_MODE_FOOD_THRESHOLD);
    const newSpeed = SPEED_MODE_INITIAL - speedReductions * SPEED_MODE_INCREMENT;
    return Math.max(newSpeed, 40); // Faster minimum for speed mode
  }
}
```

## Key Principles

1. **requestAnimationFrame** - Use for smooth 60fps rendering
2. **Timestamp-based timing** - Consistent speed regardless of frame rate
3. **State outside React** - Zustand allows reading state in game loop without re-renders
4. **Pure collision functions** - Easy to test and reason about
5. **Cleanup on unmount** - Cancel animation frame to prevent memory leaks
