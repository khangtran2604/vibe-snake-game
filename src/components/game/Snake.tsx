import { memo } from 'react';
import type { Position } from '@/types';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks';

export interface SnakeProps {
  segments: Position[];
}

/**
 * Snake component renders all snake segments on the game grid.
 * The head (index 0) is visually distinct from body segments.
 * Features smooth interpolation between grid cells for fluid movement.
 *
 * PERFORMANCE: Memoized to prevent re-renders when segments haven't changed.
 * Uses stable keys based on segment index to avoid unmounting/remounting.
 */
export const Snake = memo(function Snake({ segments }: SnakeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {segments.map((segment, index) => {
        const isHead = index === 0;

        return (
          <div
            key={index} // Use index as key - more stable than position
            className={cn(
              // Smooth movement interpolation with CSS transitions
              // Uses transform for GPU acceleration and better performance
              'transition-all ease-linear',
              // Duration matches the game tick interval for smooth movement
              prefersReducedMotion ? 'duration-0' : 'duration-150',
              // Disable transitions for users who prefer reduced motion
              'motion-reduce:transition-none',
              isHead
                ? 'bg-snake-head rounded-md shadow-md shadow-snake-head/30'
                : 'bg-snake rounded-sm'
            )}
            style={{
              gridColumn: segment.x + 1,
              gridRow: segment.y + 1,
              // Slight inset to show segmentation using padding instead of margin
              padding: '1px',
            }}
          />
        );
      })}
    </>
  );
});
