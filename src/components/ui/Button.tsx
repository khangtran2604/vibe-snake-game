import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks';
import {
  buttonHover,
  buttonHoverReduced,
  buttonTap,
  buttonTapReduced,
  buttonTransition,
} from '@/utils/animations';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Button component with smooth animations and accessibility features.
 * Features:
 * - Hover and press animations (scale and lift effect)
 * - Multiple variants and sizes
 * - Respects reduced motion preferences
 * - Full keyboard accessibility with visible focus states
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    // Use appropriate animations based on motion preference
    const hoverAnimation = prefersReducedMotion ? buttonHoverReduced : buttonHover;
    const tapAnimation = prefersReducedMotion ? buttonTapReduced : buttonTap;

    return (
      <motion.button
        ref={ref}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={buttonTransition}
        className={cn(
          // Base styles
          'font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          // Variant styles
          {
            'bg-primary text-white hover:bg-primary-dark focus:ring-primary':
              variant === 'primary',
            'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary':
              variant === 'secondary',
            'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary':
              variant === 'tertiary',
          },
          // Size styles
          {
            'px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base': size === 'sm',
            'px-4 md:px-6 py-2 md:py-3 text-base md:text-lg': size === 'md',
            'px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
