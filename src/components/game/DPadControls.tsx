import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Direction } from '@/types';
import { cn } from '@/utils/cn';
import { isOppositeDirection } from '@/game';
import { useReducedMotion } from '@/hooks';

/**
 * Props for the DirectionButton component
 */
interface DirectionButtonProps {
  direction: Direction;
  icon: React.ReactNode;
  onPress: (direction: Direction) => void;
  disabled: boolean;
  ariaLabel: string;
  className?: string;
}

/**
 * Individual direction button component with animations and accessibility.
 * Respects reduced motion preferences for better accessibility.
 */
function DirectionButton({
  direction,
  icon,
  onPress,
  disabled,
  ariaLabel,
  className,
}: DirectionButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const handlePress = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      onPress(direction);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handlePress}
      onTouchStart={handlePress}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={disabled || prefersReducedMotion ? {} : { scale: 0.9 }}
      whileHover={disabled || prefersReducedMotion ? {} : { scale: 1.05 }}
      transition={{ duration: 0.15 }}
      className={cn(
        // Base sizing - touch-friendly (56x56px minimum)
        'w-14 h-14 md:w-16 md:h-16',
        // Visual styling - semi-transparent glass-morphism
        'bg-black/40 border-2 border-white/50 rounded-xl backdrop-blur-sm',
        // Shadow for depth
        'shadow-lg',
        // Active state feedback
        'active:bg-white/30 active:scale-95',
        // Disabled state
        'disabled:opacity-30 disabled:cursor-not-allowed',
        // Focus styles for accessibility
        'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2',
        // Smooth transitions
        'transition-all duration-150',
        // Flex to center icon
        'flex items-center justify-center',
        className
      )}
      style={{
        // Faster tap response on mobile (removes 300ms delay)
        touchAction: 'manipulation',
        // Prevent text selection on buttons
        userSelect: 'none',
        WebkitUserSelect: 'none',
        // Prevent long-press menu on mobile
        WebkitTouchCallout: 'none',
      }}
    >
      <div className="text-white">{icon}</div>
    </motion.button>
  );
}

/**
 * Props for the DPadControls component
 */
export interface DPadControlsProps {
  /** Callback to change direction when button is pressed */
  onDirectionChange: (direction: Direction) => void;
  /** Current snake direction */
  currentDirection: Direction;
  /** Whether the game is actively running */
  isRunning: boolean;
  /** Whether to show the D-pad (controlled by settings) */
  isVisible: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * On-screen D-pad control component for mobile devices.
 * Provides directional buttons as an alternative to swipe gestures.
 * 
 * Features:
 * - 3x3 grid layout with four directional buttons (up, down, left, right)
 * - Touch-friendly button sizes (56x56px minimum, exceeds 44px accessibility requirement)
 * - Visual feedback with Framer Motion animations
 * - Semi-transparent glass-morphism design
 * - Responsive: visible on mobile/tablet, hidden on desktop (lg:hidden)
 * - Prevents 180-degree turns (opposite direction buttons disabled)
 * - Full accessibility with ARIA labels and keyboard support
 * 
 * @component
 */
export function DPadControls({
  onDirectionChange,
  currentDirection,
  isRunning,
  isVisible,
  className,
}: DPadControlsProps) {
  // Early return if not visible
  if (!isVisible) {
    return null;
  }

  // Button configuration with grid positioning
  const buttons = [
    {
      direction: 'UP' as Direction,
      icon: <ArrowUp size={24} className="md:w-7 md:h-7" />,
      gridPosition: 'col-start-2 row-start-1',
      ariaLabel: 'Move up',
    },
    {
      direction: 'LEFT' as Direction,
      icon: <ArrowLeft size={24} className="md:w-7 md:h-7" />,
      gridPosition: 'col-start-1 row-start-2',
      ariaLabel: 'Move left',
    },
    {
      direction: 'RIGHT' as Direction,
      icon: <ArrowRight size={24} className="md:w-7 md:h-7" />,
      gridPosition: 'col-start-3 row-start-2',
      ariaLabel: 'Move right',
    },
    {
      direction: 'DOWN' as Direction,
      icon: <ArrowDown size={24} className="md:w-7 md:h-7" />,
      gridPosition: 'col-start-2 row-start-3',
      ariaLabel: 'Move down',
    },
  ];

  return (
    <div
      role="group"
      aria-label="Directional controls"
      className={cn(
        // Fixed positioning at bottom center with safe area support
        'fixed left-1/2 -translate-x-1/2',
        // Z-index to ensure above game board
        'z-50',
        // Responsive visibility - hidden on desktop (lg breakpoint: 1024px+)
        'lg:hidden',
        // Hide in print
        'print:hidden',
        // Flex container
        'flex items-center justify-center',
        className
      )}
      style={{
        // Apply safe area inset to bottom positioning for devices with notches/home indicators
        // Falls back to 2rem (8 * 0.25rem = 32px) if safe-area-inset not supported
        bottom: 'calc(2rem + var(--safe-area-inset-bottom, 0px))',
      }}
    >
      {/* 
        3x3 Grid Layout for D-pad:
        [   ] [UP ] [   ]
        [LFT] [   ] [RGT]
        [   ] [DWN] [   ]
      */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {buttons.map((button) => {
          // Disable button if game not running OR if it's the opposite direction
          const isDisabled =
            !isRunning || isOppositeDirection(currentDirection, button.direction);

          return (
            <DirectionButton
              key={button.direction}
              direction={button.direction}
              icon={button.icon}
              onPress={onDirectionChange}
              disabled={isDisabled}
              ariaLabel={button.ariaLabel}
              className={button.gridPosition}
            />
          );
        })}
      </div>
    </div>
  );
}
