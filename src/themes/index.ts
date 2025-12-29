import { defaultTheme } from './default';
import { jungleTheme } from './jungle';
import { oceanTheme } from './ocean';
import { spaceTheme } from './space';
import { candyTheme } from './candy';
import { neonTheme } from './neon';
import { desertTheme } from './desert';
import { winterTheme } from './winter';
import type { Theme, ThemeId } from '@/types';

/**
 * Theme registry
 * Contains all available themes indexed by their ID
 */
export const themes: Record<ThemeId, Theme> = {
  default: defaultTheme, // Keep for backward compatibility (maps to jungle)
  jungle: jungleTheme,
  ocean: oceanTheme,
  space: spaceTheme,
  candy: candyTheme,
  neon: neonTheme,      // Story 3.4
  desert: desertTheme,  // Story 3.4
  winter: winterTheme,  // Story 3.4
};

/**
 * Get theme by ID
 * @param id - Theme identifier
 * @returns Theme object or undefined if not found
 */
export function getTheme(id: ThemeId): Theme {
  return themes[id] || defaultTheme;
}

/**
 * Get all available themes
 * @returns Array of all theme objects
 */
export function getAllThemes(): Theme[] {
  return Object.values(themes);
}

// Re-export theme types for convenience
export type { Theme, ThemeId, ThemeColors } from '@/types';
export { defaultTheme };
