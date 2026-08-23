import type { CellState } from '@/interfaces/CellState.type'
import type { NonogramPuzzle } from '@/interfaces/NonogramPuzzle.type'
import type { SolverStatus } from '@/interfaces/SolverStatus.type'

export type SolverRequest = {
  type: 'solve'
  requestId: number
  puzzle: NonogramPuzzle
}

type SolverResultStatus = Extract<SolverStatus, 'solved' | 'unsolvable' | 'multiple-solutions'>

export type SolverResponse =
  | {
      type: 'result'
      requestId: number
      status: SolverResultStatus
      grid: CellState[][]
    }
  | {
      type: 'error'
      requestId: number
      status: 'error'
      message: string
    }
