import { useRef, useEffect, useCallback } from 'react';

export interface UseGameLoopOptions {
  /** Callback function to execute on each tick */
  onTick: () => void;
  /** Interval in milliseconds between ticks */
  interval: number;
  /** Whether the game loop is running */
  isRunning: boolean;
}

/**
 * Custom hook that provides a game loop using requestAnimationFrame.
 * Uses timestamp-based timing for consistent speed regardless of frame rate.
 *
 * @param options - Configuration options for the game loop
 */
export function useGameLoop({
  onTick,
  interval,
  isRunning,
}: UseGameLoopOptions): void {
  // Store the last update timestamp
  const lastUpdateTimeRef = useRef<number>(0);
  // Store the animation frame ID for cleanup
  const animationFrameIdRef = useRef<number>(0);
  // Store onTick in a ref to avoid re-creating the loop when callback changes
  const onTickRef = useRef(onTick);

  // Keep the onTick ref updated
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  // The main game loop function
  const gameLoop = useCallback(
    (timestamp: number) => {
      // Initialize lastUpdateTime on first frame
      if (lastUpdateTimeRef.current === 0) {
        lastUpdateTimeRef.current = timestamp;
      }

      // Calculate elapsed time since last update
      const elapsed = timestamp - lastUpdateTimeRef.current;

      // Only call onTick when the interval has elapsed
      if (elapsed >= interval) {
        onTickRef.current();
        // Account for any extra time that passed beyond the interval
        lastUpdateTimeRef.current = timestamp - (elapsed % interval);
      }

      // Continue the loop
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    },
    [interval]
  );

  useEffect(() => {
    if (isRunning) {
      // Reset the last update time when starting
      lastUpdateTimeRef.current = 0;
      // Start the game loop
      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    }

    // Cleanup: cancel animation frame when stopped or unmounted
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = 0;
      }
    };
  }, [isRunning, gameLoop]);
}
