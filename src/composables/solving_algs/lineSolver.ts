export type LineCell = -1 | 0 | 1

export class LineSolver {
  private readonly clues: number[]

  constructor(clues: number[]) {
    if (clues.some((clue) => !Number.isInteger(clue) || clue <= 0)) {
      throw new RangeError('Line clues must be positive integers')
    }

    this.clues = [...clues]
  }

  solve(cells: LineCell[]): LineCell[] | null {
    const possibleCells = [...cells]

    if (possibleCells.some((cell) => ![-1, 0, 1].includes(cell))) {
      throw new RangeError('Line cells must be -1, 0, or 1')
    }

    const allFilled = new Array<boolean>(possibleCells.length).fill(true)
    const allEmpty = new Array<boolean>(possibleCells.length).fill(true)
    let solutionCount = 0

    const visit = (clueIndex: number, start: number, candidate: boolean[]) => {
      if (clueIndex === this.clues.length) {
        if (!this.matchesKnownCells(possibleCells, candidate)) return

        solutionCount += 1

        for (let index = 0; index < candidate.length; index += 1) {
          const isFilled = candidate[index] ?? false
          allFilled[index] = (allFilled[index] ?? true) && isFilled
          allEmpty[index] = (allEmpty[index] ?? true) && !isFilled
        }

        return
      }

      const clue = this.clues[clueIndex]
      if (clue === undefined) return

      const minimumAfter = this.minimumLengthAfter(clueIndex)
      const lastStart = possibleCells.length - clue - minimumAfter

      for (let position = start; position <= lastStart; position += 1) {
        const end = position + clue

        if (!this.canPlaceGroup(possibleCells, position, end)) continue

        for (let index = position; index < end; index += 1) {
          candidate[index] = true
        }

        const nextStart = clueIndex === this.clues.length - 1 ? end : end + 1
        visit(clueIndex + 1, nextStart, candidate)

        for (let index = position; index < end; index += 1) {
          candidate[index] = false
        }
      }
    }

    visit(0, 0, new Array<boolean>(possibleCells.length).fill(false))

    if (solutionCount === 0) return null

    return possibleCells.map((_, index) => {
      if (allFilled[index]) return 1
      if (allEmpty[index]) return 0
      return -1
    })
  }

  private minimumLengthAfter(clueIndex: number): number {
    let length = 0

    for (let index = clueIndex + 1; index < this.clues.length; index += 1) {
      const clue = this.clues[index]
      if (clue === undefined) continue

      length += clue
      if (index < this.clues.length - 1) length += 1
    }

    return length
  }

  private canPlaceGroup(cells: LineCell[], start: number, end: number): boolean {
    for (let index = start; index < end; index += 1) {
      if (cells[index] === 0) return false
    }

    if (end < cells.length && cells[end] === 1) return false

    return true
  }

  private matchesKnownCells(cells: LineCell[], candidate: boolean[]): boolean {
    for (let index = 0; index < cells.length; index += 1) {
      const cell = cells[index]
      const isFilled = candidate[index]

      if (cell === 1 && !isFilled) return false
      if (cell === 0 && isFilled) return false
    }

    return true
  }
}
