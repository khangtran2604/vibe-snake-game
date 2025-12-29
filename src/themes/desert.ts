import type { Theme } from '@/types';

/**
 * Desert Oasis Theme
 * 
 * A warm, earthy theme inspired by desert landscapes with oranges, yellows,
 * and sand tones. Features a brown snake resembling desert lizards (horned
 * lizards, geckos) and cactus green food representing desert plant life.
 * The sun-baked orange palette creates a cohesive desert atmosphere while
 * maintaining playful kid-friendly appeal.
 * 
 * Color Philosophy:
 * - Bright oranges and burnt oranges for desert sun and sand
 * - Brown snake (#8D6E63) evokes desert reptiles and lizards
 * - Cactus green food (#7CB342) represents oasis vegetation
 * - Green accent (#4CAF50) symbolizes life in the desert
 * - Warm tones throughout create immersive desert heat atmosphere
 * - White text ensures readability on orange background
 * 
 * Accessibility Note:
 * - White text (#FFFFFF) on deep orange (#E65100) meets WCAG AA standards
 * - Brown snake may have slightly lower contrast on orange - acceptable for theme variety
 * - Green food provides strong contrast and high visibility
 */
export const desertTheme: Theme = {
  id: 'desert',
  name: 'Desert Oasis',
  emoji: '🏜️',
  colors: {
    primary: '#FF8F00',        // Bright orange
    primaryDark: '#E65100',    // Deep orange
    secondary: '#FFB74D',      // Light orange
    background: '#E65100',     // Deep burnt orange
    surface: '#F57C00',        // Medium orange
    surfaceLight: '#FF8F00',   // Bright orange
    text: '#FFFFFF',           // White
    textSecondary: '#FFCCBC',  // Light peach
    snake: '#8D6E63',          // Brown lizard
    snakeHead: '#6D4C41',      // Darker brown
    food: '#7CB342',           // Cactus green
    board: '#E65100',          // Deep burnt orange
    boardCell: '#F57C00',      // Medium orange grid
  },
};

export default desertTheme;
