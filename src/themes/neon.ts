import type { Theme } from '@/types';

/**
 * Neon Arcade Theme
 * 
 * A high-energy, retro arcade-inspired theme featuring bright fluorescent colors
 * on a near-black background. Designed to evoke the feel of classic 1980s arcade
 * games with neon signs and glowing displays. The extremely high contrast between
 * bright colors and dark background ensures excellent visibility while creating
 * an immersive arcade cabinet aesthetic.
 * 
 * Color Philosophy:
 * - Electric cyan primary for that classic neon glow
 * - Magenta and yellow accents for true arcade palette
 * - Near-black background (#0D0D0D) for authentic dark arcade feel
 * - Electric green snake (#39FF14) - brightest, most visible green possible
 * - Hot pink food (#FF073A) stands out brilliantly against dark backdrop
 * - High contrast design reduces eye strain during extended play
 * 
 * Accessibility Note:
 * - White text on near-black background provides >20:1 contrast ratio (WCAG AAA)
 * - Bright neon colors are intentionally intense for arcade aesthetic
 * - May be visually jarring for some users - this is by design
 */
export const neonTheme: Theme = {
  id: 'neon',
  name: 'Neon Arcade',
  emoji: '💜',
  colors: {
    primary: '#00FFFF',        // Cyan neon
    primaryDark: '#00CCCC',    // Darker cyan
    secondary: '#FF00FF',      // Magenta neon
    background: '#0D0D0D',     // Near black
    surface: '#1A1A1A',        // Dark gray
    surfaceLight: '#2A2A2A',   // Lighter dark gray
    text: '#FFFFFF',           // White
    textSecondary: '#CCCCCC',  // Light gray
    snake: '#39FF14',          // Electric green (brightest visible green)
    snakeHead: '#00FF00',      // Bright green
    food: '#FF073A',           // Hot pink/red
    board: '#0D0D0D',          // Near black
    boardCell: '#1A1A1A',      // Subtle grid
  },
};

export default neonTheme;
