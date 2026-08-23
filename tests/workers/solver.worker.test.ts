import { describe, expect, it } from 'vitest'
import { NonogramSolver } from '@/composables/solving_algs/nonogramSolver'

describe('solver worker engine', () => {
  it('resolves a puzzle with one solution', () => {
    const result = new NonogramSolver({
      width: 1,
      height: 1,
      rowClues: [[1]],
      columnClues: [[1]],
    }).solve()

    expect(result).toEqual({
      status: 'solved',
      grid: [['filled']],
    })
  })

  it('reports an impossible puzzle', () => {
    const result = new NonogramSolver({
      width: 1,
      height: 1,
      rowClues: [[1]],
      columnClues: [[]],
    }).solve()

    expect(result.status).toBe('unsolvable')
  })

  it('reports multiple solutions only after finding two solutions', () => {
    const result = new NonogramSolver({
      width: 2,
      height: 2,
      rowClues: [[1], [1]],
      columnClues: [[1], [1]],
    }).solve()

    expect(result.status).toBe('multiple-solutions')
  })
})
