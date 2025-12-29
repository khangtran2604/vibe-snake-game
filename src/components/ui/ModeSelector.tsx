import { useSettingsStore, type GameMode } from '@/stores';
import { Button } from '@/components/ui';

/**
 * Mode selector component for choosing between Classic and Speed modes
 * Persists selection to localStorage via settingsStore
 */
export function ModeSelector() {
  const gameMode = useSettingsStore((state) => state.gameMode);
  const setGameMode = useSettingsStore((state) => state.setGameMode);

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
  };

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <h2 className="text-base md:text-lg lg:text-xl font-bold text-white">Choose Your Mode</h2>
      <div className="flex gap-3 md:gap-4">
        <Button
          variant={gameMode === 'classic' ? 'primary' : 'tertiary'}
          onClick={() => handleModeChange('classic')}
          className="min-w-[120px] md:min-w-[140px]"
          aria-label="Classic mode"
          aria-pressed={gameMode === 'classic'}
        >
          🐢 Classic
        </Button>
        <Button
          variant={gameMode === 'speed' ? 'secondary' : 'tertiary'}
          onClick={() => handleModeChange('speed')}
          className="min-w-[120px] md:min-w-[140px]"
          aria-label="Speed mode"
          aria-pressed={gameMode === 'speed'}
        >
          ⚡ Speed
        </Button>
      </div>
    </div>
  );
}
