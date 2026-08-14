type ClueArea = 'row' | 'column'

export const useClueNavigation = () => {
  const moveClueFocus = (
    event: KeyboardEvent,
    area: ClueArea,
    lineIndex: number,
    clueIndex: number,
  ) => {
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

    if (!event.key.startsWith('Arrow')) return

    const nextInput = document.querySelector<HTMLInputElement>(
      `[data-clue-area="${area}"][data-line="${nextLine}"][data-index="${nextClue}"]`,
    )

    if (!nextInput) return

    event.preventDefault()
    nextInput.focus()
    nextInput.select()
  }

  return { moveClueFocus }
}
