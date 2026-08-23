import { computed, onUnmounted, ref, watch, type Ref } from 'vue'
import type { CellState } from '@/interfaces/CellState.type'
import type { NonogramPuzzle } from '@/interfaces/NonogramPuzzle.type'
import type { SolverStatus } from '@/interfaces/SolverStatus.type'
import type { SolverResponse } from '@/interfaces/Solver.type'

const createGrid = (height: number, width: number): CellState[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => 'unknown' as const))

const toNumbers = (clues: string[]) => clues.filter((clue) => clue.trim() !== '').map(Number)

export const useNonogramSolver = (
  width: Ref<number>,
  height: Ref<number>,
  rowClues: Ref<string[][]>,
  columnClues: Ref<string[][]>,
  hasErrors: Ref<boolean>,
  hasCellCountMismatch: Ref<boolean>,
  cellCountMessage: Ref<string>,
) => {
  const status = ref<SolverStatus>('idle')
  const grid = ref<CellState[][]>(createGrid(height.value, width.value))
  const errorMessage = ref<string | null>(null)
  let worker: Worker | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let activeRequestId = 0

  const puzzle = computed<NonogramPuzzle>(() => ({
    width: width.value,
    height: height.value,
    rowClues: rowClues.value.map(toNumbers),
    columnClues: columnClues.value.map(toNumbers),
  }))

  const canSolve = computed(() => !hasErrors.value && status.value !== 'solving')

  const clearTimeout = () => {
    if (timeoutId === null) return

    globalThis.clearTimeout(timeoutId)
    timeoutId = null
  }

  const terminateWorker = () => {
    clearTimeout()
    worker?.terminate()
    worker = null
  }

  const startSolving = () => {
    if (!canSolve.value) return

    if (hasCellCountMismatch.value) {
      status.value = 'unsolvable'
      errorMessage.value = `Error: Números no coincidentes. ${cellCountMessage.value.replace('Cálculo de celdas: ', '')}`
      return
    }

    if (typeof Worker === 'undefined') {
      status.value = 'error'
      errorMessage.value = 'WebWorker is not available'
      return
    }

    status.value = 'solving'
    errorMessage.value = null
    terminateWorker()

    const requestId = ++activeRequestId
    const currentWorker = new Worker(new URL('../workers/solver.worker.ts', import.meta.url), {
      type: 'module',
    })
    worker = currentWorker

    currentWorker.onmessage = (event: MessageEvent<SolverResponse>) => {
      const response = event.data
      if (response.requestId !== activeRequestId) return

      clearTimeout()
      currentWorker.terminate()
      if (worker === currentWorker) worker = null

      if (response.type === 'error') {
        status.value = 'error'
        errorMessage.value = response.message
        return
      }

      grid.value = response.grid
      status.value = response.status
    }

    currentWorker.onerror = () => {
      if (requestId !== activeRequestId) return

      terminateWorker()
      status.value = 'error'
      errorMessage.value = 'Unable to solve'
    }

    timeoutId = globalThis.setTimeout(() => {
      if (requestId !== activeRequestId) return

      terminateWorker()
      status.value = 'unsolvable'
      errorMessage.value = 'Solver timed out after 30 seconds'
    }, 30_000)

    currentWorker.postMessage({ type: 'solve', requestId, puzzle: puzzle.value })
  }

  const resetGrid = () => {
    activeRequestId += 1
    terminateWorker()
    grid.value = createGrid(height.value, width.value)
    errorMessage.value = null
    status.value = 'idle'
  }

  watch([width, height], resetGrid)
  onUnmounted(terminateWorker)

  return {
    grid,
    status,
    errorMessage,
    canSolve,
    startSolving,
    resetGrid,
  }
}
