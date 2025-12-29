import type { Position } from '@/types';
import { GRID_SIZE } from '@/utils/constants';

/**
 * Checks if the snake head occupies the same cell as the food.
 *
 * @param head - Position of the snake's head
 * @param food - Position of the food
 * @returns True if head and food are at the same position
 */
export function checkFoodCollision(head: Position, food: Position): boolean {
  return head.x === food.x && head.y === food.y;
}

/**
 * Checks if the snake head has collided with any wall boundary.
 *
 * @param head - Position of the snake's head
 * @returns True if head is outside the grid boundaries
 */
export function checkWallCollision(head: Position): boolean {
  return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
}

/**
 * Checks if the snake head has collided with any of its body segments.
 *
 * @param head - Position of the snake's head
 * @param body - Array of body segment positions (should exclude the head)
 * @returns True if head collides with any body segment
 */
export function checkSelfCollision(head: Position, body: Position[]): boolean {
  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}
