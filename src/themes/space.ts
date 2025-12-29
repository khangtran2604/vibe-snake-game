import type { Theme } from '@/types';

/**
 * Space Theme
 * 
 * A cosmic theme featuring deep purples, blacks, and vibrant accents
 * that create a futuristic space atmosphere. The dark background with
 * bright elements mimics stars against the night sky.
 * 
 * Color Philosophy:
 * - Very dark background for deep space atmosphere
 * - Vibrant purple snake (rocket/comet trail)
 * - Golden food (star/celestial body) for maximum contrast
 * - Purple gradient for cosmic aesthetic
 */
export const spaceTheme: Theme = {
  id: 'space',
  name: 'Space Adventure',
  emoji: '🚀',
  colors: {
    primary: '#7C4DFF',        // Vibrant purple
    primaryDark: '#6200EA',    // Deep purple
    secondary: '#B388FF',      // Light purple
    background: '#1A1A2E',     // Deep space black
    surface: '#16213E',        // Dark space surface
    surfaceLight: '#0F3460',   // Lighter dark blue
    text: '#FFFFFF',           // White for contrast
    textSecondary: '#D1C4E9',  // Light purple tint
    snake: '#E040FB',          // Magenta snake (rocket/comet)
    snakeHead: '#B388FF',      // Light purple head
    food: '#FFD700',           // Golden star
    board: '#1A1A2E',          // Deep space background
    boardCell: '#16213E',      // Subtle space cells
  },
};

export default spaceTheme;
