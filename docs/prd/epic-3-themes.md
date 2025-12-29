# Epic 3: Themes & Visual Polish

**Goal:** Implement 7 distinct visual themes with smooth theme switching, persistent preferences, and polished animations that create an engaging visual experience for children.

**Implementation Note:** Stories 3.2, 3.3, and 3.4 (individual theme implementations) can be developed in parallel once the theme system architecture (Story 3.1) is complete. This allows for faster delivery if multiple developers are available.

**Dependencies:** Epic 1 (Core Game), Epic 2 (State Management)

**Stories:** 6

---

## Story 3.1: Theme System Architecture

**Status:** Draft

**As a** developer,
**I want** a flexible theme system,
**So that** themes can be easily applied and extended.

### Acceptance Criteria

1. Theme configuration structure defined (colors, assets, names)
2. Theme context/store created for current theme state
3. CSS custom properties (variables) used for theme colors
4. Theme switching updates UI without page reload
5. Base theme tokens defined: primary, secondary, background, surface, text, snake, food, board
6. Components use theme tokens instead of hardcoded colors

### Technical Notes

- Create Theme type interface with all color properties
- Use CSS variables with RGB values for Tailwind alpha support
- Create applyTheme() function to update CSS variables
- Reference architecture doc for theme patterns

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Theme switching is instant
- [ ] All components use theme tokens
- [ ] Code reviewed

---

## Story 3.2: Default Theme (Jungle)

**Status:** Draft

**As a** player,
**I want** an attractive default theme,
**So that** the game looks appealing immediately.

### Acceptance Criteria

1. Jungle theme implemented as default
2. Color palette: greens, browns, natural tones
3. Snake styled with green gradient
4. Food styled as red apple or berry
5. Board background with subtle grass/nature pattern or solid earth tone
6. All UI elements styled consistently with theme
7. Theme is visually appealing and kid-friendly

### Technical Notes

- Reference front-end-spec for exact color values
- Primary: #4CAF50, Background: #1B5E20
- Food: #F44336 (apple red)

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Colors match spec
- [ ] Visually cohesive
- [ ] Code reviewed

---

## Story 3.3: Additional Themes (Ocean, Space, Candy)

**Status:** Draft

**As a** player,
**I want** more theme options,
**So that** I can personalize my experience.

### Acceptance Criteria

1. Ocean theme: blues, teals, water-inspired (snake as sea creature, food as fish)
2. Space theme: dark purples, blacks, star accents (snake as rocket/comet, food as star)
3. Candy theme: pinks, pastels, sweet colors (snake as candy worm, food as lollipop)
4. Each theme has complete color palette for all UI elements
5. Themes are visually distinct and cohesive
6. All three themes fully functional and switchable

### Technical Notes

- Reference front-end-spec for exact color values per theme
- Ensure contrast ratios meet WCAG AA
- Can be developed in parallel with Story 3.2 and 3.4

### Definition of Done

- [ ] All acceptance criteria met
- [ ] All 3 themes complete
- [ ] Accessibility verified
- [ ] Code reviewed

---

## Story 3.4: Additional Themes (Neon, Desert, Winter)

**Status:** Draft

**As a** player,
**I want** even more theme variety,
**So that** I have many options to choose from.

### Acceptance Criteria

1. Neon theme: bright fluorescent colors on dark background (arcade style)
2. Desert theme: oranges, yellows, sand tones (snake as lizard, food as cactus fruit)
3. Winter theme: whites, blues, icy tones (snake as frost serpent, food as snowflake)
4. Each theme has complete color palette for all UI elements
5. Themes are visually distinct and cohesive
6. All three themes fully functional and switchable

### Technical Notes

- Reference front-end-spec for exact color values per theme
- Neon theme needs extra attention for contrast
- Can be developed in parallel with Story 3.2 and 3.3

### Definition of Done

- [ ] All acceptance criteria met
- [ ] All 3 themes complete
- [ ] Accessibility verified
- [ ] Code reviewed

---

## Story 3.5: Theme Selector UI

**Status:** Draft

**As a** player,
**I want** to easily switch themes,
**So that** I can change the look whenever I want.

### Acceptance Criteria

1. Theme selector accessible from main menu
2. Visual preview of each theme (color swatches or mini preview)
3. Theme names displayed with icons or thumbnails
4. Current theme visually indicated (checkmark or highlight)
5. Theme changes apply immediately upon selection
6. Theme preference persisted in localStorage
7. Theme selector works on all screen sizes

### Technical Notes

- Create ThemeSelector screen/component
- Show grid of theme thumbnails
- Use settingsStore for persistence

### Definition of Done

- [ ] All acceptance criteria met
- [ ] Live preview works
- [ ] Responsive layout
- [ ] Code reviewed

---

## Story 3.6: Visual Polish and Animations

**Status:** Draft

**As a** player,
**I want** smooth animations and visual effects,
**So that** the game feels polished and fun.

### Acceptance Criteria

1. Snake movement has subtle smooth interpolation (not just cell-to-cell jump)
2. Food has idle animation (pulse, glow, or bounce)
3. Score increment has pop/scale animation
4. Button hover/press states with smooth transitions
5. Screen transitions (menu to game) have fade or slide animation
6. Game over has brief impact animation before showing screen
7. Animations respect prefers-reduced-motion media query

### Technical Notes

- Use Framer Motion for complex animations
- Use CSS transitions for simple effects
- Test with prefers-reduced-motion enabled

### Definition of Done

- [ ] All acceptance criteria met
- [ ] 60fps maintained
- [ ] Reduced motion works
- [ ] Code reviewed

---

## Epic Completion Checklist

- [ ] All 6 stories completed and reviewed
- [ ] All 7 themes implemented
- [ ] Theme switching works smoothly
- [ ] Animations feel polished
- [ ] Accessibility maintained across themes
- [ ] Performance targets met
