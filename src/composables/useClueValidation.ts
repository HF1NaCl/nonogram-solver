import { computed, type Ref } from 'vue'

const validateLine = (clues: string[], lineLength: number) => {
  const values = clues.filter((clue) => clue.trim() !== '').map((clue) => Number(clue))

  if (values.some((value) => !Number.isInteger(value) || value < 1)) {
    return 'Cada pista debe ser un número entero mayor que 0.'
  }

  if (values.some((value) => value > lineLength)) {
    return `Ninguna pista puede superar ${lineLength}.`
  }

  const requiredCells = values.reduce((total, value) => total + value, 0) + values.length - 1

  if (requiredCells > lineLength) {
    return `Estas pistas necesitan ${requiredCells} casillas, pero la línea tiene ${lineLength}.`
  }

  return ''
}

export const useClueValidation = (
  rowClues: Ref<string[][]>,
  columnClues: Ref<string[][]>,
  width: Ref<number>,
  height: Ref<number>,
) => {
  const rowErrors = computed(() => rowClues.value.map((clues) => validateLine(clues, width.value)))

  const columnErrors = computed(() =>
    columnClues.value.map((clues) => validateLine(clues, height.value)),
  )

  const validationMessage = computed(() => {
    const rowIndex = rowErrors.value.findIndex(Boolean)

    if (rowIndex !== -1) {
      return `Fila ${rowIndex + 1}: ${rowErrors.value[rowIndex]}`
    }

    const columnIndex = columnErrors.value.findIndex(Boolean)

    if (columnIndex !== -1) {
      return `Columna ${columnIndex + 1}: ${columnErrors.value[columnIndex]}`
    }

    return ''
  })

  return { rowErrors, columnErrors, validationMessage }
}
