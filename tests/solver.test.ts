import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { NonogramSolver } from '@/composables/solving_algs/nonogramSolver'
import { useClueValidation } from '@/composables/useClueValidation'

describe('NonogramSolver', () => {
  it('returns solved for a puzzle with one solution', () => {
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

  it('returns unsolvable when the row and column clues conflict', () => {
    const result = new NonogramSolver({
      width: 1,
      height: 1,
      rowClues: [[1]],
      columnClues: [[]],
    }).solve()

    expect(result.status).toBe('unsolvable')
  })

  it('returns multiple-solutions only after finding a second solution', () => {
    const result = new NonogramSolver({
      width: 2,
      height: 2,
      rowClues: [[1], [1]],
      columnClues: [[1], [1]],
    }).solve()

    expect(result.status).toBe('multiple-solutions')
    expect(result.grid).toHaveLength(2)
  })

  it('reports mismatched filled-cell totals before solving', () => {
    const { validationMessage, cellCountMessage } = useClueValidation(
      ref([['20']]),
      ref([['10']]),
      ref(20),
      ref(20),
    )

    expect(validationMessage.value).toBe('')
    expect(cellCountMessage.value).toBe('Cálculo de celdas: 20 vs 10')
  })
})
