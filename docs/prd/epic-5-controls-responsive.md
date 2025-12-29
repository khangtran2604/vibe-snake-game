# Epic 5: Controls & Responsive Design

**Goal:** Implement touch controls, on-screen buttons, and responsive layouts ensuring the game is fully playable and enjoyable across desktop, tablet, and mobile devices.

**Dependencies:** Epic 1 (Core Game), Epic 2 (State Management)

**Stories:** 7

---

## Story 5.1: Touch and Swipe Controls

**Status:** Draft

**As a** mobile player,
**I want** to control the snake with touch gestures,
**So that** I can play on my phone or tablet.

### Acceptance Criteria

1. Swipe gestures detected (up, down, left, right)
2. Swipe direction changes snake direction accordingly
3. Minimum swipe distance threshold prevents accidental triggers
4. Swipe works anywhere on game area
5. Touch controls don't conflict with browser gestures (prevent default appropriately)
6. Controls feel responsive without noticeable delay

### Technical Notes

- Create useTouchControls hook
- Calculate swipe direction from touch start/end coordinates
- Minimum swipe distance: 30px
- Use touch-action CSS property

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Works on iOS Safari and Android Chrome
- [ ] No conflict with browser gestures
- [ ] Code reviewed

---

## Story 5.2: On-Screen Control Buttons

**Status:** Draft

**As a** mobile player,
**I want** on-screen arrow buttons,
**So that** I have an alternative to swipe controls.

### Acceptance Criteria

1. D-pad style control buttons displayed on mobile/tablet
2. Buttons positioned for comfortable thumb access (bottom of screen)
3. Touch targets minimum 44x44px for easy tapping
4. Buttons provide visual feedback on press
5. Buttons hidden on desktop (keyboard users)
6. Buttons don't obstruct game board view
7. Option to toggle button visibility in settings

### Technical Notes

- Create DPadControls component
- Use Tailwind responsive classes to show/hide
- Position with fixed/absolute at bottom

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Comfortable to use on phone
- [ ] Hidden on desktop
- [ ] Code reviewed

---

## Story 5.3: Pause and Resume Functionality

**Status:** Draft

**As a** player,
**I want** to pause the game,
**So that** I can take breaks without losing progress.

### Acceptance Criteria

1. Pause button visible during gameplay
2. Spacebar or Escape key toggles pause (desktop)
3. Game loop stops when paused (snake freezes)
4. Pause overlay displays with Resume, Restart, Quit options
5. Game board remains visible but dimmed behind overlay
6. Timer/interval state preserved correctly on resume
7. Pausing doesn't affect score or snake position

### Technical Notes

- Add 'paused' status to gameStore
- Create PauseOverlay component
- Preserve game state exactly on pause

### Definition of Done

- [ ] All acceptance criteria met
- [ ] State preserved correctly
- [ ] Overlay looks good
- [ ] Code reviewed

---

## Story 5.4: Responsive Layout - Desktop

**Status:** Draft

**As a** desktop player,
**I want** the game optimized for large screens,
**So that** it looks and plays great on my computer.

### Acceptance Criteria

1. Game board centered with comfortable size (not too large)
2. Score and controls positioned around board with good spacing
3. Adequate whitespace and margins
4. Keyboard controls are primary input method
5. No on-screen D-pad shown on desktop
6. Min-width: 1024px triggers desktop layout
7. All elements properly sized and readable

### Technical Notes

- Use Tailwind lg: and xl: breakpoints
- Max game board width: ~500px
- Center with flexbox/grid

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Looks good on 1920x1080
- [ ] Keyboard controls work
- [ ] Code reviewed

---

## Story 5.5: Responsive Layout - Tablet

**Status:** Draft

**As a** tablet player,
**I want** the game optimized for medium screens,
**So that** it's comfortable to play on my iPad.

### Acceptance Criteria

1. Game board scales to fit tablet viewport with padding
2. On-screen controls visible but not intrusive
3. Touch and swipe controls enabled
4. UI elements sized appropriately for touch (44px+ targets)
5. Landscape and portrait orientations supported
6. Width range: 768px - 1023px triggers tablet layout
7. Leaderboard and menus remain usable

### Technical Notes

- Use Tailwind md: breakpoint
- Test on iPad simulator
- Consider orientation changes

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Works in portrait and landscape
- [ ] Touch controls comfortable
- [ ] Code reviewed

---

## Story 5.6: Responsive Layout - Mobile

**Status:** Draft

**As a** mobile player,
**I want** the game optimized for small screens,
**So that** I can play comfortably on my phone.

### Acceptance Criteria

1. Game board maximizes available space while leaving room for controls
2. On-screen D-pad positioned for thumb access in portrait mode
3. UI elements stacked vertically where needed
4. Font sizes remain readable (minimum 16px)
5. Score display compact but visible
6. Min-width: 320px supported without horizontal scroll
7. Game remains playable on small iPhone SE size screens

### Technical Notes

- Mobile-first Tailwind approach
- Test on 320px width
- Compact score display

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Works on iPhone SE (375px)
- [ ] Works on 320px viewport
- [ ] Code reviewed

---

## Story 5.7: Final Polish and Cross-Browser Testing

**Status:** Draft

**As a** developer,
**I want** to ensure quality across browsers and devices,
**So that** all users have a great experience.

### Acceptance Criteria

1. Game tested and functional on Chrome, Firefox, Safari, Edge (latest versions)
2. Game tested on iOS Safari and Android Chrome
3. No console errors during normal gameplay
4. Performance maintains 60fps on mid-range devices
5. All localStorage features work correctly
6. Touch and keyboard controls verified working
7. All themes render correctly across browsers
8. Audio plays correctly with user interaction trigger

### Technical Notes

- Create testing checklist
- Use BrowserStack or real devices
- Document any browser-specific fixes

### Definition of Done

- [ ] All acceptance criteria met
- [ ] All browsers tested
- [ ] No critical bugs
- [ ] Ready for production

---

## Epic Completion Checklist

- [ ] All 7 stories completed and reviewed
- [ ] Touch controls working
- [ ] On-screen D-pad working
- [ ] Pause/resume working
- [ ] Responsive on all breakpoints
- [ ] Cross-browser tested
- [ ] Performance verified
- [ ] Ready for production deployment
