import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTouchControls } from '@/hooks/useTouchControls';
// import type { Direction } from '@/types';

/**
 * Helper function to create mock touch event.
 * Simplified for testing purposes.
 */
function createTouchEvent(
  type: 'touchstart' | 'touchmove' | 'touchend',
  x: number,
  y: number
): TouchEvent {
  const touch = {
    clientX: x,
    clientY: y,
    pageX: x,
    pageY: y,
    screenX: x,
    screenY: y,
    identifier: 0,
    target: document.body,
    radiusX: 0,
    radiusY: 0,
    rotationAngle: 0,
    force: 1,
  } as Touch;

  const touchList = type === 'touchend' ? [] : [touch];
  const changedTouchList = [touch];

  const event = new Event(type, {
    bubbles: true,
    cancelable: true,
  }) as TouchEvent;

  // Mock the touch properties
  Object.defineProperty(event, 'touches', {
    value: touchList,
    writable: false,
  });
  Object.defineProperty(event, 'changedTouches', {
    value: changedTouchList,
    writable: false,
  });
  Object.defineProperty(event, 'targetTouches', {
    value: touchList,
    writable: false,
  });

  // Mock preventDefault
  event.preventDefault = vi.fn();

  return event;
}

describe('useTouchControls', () => {
  let onDirectionChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onDirectionChange = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('Horizontal Swipes', () => {
    it('detects swipe right when deltaX > 30 pixels', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Simulate swipe from (100, 100) to (200, 100)
      const startEvent = createTouchEvent('touchstart', 100, 100);
      const endEvent = createTouchEvent('touchend', 200, 100);

      window.dispatchEvent(startEvent);
      window.dispatchEvent(endEvent);

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
      expect(onDirectionChange).toHaveBeenCalledTimes(1);
    });

    it('detects swipe left when deltaX < -30 pixels', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Simulate swipe from (200, 100) to (100, 100)
      window.dispatchEvent(createTouchEvent('touchstart', 200, 100));
      window.dispatchEvent(createTouchEvent('touchend', 100, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('LEFT');
      expect(onDirectionChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Vertical Swipes', () => {
    it('detects swipe down when deltaY > 30 pixels', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Simulate swipe from (100, 100) to (100, 200)
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 100, 200));

      expect(onDirectionChange).toHaveBeenCalledWith('DOWN');
      expect(onDirectionChange).toHaveBeenCalledTimes(1);
    });

    it('detects swipe up when deltaY < -30 pixels', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Simulate swipe from (100, 200) to (100, 100)
      window.dispatchEvent(createTouchEvent('touchstart', 100, 200));
      window.dispatchEvent(createTouchEvent('touchend', 100, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('UP');
      expect(onDirectionChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Minimum Swipe Distance Threshold', () => {
    it('ignores swipes below 30px horizontal distance', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Simulate small swipe (25px)
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 125, 100));

      expect(onDirectionChange).not.toHaveBeenCalled();
    });

    it('ignores swipes below 30px vertical distance', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Simulate small swipe (20px)
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 100, 120));

      expect(onDirectionChange).not.toHaveBeenCalled();
    });

    it('accepts swipe exactly at 30px threshold', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Simulate swipe exactly 30px
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 130, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
    });
  });

  describe('Maximum Swipe Time Threshold', () => {
    it('ignores swipes that take longer than 1000ms', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Start swipe
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));

      // Advance time beyond threshold
      vi.advanceTimersByTime(1001);

      // End swipe
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).not.toHaveBeenCalled();
    });

    it('accepts swipes within 1000ms time limit', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Start swipe
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));

      // Advance time within threshold
      vi.advanceTimersByTime(500);

      // End swipe
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
    });

    it('accepts swipes exactly at 1000ms threshold', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Start swipe
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));

      // Advance time exactly to threshold
      vi.advanceTimersByTime(1000);

      // End swipe
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
    });
  });

  describe('Opposite Direction Prevention', () => {
    it('calls callback for LEFT swipe (validation in store)', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Attempt to swipe left
      window.dispatchEvent(createTouchEvent('touchstart', 200, 100));
      window.dispatchEvent(createTouchEvent('touchend', 100, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('LEFT');
    });

    it('calls callback for RIGHT swipe (validation in store)', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Attempt to swipe right
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
    });

    it('calls callback for UP swipe (validation in store)', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Attempt to swipe up
      window.dispatchEvent(createTouchEvent('touchstart', 100, 200));
      window.dispatchEvent(createTouchEvent('touchend', 100, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('UP');
    });

    it('calls callback for DOWN swipe (validation in store)', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Attempt to swipe down
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 100, 200));

      expect(onDirectionChange).toHaveBeenCalledWith('DOWN');
    });
  });

  describe('Game Running State', () => {
    it('does not respond to swipes when isRunning is false', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: false,
        })
      );

      // Attempt valid swipe
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).not.toHaveBeenCalled();
    });

    it('responds to swipes when isRunning is true', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Attempt valid swipe
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
    });
  });

  describe('Same Direction Detection', () => {
    it('calls callback even for same direction (validation in store)', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Swipe in same direction
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).toHaveBeenCalled();
    });
  });

  describe('Diagonal Swipes', () => {
    it('prioritizes horizontal direction when abs(deltaX) > abs(deltaY)', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Diagonal swipe with more horizontal movement (60px right, 40px down)
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 160, 140));

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
    });

    it('prioritizes vertical direction when abs(deltaY) > abs(deltaX)', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Diagonal swipe with more vertical movement (40px right, 60px down)
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 140, 160));

      expect(onDirectionChange).toHaveBeenCalledWith('DOWN');
    });
  });

  describe('Event Prevention', () => {
    it('calls preventDefault on touchstart when game is running', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      const event = createTouchEvent('touchstart', 100, 100);
      window.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('calls preventDefault on touchmove', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      const event = createTouchEvent('touchmove', 150, 100);
      window.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('calls preventDefault on touchend for valid swipes', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      const endEvent = createTouchEvent('touchend', 200, 100);
      window.dispatchEvent(endEvent);

      expect(endEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing touch data gracefully', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Try to end without starting - should not trigger direction change
      window.dispatchEvent(createTouchEvent('touchend', 200, 100));

      expect(onDirectionChange).not.toHaveBeenCalled();
    });

    it('handles very large swipe distances', () => {
      renderHook(() =>
        useTouchControls({
          onDirectionChange,

          isRunning: true,
        })
      );

      // Very large swipe (500px)
      window.dispatchEvent(createTouchEvent('touchstart', 100, 100));
      window.dispatchEvent(createTouchEvent('touchend', 600, 100));

      expect(onDirectionChange).toHaveBeenCalledWith('RIGHT');
    });
  });
});
