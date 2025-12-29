import type { Theme } from '@/types';

/**
 * Converts hex color to RGB values for CSS custom properties
 * Tailwind requires RGB format for alpha support: rgb(var(--color) / <alpha>)
 * 
 * @param hex - Hex color string (e.g., "#22c55e" or "22c55e")
 * @returns RGB values as space-separated string (e.g., "34 197 94")
 * 
 * @example
 * hexToRgb("#22c55e") // returns "34 197 94"
 * hexToRgb("#ffffff") // returns "255 255 255"
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    console.warn(`Invalid hex color: ${hex}`);
    return '0 0 0'; // Fallback to black
  }
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r} ${g} ${b}`;
}

/**
 * Applies theme colors to CSS custom properties on :root
 * Updates all color variables so Tailwind classes reflect the new theme
 * 
 * This function converts camelCase color keys to kebab-case CSS variable names
 * and converts hex colors to RGB format for Tailwind's alpha value support.
 * 
 * @param theme - Theme object containing color palette
 * 
 * @example
 * applyTheme(defaultTheme);
 * // Sets CSS variables:
 * // --color-primary: 34 197 94
 * // --color-snake-head: 74 222 128
 * // etc.
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const { colors } = theme;

  // Convert camelCase to kebab-case and set CSS variables
  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    const rgbValue = hexToRgb(value);
    root.style.setProperty(cssVarName, rgbValue);
  });
}
