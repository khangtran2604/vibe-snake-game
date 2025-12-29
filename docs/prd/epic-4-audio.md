# Epic 4: Audio System

**Goal:** Implement engaging sound effects and background music with user controls, creating an immersive audio experience that enhances gameplay while respecting user preferences.

**Dependencies:** Epic 1 (Core Game), Epic 2 (Settings Store)

**Stories:** 4

---

## Story 4.1: Audio System Setup

**Status:** Draft

**As a** developer,
**I want** an audio management system,
**So that** sounds can be played and controlled reliably.

### Acceptance Criteria

1. Audio manager utility/hook created for playing sounds
2. Support for playing one-shot sound effects
3. Support for looping background music
4. Audio files loaded and cached efficiently
5. Audio state stored in Zustand (sfxEnabled, musicEnabled, sfxVolume, musicVolume)
6. Audio respects browser autoplay policies (user interaction required)

### Technical Notes

- Use Howler.js for cross-browser audio
- Create AudioManager singleton class
- Reference architecture doc for implementation
- First audio play must happen after user interaction

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Works on Chrome, Firefox, Safari
- [ ] Autoplay policy handled
- [ ] Code reviewed

---

## Story 4.2: Sound Effects Implementation

**Status:** Draft

**As a** player,
**I want** sound effects for game actions,
**So that** the game feels more responsive and fun.

### Acceptance Criteria

1. Sound effect plays when snake eats food (satisfying chomp/pop)
2. Sound effect plays on game over (negative but not scary)
3. Sound effect plays on button clicks/interactions (subtle click)
4. Sound effect plays on high score achievement (celebratory)
5. All sound effects are short, clear, and kid-appropriate
6. Sound effects don't overlap badly when triggered rapidly

### Technical Notes

- Source royalty-free sound effects
- Keep files small (<50KB each)
- Use MP3 format for broad compatibility

### Audio Assets Needed

- `eat.mp3` - Food consumption
- `game-over.mp3` - Death/collision
- `click.mp3` - Button press
- `high-score.mp3` - Achievement

### Definition of Done

- [ ] All acceptance criteria met
- [ ] All 4 sound effects working
- [ ] Audio files optimized
- [ ] Code reviewed

---

## Story 4.3: Background Music

**Status:** Draft

**As a** player,
**I want** background music during gameplay,
**So that** the game is more immersive and engaging.

### Acceptance Criteria

1. Background music plays during active gameplay
2. Music loops seamlessly without gaps
3. Music stops or pauses on game over/pause
4. Music resumes on game resume/restart
5. Music volume balanced with sound effects
6. Music is upbeat, kid-friendly, and not distracting
7. Music starts after user interaction (respecting autoplay policy)

### Technical Notes

- Source royalty-free background music
- Keep file size reasonable (<500KB)
- Use Howler.js loop feature

### Audio Assets Needed

- `background-music.mp3` - Main game music (loopable)

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Music loops seamlessly
- [ ] Volume balanced
- [ ] Code reviewed

---

## Story 4.4: Audio Controls

**Status:** Draft

**As a** player,
**I want** to control sound settings,
**So that** I can mute or adjust audio as needed.

### Acceptance Criteria

1. Sound effects toggle (on/off) accessible from menu/settings
2. Music toggle (on/off) accessible from menu/settings
3. Quick mute button visible during gameplay
4. Audio preferences persist in localStorage
5. Visual indicators show current audio state (icons)
6. Toggling audio provides immediate feedback
7. Controls accessible via keyboard

### Technical Notes

- Add toggles to Settings panel
- Show speaker icon with state in game UI
- Use settingsStore persist middleware

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Settings persist
- [ ] Icons update correctly
- [ ] Code reviewed

---

## Epic Completion Checklist

- [ ] All 4 stories completed and reviewed
- [ ] Sound effects working for all events
- [ ] Background music loops correctly
- [ ] Audio controls functional
- [ ] Preferences persist
- [ ] Autoplay policies respected
- [ ] Audio files optimized
