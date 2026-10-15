import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import NonogramCard from '@/components/NonogramCard/NonogramCard.vue'
import { NonogramSolver } from '@/composables/solving_algs/nonogramSolver'

class MockWorker {
  onmessage: ((event: MessageEvent) => void) | null = null

  constructor(_url: URL, _options?: WorkerOptions) {}

  postMessage(message: {
    requestId: number
    puzzle: {
      width: number
      height: number
      rowClues: number[][]
      columnClues: number[][]
    }
  }) {
    queueMicrotask(() => {
      const result = new NonogramSolver(message.puzzle).solve()

      this.onmessage?.({
        data: {
          type: 'result',
          requestId: message.requestId,
          status: result.status,
          grid: result.grid,
        },
      } as MessageEvent)
    })
  }

  terminate() {}
}

beforeEach(() => {
  vi.stubGlobal('Worker', MockWorker)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const enterPuzzle = async (
  wrapper: ReturnType<typeof mount>,
  size: number,
  rowClues: number[][],
  columnClues: number[][],
) => {
  const [widthInput, heightInput] = wrapper.findAll('input.nonogram-input')

  await widthInput?.setValue(String(size))
  await heightInput?.setValue(String(size))
  await nextTick()

  for (const [lineIndex, clues] of rowClues.entries()) {
    for (const [clueIndex, clue] of clues.entries()) {
      await wrapper
        .get(`[data-clue-area="row"][data-line="${lineIndex}"][data-index="${clueIndex}"]`)
        .setValue(String(clue))
    }
  }

  for (const [lineIndex, clues] of columnClues.entries()) {
    for (const [clueIndex, clue] of clues.entries()) {
      await wrapper
        .get(`[data-clue-area="column"][data-line="${lineIndex}"][data-index="${clueIndex}"]`)
        .setValue(String(clue))
    }
  }

  await wrapper.get('button.nonogram-solve-button').trigger('click')
}

const expectSolvedGrid = async (wrapper: ReturnType<typeof mount>, expectedRows: string[]) => {
  await vi.waitFor(() => {
    expect(wrapper.text()).toContain('Puzzle resuelto.')
  })

  const cells = wrapper.findAll('div.grid > div.contents > div')
  const expectedCells = expectedRows.flatMap((row) => [...row])

  expect(cells).toHaveLength(expectedCells.length)

  for (const [index, cell] of cells.entries()) {
    const expectedState = expectedCells[index]
    const expectedClass = expectedState === '#' ? 'bg-gray-950' : 'bg-gray-100'

    expect(cell.classes()).toContain(expectedClass)
  }
}

describe('NonogramCard', () => {
  it('shows the filled-cell calculation without showing an error', async () => {
    const wrapper = mount(NonogramCard)
    const rowInput = wrapper.get('[data-clue-area="row"][data-line="0"]')
    const columnInput = wrapper.get('[data-clue-area="column"][data-line="0"]')

    await rowInput.setValue('2')
    await columnInput.setValue('1')
    await nextTick()

    expect(wrapper.text()).toContain('Cálculo de celdas: 2 vs 1')
    expect(wrapper.text()).not.toContain('Error: Números no coincidentes')
  })

  it('shows the mismatch as an error only after clicking Resolver', async () => {
    const wrapper = mount(NonogramCard)
    const rowInput = wrapper.get('[data-clue-area="row"][data-line="0"]')
    const columnInput = wrapper.get('[data-clue-area="column"][data-line="0"]')

    await rowInput.setValue('2')
    await columnInput.setValue('1')
    await nextTick()

    await wrapper.get('button.nonogram-solve-button').trigger('click')

    expect(wrapper.text()).toContain('Error: Números no coincidentes. 2 vs 1')
  })

  it('clears clues and returns the board to its initial state', async () => {
    const wrapper = mount(NonogramCard)
    const input = wrapper.get('[data-clue-area="row"][data-line="0"]')

    await input.setValue('1')
    await wrapper.get('button.clear-button').trigger('click')

    const clearActions = [...document.body.querySelectorAll('button')].filter(
      (button) => button.textContent?.trim() === 'Limpiar',
    )
    const confirmButton = clearActions[clearActions.length - 1]
    expect(confirmButton).toBeDefined()
    confirmButton?.click()
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('solves the manually entered 5x5 puzzle correctly', async () => {
    const wrapper = mount(NonogramCard)
    await enterPuzzle(
      wrapper,
      5, // Tamaño
      [[5], [], [5], [], [5]], // Grids de Izquierda
      [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ], // Grids de Arriba
    )

    await expectSolvedGrid(wrapper, ['#####', '.....', '#####', '.....', '#####']) // Como se tiene que ver el puzzle
  })

  it('solves the manually entered 10x10 puzzle correctly', async () => {
    const wrapper = mount(NonogramCard)
    await enterPuzzle(
      wrapper,
      10,
      [[10], [], [10], [], [10], [], [10], [], [10], []],
      Array.from({ length: 10 }, () => [1, 1, 1, 1, 1]),
    )

    await expectSolvedGrid(
      wrapper,
      Array.from({ length: 10 }, (_, rowIndex) =>
        rowIndex % 2 === 0 ? '#'.repeat(10) : '.'.repeat(10),
      ),
    )
  })

  it('solves the manually entered 15x15 puzzle correctly', async () => {
    const wrapper = mount(NonogramCard)
    await enterPuzzle(
      wrapper,
      15,
      Array.from({ length: 15 }, (_, rowIndex) => (rowIndex % 2 === 0 ? [15] : [])),
      Array.from({ length: 15 }, () => [1, 1, 1, 1, 1, 1, 1, 1]),
    )

    await expectSolvedGrid(
      wrapper,
      Array.from({ length: 15 }, (_, rowIndex) =>
        rowIndex % 2 === 0 ? '#'.repeat(15) : '.'.repeat(15),
      ),
    )
  })

  it('solves the manually entered 20x20 puzzle correctly', async () => {
    const wrapper = mount(NonogramCard)
    await enterPuzzle(
      wrapper,
      20,
      Array.from({ length: 20 }, (_, rowIndex) => (rowIndex % 2 === 0 ? [20] : [])),
      Array.from({ length: 20 }, () => [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
    )

    await expectSolvedGrid(
      wrapper,
      Array.from({ length: 20 }, (_, rowIndex) =>
        rowIndex % 2 === 0 ? '#'.repeat(20) : '.'.repeat(20),
      ),
    )
  })

  it('solves the manually entered 30x30 puzzle correctly', async () => {
    const wrapper = mount(NonogramCard)
    await enterPuzzle(
      wrapper,
      30, // Tamaño
      Array.from({ length: 30 }, (_, rowIndex) => (rowIndex % 2 === 0 ? [30] : [])), // Izquierda
      Array.from({ length: 30 }, () => [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), // Arriba
    )

    await expectSolvedGrid(
      wrapper,
      Array.from({ length: 30 }, (_, rowIndex) =>
        rowIndex % 2 === 0 ? '#'.repeat(30) : '.'.repeat(30),
      ),
    )
  }, 30_000)
})
