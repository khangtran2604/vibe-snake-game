# Audio System

## Audio Manager

```typescript
// src/utils/audio.ts
import { Howl, Howler } from 'howler';

type SoundName = 'eat' | 'gameOver' | 'click' | 'highScore';

class AudioManager {
  private sounds: Map<SoundName, Howl> = new Map();
  private music: Howl | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;

    // Load sound effects
    this.sounds.set('eat', new Howl({ src: ['/audio/eat.mp3'], volume: 0.7 }));
    this.sounds.set('gameOver', new Howl({ src: ['/audio/game-over.mp3'], volume: 0.6 }));
    this.sounds.set('click', new Howl({ src: ['/audio/click.mp3'], volume: 0.5 }));
    this.sounds.set('highScore', new Howl({ src: ['/audio/high-score.mp3'], volume: 0.8 }));

    // Load background music
    this.music = new Howl({
      src: ['/audio/background-music.mp3'],
      volume: 0.5,
      loop: true,
    });

    this.initialized = true;
  }

  playSfx(name: SoundName) {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.play();
    }
  }

  playMusic() {
    if (this.music && !this.music.playing()) {
      this.music.play();
    }
  }

  pauseMusic() {
    if (this.music) {
      this.music.pause();
    }
  }

  stopMusic() {
    if (this.music) {
      this.music.stop();
    }
  }

  setSfxVolume(volume: number) {
    this.sounds.forEach((sound) => sound.volume(volume));
  }

  setMusicVolume(volume: number) {
    if (this.music) {
      this.music.volume(volume);
    }
  }

  mute(muted: boolean) {
    Howler.mute(muted);
  }
}

export const audioManager = new AudioManager();
```

## Audio Hook

```typescript
// src/hooks/useAudio.ts
import { useEffect } from 'react';
import { audioManager } from '@/utils/audio';
import { useSettingsStore } from '@/stores';

export function useAudio() {
  const { sfxEnabled, musicEnabled, sfxVolume, musicVolume } = useSettingsStore();

  useEffect(() => {
    audioManager.init();
  }, []);

  useEffect(() => {
    audioManager.setSfxVolume(sfxEnabled ? sfxVolume : 0);
  }, [sfxEnabled, sfxVolume]);

  useEffect(() => {
    audioManager.setMusicVolume(musicEnabled ? musicVolume : 0);
  }, [musicEnabled, musicVolume]);

  return {
    playSfx: (name: 'eat' | 'gameOver' | 'click' | 'highScore') => {
      if (sfxEnabled) {
        audioManager.playSfx(name);
      }
    },
    playMusic: () => {
      if (musicEnabled) {
        audioManager.playMusic();
      }
    },
    pauseMusic: () => audioManager.pauseMusic(),
    stopMusic: () => audioManager.stopMusic(),
  };
}
```

## Audio Files Required

| File | Purpose | Max Size |
|------|---------|----------|
| `eat.mp3` | Food consumption sound | 50KB |
| `game-over.mp3` | Death/collision sound | 50KB |
| `click.mp3` | Button press sound | 30KB |
| `high-score.mp3` | Achievement celebration | 50KB |
| `background-music.mp3` | Game music (loopable) | 500KB |

## Browser Autoplay Policy

Audio must be initialized after user interaction:

```typescript
// In MainMenu or first user interaction
const handleFirstInteraction = () => {
  audioManager.init();
  // Now audio can be played
};

<Button onClick={handleFirstInteraction}>Play</Button>
```

## Integration with Game

```typescript
// In game loop or component
const { playSfx } = useAudio();

// When eating food
if (checkFoodCollision(head, food)) {
  playSfx('eat');
  // ... rest of logic
}

// On game over
if (collision) {
  playSfx('gameOver');
}
```
