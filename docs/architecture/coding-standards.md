# Coding Standards

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `GameBoard.tsx`, `ScoreDisplay.tsx` |
| Hooks | camelCase with `use` prefix | `useGameLoop.ts`, `useAudio.ts` |
| Stores | camelCase with `Store` suffix | `gameStore.ts`, `settingsStore.ts` |
| Utilities | camelCase | `cn.ts`, `storage.ts` |
| Types/Interfaces | PascalCase | `GameState`, `Position`, `Theme` |
| Constants | SCREAMING_SNAKE_CASE | `GRID_SIZE`, `INITIAL_SPEED` |
| CSS classes | kebab-case (Tailwind) | `bg-primary`, `text-lg` |
| Event handlers | camelCase with `handle` prefix | `handleKeyDown`, `handlePause` |
| Boolean props | camelCase with `is`/`has` prefix | `isPlaying`, `hasSoundEnabled` |

## Critical Coding Rules

1. **Never mutate state directly** - Always use Zustand actions or React setState
2. **Keep game logic separate from React** - Core game functions in `/game` should be pure functions
3. **Use TypeScript strictly** - No `any` types, define interfaces for all data structures
4. **Handle all edge cases** - Check bounds, null values, empty arrays
5. **Optimize game loop** - Avoid creating new objects/arrays in the render loop
6. **Respect reduced motion** - Check `prefers-reduced-motion` for animations
7. **Test game logic thoroughly** - Collision detection, scoring, and speed calculations must be tested
8. **Use semantic HTML** - Proper button elements, headings hierarchy
9. **Ensure keyboard accessibility** - All actions available via keyboard
10. **Keep components small** - Max 150 lines per component, extract logic to hooks

## File Naming

- Components: `PascalCase.tsx` (e.g., `GameBoard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useGameLoop.ts`)
- Utils/Services: `camelCase.ts` (e.g., `audio.ts`)
- Types: `camelCase.ts` (e.g., `game.ts`)
- Tests: `ComponentName.test.tsx` or `module.test.ts`

## Import Patterns

```typescript
// Path aliases (configured in tsconfig.json and vite.config.ts)
import { Button } from '@/components/ui';
import { useGameStore } from '@/stores';
import { useGameLoop } from '@/hooks';
import type { Position, Direction } from '@/types';
import { GRID_SIZE } from '@/utils/constants';
```

## Component Template

```typescript
// src/components/ui/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          // Base styles
          'font-bold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          // Variant styles
          {
            'bg-primary text-white hover:bg-primary-dark focus:ring-primary':
              variant === 'primary',
            'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary':
              variant === 'secondary',
            'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary':
              variant === 'tertiary',
          },
          // Size styles
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-lg': size === 'md',
            'px-8 py-4 text-xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
```

## Constants

```typescript
// src/utils/constants.ts
export const GRID_SIZE = 20;
export const INITIAL_SNAKE_LENGTH = 3;
export const INITIAL_SPEED = 150; // ms per tick
export const MIN_SPEED = 50; // fastest possible
export const POINTS_PER_FOOD = 10;
export const SPEED_INCREMENT = 5; // ms faster per threshold
export const FOOD_PER_SPEED_INCREASE = 3; // Classic mode
export const SPEED_MODE_INITIAL = 100;
export const SPEED_MODE_INCREMENT = 8;
export const SPEED_MODE_FOOD_THRESHOLD = 2;
```

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run with coverage report

# Linting
npm run lint         # Run ESLint
npm run lint:fix     # Fix auto-fixable issues
npm run format       # Run Prettier
```
