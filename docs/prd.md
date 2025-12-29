# Snake Game - Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Deliver a production-quality Snake game web application targeting children ages 6-12
- Provide engaging gameplay through multiple game modes (Classic, Speed) with progressive difficulty
- Offer visual variety with 7 kid-friendly themes to maintain engagement
- Implement local high score tracking and leaderboard to encourage replayability
- Create immersive experience with sound effects and background music
- Ensure accessibility across all devices with responsive design and multiple control options
- Build with modern tech stack (React, TypeScript, Tailwind CSS) for maintainability

### Background Context

The casual gaming market for children continues to grow, with parents actively seeking safe, ad-free gaming experiences. Many existing Snake games are outdated, ad-heavy, or lack mobile support. This project fills the niche with a polished, kid-friendly Snake game featuring colorful themes, multiple game modes, and seamless cross-device play. The game will be a static web application requiring no backend, making it easy to deploy and maintain.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2024-12-28 | 1.0 | Initial PRD creation | PM Agent |
| 2024-12-28 | 1.1 | Added technical note to Story 1.3 re: local state to Zustand refactor; Added parallel execution note to Epic 3 for theme stories | PO Validation |

---

## Requirements

### Functional Requirements

- **FR1:** The game shall display a snake that moves continuously in the current direction on a grid-based game board
- **FR2:** The player shall control snake direction using keyboard arrow keys (desktop) or touch/swipe gestures (mobile)
- **FR3:** The game shall provide on-screen directional buttons as an alternative control method
- **FR4:** Food items shall spawn randomly on the game board in unoccupied cells
- **FR5:** The snake shall grow by one segment when it consumes food
- **FR6:** The game shall end when the snake collides with the wall boundaries or its own body
- **FR7:** The game shall display the current score during gameplay, incrementing when food is consumed
- **FR8:** In Classic Mode, snake speed shall increase progressively as the snake grows longer
- **FR9:** In Speed Mode, the game shall start at a faster base speed with more aggressive speed progression
- **FR10:** The player shall be able to select between Classic Mode and Speed Mode before starting a game
- **FR11:** The game shall persist high scores in local storage, maintaining a list of top 10 scores
- **FR12:** The player shall be able to view the leaderboard showing top 10 high scores
- **FR13:** The player shall be able to pause and resume the game during gameplay
- **FR14:** The game shall display a game over screen showing final score and options to restart or return to menu
- **FR15:** The player shall be able to select from 7 visual themes (Jungle, Ocean, Space, Candy, Neon, Desert, Winter)
- **FR16:** Theme selection shall persist in local storage and apply immediately to the game
- **FR17:** The game shall play sound effects for key events (eating food, game over, button interactions)
- **FR18:** The game shall play looping background music during gameplay
- **FR19:** The player shall be able to independently mute/unmute sound effects and background music
- **FR20:** Audio preferences shall persist in local storage across sessions

### Non-Functional Requirements

- **NFR1:** The game shall maintain 60fps performance during gameplay on modern browsers
- **NFR2:** Initial page load shall complete within 3 seconds on standard broadband connections
- **NFR3:** Input response latency shall be less than 100ms from keypress/touch to snake direction change
- **NFR4:** The game shall support Chrome 90+, Firefox 90+, Safari 14+, and Edge 90+
- **NFR5:** The game shall be fully playable on screen widths from 320px (mobile) to 1920px+ (desktop)
- **NFR6:** All interactive elements shall be accessible via keyboard navigation
- **NFR7:** Color contrast ratios shall meet WCAG AA standards for text elements
- **NFR8:** The application shall function entirely client-side with no backend dependencies
- **NFR9:** Game state and preferences shall persist using browser localStorage
- **NFR10:** The codebase shall use TypeScript for type safety and maintainability

---

## User Interface Design Goals

### Overall UX Vision

A vibrant, playful, and intuitive interface designed specifically for children. The UI should feel fun and engaging with colorful visuals, clear feedback for all actions, and simple navigation that kids can understand without instructions. Large touch targets, animated transitions, and rewarding visual/audio feedback create an enjoyable experience.

### Key Interaction Paradigms

