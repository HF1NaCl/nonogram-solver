import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import NonogramCard from '@/components/NonogramCard.vue'

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

    await wrapper.get('button.solve-button').trigger('click')

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
})
