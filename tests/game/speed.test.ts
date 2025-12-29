import { describe, it, expect } from 'vitest';
import { calculateSpeed } from '@/game/speed';
import {
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_INCREMENT,
  SPEED_MODE_INITIAL,
  SPEED_MODE_INCREMENT,
  MIN_SPEED_MODE,
} from '@/utils/constants';

describe('calculateSpeed', () => {
  describe('Classic Mode', () => {
    it('returns initial speed when no food eaten', () => {
      const speed = calculateSpeed(0, 'classic');
      expect(speed).toBe(INITIAL_SPEED); // 150ms
    });

    it('returns same speed when food eaten less than threshold', () => {
      const speed = calculateSpeed(2, 'classic');
      expect(speed).toBe(INITIAL_SPEED); // Still 150ms
    });

    it('decreases speed by increment after first threshold', () => {
      const speed = calculateSpeed(3, 'classic');
      expect(speed).toBe(INITIAL_SPEED - SPEED_INCREMENT); // 145ms
    });

    it('decreases speed correctly after multiple thresholds', () => {
      const speed = calculateSpeed(9, 'classic');
      expect(speed).toBe(INITIAL_SPEED - 3 * SPEED_INCREMENT); // 135ms
    });

    it('enforces minimum speed limit', () => {
      const speed = calculateSpeed(100, 'classic');
      expect(speed).toBe(MIN_SPEED); // 50ms, not lower
    });

    it('calculates speed at exact minimum threshold', () => {
      // (150 - 50) / 5 = 20 speed increases
      // 20 * 3 = 60 food needed to reach minimum
      const speed = calculateSpeed(60, 'classic');
      expect(speed).toBe(MIN_SPEED); // 50ms
    });

    it('handles edge case with 6 food eaten', () => {
      const speed = calculateSpeed(6, 'classic');
      expect(speed).toBe(140); // 150 - (2 * 5)
    });
  });

  describe('Speed Mode', () => {
    it('returns initial speed when no food eaten', () => {
      const speed = calculateSpeed(0, 'speed');
      expect(speed).toBe(SPEED_MODE_INITIAL); // 100ms
    });

    it('returns same speed when food eaten less than threshold', () => {
      const speed = calculateSpeed(1, 'speed');
      expect(speed).toBe(SPEED_MODE_INITIAL); // Still 100ms
    });

    it('decreases speed by increment after first threshold', () => {
      const speed = calculateSpeed(2, 'speed');
      expect(speed).toBe(SPEED_MODE_INITIAL - SPEED_MODE_INCREMENT); // 92ms
    });

    it('decreases speed correctly after multiple thresholds', () => {
      const speed = calculateSpeed(6, 'speed');
      expect(speed).toBe(SPEED_MODE_INITIAL - 3 * SPEED_MODE_INCREMENT); // 76ms
    });

    it('enforces minimum speed limit', () => {
      const speed = calculateSpeed(100, 'speed');
      expect(speed).toBe(MIN_SPEED_MODE); // 40ms, not lower
    });

    it('calculates speed at exact minimum threshold', () => {
      // (100 - 40) / 8 = 7.5, rounds to 7 speed increases
      // 8 * 2 = 16 food needed to reach minimum
      const speed = calculateSpeed(16, 'speed');
      expect(speed).toBe(MIN_SPEED_MODE); // 40ms
    });

    it('handles edge case with 4 food eaten', () => {
      const speed = calculateSpeed(4, 'speed');
      expect(speed).toBe(84); // 100 - (2 * 8)
    });
  });

  describe('Edge Cases', () => {
    it('handles zero food eaten in both modes', () => {
      expect(calculateSpeed(0, 'classic')).toBe(INITIAL_SPEED);
      expect(calculateSpeed(0, 'speed')).toBe(SPEED_MODE_INITIAL);
    });

    it('handles extremely high food counts', () => {
      const classicSpeed = calculateSpeed(9999, 'classic');
      const speedModeSpeed = calculateSpeed(9999, 'speed');

      expect(classicSpeed).toBe(MIN_SPEED);
      expect(speedModeSpeed).toBe(MIN_SPEED_MODE);
    });

    it('handles food count exactly at threshold boundaries', () => {
      // Classic: 3, 6, 9
      expect(calculateSpeed(3, 'classic')).toBe(145);
      expect(calculateSpeed(6, 'classic')).toBe(140);
      expect(calculateSpeed(9, 'classic')).toBe(135);

      // Speed: 2, 4, 6
      expect(calculateSpeed(2, 'speed')).toBe(92);
      expect(calculateSpeed(4, 'speed')).toBe(84);
      expect(calculateSpeed(6, 'speed')).toBe(76);
    });
  });
});
