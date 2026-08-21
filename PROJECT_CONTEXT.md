# Project Context

## Overview

This is a nonogram solver that needs to be simplistic and user-friendly. The main goal is to keep an easy-to-use Nonogram solver where users can input numbers correctly to solve it.

**What is a Nonogram?** A logic puzzle where you fill cells in a grid based on numbers indicating how many consecutive cells should be filled in each row and column.

## Requirements

Due to the project's nature using Vue.js, the project must meet these specifications:

- TailwindCSS to make CSS easier for developers
- Maintain simplistic design without overloading with effects and colors
- RekaUI can help with custom components (use only necessary ones, otherwise avoid it)
- Maintain clean code to be easily readable for newcomer developers
- Should have Vitest unit tests to ensure the solver works as needed
- WebWorker should use only the JS navigator to solve the Nonogram as fast as possible
- Solving must not be limited to less than 1 second. It needs to honestly wait if needed
- Documentation needs to be clear for PNPM and resulting builds

**Scope:** Small from a frontend technical perspective. The most complex logic should reside on the WebWorker to solve nonograms.

## Non-goals

- Overengineered components and fancy visuals on the page
- A lot of text explaining how it works
- Dirty and unreadable code

## Architecture & Data Flow

### Frontend (Vue.js)

- Handles the user interface
- Captures user input (clue numbers)
- Visualizes the puzzle and results
- Validates basic input before sending to solver
- Shows resolution state (Solving, Solved, Possible, Impossible)

### Backend (WebWorker)

- Solves the nonogram using constraint satisfaction algorithms
- Processes in the background without blocking the UI
- Returns states: Solved (unique solution), Possible (multiple solutions), Impossible (no solution)
- Validates coherence of input clues

## Core Features

### UX Features

- User must input numbers on the grid
- User can input numbers using keyboard arrows to move
- User needs to get indicators showing inconsistencies or exceeded numbers in red
- Solver needs to indicate inconsistencies in obvious errors

### How to Input

- Manually input each number to solve
- It must be clear what the inconsistencies in solving are
- The solver uses the numbers to make a solve, processing and giving the answer
- States must progress from Solving to Solved
- If not an optimal solution, call it 'Possible'
- If incomplete or no solution is found, mark as Impossible

### Resolution States

- **Solving**: Processing the puzzle, showing loading indicator
- **Solved**: Unique solution found with certainty
- **Possible**: Puzzle has multiple valid solutions (indicate to user)
- **Impossible**: No valid solution exists for the input clues

## Technical Specifications

### Supported Grid Sizes

- Minimum: 5x5 (small test puzzle)
- Maximum: 50x50 (practical limit for performance)
- Recommended sizes: 10x10 to 25x25 for optimal experience

### Performance

- Time limit typically must be 1 second, but some puzzles may vary (10 seconds, 1 minute or more)
- If the puzzle cannot be solved in 1 second (complex ones), give it more time to solve
- Maximum timeout: 30 seconds per puzzle

### Validation & Constraints

- Clues (numbers) must be valid for the grid size
- Coherence between rows and columns is validated
- Obvious inconsistencies are detected and marked in red
- Exceeded numbers are indicated visually to the user
- Solver reports if a configuration is impossible to solve

## Implementation Details

### State Management

Using Pinia with specific stores:

- **puzzleStore**: Current puzzle state (grid, clues, size)
- **solverStore**: Resolution state (status, results, progress)
- **uiStore**: User preferences (language, theme)

### Data Persistence

Minimal viable approach:

- LocalStorage only for user preferences (language, theme)
- No puzzle history (small project scope)
- Puzzle state only in memory during session

### Input Methods

MVP with manual input only:

- Input numbers by row/column
- Keyboard navigation (arrow keys) + Enter to confirm
- Real-time validation while entering
- Load JSON file feature to be added later

### WebWorker Communication Protocol

Simple message structure:

**Request to Worker:**

```typescript
type SolverRequest = {
  type: 'solve'
  puzzle: {
    rows: number[][] // [[1,2], [3], ...]
    cols: number[][]
    gridSize: number
  }
}
```

**Response from Worker:**

```typescript
type SolverResponse = {
  status: 'Solving' | 'Solved' | 'Possible' | 'Impossible'
  solution?: boolean[][] // Resolved grid
  errors?: string[]
}
```

## Quality Standards

### Testing Strategy

- Minimum 80% coverage on solver logic (WebWorker)
- Unit tests for composables and types
- No e2e tests in MVP (add later)
- Run tests with `pnpm test:unit`

### Accessibility (a11y)

WCAG 2.1 AA basic compliance:

- Full keyboard navigation support
- Aria labels on inputs and grid
- WCAG AA contrast ratios for colors
- Screen reader support not required in MVP

### Error Handling

- Maximum timeout: 30 seconds per puzzle
- On timeout: 'Impossible' state with message
- WebWorker failure: show friendly error "Unable to solve"
- Error logs in console for debugging

## Environment & Deployment

### Browser Support

- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Requirement: WebWorker support (modern browsers)

### Deployment & Build

- Target: Modern browsers (ES2020+)
- Build output: dist/
- Size target: <500KB (including vendor)
- Route-based lazy loading

### Mobile Design

Desktop-first with responsive design:

- Tablet: Vertical stack, adjusted grid
- Mobile: Smaller grid (max 15x15 recommended)
- Touch: Buttons with minimum 44px hit targets
- Keyboard primary on desktop

## Development Workflow & Internationalization

### Development Workflow

- Main branch is stable version
- Feature branches: `feature/[name]`
- PR with description and tests
- Self-review before merge
- No CI/CD in MVP (add later)

### Internationalization (i18n)

- Multi-language support in UI
- Initial languages: Spanish, English
- Language selector in header
- All labels and messages must be translatable
