type ClueArea = 'row' | 'column'

export const useClueNavigation = () => {
  const moveClueFocus = (
    event: KeyboardEvent,
    area: ClueArea,
    lineIndex: number,
    clueIndex: number,
  ) => {
    // Si no es una tecla de navegación (Arrow o Space), dejar que se escriba normalmente
    if (!event.key.startsWith('Arrow') && event.code !== 'Space') {
      return
    }

    // Prevenir solo las teclas de navegación
    event.preventDefault()

    let nextLine = lineIndex
    let nextClue = clueIndex

    if (event.key === 'ArrowLeft') {
      area === 'row' ? nextClue-- : nextLine--
    }

    if (event.key === 'ArrowRight') {
      area === 'row' ? nextClue++ : nextLine++
    }

    if (event.key === 'ArrowUp') {
      area === 'row' ? nextLine-- : nextClue--
    }

    if (event.key === 'ArrowDown') {
      area === 'row' ? nextLine++ : nextClue++
    }

    // Space: navega según el área
    if (event.code === 'Space') {
      nextClue++ // Siempre va al siguiente número en la secuencia
    }

    const nextInput = document.querySelector<HTMLInputElement>(
      `[data-clue-area="${area}"][data-line="${nextLine}"][data-index="${nextClue}"]`,
    )

    if (!nextInput) return

    nextInput.focus()
    nextInput.select()
  }

  return { moveClueFocus }
}
