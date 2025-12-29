import type { Theme } from '@/types';

/**
 * Jungle Adventure Theme
 * 
 * A vibrant, nature-inspired theme featuring lush greens and earthy browns.
 * Designed to be kid-friendly with bright, appealing colors that evoke
 * a tropical jungle atmosphere. The fresh green palette creates an immersive
 * gaming experience while maintaining high contrast for excellent visibility.
 * 
 * Color Philosophy:
 * - Fresh jungle greens for primary elements (energetic and playful)
 * - Deep forest green background for immersive atmosphere
 * - Red apple/berry food for high visibility against green backdrop
 * - Gradient green snake (lighter head) for depth and direction indication
 * - Natural earth tones throughout for cohesive jungle aesthetic
 */
export const jungleTheme: Theme = {
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

export default jungleTheme;
