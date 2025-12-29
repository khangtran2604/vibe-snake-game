import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Position } from '@/types';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks';
import { foodSpawnVariants, foodSpawnVariantsReduced } from '@/utils/animations';

export interface FoodProps {
  position: Position;
  className?: string;
}

/**
 * Food component renders the food item on the game grid.
 * Features enhanced animations:
 * - Pulsing scale animation for visibility
 * - Glowing effect for visual appeal
 * - Spawn animation with rotation
 * All animations respect prefers-reduced-motion.
 *
 * PERFORMANCE: Memoized to prevent re-renders when position hasn't changed.
 * Uses stable key to prevent animation restarts.
 */
export const Food = memo(function Food({ position, className }: FoodProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? foodSpawnVariantsReduced : foodSpawnVariants;

  // Create stable key that only changes when position changes
  const positionKey = useMemo(() => `food-${position.x}-${position.y}`, [position.x, position.y]);

  return (
    <motion.div
      key={positionKey}
      variants={variants}
      initial="initial"
      animate="animate"
      className={cn(
        'bg-food rounded-full',
        'shadow-md shadow-food/40',
        // Only apply pulse and glow animations if not reduced motion
        !prefersReducedMotion && 'animate-pulse-food animate-food-glow',
        // Ensure animations are disabled for reduced motion preference
        'motion-reduce:animate-none',
        className
      )}
      style={{
        gridColumn: position.x + 1,
        gridRow: position.y + 1,
        // Slight inset using padding
        padding: '2px',
        // Apply glow color based on theme
        color: 'rgb(var(--color-food))',
      }}
      aria-label="Food"
    />
  );
});
