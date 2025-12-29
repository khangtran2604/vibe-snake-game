import { useEffect, useRef } from 'react';
import type { Direction } from '@/types';

/** Minimum swipe distance in pixels to register as a valid swipe */
const MIN_SWIPE_DISTANCE = 30;

/** Maximum time in milliseconds for a valid swipe gesture */
const MAX_SWIPE_TIME = 1000;

export interface UseTouchControlsOptions {
  /** Callback to change direction */
  onDirectionChange: (direction: Direction) => void;
  /** Whether the game is running (controls only work when true) */
  isRunning: boolean;
  /** Element to attach touch listeners to (default: window) */
  element?: HTMLElement | null;
}

/**
 * Custom hook for handling touch/swipe controls in the snake game.
 * Detects swipe gestures (up, down, left, right) and converts them to direction changes.
 * Uses minimum swipe distance threshold to prevent accidental inputs.
 * Only responds when the game is actively running.
 *
 * PERFORMANCE: Direction validation is now handled in the store's setDirection method,
 * removing the need to pass currentDirection as a prop.
 *
 * @param options - Configuration options for touch controls
 *
 * @example
 * ```typescript
 * useTouchControls({
 *   onDirectionChange: setDirection,
 *   isRunning: gameStatus === 'playing',
 * });
 * ```
 */
export function useTouchControls({
  onDirectionChange,
  isRunning,
  element,
}: UseTouchControlsOptions): void {
  // Track touch start position and time
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Use refs to avoid recreating handlers
  const isRunningRef = useRef(isRunning);
  const onDirectionChangeRef = useRef(onDirectionChange);

  // Keep refs updated
  useEffect(() => {
    isRunningRef.current = isRunning;
    onDirectionChangeRef.current = onDirectionChange;
  });

  /**
   * Calculate swipe direction from delta X and Y values.
   * Determines primary axis (horizontal vs vertical) and direction based on sign.
   */
  const calculateSwipeDirection = (deltaX: number, deltaY: number): Direction | null => {
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Determine primary swipe axis
    if (absX > absY) {
      // Horizontal swipe
      return deltaX > 0 ? 'RIGHT' : 'LEFT';
    } else {
      // Vertical swipe
      return deltaY > 0 ? 'DOWN' : 'UP';
    }
  };

  // Attach and detach event listeners
  useEffect(() => {
    // Determine target element (default to window)
    const target = element || window;

    /**
     * Handle touch start event.
     * Records the starting position and timestamp of the touch.
     */
    const handleTouchStart = (event: Event) => {
      const touchEvent = event as TouchEvent;

      // Only handle touches when game is running
      if (!isRunningRef.current) {
        return;
      }

      // Get the first touch point
      const touch = touchEvent.touches[0];
      if (!touch) {
        return;
      }

      // Store touch start position and time
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };

      // Prevent default browser gestures
      touchEvent.preventDefault();
    };

    /**
     * Handle touch move event.
     * Prevents default to stop page scrolling during gameplay.
     */
    const handleTouchMove = (event: Event) => {
      const touchEvent = event as TouchEvent;
      // Prevent scrolling while swiping
      touchEvent.preventDefault();
    };

    /**
     * Handle touch end event.
     * Calculates swipe direction and triggers direction change if valid.
     */
    const handleTouchEnd = (event: Event) => {
      const touchEvent = event as TouchEvent;

      // Only handle touches when game is running
      if (!isRunningRef.current) {
        return;
      }

      // Check if we have touch start data
      if (!touchStartRef.current) {
        return;
      }

      // Get the touch end position
      const touch = touchEvent.changedTouches[0];
      if (!touch) {
        return;
      }

      const endX = touch.clientX;
      const endY = touch.clientY;

      // Calculate time elapsed
      const timeElapsed = Date.now() - touchStartRef.current.time;

      // Ignore swipes that took too long (likely not intentional swipes)
      if (timeElapsed > MAX_SWIPE_TIME) {
        touchStartRef.current = null;
        return;
      }

      // Calculate delta X and Y
      const deltaX = endX - touchStartRef.current.x;
      const deltaY = endY - touchStartRef.current.y;

      // Calculate absolute distances
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Check if swipe distance meets minimum threshold
      const maxDistance = Math.max(absX, absY);
      if (maxDistance < MIN_SWIPE_DISTANCE) {
        touchStartRef.current = null;
        return;
      }

      // Clear touch start data
      touchStartRef.current = null;

      // Calculate swipe direction
      const newDirection = calculateSwipeDirection(deltaX, deltaY);
      if (!newDirection) {
        return;
      }

      // Call direction change (validation happens in store)
      onDirectionChangeRef.current(newDirection);

      // Prevent default browser gestures
      touchEvent.preventDefault();
    };

    // Add touch event listeners with passive: false to allow preventDefault()
    target.addEventListener('touchstart', handleTouchStart, { passive: false });
    target.addEventListener('touchmove', handleTouchMove, { passive: false });
    target.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cleanup function to remove listeners
    return () => {
      target.removeEventListener('touchstart', handleTouchStart);
      target.removeEventListener('touchmove', handleTouchMove);
      target.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element]); // Only recreate if element changes
}
