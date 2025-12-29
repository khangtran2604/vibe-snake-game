# Theme System

## Theme Type Definitions

```typescript
// src/themes/types.ts
export interface Theme {
  id: ThemeId;
  name: string;
  emoji: string;
  colors: ThemeColors;
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  snake: string;
  snakeHead: string;
  food: string;
  board: string;
  boardCell: string;
}

export type ThemeId = 'jungle' | 'ocean' | 'space' | 'candy' | 'neon' | 'desert' | 'winter';
```

## Theme Registry

```typescript
// src/themes/index.ts
import { jungleTheme } from './jungle';
import { oceanTheme } from './ocean';
import { spaceTheme } from './space';
import { candyTheme } from './candy';
import { neonTheme } from './neon';
import { desertTheme } from './desert';
import { winterTheme } from './winter';
import type { Theme, ThemeId } from './types';

export const themes: Record<ThemeId, Theme> = {
  jungle: jungleTheme,
  ocean: oceanTheme,
  space: spaceTheme,
  candy: candyTheme,
  neon: neonTheme,
  desert: desertTheme,
  winter: winterTheme,
};

export function applyTheme(themeId: ThemeId) {
  const theme = themes[themeId];
  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    const rgb = hexToRgb(value);
    root.style.setProperty(cssVar, rgb);
  });
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}
```

## Example Theme (Jungle)

```typescript
// src/themes/jungle.ts
import type { Theme } from './types';

export const jungleTheme: Theme = {
  id: 'jungle',
  name: 'Jungle',
  emoji: '🌴',
  colors: {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    secondary: '#8BC34A',
    accent: '#FFEB3B',
    background: '#1B5E20',
    surface: '#2E7D32',
    text: '#FFFFFF',
    textSecondary: '#C8E6C9',
    snake: '#4CAF50',
    snakeHead: '#388E3C',
    food: '#F44336',
    board: '#1B5E20',
    boardCell: '#2E7D32',
  },
};
```

## CSS Variables Setup

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Default Jungle Theme */
    --color-primary: 76 175 80;
    --color-primary-dark: 56 142 60;
    --color-secondary: 139 195 74;
    --color-accent: 255 235 59;
    --color-background: 27 94 32;
    --color-surface: 46 125 50;
    --color-text: 255 255 255;
    --color-text-secondary: 200 230 201;
    --color-snake: 76 175 80;
    --color-snake-head: 56 142 60;
    --color-food: 244 67 54;
    --color-board: 27 94 32;
    --color-board-cell: 46 125 50;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

## Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        },
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        },
        snake: {
          DEFAULT: 'rgb(var(--color-snake) / <alpha-value>)',
          head: 'rgb(var(--color-snake-head) / <alpha-value>)',
        },
        food: 'rgb(var(--color-food) / <alpha-value>)',
        board: {
          DEFAULT: 'rgb(var(--color-board) / <alpha-value>)',
          cell: 'rgb(var(--color-board-cell) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
};
```

## Theme Color Reference

| Theme | Primary | Background | Snake | Food |
|-------|---------|------------|-------|------|
| Jungle | #4CAF50 | #1B5E20 | #4CAF50 | #F44336 |
| Ocean | #0288D1 | #01579B | #00ACC1 | #FF8A65 |
| Space | #7C4DFF | #1A1A2E | #E040FB | #FFD700 |
| Candy | #EC407A | #FCE4EC | #AB47BC | #FF7043 |
| Neon | #00FFFF | #0D0D0D | #39FF14 | #FF073A |
| Desert | #FF8F00 | #E65100 | #8D6E63 | #7CB342 |
| Winter | #42A5F5 | #E3F2FD | #1E88E5 | #B3E5FC |
