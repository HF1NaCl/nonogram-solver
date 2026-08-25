<script setup lang="ts">
import { useClueNavigation } from '@/composables/useClueNavigation'
import type { CellState } from '@/interfaces/CellState.type'

type Props = {
  grid: CellState[][]
  rowClues: string[][]
  columnClues: string[][]
  rowErrors: string[]
  columnErrors: string[]
  width: number
  height: number
  cellSize: string
  group: number
}

defineProps<Props>()
const { moveClueFocus } = useClueNavigation()
</script>

<template>
  <div
    class="nonogram-layout"
    :style="{
      '--cell-size': cellSize,
      gridTemplateColumns: `${Math.max(40, Math.ceil(width / 2) * Number.parseFloat(cellSize) + 8)}px auto`,
      gridTemplateRows: 'auto auto',
    }"
  >
    <div class="nonogram-corner"></div>

    <div
      class="nonogram-column-clues"
      :style="{ gridTemplateColumns: `repeat(${width}, ${cellSize})` }"
    >
      <div
        v-for="(clues, columnIndex) in columnClues.slice(0, width)"
        :key="`column-${columnIndex}`"
        class="nonogram-column-clue"
      >
        <input
          v-for="(_, clueIndex) in clues"
          :key="`column-${columnIndex}-${clueIndex}`"
          v-model="clues[clueIndex]"
          :class="[
            'nonogram-clue-input',
            columnErrors[columnIndex] ? 'nonogram-clue-input-error' : '',
          ]"
          type="text"
          inputmode="numeric"
          maxlength="2"
          data-clue-area="column"
          :data-line="columnIndex"
          :data-index="clueIndex"
          @keydown="moveClueFocus($event, 'column', columnIndex, clueIndex)"
        />
      </div>
    </div>

    <div class="nonogram-row-clues" :style="{ gridTemplateRows: `repeat(${height}, ${cellSize})` }">
      <div
        v-for="(clues, rowIndex) in rowClues.slice(0, height)"
        :key="`row-${rowIndex}`"
        class="nonogram-row-clue"
      >
        <input
          v-for="(_, clueIndex) in clues"
          :key="`row-${rowIndex}-${clueIndex}`"
          v-model="clues[clueIndex]"
          :class="['nonogram-clue-input', rowErrors[rowIndex] ? 'nonogram-clue-input-error' : '']"
          type="text"
          inputmode="numeric"
          maxlength="2"
          data-clue-area="row"
          :data-line="rowIndex"
          :data-index="clueIndex"
          @keydown="moveClueFocus($event, 'row', rowIndex, clueIndex)"
        />
      </div>
    </div>

    <div
      class="grid gap-0"
      :style="{
        gridTemplateColumns: `repeat(${width}, ${cellSize})`,
        gridTemplateRows: `repeat(${height}, ${cellSize})`,
      }"
    >
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="contents">
        <div
          v-for="(cellState, columnIndex) in row"
          :key="`${rowIndex}-${columnIndex}`"
          :class="[
            'border border-gray-300 dark:border-gray-700',
            cellState === 'unknown' ? 'bg-white dark:bg-gray-800' : '',
            cellState === 'filled' ? 'bg-gray-950 dark:bg-white' : '',
            cellState === 'empty' ? 'bg-gray-100 dark:bg-gray-800' : '',
            (columnIndex + 1) % group === 0 ? 'border-r-2 border-r-black dark:border-r-white' : '',
            (rowIndex + 1) % group === 0 ? 'border-b-2 border-b-black dark:border-b-white' : '',
          ]"
          :style="{ width: cellSize, height: cellSize }"
        ></div>
      </div>
    </div>
  </div>
</template>
