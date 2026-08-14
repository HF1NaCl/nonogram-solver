import { computed, ref, watch, type Ref } from 'vue'

const createClues = (lineCount: number, maxClues: number) =>
  Array.from({ length: lineCount }, () => Array.from({ length: maxClues }, () => ''))

const resizeClues = (currentClues: string[][], lineCount: number, maxClues: number) =>
  Array.from({ length: lineCount }, (_, lineIndex) =>
    Array.from({ length: maxClues }, (_, clueIndex) => currentClues[lineIndex]?.[clueIndex] ?? ''),
  )

export const useNonogramClues = (width: Ref<number>, height: Ref<number>) => {
  const maxRowClues = computed(() => Math.ceil(width.value / 2))
  const maxColumnClues = computed(() => Math.ceil(height.value / 2))

  const rowClues = ref(createClues(height.value, maxRowClues.value))
  const columnClues = ref(createClues(width.value, maxColumnClues.value))

  const rowClueWidth = computed(() => {
    const inputWidth = 1.5
    const padding = 0.375

    return `${maxRowClues.value * inputWidth + padding}rem`
  })

  const clearClues = () => {
    rowClues.value.forEach((clues) => clues.fill(''))
    columnClues.value.forEach((clues) => clues.fill(''))
  }

  watch([width, height], () => {
    rowClues.value = resizeClues(rowClues.value, height.value, maxRowClues.value)

    columnClues.value = resizeClues(columnClues.value, width.value, maxColumnClues.value)
  })

  return {
    rowClues,
    columnClues,
    rowClueWidth,
    clearClues,
  }
}
