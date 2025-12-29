/**
 * Represents a position on the game grid
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Represents the direction the snake is moving
 */
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

/**
 * Represents the current status of the game
 */
export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

/**
 * Re-export HighScoreEntry from leaderboard store
 */
export type { HighScoreEntry } from '@/stores/leaderboardStore';

/**
 * Theme system types
 */

/**
 * Theme identifier union type
 */
export type ThemeId = 'default' | 'jungle' | 'ocean' | 'space' | 'candy' | 'neon' | 'desert' | 'winter';

/**
 * Theme color palette interface
 * All colors in hex format (e.g., "#22c55e")
 */
export interface ThemeColors {
  // Core UI colors
  primary: string;       // Primary UI color
  primaryDark: string;   // Darker shade of primary
  secondary: string;     // Secondary UI color
  background: string;    // Main background color
  surface: string;       // Surface/card background color
  surfaceLight: string;  // Lighter surface shade
  text: string;          // Primary text color
  textSecondary: string; // Secondary text color
  
  // Game-specific colors
  snake: string;         // Snake body color
  snakeHead: string;     // Snake head color
  food: string;          // Food item color
  board: string;         // Game board background
  boardCell: string;     // Game board cell borders
}

/**
 * Theme configuration interface
 */
export interface Theme {
  id: ThemeId;           // Unique theme identifier
  name: string;          // Display name (e.g., "Jungle Adventure")
  emoji: string;         // Icon/emoji for theme selector
  colors: ThemeColors;   // Color palette object
}