- **Immediate Play:** Users can start playing within 2-3 taps/clicks from landing
- **Visual Feedback:** Every action has clear visual response (button presses, score updates, collisions)
- **Audio Feedback:** Sound reinforces actions and creates engagement
- **Forgiving Controls:** On-screen buttons supplement swipe/keyboard for accessibility
- **Non-Punishing:** Quick restart after game over, encouraging "one more try"

### Core Screens and Views

1. **Main Menu Screen:** Game title, Play button, mode selection, theme selector, leaderboard access, settings
2. **Game Screen:** Game board, current score display, pause button, on-screen controls (mobile)
3. **Pause Overlay:** Resume, restart, and quit options
4. **Game Over Screen:** Final score, high score notification if achieved, restart and menu buttons
5. **Leaderboard Screen:** Top 10 scores display with rank, score, and date
6. **Settings/Audio Panel:** Sound effects toggle, music toggle, theme quick-switch

### Accessibility

WCAG AA compliance for text contrast and keyboard navigation. Large touch targets (minimum 44x44px) for child-friendly interaction.

### Branding

Kid-friendly aesthetic with rounded corners, playful typography, bright colors, and animated elements. Each theme provides a distinct color palette and visual style while maintaining consistent UI patterns.

### Target Devices and Platforms

Web Responsive - optimized for:
- Desktop (1024px+): Keyboard controls primary
- Tablet (768px-1023px): Touch/swipe with on-screen buttons
- Mobile (320px-767px): Touch/swipe with on-screen buttons, compact layout

---

## Technical Assumptions

### Repository Structure

**Monorepo (Single Repository):** Frontend-only application with no need for multiple packages. Single repository containing React application, assets, and configuration.

### Service Architecture

**Static Single-Page Application (SPA):** 
- No backend services required
- All game logic runs client-side
- LocalStorage for persistence
- Deployable to any static hosting (Vercel, Netlify, GitHub Pages, S3)

### Testing Requirements

**Unit + Integration Testing:**
- Unit tests for game logic (collision detection, scoring, speed calculations)
- Component tests for UI elements
- Integration tests for game flow (start → play → game over → restart)
- Manual testing for cross-browser and device compatibility
- Recommended: Vitest for unit tests, React Testing Library for components

### Additional Technical Assumptions

