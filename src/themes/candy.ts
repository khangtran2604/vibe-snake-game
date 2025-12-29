import type { Theme } from '@/types';

/**
 * Candy Theme
 * 
 * A sweet, playful theme featuring soft pinks and pastels that evoke
 * a candy wonderland. Designed to be extra kid-friendly with cheerful,
 * inviting colors reminiscent of sugar and sweets.
 * 
 * Color Philosophy:
 * - Soft pink background for sweet, gentle atmosphere
 * - Purple snake (candy worm/gummy) for playful contrast
 * - Bright orange food (lollipop) for high visibility
 * - Pastel gradient for cohesive candy aesthetic
 */
export const candyTheme: Theme = {
  id: 'candy',
  name: 'Candy Land',
  emoji: '🍬',
  colors: {
    primary: '#EC407A',        // Bright pink
    primaryDark: '#C2185B',    // Deep pink
    secondary: '#F8BBD0',      // Light pink
    background: '#FCE4EC',     // Very light pink background
    surface: '#F8BBD0',        // Soft pink surface
    surfaceLight: '#F48FB1',   // Medium pink
    text: '#4A148C',           // Deep purple for contrast
    textSecondary: '#7B1FA2',  // Medium purple
    snake: '#AB47BC',          // Purple snake (candy worm)
    snakeHead: '#BA68C8',      // Light purple head
    food: '#FF7043',           // Orange (lollipop)
    board: '#FCE4EC',          // Light pink background
    boardCell: '#F8BBD0',      // Subtle pink cells
  },
};

export default candyTheme;
