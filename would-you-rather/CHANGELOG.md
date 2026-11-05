# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-11-05

### Added
- **Multiplayer Support (2-5 Players)**: Game now supports 2 to 5 players dynamically
  - Player count selector on start screen (2, 3, 4, 5 buttons)
  - Dynamic name inputs based on selected player count
  - Each player gets unique theme color: P1=Blue, P2=Orange, P3=Green, P4=Purple, P5=Pink
  - Sequential turn system: Player 1 answers all questions, then Player 2, etc.
  - Responsive results grid for 2-5 players (2-col grid on desktop, stacked on mobile)
  - WhatsApp share includes all players' results in single message

- **Professional Versioning System**
  - Version badge in header (v0.1.2)
  - Version metadata in HTML head
  - Footer displays current version
  - CHANGELOG.md file with Keep a Changelog format
  - Version stored in JavaScript for programmatic access

- **Enhanced UI/UX for Multiplayer**
  - Player color indicators throughout game (turn badge, result cards, stat pills)
  - Intermission screen adapts for multiple player transitions
  - Progress shows current player + question number
  - Compatibility matrix shows pairwise compatibility for 3+ players

### Changed
- Refactored `gameState` to support dynamic player array
- Updated `generateAbsurdResult()` to work with any player
- Updated `calculateCompatibility()` to handle pairwise matrix for 3+ players
- Results screen now renders dynamically based on player count
- Share to WhatsApp formats all players' results

### Fixed
- Name inputs preserve values when changing player count
- Fallback to "Pemain N" when name is empty
- Color consistency from game screen through results

## [0.1.1] - 2026-10-15

### Added
- Dark mode (Super Black) / Light mode (Super White) toggle
- LocalStorage history (max 10 games)
- WhatsApp share functionality
- Confetti animation on results
- Ambient background particles
- Web Audio API sound effects
- 50 absurd questions with rolling 15 per game

### Changed
- Improved animations and transitions
- Better mobile responsiveness

## [0.1.0] - 2026-10-01

### Added
- Initial release: 2-player Would You Rather game
- 15 questions per game from 50-question pool
- Absurd personality results based on answer patterns
- Compatibility score between 2 players
- Breakdown comparison view
- Fully client-side, no backend required