import type { Theme } from '@/types';

/**
 * Winter Wonderland Theme
 * 
 * A cool, serene theme with icy blues and whites inspired by winter landscapes.
 * Features a blue frost serpent snake and ice blue snowflake food on a light
 * background. This is the ONLY theme with a light background, creating a unique
 * "snow day" aesthetic that stands apart from all other themes.
 * 
 * Color Philosophy:
 * - Very light blue background (#E3F2FD) evokes snow and ice
 * - Blue snake (#1E88E5) represents mythical frost serpent or ice dragon
 * - Ice blue food (#B3E5FC) resembles delicate snowflakes
 * - Deep blue text (#0D47A1) ensures readability on light background
 * - Pale yellow accent (#FFF59D) represents winter sunlight
 * - Cool, calming palette creates peaceful winter atmosphere
 * 
 * Accessibility Note:
 * - Deep blue text (#0D47A1) on light blue background (#E3F2FD) meets WCAG AA
 * - Blue snake (#1E88E5) has good contrast on light board
 * - Ice blue food (#B3E5FC) on light board may have lower contrast - needs testing
 * - Light background is intentional for unique visual experience
 */
export const winterTheme: Theme = {
  id: 'winter',
  name: 'Winter Wonderland',
  emoji: '❄️',
  colors: {
    primary: '#42A5F5',        // Light blue
    primaryDark: '#1E88E5',    // Darker blue
    secondary: '#90CAF9',      // Pale blue
    background: '#E3F2FD',     // Very light blue
    surface: '#BBDEFB',        // Light blue surface
    surfaceLight: '#90CAF9',   // Slightly darker surface
    text: '#0D47A1',           // Deep blue text
    textSecondary: '#1565C0',  // Medium blue
    snake: '#1E88E5',          // Blue frost serpent
    snakeHead: '#1565C0',      // Darker blue head
    food: '#B3E5FC',           // Ice blue snowflake
    board: '#E3F2FD',          // Very light blue
    boardCell: '#BBDEFB',      // Light blue grid
  },
};

export default winterTheme;
