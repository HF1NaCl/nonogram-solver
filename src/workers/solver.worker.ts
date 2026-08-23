/// <reference lib="webworker" />

import { NonogramSolver } from '@/composables/solving_algs/nonogramSolver'
import type { SolverRequest, SolverResponse } from '@/interfaces/Solver.type'

self.onmessage = (event: MessageEvent<SolverRequest>) => {
  const request = event.data
  if (request.type !== 'solve') return

  try {
    const result = new NonogramSolver(request.puzzle).solve()
    const response: SolverResponse = {
      type: 'result',
      requestId: request.requestId,
      status: result.status,
      grid: result.grid,
    }

    self.postMessage(response)
  } catch (error) {
    const response: SolverResponse = {
      type: 'error',
      requestId: request.requestId,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to solve',
    }

    self.postMessage(response)
  }
}
