import type { Position } from '@/types';
import { GRID_SIZE } from '@/utils/constants';

/**
 * Checks if a position is occupied by any snake segment.
 */
function isPositionOccupied(position: Position, segments: Position[]): boolean {
  return segments.some((seg) => seg.x === position.x && seg.y === position.y);
}

/**
 * Generates a random position within the grid bounds.
 */
function getRandomPosition(): Position {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}

/**
 * Spawns food at a random position not occupied by the snake.
 * Uses rejection sampling to find a valid position.
 *
 * @param snakeSegments - Array of positions occupied by the snake
 * @returns A valid position for the food
 */
export function spawnFood(snakeSegments: Position[]): Position {
  let position = getRandomPosition();

  // Keep generating until we find a position not occupied by the snake
  // This is safe because the grid is much larger than the initial snake
  while (isPositionOccupied(position, snakeSegments)) {
    position = getRandomPosition();
  }

  return position;
}
