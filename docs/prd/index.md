# PRD Shards Index

This directory contains the sharded PRD with individual epic files for development.

## Epic Files

| Epic | File | Stories | Status |
|------|------|---------|--------|
| Epic 1: Project Foundation & Core Game | [epic-1-foundation.md](epic-1-foundation.md) | 7 | Draft |
| Epic 2: Game Modes & Scoring System | [epic-2-modes-scoring.md](epic-2-modes-scoring.md) | 6 | Draft |
| Epic 3: Themes & Visual Polish | [epic-3-themes.md](epic-3-themes.md) | 6 | Draft |
| Epic 4: Audio System | [epic-4-audio.md](epic-4-audio.md) | 4 | Draft |
| Epic 5: Controls & Responsive Design | [epic-5-controls-responsive.md](epic-5-controls-responsive.md) | 7 | Draft |

**Total Stories:** 30

## Epic Dependencies

```
Epic 1: Foundation (no dependencies)
    ↓
Epic 2: Modes & Scoring (depends on Epic 1)
    ↓
Epic 3: Themes (depends on Epic 1, 2)
Epic 4: Audio (depends on Epic 1, 2)
Epic 5: Controls (depends on Epic 1, 2)
```

## Development Order

**Recommended sequence:**
1. Epic 1 - Foundation (must be first)
2. Epic 2 - Modes & Scoring (enables state management)
3. Epics 3, 4, 5 can proceed in parallel after Epic 2

## Quick Links

- [Main PRD](../prd.md) - Full requirements document
- [Project Brief](../project-brief.md) - Project overview
- [Front-End Spec](../front-end-spec.md) - UI/UX specification
- [Architecture](../architecture.md) - Technical architecture

## Story Status Legend

| Status | Meaning |
|--------|---------|
| Draft | Story defined, not started |
| Ready | Story refined, ready for development |
| In Progress | Currently being implemented |
| Review | Implementation complete, in review |
| Done | Completed and merged |
