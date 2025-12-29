import type { Variants, Transition } from 'framer-motion';

/**
 * Animation utilities and shared variants for consistent animations throughout the app.
 * All animations have reduced motion alternatives that respect user preferences.
 */

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

/**
 * Page transition variants with vertical slide and fade.
 * Use for screen/route transitions.
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Reduced motion page transition - fade only, no movement.
 */
export const pageVariantsReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Page transition timing configuration.
 */
export const pageTransition: Transition = {
  duration: 0.3,
  ease: 'easeInOut',
};

/**
 * Reduced motion page transition timing - instant.
 */
export const pageTransitionReduced: Transition = {
  duration: 0.15,
  ease: 'easeInOut',
};

// ============================================================================
// SCORE ANIMATIONS
// ============================================================================

/**
 * Score pop animation variants for when score increases.
 */
export const scoreVariants: Variants = {
  normal: { scale: 1 },
  pop: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/**
 * Reduced motion score variants - no scale animation.
 */
export const scoreVariantsReduced: Variants = {
  normal: { scale: 1 },
  pop: { scale: 1 },
};

/**
 * Floating score indicator animation (e.g., "+10" popup).
 */
export const floatingScoreVariants: Variants = {
  initial: { opacity: 0, y: 0, scale: 0.5 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [0, -50],
    scale: [0.5, 1, 1, 0.8],
    transition: { duration: 1, ease: 'easeOut' },
  },
  exit: { opacity: 0 },
};

/**
 * Reduced motion floating score - fade only.
 */
export const floatingScoreVariantsReduced: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 0],
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0 },
};

// ============================================================================
// GAME OVER ANIMATIONS
// ============================================================================

/**
 * Game over screen entrance animation.
 * Includes delay to allow death flash animation to complete.
 */
export const gameOverVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Reduced motion game over - fade only with delay.
 */
export const gameOverVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.2,
    },
  },
};

// ============================================================================
// BUTTON ANIMATIONS
// ============================================================================

/**
 * Button hover animation with lift effect.
 */
export const buttonHover = {
  scale: 1.02,
  y: -2,
};

/**
 * Button tap/press animation.
 */
export const buttonTap = {
  scale: 0.98,
  y: 0,
};

/**
 * Button animation transition timing.
 */
export const buttonTransition: Transition = {
  duration: 0.15,
  ease: 'easeOut',
};

/**
 * Reduced motion button animations - no movement.
 */
export const buttonHoverReduced = {};
export const buttonTapReduced = {};

// ============================================================================
// FOOD ANIMATIONS
// ============================================================================

/**
 * Food spawn animation with rotation.
 */
export const foodSpawnVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

/**
 * Reduced motion food spawn - simple fade in.
 */
export const foodSpawnVariantsReduced: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Returns appropriate animation variants based on motion preference.
 * 
 * @param prefersReduced - Whether user prefers reduced motion
 * @param fullVariants - Full animation variants
 * @param reducedVariants - Reduced motion variants
 * @returns The appropriate variants based on preference
 * 
 * @example
 * ```tsx
 * const prefersReduced = useReducedMotion();
 * const variants = getAnimationVariants(prefersReduced, pageVariants, pageVariantsReduced);
 * ```
 */
export function getAnimationVariants(
  prefersReduced: boolean,
  fullVariants: Variants,
  reducedVariants: Variants
): Variants {
  return prefersReduced ? reducedVariants : fullVariants;
}

/**
 * Returns appropriate transition based on motion preference.
 * 
 * @param prefersReduced - Whether user prefers reduced motion
 * @param fullTransition - Full animation transition
 * @param reducedTransition - Reduced motion transition
 * @returns The appropriate transition based on preference
 */
export function getAnimationTransition(
  prefersReduced: boolean,
  fullTransition: Transition,
  reducedTransition: Transition
): Transition {
  return prefersReduced ? reducedTransition : fullTransition;
}
