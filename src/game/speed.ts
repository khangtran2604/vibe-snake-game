import type { GameMode } from '@/stores/gameStore';
import {
  INITIAL_SPEED,
  SPEED_MODE_INITIAL,
  MIN_SPEED,
  MIN_SPEED_MODE,
  SPEED_INCREMENT,
  SPEED_MODE_INCREMENT,
  FOOD_PER_SPEED_INCREASE,
  SPEED_MODE_FOOD_THRESHOLD,
} from '@/utils/constants';

/**
 * Calculates the new game speed based on mode and food eaten count.
 * Speed in this game refers to the interval (ms) between game ticks.
 * Lower speed value = faster gameplay.
 *
 * @param foodEaten - Total number of food items eaten in the current game
 * @param gameMode - The current game mode ('classic' or 'speed')
 * @returns The new speed interval in milliseconds
 */
export function calculateSpeed(foodEaten: number, gameMode: GameMode): number {
  // Get mode-specific values
  const initialSpeed =
    gameMode === 'classic' ? INITIAL_SPEED : SPEED_MODE_INITIAL;
  const increment =
    gameMode === 'classic' ? SPEED_INCREMENT : SPEED_MODE_INCREMENT;
  const threshold =
    gameMode === 'classic'
      ? FOOD_PER_SPEED_INCREASE
      : SPEED_MODE_FOOD_THRESHOLD;
  const minSpeed = gameMode === 'classic' ? MIN_SPEED : MIN_SPEED_MODE;

  // Calculate how many speed increases should have occurred
  const speedIncreases = Math.floor(foodEaten / threshold);

  // Calculate target speed (lower = faster)
  const targetSpeed = initialSpeed - speedIncreases * increment;

  // Clamp to minimum speed
  return Math.max(targetSpeed, minSpeed);
}
