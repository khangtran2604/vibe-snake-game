# Epic 1: Project Foundation & Core Game

**Goal:** Establish the project infrastructure with proper tooling and implement the core snake game mechanics. By the end of this epic, users can play a basic snake game with keyboard controls, eating food, growing, and game over on collision.

**Dependencies:** None (first epic)

**Stories:** 7

---

## Story 1.1: Project Setup and Configuration

**Status:** Draft

**As a** developer,
**I want** a properly configured React TypeScript project with Tailwind CSS,
**So that** I have a solid foundation for building the game.

### Acceptance Criteria

1. Project initialized with Vite + React + TypeScript template
2. Tailwind CSS installed and configured with custom color palette
3. ESLint and Prettier configured with recommended rules
4. Project structure created (components/, hooks/, stores/, utils/, assets/, types/)
5. Basic App component renders "Snake Game" heading
6. Development server runs without errors (`npm run dev`)
7. Production build completes successfully (`npm run build`)

### Technical Notes

- Use `npm create vite@latest snake-game -- --template react-ts`
- Reference architecture doc for project structure
- Configure path aliases (@/) in tsconfig and vite.config

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Code reviewed
- [ ] No console errors

---

## Story 1.2: Game Board and Snake Rendering

**Status:** Draft

**As a** player,
**I want** to see a game board with a visible snake,
**So that** I can see where the game takes place.

### Acceptance Criteria

1. Game board component renders as a grid (20x20 cells default)
2. Grid cells are visually distinguishable with subtle borders or gaps
3. Snake renders as connected segments on the grid (initial length: 3 segments)
4. Snake head is visually distinct from body segments (different shade or shape)
5. Snake spawns in center of board facing right
6. Game board is centered on screen with appropriate padding
7. Board scales appropriately to fit viewport while maintaining square cells

### Technical Notes

- Create GameBoard, Snake, and Cell components
- Use CSS Grid for board layout
- Snake position stored as array of {x, y} coordinates

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Responsive on mobile and desktop
- [ ] Code reviewed

---

## Story 1.3: Snake Movement and Game Loop

**Status:** Draft

**Technical Note:** This story uses React local state (useState/useRef) for initial implementation. State will be refactored to Zustand in Story 2.1 for better performance and cross-component access.

**As a** player,
**I want** the snake to move continuously across the board,
**So that** the game feels alive and challenging.

### Acceptance Criteria

1. Game loop implemented using requestAnimationFrame
2. Snake moves one cell in current direction at fixed interval (initial: 150ms)
3. Snake movement is smooth without visual stuttering
4. Snake body follows head (each segment moves to previous segment's position)
5. Game loop can be started and stopped programmatically
6. Movement timing is consistent regardless of frame rate
7. State managed with React useState/useRef (to be refactored to Zustand in Story 2.1)

### Technical Notes

- Create useGameLoop custom hook
- Use timestamp-based timing for consistent speed
- Store lastUpdateTime in useRef

### Definition of Done

- [ ] All acceptance criteria met
- [ ] 60fps maintained during gameplay
- [ ] Code reviewed

---

## Story 1.4: Keyboard Controls

**Status:** Draft

**As a** player,
**I want** to control the snake direction using arrow keys,
**So that** I can navigate the snake around the board.

### Acceptance Criteria

1. Arrow keys (Up, Down, Left, Right) change snake direction
2. WASD keys also work as alternative controls
3. Snake cannot reverse directly into itself (e.g., can't go left when moving right)
4. Direction changes are queued and applied on next movement tick
5. Key presses are responsive with no noticeable delay
6. Controls only function when game is actively running

### Technical Notes

- Create useKeyboardControls hook
- Queue direction changes to prevent rapid 180-degree turns
- Use event.preventDefault() to stop arrow key scrolling

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Both arrow and WASD keys tested
- [ ] Code reviewed

---

## Story 1.5: Food Spawning

**Status:** Draft

**As a** player,
**I want** food to appear on the board,
**So that** I have something to collect with my snake.

### Acceptance Criteria

1. Food item renders as a distinct visual element (different color/shape from snake)
2. One food item is present on the board at all times
3. Food spawns at random position not occupied by snake
4. New food spawns immediately when current food is consumed
5. Food position is always aligned to grid cells
6. Food is visually prominent and easy to identify

### Technical Notes

- Create Food component
- Random position generator excludes snake segments
- Add pulse animation for visibility

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Food never spawns on snake
- [ ] Code reviewed

---

## Story 1.6: Food Consumption and Snake Growth

**Status:** Draft

**As a** player,
**I want** my snake to grow when it eats food,
**So that** the game becomes progressively more challenging.

### Acceptance Criteria

1. Collision detection identifies when snake head occupies same cell as food
2. Snake length increases by one segment upon eating food
3. New segment appears at tail position (snake grows from back)
4. Score increments by 10 points when food is consumed
5. Current score displays on screen during gameplay
6. Growth is visually smooth without jarring jumps

### Technical Notes

- Implement collision detection helper function
- Add new segment by duplicating tail position
- Create ScoreDisplay component

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Score updates correctly
- [ ] Code reviewed

---

## Story 1.7: Collision Detection and Game Over

**Status:** Draft

**As a** player,
**I want** the game to end when I hit a wall or myself,
**So that** there are consequences and challenge to the gameplay.

### Acceptance Criteria

1. Game ends when snake head collides with any wall boundary
2. Game ends when snake head collides with any body segment
3. Game over state stops the game loop
4. Game over screen displays showing final score
5. "Play Again" button restarts game with fresh state
6. "Main Menu" button option available (can be placeholder for now)
7. Brief visual feedback on collision (flash or animation) before game over screen

### Technical Notes

- Implement wall and self-collision detection functions
- Create GameOverScreen component
- Add brief red flash animation on death

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Both collision types tested
- [ ] Restart works correctly
- [ ] Code reviewed

---

## Epic Completion Checklist

- [ ] All 7 stories completed and reviewed
- [ ] Core game loop functional
- [ ] Basic playable snake game working
- [ ] No console errors
- [ ] Performance target met (60fps)
