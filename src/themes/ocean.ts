import type { Theme } from '@/types';

/**
 * Ocean Theme
 * 
 * A water-inspired theme featuring cool blues and teals that evoke
 * the depths of the ocean. Designed to create a calming, aquatic
 * atmosphere while maintaining excellent visibility and contrast.
 * 
 * Color Philosophy:
 * - Deep blue background for ocean depth atmosphere
 * - Bright cyan snake for visibility against dark water
 * - Warm orange food (fish) for high contrast
 * - Gradient blue tones for cohesive water aesthetic
 */
export const oceanTheme: Theme = {
  id: 'ocean',
  name: 'Ocean Adventure',
  emoji: '🌊',
  colors: {
    primary: '#0288D1',        // Bright ocean blue
    primaryDark: '#01579B',    // Deep ocean blue
    secondary: '#00ACC1',      // Cyan
    background: '#01579B',     // Deep ocean background
    surface: '#0277BD',        // Medium ocean blue
    surfaceLight: '#039BE5',   // Lighter surface
    text: '#FFFFFF',           // White for contrast
    textSecondary: '#B3E5FC',  // Light blue tint
    snake: '#00ACC1',          // Cyan snake (sea creature)
    snakeHead: '#4DD0E1',      // Lighter cyan head
    food: '#FF8A65',           // Orange (fish/coral)
    board: '#01579B',          // Deep ocean background
    boardCell: '#0277BD',      // Subtle water cells
  },
};

export default oceanTheme;
