import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameMode } from './gameStore';

/**
 * Represents a single high score entry in the leaderboard.
 * Each entry captures the score, when it was achieved, and which game mode.
 */
export interface HighScoreEntry {
  /** The final score achieved in the game */
  score: number;
  /** Date the score was achieved in YYYY-MM-DD format */
  date: string;
  /** Game mode the score was achieved in */
  mode: GameMode;
}

/**
 * Leaderboard state interface
 * Stores and manages the top 10 high scores with localStorage persistence
 */
interface LeaderboardState {
  /** Array of high score entries, sorted in descending order by score */
  scores: HighScoreEntry[];

  /**
   * Add a new score to the leaderboard
   * @param score - The score to add
   * @param mode - The game mode the score was achieved in
   * @returns true if the score qualifies for the top 10, false otherwise
   */
  addScore: (score: number, mode: GameMode) => boolean;

  /**
   * Get the top N scores from the leaderboard
   * @param limit - Number of scores to return (default: 10)
   * @returns Array of high score entries, sorted descending by score
   */
  getTopScores: (limit?: number) => HighScoreEntry[];

  /**
   * Clear all scores from the leaderboard
   * Useful for testing and potential "reset all" feature
   */
  clearScores: () => void;
}

/**
 * Leaderboard store with localStorage persistence
 * Automatically saves the top 10 high scores and loads them on page refresh
 */
export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      scores: [],

      addScore: (score: number, mode: GameMode): boolean => {
        // Don't add scores of 0 to the leaderboard
        if (score === 0) {
          return false;
        }

        // Get current date in YYYY-MM-DD format
        const date = new Date().toISOString().split('T')[0];

        // Create new entry
        const newEntry: HighScoreEntry = { score, date, mode };

        // Get current scores
        const currentScores = get().scores;

        // Add new entry, sort descending, keep top 10
        const updatedScores = [...currentScores, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        // Update state
        set({ scores: updatedScores });

        // Return true if the new score is in the top 10
        return updatedScores.some(
          (entry) =>
            entry.score === score && entry.date === date && entry.mode === mode
        );
      },

      getTopScores: (limit: number = 10): HighScoreEntry[] => {
        return get().scores.slice(0, limit);
      },

      clearScores: () => {
        set({ scores: [] });
      },
    }),
    {
      name: 'snake-game-leaderboard',
    }
  )
);
