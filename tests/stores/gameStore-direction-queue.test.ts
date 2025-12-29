import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '@/stores/gameStore';

describe('GameStore Direction Queue', () => {
  beforeEach(() => {
    // Reset store to initial state
    useGameStore.setState({
      gameStatus: 'idle',
      snake: [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ],
      food: { x: 15, y: 10 },
      direction: 'RIGHT',
      nextDirection: null,
      score: 0,
      currentMode: 'classic',
      speed: 150,
      foodEaten: 0,
      isNewHighScore: false,
    });
  });

  it('should queue a valid direction change', () => {
    const { setDirection, direction, nextDirection } = useGameStore.getState();

    expect(direction).toBe('RIGHT');
    expect(nextDirection).toBe(null);

    // Change to UP (valid, not opposite)
    setDirection('UP');

    const state = useGameStore.getState();
    expect(state.direction).toBe('RIGHT'); // Should not change immediately
    expect(state.nextDirection).toBe('UP'); // Should be queued
  });

  it('should prevent opposite direction in queue', () => {
    const { setDirection } = useGameStore.getState();

    // Try to reverse from RIGHT to LEFT
    setDirection('LEFT');

    const state = useGameStore.getState();
    expect(state.direction).toBe('RIGHT');
    expect(state.nextDirection).toBe(null); // Should NOT queue opposite direction
  });

  it('should prevent rapid double-tap reversal', () => {
    const { setDirection } = useGameStore.getState();

    // Simulate rapid key presses: UP then LEFT
    // Snake is moving RIGHT
    setDirection('UP'); // Valid: RIGHT -> UP

    let state = useGameStore.getState();
    expect(state.nextDirection).toBe('UP');

    setDirection('LEFT'); // Should check against queued UP (opposite)

    state = useGameStore.getState();
    expect(state.nextDirection).toBe('UP'); // Should still be UP, LEFT rejected
  });

  it('should apply queued direction on tick', () => {
    useGameStore.setState({ gameStatus: 'playing' });
    const { setDirection, tick } = useGameStore.getState();

    // Queue UP direction
    setDirection('UP');
    expect(useGameStore.getState().nextDirection).toBe('UP');

    // Tick should apply the queued direction
    tick();

    const state = useGameStore.getState();
    expect(state.direction).toBe('UP'); // Direction should now be UP
    expect(state.nextDirection).toBe(null); // Queue should be cleared
  });

  it('should clear queue after each tick', () => {
    useGameStore.setState({ gameStatus: 'playing' });
    const { setDirection, tick } = useGameStore.getState();

    setDirection('UP');
    tick();

    let state = useGameStore.getState();
    expect(state.nextDirection).toBe(null);

    // Now queue another direction
    setDirection('LEFT');
    state = useGameStore.getState();
    expect(state.nextDirection).toBe('LEFT');

    tick();
    state = useGameStore.getState();
    expect(state.direction).toBe('LEFT');
    expect(state.nextDirection).toBe(null);
  });

  it('should handle triple rapid key press correctly', () => {
    const { setDirection } = useGameStore.getState();

    // Simulate: RIGHT (current) -> UP -> LEFT -> DOWN (all rapid)
    setDirection('UP'); // Valid
    expect(useGameStore.getState().nextDirection).toBe('UP');

    setDirection('LEFT'); // Opposite of queued UP, should be rejected
    expect(useGameStore.getState().nextDirection).toBe('UP');

    setDirection('DOWN'); // Opposite of queued UP, should be rejected
    expect(useGameStore.getState().nextDirection).toBe('UP');
  });

  it('should allow same direction without queuing', () => {
    const { setDirection } = useGameStore.getState();

    // Try to set same direction
    setDirection('RIGHT');

    const state = useGameStore.getState();
    expect(state.direction).toBe('RIGHT');
    expect(state.nextDirection).toBe(null); // Should not queue same direction
  });

  it('should handle direction change after queue is consumed', () => {
    useGameStore.setState({ gameStatus: 'playing' });
    const { setDirection, tick } = useGameStore.getState();

    // First change: RIGHT -> UP
    setDirection('UP');
    tick(); // Consume queue

    let state = useGameStore.getState();
    expect(state.direction).toBe('UP');
    expect(state.nextDirection).toBe(null);

    // Now try DOWN (opposite of current UP)
    setDirection('DOWN');
    state = useGameStore.getState();
    expect(state.nextDirection).toBe(null); // Should be rejected

    // Now try LEFT (valid from UP)
    setDirection('LEFT');
    state = useGameStore.getState();
    expect(state.nextDirection).toBe('LEFT'); // Should be queued
  });
});
