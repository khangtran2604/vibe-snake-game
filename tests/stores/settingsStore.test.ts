import { describe, it, expect, beforeEach } from 'vitest';
import { useSettingsStore } from '@/stores/settingsStore';

describe('settingsStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useSettingsStore.persist.clearStorage();
  });

  it('initializes with classic mode by default', () => {
    const { gameMode } = useSettingsStore.getState();
    expect(gameMode).toBe('classic');
  });

  it('updates game mode to speed', () => {
    const { setGameMode } = useSettingsStore.getState();
    setGameMode('speed');
    expect(useSettingsStore.getState().gameMode).toBe('speed');
  });

  it('updates game mode back to classic', () => {
    const { setGameMode } = useSettingsStore.getState();
    setGameMode('speed');
    setGameMode('classic');
    expect(useSettingsStore.getState().gameMode).toBe('classic');
  });

  it('persists mode to localStorage', () => {
    const { setGameMode } = useSettingsStore.getState();
    setGameMode('speed');
    
    // Verify localStorage was updated
    const stored = localStorage.getItem('snake-game-settings');
    expect(stored).toContain('speed');
  });

  it('loads persisted mode on initialization', () => {
    // Manually set localStorage
    localStorage.setItem('snake-game-settings', JSON.stringify({ 
      state: { gameMode: 'speed' }, 
      version: 0 
    }));
    
    // Trigger rehydration
    useSettingsStore.persist.rehydrate();
    
    const { gameMode } = useSettingsStore.getState();
    expect(gameMode).toBe('speed');
  });

  it('initializes with D-pad visible by default', () => {
    const { showDPad } = useSettingsStore.getState();
    expect(showDPad).toBe(true);
  });

  it('toggles D-pad visibility', () => {
    const { toggleDPad } = useSettingsStore.getState();
    
    // Start with default (true)
    expect(useSettingsStore.getState().showDPad).toBe(true);
    
    // Toggle to false
    toggleDPad();
    expect(useSettingsStore.getState().showDPad).toBe(false);
    
    // Toggle back to true
    toggleDPad();
    expect(useSettingsStore.getState().showDPad).toBe(true);
  });

  it('persists D-pad visibility to localStorage', () => {
    const { toggleDPad } = useSettingsStore.getState();
    
    // Toggle to false
    toggleDPad();
    
    // Verify localStorage was updated
    const stored = localStorage.getItem('snake-game-settings');
    expect(stored).toContain('"showDPad":false');
  });
});