- **Framework:** React 18+ with functional components and hooks
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS for utility-first styling
- **State Management:** Zustand for game state (provides simple, performant state outside React's render cycle)
- **Build Tool:** Vite for fast development and optimized production builds
- **Game Loop:** requestAnimationFrame-based loop for smooth 60fps rendering
- **Audio:** Howler.js or HTML5 Audio API for sound management
- **Code Quality:** ESLint + Prettier for consistent code style
- **Asset Optimization:** SVG for icons, optimized images for themes, compressed audio files

---

## Epic List

### Epic 1: Project Foundation & Core Game
Establish project infrastructure and implement the fundamental snake game mechanics, delivering a playable classic snake experience.

### Epic 2: Game Modes & Scoring System
Implement game mode selection, scoring mechanics, high score persistence, and leaderboard functionality.

### Epic 3: Themes & Visual Polish
Create 7 visual themes with theme selection, persistence, and polished animations/transitions.

### Epic 4: Audio System
Implement sound effects, background music, and audio controls with preference persistence.

### Epic 5: Controls & Responsive Design
Add touch controls, on-screen buttons, responsive layouts, and pause/resume functionality for cross-device support.

---

## Epic 1: Project Foundation & Core Game

**Goal:** Establish the project infrastructure with proper tooling and implement the core snake game mechanics. By the end of this epic, users can play a basic snake game with keyboard controls, eating food, growing, and game over on collision.

### Story 1.1: Project Setup and Configuration

**As a** developer,
**I want** a properly configured React TypeScript project with Tailwind CSS,
**So that** I have a solid foundation for building the game.

**Acceptance Criteria:**
1. Project initialized with Vite + React + TypeScript template
2. Tailwind CSS installed and configured with custom color palette
3. ESLint and Prettier configured with recommended rules
4. Project structure created (components/, hooks/, stores/, utils/, assets/, types/)
5. Basic App component renders "Snake Game" heading
6. Development server runs without errors (`npm run dev`)
7. Production build completes successfully (`npm run build`)

---

### Story 1.2: Game Board and Snake Rendering

**As a** player,
**I want** to see a game board with a visible snake,
**So that** I can see where the game takes place.

**Acceptance Criteria:**
1. Game board component renders as a grid (20x20 cells default)
2. Grid cells are visually distinguishable with subtle borders or gaps
3. Snake renders as connected segments on the grid (initial length: 3 segments)
4. Snake head is visually distinct from body segments (different shade or shape)
5. Snake spawns in center of board facing right
6. Game board is centered on screen with appropriate padding
7. Board scales appropriately to fit viewport while maintaining square cells

---

### Story 1.3: Snake Movement and Game Loop

**As a** player,
**I want** the snake to move continuously across the board,
**So that** the game feels alive and challenging.

**Technical Note:** This story uses React local state (useState/useRef) for initial implementation. State will be refactored to Zustand in Story 2.1 for better performance and cross-component access.

**Acceptance Criteria:**
1. Game loop implemented using requestAnimationFrame
2. Snake moves one cell in current direction at fixed interval (initial: 150ms)
3. Snake movement is smooth without visual stuttering
4. Snake body follows head (each segment moves to previous segment's position)
5. Game loop can be started and stopped programmatically
6. Movement timing is consistent regardless of frame rate
7. State managed with React useState/useRef (to be refactored to Zustand in Story 2.1)

---

### Story 1.4: Keyboard Controls

**As a** player,
**I want** to control the snake direction using arrow keys,
**So that** I can navigate the snake around the board.

**Acceptance Criteria:**
1. Arrow keys (Up, Down, Left, Right) change snake direction
2. WASD keys also work as alternative controls
3. Snake cannot reverse directly into itself (e.g., can't go left when moving right)
4. Direction changes are queued and applied on next movement tick
5. Key presses are responsive with no noticeable delay
6. Controls only function when game is actively running

---

### Story 1.5: Food Spawning

**As a** player,
**I want** food to appear on the board,
**So that** I have something to collect with my snake.

**Acceptance Criteria:**
1. Food item renders as a distinct visual element (different color/shape from snake)
2. One food item is present on the board at all times
3. Food spawns at random position not occupied by snake
4. New food spawns immediately when current food is consumed
5. Food position is always aligned to grid cells
6. Food is visually prominent and easy to identify

---

### Story 1.6: Food Consumption and Snake Growth

**As a** player,
**I want** my snake to grow when it eats food,
**So that** the game becomes progressively more challenging.

**Acceptance Criteria:**
1. Collision detection identifies when snake head occupies same cell as food
2. Snake length increases by one segment upon eating food
3. New segment appears at tail position (snake grows from back)
4. Score increments by 10 points when food is consumed
5. Current score displays on screen during gameplay
6. Growth is visually smooth without jarring jumps

---

### Story 1.7: Collision Detection and Game Over

**As a** player,
**I want** the game to end when I hit a wall or myself,
**So that** there are consequences and challenge to the gameplay.

**Acceptance Criteria:**
1. Game ends when snake head collides with any wall boundary
2. Game ends when snake head collides with any body segment
3. Game over state stops the game loop
4. Game over screen displays showing final score
5. "Play Again" button restarts game with fresh state
6. "Main Menu" button option available (can be placeholder for now)
7. Brief visual feedback on collision (flash or animation) before game over screen

---

## Epic 2: Game Modes & Scoring System

**Goal:** Implement game mode selection with distinct gameplay characteristics, persistent high score tracking, and a leaderboard display. Players can choose their preferred mode and compete against their own records.

### Story 2.1: Game State Management with Zustand

**As a** developer,
**I want** centralized game state management,
**So that** game state is predictable and easily accessible across components.

**Acceptance Criteria:**
1. Zustand store created for game state (gameStore)
2. Store manages: gameStatus, score, highScores, currentMode, snakePosition, foodPosition, direction
3. Actions implemented: startGame, pauseGame, resumeGame, endGame, updateScore, resetGame
4. Store integrates with existing game loop and components
5. Components refactored to use store instead of local state where appropriate
6. Game functionality unchanged after refactor

---

### Story 2.2: Main Menu Screen

**As a** player,
**I want** a main menu to start the game,
**So that** I can access game options before playing.

**Acceptance Criteria:**
1. Main menu screen displays on app launch
2. Game title "Snake Game" prominently displayed with playful styling
3. "Play" button navigates to game screen and starts game
4. Menu layout is centered and visually appealing
5. Buttons have hover/active states for feedback
6. Menu is keyboard navigable (Tab + Enter)

---

### Story 2.3: Game Mode Selection

**As a** player,
**I want** to choose between Classic and Speed modes,
**So that** I can play the style I prefer.

**Acceptance Criteria:**
1. Mode selection UI on main menu (toggle or buttons)
2. Classic Mode: starts at base speed (150ms), speed increases as snake grows
3. Speed Mode: starts at faster speed (100ms), more aggressive speed increase
4. Selected mode is visually highlighted
5. Mode selection persists in localStorage
6. Game applies correct speed settings based on selected mode
7. Current mode displayed during gameplay

---

### Story 2.4: Progressive Speed Increase

**As a** player,
**I want** the game to get faster as I progress,
**So that** the challenge increases over time.

**Acceptance Criteria:**
1. Classic Mode: speed increases by 5ms for every 3 food items eaten (minimum 50ms)
2. Speed Mode: speed increases by 8ms for every 2 food items eaten (minimum 40ms)
3. Speed transitions are smooth without jarring changes
4. Current speed level/difficulty could be subtly indicated (optional visual)
5. Speed resets to mode default on new game

---

### Story 2.5: High Score Persistence

**As a** player,
**I want** my high scores saved,
**So that** I can track my progress over time.

**Acceptance Criteria:**
1. High scores array stored in localStorage (max 10 entries)
2. Each entry contains: score, date, game mode
3. Scores sorted in descending order
4. New high score detected when current score qualifies for top 10
5. High score notification shown on game over if achieved
6. Scores persist across browser sessions

---

### Story 2.6: Leaderboard Screen

**As a** player,
**I want** to view the leaderboard,
**So that** I can see my best scores.

**Acceptance Criteria:**
1. Leaderboard accessible from main menu via "Leaderboard" button
2. Displays top 10 scores in ranked list format
3. Each entry shows: rank, score, game mode, date
4. Current session's high score highlighted if present
5. "Back" button returns to main menu
6. Empty state message when no scores exist
7. Leaderboard is scrollable if needed on small screens

---

## Epic 3: Themes & Visual Polish

**Goal:** Implement 7 distinct visual themes with smooth theme switching, persistent preferences, and polished animations that create an engaging visual experience for children.

**Implementation Note:** Stories 3.2, 3.3, and 3.4 (individual theme implementations) can be developed in parallel once the theme system architecture (Story 3.1) is complete. This allows for faster delivery if multiple developers are available.

### Story 3.1: Theme System Architecture

**As a** developer,
**I want** a flexible theme system,
**So that** themes can be easily applied and extended.

**Acceptance Criteria:**
1. Theme configuration structure defined (colors, assets, names)
2. Theme context/store created for current theme state
3. CSS custom properties (variables) used for theme colors
4. Theme switching updates UI without page reload
5. Base theme tokens defined: primary, secondary, background, surface, text, snake, food, board
6. Components use theme tokens instead of hardcoded colors

---

### Story 3.2: Default Theme (Jungle)

**As a** player,
**I want** an attractive default theme,
**So that** the game looks appealing immediately.

**Acceptance Criteria:**
1. Jungle theme implemented as default
2. Color palette: greens, browns, natural tones
3. Snake styled with green gradient
4. Food styled as red apple or berry
5. Board background with subtle grass/nature pattern or solid earth tone
6. All UI elements styled consistently with theme
7. Theme is visually appealing and kid-friendly

---

### Story 3.3: Additional Themes (Ocean, Space, Candy)

**As a** player,
**I want** more theme options,
**So that** I can personalize my experience.

**Acceptance Criteria:**
1. Ocean theme: blues, teals, water-inspired (snake as sea creature, food as fish)
2. Space theme: dark purples, blacks, star accents (snake as rocket/comet, food as star)
3. Candy theme: pinks, pastels, sweet colors (snake as candy worm, food as lollipop)
4. Each theme has complete color palette for all UI elements
5. Themes are visually distinct and cohesive
6. All three themes fully functional and switchable

---

### Story 3.4: Additional Themes (Neon, Desert, Winter)

**As a** player,
**I want** even more theme variety,
**So that** I have many options to choose from.

**Acceptance Criteria:**
1. Neon theme: bright fluorescent colors on dark background (arcade style)
2. Desert theme: oranges, yellows, sand tones (snake as lizard, food as cactus fruit)
3. Winter theme: whites, blues, icy tones (snake as frost serpent, food as snowflake)
4. Each theme has complete color palette for all UI elements
5. Themes are visually distinct and cohesive
6. All three themes fully functional and switchable

---

### Story 3.5: Theme Selector UI

**As a** player,
**I want** to easily switch themes,
**So that** I can change the look whenever I want.

**Acceptance Criteria:**
1. Theme selector accessible from main menu
2. Visual preview of each theme (color swatches or mini preview)
3. Theme names displayed with icons or thumbnails
4. Current theme visually indicated (checkmark or highlight)
5. Theme changes apply immediately upon selection
6. Theme preference persisted in localStorage
7. Theme selector works on all screen sizes

---

### Story 3.6: Visual Polish and Animations

**As a** player,
**I want** smooth animations and visual effects,
**So that** the game feels polished and fun.

**Acceptance Criteria:**
1. Snake movement has subtle smooth interpolation (not just cell-to-cell jump)
2. Food has idle animation (pulse, glow, or bounce)
3. Score increment has pop/scale animation
4. Button hover/press states with smooth transitions
5. Screen transitions (menu to game) have fade or slide animation
6. Game over has brief impact animation before showing screen
7. Animations respect prefers-reduced-motion media query

---

## Epic 4: Audio System

**Goal:** Implement engaging sound effects and background music with user controls, creating an immersive audio experience that enhances gameplay while respecting user preferences.

### Story 4.1: Audio System Setup

**As a** developer,
**I want** an audio management system,
**So that** sounds can be played and controlled reliably.

**Acceptance Criteria:**
1. Audio manager utility/hook created for playing sounds
2. Support for playing one-shot sound effects
3. Support for looping background music
4. Audio files loaded and cached efficiently
5. Audio state stored in Zustand (sfxEnabled, musicEnabled, sfxVolume, musicVolume)
6. Audio respects browser autoplay policies (user interaction required)

---

### Story 4.2: Sound Effects Implementation

**As a** player,
**I want** sound effects for game actions,
**So that** the game feels more responsive and fun.

**Acceptance Criteria:**
1. Sound effect plays when snake eats food (satisfying chomp/pop)
2. Sound effect plays on game over (negative but not scary)
3. Sound effect plays on button clicks/interactions (subtle click)
4. Sound effect plays on high score achievement (celebratory)
5. All sound effects are short, clear, and kid-appropriate
6. Sound effects don't overlap badly when triggered rapidly

---

### Story 4.3: Background Music

**As a** player,
**I want** background music during gameplay,
**So that** the game is more immersive and engaging.

**Acceptance Criteria:**
1. Background music plays during active gameplay
2. Music loops seamlessly without gaps
3. Music stops or pauses on game over/pause
4. Music resumes on game resume/restart
5. Music volume balanced with sound effects
6. Music is upbeat, kid-friendly, and not distracting
7. Music starts after user interaction (respecting autoplay policy)

---

### Story 4.4: Audio Controls

**As a** player,
**I want** to control sound settings,
**So that** I can mute or adjust audio as needed.

**Acceptance Criteria:**
1. Sound effects toggle (on/off) accessible from menu/settings
2. Music toggle (on/off) accessible from menu/settings
3. Quick mute button visible during gameplay
4. Audio preferences persist in localStorage
5. Visual indicators show current audio state (icons)
6. Toggling audio provides immediate feedback
7. Controls accessible via keyboard

---

## Epic 5: Controls & Responsive Design

**Goal:** Implement touch controls, on-screen buttons, and responsive layouts ensuring the game is fully playable and enjoyable across desktop, tablet, and mobile devices.

### Story 5.1: Touch and Swipe Controls

**As a** mobile player,
**I want** to control the snake with touch gestures,
**So that** I can play on my phone or tablet.

**Acceptance Criteria:**
1. Swipe gestures detected (up, down, left, right)
2. Swipe direction changes snake direction accordingly
3. Minimum swipe distance threshold prevents accidental triggers
4. Swipe works anywhere on game area
5. Touch controls don't conflict with browser gestures (prevent default appropriately)
6. Controls feel responsive without noticeable delay

---

### Story 5.2: On-Screen Control Buttons

**As a** mobile player,
**I want** on-screen arrow buttons,
**So that** I have an alternative to swipe controls.

**Acceptance Criteria:**
1. D-pad style control buttons displayed on mobile/tablet
2. Buttons positioned for comfortable thumb access (bottom of screen)
3. Touch targets minimum 44x44px for easy tapping
4. Buttons provide visual feedback on press
5. Buttons hidden on desktop (keyboard users)
6. Buttons don't obstruct game board view
7. Option to toggle button visibility in settings

---

### Story 5.3: Pause and Resume Functionality

**As a** player,
**I want** to pause the game,
**So that** I can take breaks without losing progress.

**Acceptance Criteria:**
1. Pause button visible during gameplay
2. Spacebar or Escape key toggles pause (desktop)
3. Game loop stops when paused (snake freezes)
4. Pause overlay displays with Resume, Restart, Quit options
5. Game board remains visible but dimmed behind overlay
6. Timer/interval state preserved correctly on resume
7. Pausing doesn't affect score or snake position

---

### Story 5.4: Responsive Layout - Desktop

**As a** desktop player,
**I want** the game optimized for large screens,
**So that** it looks and plays great on my computer.

**Acceptance Criteria:**
1. Game board centered with comfortable size (not too large)
2. Score and controls positioned around board with good spacing
3. Adequate whitespace and margins
4. Keyboard controls are primary input method
5. No on-screen D-pad shown on desktop
6. Min-width: 1024px triggers desktop layout
7. All elements properly sized and readable

---

### Story 5.5: Responsive Layout - Tablet

**As a** tablet player,
**I want** the game optimized for medium screens,
**So that** it's comfortable to play on my iPad.

**Acceptance Criteria:**
1. Game board scales to fit tablet viewport with padding
2. On-screen controls visible but not intrusive
3. Touch and swipe controls enabled
4. UI elements sized appropriately for touch (44px+ targets)
5. Landscape and portrait orientations supported
6. Width range: 768px - 1023px triggers tablet layout
7. Leaderboard and menus remain usable

---

### Story 5.6: Responsive Layout - Mobile

**As a** mobile player,
**I want** the game optimized for small screens,
**So that** I can play comfortably on my phone.

**Acceptance Criteria:**
1. Game board maximizes available space while leaving room for controls
2. On-screen D-pad positioned for thumb access in portrait mode
3. UI elements stacked vertically where needed
4. Font sizes remain readable (minimum 16px)
5. Score display compact but visible
6. Min-width: 320px supported without horizontal scroll
7. Game remains playable on small iPhone SE size screens

---

### Story 5.7: Final Polish and Cross-Browser Testing

**As a** developer,
**I want** to ensure quality across browsers and devices,
**So that** all users have a great experience.

**Acceptance Criteria:**
1. Game tested and functional on Chrome, Firefox, Safari, Edge (latest versions)
2. Game tested on iOS Safari and Android Chrome
3. No console errors during normal gameplay
4. Performance maintains 60fps on mid-range devices
5. All localStorage features work correctly
6. Touch and keyboard controls verified working
7. All themes render correctly across browsers
8. Audio plays correctly with user interaction trigger

---

## Checklist Results Report

*To be completed after PRD review and before handoff to UX Expert and Architect.*

---

## Next Steps

### UX Expert Prompt

> Please review the Snake Game PRD (docs/prd.md) and create a comprehensive front-end specification. Focus on the kid-friendly UI/UX for ages 6-12, the 7 theme visual designs, responsive layouts for desktop/tablet/mobile, and the interaction patterns for game controls. Reference the Project Brief (docs/project-brief.md) for additional context.

### Architect Prompt

> Please review the Snake Game PRD (docs/prd.md) and create a front-end architecture document. The tech stack is React 18+, TypeScript, Tailwind CSS, Zustand, and Vite. Focus on component architecture, game loop implementation, state management patterns, theme system design, and audio management. Reference the Project Brief (docs/project-brief.md) for technical preferences.

---

**Workflow Status:** Stage 2 of 6 | **Next:** UX Expert creates Front-End Spec
