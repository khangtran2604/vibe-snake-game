# Epic 2: Game Modes & Scoring System

**Goal:** Implement game mode selection with distinct gameplay characteristics, persistent high score tracking, and a leaderboard display. Players can choose their preferred mode and compete against their own records.

**Dependencies:** Epic 1 (Core Game)

**Stories:** 6

---

## Story 2.1: Game State Management with Zustand

**Status:** Draft

**As a** developer,
**I want** centralized game state management,
**So that** game state is predictable and easily accessible across components.

### Acceptance Criteria

1. Zustand store created for game state (gameStore)
2. Store manages: gameStatus, score, highScores, currentMode, snakePosition, foodPosition, direction
3. Actions implemented: startGame, pauseGame, resumeGame, endGame, updateScore, resetGame
4. Store integrates with existing game loop and components
5. Components refactored to use store instead of local state where appropriate
6. Game functionality unchanged after refactor

### Technical Notes

- Use subscribeWithSelector middleware for performance
- Keep game logic functions pure, store only calls them
- Reference architecture doc for store patterns

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Game works identically to before refactor
- [ ] No performance regression
- [ ] Code reviewed

---

## Story 2.2: Main Menu Screen

**Status:** Draft

**As a** player,
**I want** a main menu to start the game,
**So that** I can access game options before playing.

### Acceptance Criteria

1. Main menu screen displays on app launch
2. Game title "Snake Game" prominently displayed with playful styling
3. "Play" button navigates to game screen and starts game
4. Menu layout is centered and visually appealing
5. Buttons have hover/active states for feedback
6. Menu is keyboard navigable (Tab + Enter)

### Technical Notes

- Create MainMenu screen component
- Use React Router for navigation
- Apply theme colors to menu

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Responsive on all breakpoints
- [ ] Keyboard navigation works
- [ ] Code reviewed

---

## Story 2.3: Game Mode Selection

**Status:** Draft

**As a** player,
**I want** to choose between Classic and Speed modes,
**So that** I can play the style I prefer.

### Acceptance Criteria

1. Mode selection UI on main menu (toggle or buttons)
2. Classic Mode: starts at base speed (150ms), speed increases as snake grows
3. Speed Mode: starts at faster speed (100ms), more aggressive speed increase
4. Selected mode is visually highlighted
5. Mode selection persists in localStorage
6. Game applies correct speed settings based on selected mode
7. Current mode displayed during gameplay

### Technical Notes

- Add gameMode to settingsStore
- Create mode constants for speed values
- Persist with Zustand persist middleware

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Both modes play correctly
- [ ] Preference persists across sessions
- [ ] Code reviewed

---

## Story 2.4: Progressive Speed Increase

**Status:** Draft

**As a** player,
**I want** the game to get faster as I progress,
**So that** the challenge increases over time.

### Acceptance Criteria

1. Classic Mode: speed increases by 5ms for every 3 food items eaten (minimum 50ms)
2. Speed Mode: speed increases by 8ms for every 2 food items eaten (minimum 40ms)
3. Speed transitions are smooth without jarring changes
4. Current speed level/difficulty could be subtly indicated (optional visual)
5. Speed resets to mode default on new game

### Technical Notes

- Create calculateSpeed utility function
- Track food eaten count in game store
- Reference constants for speed increments

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Speed increases feel smooth
- [ ] Minimum speed limits enforced
- [ ] Code reviewed

---

## Story 2.5: High Score Persistence

**Status:** Draft

**As a** player,
**I want** my high scores saved,
**So that** I can track my progress over time.

### Acceptance Criteria

1. High scores array stored in localStorage (max 10 entries)
2. Each entry contains: score, date, game mode
3. Scores sorted in descending order
4. New high score detected when current score qualifies for top 10
5. High score notification shown on game over if achieved
6. Scores persist across browser sessions

### Technical Notes

- Create leaderboardStore with persist middleware
- Add addScore action that returns boolean for high score detection
- Format date as YYYY-MM-DD

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Scores persist after browser close
- [ ] High score detection works correctly
- [ ] Code reviewed

---

## Story 2.6: Leaderboard Screen

**Status:** Draft

**As a** player,
**I want** to view the leaderboard,
**So that** I can see my best scores.

### Acceptance Criteria

1. Leaderboard accessible from main menu via "Leaderboard" button
2. Displays top 10 scores in ranked list format
3. Each entry shows: rank, score, game mode, date
4. Current session's high score highlighted if present
5. "Back" button returns to main menu
6. Empty state message when no scores exist
7. Leaderboard is scrollable if needed on small screens

### Technical Notes

- Create LeaderboardScreen component
- Show medal icons for top 3 positions
- Add encouraging empty state message

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Empty state displays correctly
- [ ] Responsive on mobile
- [ ] Code reviewed

---

## Epic Completion Checklist

- [ ] All 6 stories completed and reviewed
- [ ] Zustand state management working
- [ ] Both game modes functional
- [ ] Leaderboard displays correctly
- [ ] High scores persist
- [ ] Speed progression feels good
