import type { Position, Direction } from '@/types';

/**
 * Map of directions to their opposites.
 * Used to prevent the snake from reversing into itself.
 */
const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

/**
 * Checks if two directions are opposite to each other.
 * Used to prevent invalid direction changes (e.g., going left when moving right).
 *
 * @param current - The current direction
 * @param next - The proposed new direction
 * @returns True if directions are opposite, false otherwise
 */
export function isOppositeDirection(
  current: Direction,
  next: Direction
): boolean {
  return OPPOSITE_DIRECTIONS[current] === next;
}

/**
 * Calculates the next head position based on current direction.
 * Note: y increases downward in the grid coordinate system.
 *
 * @param head - Current head position
 * @param direction - Direction of movement
 * @returns New head position
 */
export function getNextHeadPosition(
  head: Position,
  direction: Direction
): Position {
  switch (direction) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
  }
}

/**
 * Moves the snake one cell in the given direction.
 * The snake body follows the head: new head is added at front,
 * last segment is removed to maintain length (unless growing).
 *
 * @param segments - Current snake segments (head at index 0)
 * @param direction - Direction to move
 * @param shouldGrow - If true, keep all segments (snake grows by one)
 * @returns New array of snake segments
 */
export function moveSnake(
  segments: Position[],
  direction: Direction,
  shouldGrow: boolean = false
): Position[] {
  if (segments.length === 0) {
    return segments;
  }

  const head = segments[0];
  const newHead = getNextHeadPosition(head, direction);

  if (shouldGrow) {
    // Keep all segments (don't remove tail) - snake grows
    return [newHead, ...segments];
  }

  // Normal movement - remove tail to maintain length
  return [newHead, ...segments.slice(0, -1)];
}
