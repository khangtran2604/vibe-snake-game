import { memo, useMemo, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { GRID_SIZE } from '@/utils/constants';

export interface GameBoardProps {
  children?: ReactNode;
  className?: string;
}

/**
 * GameBoard component renders the game grid.
 * Uses CSS Grid for layout with square cells that scale to fit viewport.
 *
 * Responsive sizing strategy:
 * - Mobile (< 768px): max-w-[90vw] - leaves 5vw padding on each side
 * - Tablet (768px - 1023px): max-w-md (448px) - comfortable tablet size
 * - Desktop (≥ 1024px): max-w-xl (576px) - generous desktop size
 *
 * Maintains 1:1 aspect ratio at all sizes with aspect-square utility.
 *
 * Performance optimizations:
 * - CSS containment (contain: content) limits layout/style/paint scope
 * - touch-action: none disables browser gestures for better touch controls
 * - Memoized to prevent re-rendering 400 background cells
 * - Background grid cells cached with useMemo
 */
export const GameBoard = memo(function GameBoard({ children, className }: GameBoardProps) {
  // PERFORMANCE: Memoize the 400 background cells - they never change
  const backgroundCells = useMemo(() => {
    const cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    return cells.map((index) => <div key={index} className="bg-board-cell/20" />);
  }, []); // Empty deps - truly static

  return (
    <div
      className={cn(
        'relative w-full max-w-[90vw] md:max-w-md lg:max-w-xl aspect-square',
        'mx-auto',
        'bg-board rounded-lg overflow-hidden',
        'shadow-lg shadow-black/30',
        'touch-none',
        className
      )}
      style={{
        // CSS containment for performance - isolates layout/style/paint from rest of document
        // Allows browser to optimize rendering by limiting scope of recalculations
        contain: 'content',
        // Touch action: none prevents browser gestures (swipe controls handle all touch)
        touchAction: 'none',
      }}
    >
      {/* Grid background with subtle cell borders */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '1px',
        }}
      >
        {backgroundCells}
      </div>

      {/* Game elements (snake, food, etc.) rendered on top */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {children}
      </div>
    </div>
  );
});
