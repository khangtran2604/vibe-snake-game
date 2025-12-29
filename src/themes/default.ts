import type { Theme } from '@/types';

/**
 * Default Theme - Jungle Adventure
 * 
 * A vibrant, nature-inspired theme featuring lush greens and earthy browns.
 * This is the default theme that all new users will see on first load.
 * Designed to be kid-friendly with bright, appealing colors that evoke
 * a tropical jungle atmosphere.
 * 
 * The fresh green palette creates an immersive gaming experience while
 * maintaining high contrast for excellent visibility and accessibility.
 */
export const defaultTheme: Theme = {
  id: 'jungle',
  name: 'Jungle Adventure',
  emoji: '🌴',
  colors: {
    primary: '#4CAF50',        // Fresh green
    primaryDark: '#388E3C',    // Darker jungle green
    secondary: '#8BC34A',      // Light green
    background: '#1B5E20',     // Deep forest green
    surface: '#2E7D32',        // Medium jungle green
    surfaceLight: '#43A047',   // Lighter surface
    text: '#FFFFFF',           // White for contrast
    textSecondary: '#C8E6C9',  // Light green tint
    snake: '#4CAF50',          // Fresh green snake body
    snakeHead: '#66BB6A',      // Lighter green head
    food: '#F44336',           // Red apple/berry
    board: '#1B5E20',          // Deep forest background
    boardCell: '#2E7D32',      // Subtle grid cells
  },
};
