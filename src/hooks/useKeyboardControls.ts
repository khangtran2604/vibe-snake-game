import { useEffect, useRef } from 'react';
import type { Direction } from '@/types';

/**
 * Key mappings for arrow keys and WASD to directions.
 * Supports both uppercase and lowercase WASD for convenience.
 */
const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  W: 'UP',
  s: 'DOWN',
  S: 'DOWN',
  a: 'LEFT',
  A: 'LEFT',
  d: 'RIGHT',
  D: 'RIGHT',
};

/**
 * Keys that should have default behavior prevented (arrow keys scroll the page).
 */
const ARROW_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

export interface UseKeyboardControlsOptions {
  /** Callback to change direction */
  onDirectionChange: (direction: Direction) => void;
  /** Whether the game is running (controls only work when true) */
  isRunning: boolean;
}

/**
 * Custom hook for handling keyboard controls in the snake game.
 * Listens for arrow keys and WASD to change snake direction.
 * Only responds when the game is actively running.
 *
 * PERFORMANCE: Direction validation is now handled in the store's setDirection method,
 * removing the need to pass currentDirection as a prop and avoiding stale closures.
 *
 * @param options - Configuration options for keyboard controls
 */
export function useKeyboardControls({
  onDirectionChange,
  isRunning,
}: UseKeyboardControlsOptions): void {
  // Use refs to avoid recreating the handler on every render
  const isRunningRef = useRef(isRunning);
  const onDirectionChangeRef = useRef(onDirectionChange);

  // Keep refs updated
  useEffect(() => {
    isRunningRef.current = isRunning;
    onDirectionChangeRef.current = onDirectionChange;
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle controls when game is running
      if (!isRunningRef.current) {
        return;
      }

      const newDirection = KEY_TO_DIRECTION[event.key];

      // Ignore keys that aren't mapped to directions
      if (!newDirection) {
        return;
      }

      // Prevent arrow keys from scrolling the page
      if (ARROW_KEYS.has(event.key)) {
        event.preventDefault();
      }

      // Call the direction change handler (validation happens in store)
      onDirectionChangeRef.current(newDirection);
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty deps - handler never recreated
}
