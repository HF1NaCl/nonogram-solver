import type { CellState } from '@/interfaces/CellState.type'
import type { NonogramPuzzle } from '@/interfaces/NonogramPuzzle.type'
import { LineSolver, type LineCell } from './lineSolver'

export type NonogramSolveStatus = 'solved' | 'multiple-solutions' | 'unsolvable'

export type NonogramSolveResult = {
  status: NonogramSolveStatus
  grid: CellState[][]
}

type InternalGrid = LineCell[][]

export class NonogramSolver {
  private readonly puzzle: NonogramPuzzle
  private readonly rowSolvers: LineSolver[]
  private readonly columnSolvers: LineSolver[]

  constructor(puzzle: NonogramPuzzle) {
    this.validatePuzzle(puzzle)

    this.puzzle = {
      ...puzzle,
      rowClues: puzzle.rowClues.map((clues) => [...clues]),
      columnClues: puzzle.columnClues.map((clues) => [...clues]),
    }
    this.rowSolvers = this.puzzle.rowClues.map((clues) => new LineSolver(clues))
    this.columnSolvers = this.puzzle.columnClues.map((clues) => new LineSolver(clues))
  }

  solve(): NonogramSolveResult {
    const solutions: InternalGrid[] = []
    const grid = this.createGrid()

    this.search(grid, solutions)

    if (solutions.length === 0) {
      return { status: 'unsolvable', grid: this.toCellStateGrid(grid) }
    }

    return {
      status: solutions.length === 1 ? 'solved' : 'multiple-solutions',
      grid: this.toCellStateGrid(solutions[0] ?? grid),
    }
  }

  private search(grid: InternalGrid, solutions: InternalGrid[]): void {
    if (solutions.length >= 2 || !this.propagate(grid)) return

    const unknownCell = this.findUnknownCell(grid)
    if (unknownCell === null) {
      solutions.push(this.cloneGrid(grid))
      return
    }

    for (const value of [1, 0] as const) {
      if (solutions.length >= 2) return

      const branch = this.cloneGrid(grid)
      branch[unknownCell.row]![unknownCell.column] = value
      this.search(branch, solutions)
    }
  }

  private propagate(grid: InternalGrid): boolean {
    let changed: boolean

    do {
      changed = false

      for (let row = 0; row < this.puzzle.height; row += 1) {
        const currentLine = grid[row]
        const solver = this.rowSolvers[row]
        if (currentLine === undefined || solver === undefined) return false

        const nextLine = solver.solve(currentLine)
        if (nextLine === null) return false

        const result = this.mergeLine(currentLine, nextLine)
        if (result === null) return false
        changed = changed || result
      }

      for (let column = 0; column < this.puzzle.width; column += 1) {
        const currentLine = this.getColumn(grid, column)
        const solver = this.columnSolvers[column]
        if (solver === undefined) return false

        const nextLine = solver.solve(currentLine)
        if (nextLine === null) return false

        const result = this.mergeColumn(grid, column, nextLine)
        if (result === null) return false
        changed = changed || result
      }
    } while (changed)

    return true
  }

  private mergeLine(current: LineCell[], next: LineCell[]): boolean | null {
    let changed = false

    for (let index = 0; index < current.length; index += 1) {
      const currentCell = current[index]
      const nextCell = next[index]
      if (currentCell === undefined || nextCell === undefined) return null
      if (nextCell === -1) continue
      if (currentCell !== -1 && currentCell !== nextCell) return null

      if (currentCell === -1) {
        current[index] = nextCell
        changed = true
      }
    }

    return changed
  }

  private mergeColumn(grid: InternalGrid, column: number, next: LineCell[]): boolean | null {
    let changed = false

    for (let row = 0; row < grid.length; row += 1) {
      const currentRow = grid[row]
      const nextCell = next[row]
      if (currentRow === undefined || nextCell === undefined) return null

      const currentCell = currentRow[column]
      if (currentCell === undefined) return null
      if (nextCell === -1) continue
      if (currentCell !== -1 && currentCell !== nextCell) return null

      if (currentCell === -1) {
        currentRow[column] = nextCell
        changed = true
      }
    }

    return changed
  }

  private findUnknownCell(grid: InternalGrid): { row: number; column: number } | null {
    for (let row = 0; row < grid.length; row += 1) {
      const currentRow = grid[row]
      if (currentRow === undefined) continue

      for (let column = 0; column < currentRow.length; column += 1) {
        if (currentRow[column] === -1) return { row, column }
      }
    }

    return null
  }

  private getColumn(grid: InternalGrid, column: number): LineCell[] {
    return grid.map((row) => row[column] ?? -1)
  }

  private createGrid(): InternalGrid {
    return Array.from({ length: this.puzzle.height }, () =>
      Array<LineCell>(this.puzzle.width).fill(-1),
    )
  }

  private cloneGrid(grid: InternalGrid): InternalGrid {
    return grid.map((row) => [...row])
  }

  private toCellStateGrid(grid: InternalGrid): CellState[][] {
    return grid.map((row) =>
      row.map((cell) => {
        if (cell === 1) return 'filled'
        if (cell === 0) return 'empty'
        return 'unknown'
      }),
    )
  }

  private validatePuzzle(puzzle: NonogramPuzzle): void {
    if (!Number.isInteger(puzzle.width) || puzzle.width <= 0) {
      throw new RangeError('Puzzle width must be a positive integer')
    }

    if (!Number.isInteger(puzzle.height) || puzzle.height <= 0) {
      throw new RangeError('Puzzle height must be a positive integer')
    }

    if (puzzle.rowClues.length !== puzzle.height) {
      throw new RangeError('Puzzle row clues do not match its height')
    }

    if (puzzle.columnClues.length !== puzzle.width) {
      throw new RangeError('Puzzle column clues do not match its width')
    }
  }
}
