# Testing Patterns

## Component Test Template

```typescript
// tests/components/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies secondary variant styles when specified', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Game Logic Test Template

```typescript
// tests/game/collision.test.ts
import { describe, it, expect } from 'vitest';
import { checkWallCollision, checkSelfCollision } from '@/game/collision';
import type { Position } from '@/types/game';

describe('Collision Detection', () => {
  describe('checkWallCollision', () => {
    it('returns true when snake hits left wall', () => {
      const head: Position = { x: -1, y: 10 };
      expect(checkWallCollision(head, 20)).toBe(true);
    });

    it('returns true when snake hits right wall', () => {
      const head: Position = { x: 20, y: 10 };
      expect(checkWallCollision(head, 20)).toBe(true);
    });

    it('returns true when snake hits top wall', () => {
      const head: Position = { x: 10, y: -1 };
      expect(checkWallCollision(head, 20)).toBe(true);
    });

    it('returns true when snake hits bottom wall', () => {
      const head: Position = { x: 10, y: 20 };
      expect(checkWallCollision(head, 20)).toBe(true);
    });

    it('returns false when snake is within bounds', () => {
      const head: Position = { x: 10, y: 10 };
      expect(checkWallCollision(head, 20)).toBe(false);
    });

    it('returns false at edge of bounds', () => {
      const head: Position = { x: 19, y: 19 };
      expect(checkWallCollision(head, 20)).toBe(false);
    });
  });

  describe('checkSelfCollision', () => {
    it('returns true when head collides with body', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
        { x: 5, y: 5 }, // collision with head
      ];
      expect(checkSelfCollision(snake)).toBe(true);
    });

    it('returns false when no self collision', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
      ];
      expect(checkSelfCollision(snake)).toBe(false);
    });

    it('returns false for minimum snake length', () => {
      const snake: Position[] = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
      ];
      expect(checkSelfCollision(snake)).toBe(false);
    });
  });
});
```

## Store Test Template

```typescript
// tests/stores/gameStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '@/stores/gameStore';

describe('gameStore', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  it('starts with idle status', () => {
    expect(useGameStore.getState().status).toBe('idle');
  });

  it('changes status to playing on startGame', () => {
    useGameStore.getState().startGame();
    expect(useGameStore.getState().status).toBe('playing');
  });

  it('resets score on startGame', () => {
    useGameStore.setState({ score: 100 });
    useGameStore.getState().startGame();
    expect(useGameStore.getState().score).toBe(0);
  });

  it('increments score correctly', () => {
    useGameStore.getState().incrementScore(10);
    expect(useGameStore.getState().score).toBe(10);
    useGameStore.getState().incrementScore(10);
    expect(useGameStore.getState().score).toBe(20);
  });

  it('prevents 180-degree direction change', () => {
    useGameStore.setState({ direction: 'right' });
    useGameStore.getState().setDirection('left');
    expect(useGameStore.getState().nextDirection).toBe('right');
  });

  it('allows 90-degree direction change', () => {
    useGameStore.setState({ direction: 'right' });
    useGameStore.getState().setDirection('up');
    expect(useGameStore.getState().nextDirection).toBe('up');
  });
});
```

## Test Setup

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

## Testing Best Practices

1. **Unit Tests**: Test individual components and game logic functions in isolation
2. **Integration Tests**: Test component interactions (e.g., game flow from start to game over)
3. **Coverage Goals**: 80% on game logic, 60% on components
4. **Test Structure**: Follow Arrange-Act-Assert pattern
5. **Mock External Dependencies**: Mock audio, localStorage, and timers in tests
6. **Test Edge Cases**: Boundary conditions, empty states, error scenarios
