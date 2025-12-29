import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameMode } from './gameStore';
import type { ThemeId } from '@/types';
import { applyTheme } from '@/utils/theme';
import { getTheme } from '@/themes';

/**
 * Settings state interface
 * Stores user preferences that persist across sessions
 */
interface SettingsState {
  /** Current game mode (classic or speed) */
  gameMode: GameMode;
  /** Update the game mode preference */
  setGameMode: (mode: GameMode) => void;
  /** Current theme ID */
  currentTheme: ThemeId;
  /** Update the current theme and apply it */
  setTheme: (themeId: ThemeId) => void;
  /** Whether to show on-screen D-pad controls (mobile/tablet) */
  showDPad: boolean;
  /** Toggle the D-pad visibility */
  toggleDPad: () => void;
}

/**
 * Settings store with localStorage persistence
 * Saves user preferences like game mode selection and theme
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      gameMode: 'classic',
      setGameMode: (mode: GameMode) => set({ gameMode: mode }),
      currentTheme: 'jungle',
      setTheme: (themeId: ThemeId) => {
        set({ currentTheme: themeId });
        // Apply theme immediately
        const theme = getTheme(themeId);
        if (theme) {
          applyTheme(theme);
        }
      },
      showDPad: true,
      toggleDPad: () => set((state) => ({ showDPad: !state.showDPad })),
    }),
    {
      name: 'snake-game-settings',
    }
  )
);
