import { computed, ref, watch, type Ref } from 'vue'
import type { CellState } from '@/interfaces/CellState.type'
import type { NonogramPuzzle } from '@/interfaces/NonogramPuzzle.type'
import type { SolverStatus } from '@/interfaces/SolverStatus.type'

const createGrid = (height: number, width: number): CellState[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => 'unknown' as const))

const toNumbers = (clues: string[]) => clues.filter((clue) => clue.trim() !== '').map(Number)

export const useNonogramSolver = (
  width: Ref<number>,
  height: Ref<number>,
  rowClues: Ref<string[][]>,
  columnClues: Ref<string[][]>,
  hasErrors: Ref<boolean>,
) => {
  const status = ref<SolverStatus>('idle')
  const grid = ref<CellState[][]>(createGrid(height.value, width.value))

  const puzzle = computed<NonogramPuzzle>(() => ({
    width: width.value,
    height: height.value,
    rowClues: rowClues.value.map(toNumbers),
    columnClues: columnClues.value.map(toNumbers),
  }))

  const canSolve = computed(() => !hasErrors.value && status.value !== 'solving')

  const startSolving = () => {
    if (!canSolve.value) return null

    status.value = 'solving'
    return puzzle.value
  }

  const applySolution = (solution: CellState[][]) => {
    grid.value = solution
    status.value = 'solved'
  }

  const setStatus = (nextStatus: SolverStatus) => {
    status.value = nextStatus
  }

  const resetGrid = () => {
    grid.value = createGrid(height.value, width.value)
    status.value = 'idle'
  }

  watch([width, height], resetGrid)

  return {
    grid,
    status,
    canSolve,
    startSolving,
    applySolution,
    setStatus,
    resetGrid,
  }
}
