<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { useClueNavigation } from '@/composables/useClueNavigation'
import { useNonogramClues } from '@/composables/useNonogramClues'
import { useClueValidation } from '@/composables/useClueValidation'
import { useNonogramSolver } from '@/composables/useNonogramSolver'
import ClearButton from './shared/ClearButton.vue'

const width = ref(10)
const height = ref(10)
const group = ref(5)

const { rowClues, columnClues, clearClues } = useNonogramClues(width, height)
const { moveClueFocus } = useClueNavigation()

const hasErrors = computed(() => Boolean(validationMessage.value))

const { grid, status, canSolve, startSolving, applySolution, setStatus, resetGrid } =
  useNonogramSolver(width, height, rowClues, columnClues, hasErrors)

const cells = computed(() =>
  Array.from({ length: width.value * height.value }, (_, index) => ({
    r: Math.floor(index / width.value),
    c: index % width.value,
  })),
)

const cellSize = computed(() => {
  if (typeof window === 'undefined') {
    return '24px'
  }

  const availableWidth = Math.max(220, window.innerWidth - 120)
  const maxCell = Math.max(18, Math.min(28, Math.floor(availableWidth / Math.max(width.value, 10))))

  return `${maxCell}px`
})

const rowClueWidth = computed(() => {
  const clueSize = Number.parseFloat(cellSize.value)
  return `${Math.max(40, Math.ceil(width.value / 2) * clueSize + 8)}px`
})

const { rowErrors, columnErrors, validationMessage } = useClueValidation(
  rowClues,
  columnClues,
  width,
  height,
)

const solve = () => {
  const puzzle = startSolving()

  if (!puzzle) return

  console.log(puzzle)
}
</script>

<template>
  <div
    class="flex flex-col space-y-4 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl h-full p-6 mb-4"
  >
    <div class="flex flex-wrap items-center gap-4 justify-center w-full mb-2">
      <div class="input-group">
        <label class="input-label">Anchura</label>
        <input type="number" class="input" v-model="width" min="3" max="30" />
      </div>

      <div class="input-group">
        <label class="input-label">Altura</label>
        <input type="number" class="input" v-model="height" min="3" max="30" />
      </div>

      <div class="input-group">
        <label class="input-label">Grupo</label>
        <input type="number" class="input" v-model="group" min="2" max="10" />
      </div>

      <div class="flex items-center gap-2">
        <button
          class="solve-button inline-flex items-center justify-center gap-2"
          :disabled="!canSolve"
          @click="solve"
        >
          <Icon icon="mdi:wand" class="icon" />
          <span>{{ status === 'solving' ? 'Resolviendo...' : 'Resolver!' }}</span>
        </button>
        <ClearButton @clear="clearClues" />
      </div>
    </div>

    <div class="nonogram-wrapper">
      <div
        class="nonogram-layout"
        :style="{
          '--cell-size': cellSize,
          gridTemplateColumns: `${rowClueWidth} auto`,
          gridTemplateRows: `auto auto`,
        }"
      >
        <!-- Esquina superior izquierda -->
        <div class="nonogram-corner"></div>

        <!-- Pistas superiores -->
        <div class="column-clues" :style="{ gridTemplateColumns: `repeat(${width}, ${cellSize})` }">
          <div
            v-for="(clues, columnIndex) in columnClues.slice(0, width)"
            :key="`column-${columnIndex}`"
            class="column-clue"
          >
            <input
              v-for="(_, clueIndex) in clues"
              :key="`column-${columnIndex}-${clueIndex}`"
              v-model="clues[clueIndex]"
              :class="['clue-input', { 'clue-input-error': columnErrors[columnIndex] }]"
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

        <!-- Pistas izquierdas -->
        <div class="row-clues" :style="{ gridTemplateRows: `repeat(${height}, ${cellSize})` }">
          <div
            v-for="(clues, rowIndex) in rowClues.slice(0, height)"
            :key="`row-${rowIndex}`"
            class="row-clue"
          >
            <input
              v-for="(_, clueIndex) in clues"
              :key="`row-${rowIndex}-${clueIndex}`"
              v-model="clues[clueIndex]"
              :class="['clue-input', { 'clue-input-error': rowErrors[rowIndex] }]"
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

        <!-- Tabla principal -->
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
                cellState === 'empty' ? 'bg-gray-100 dark:bg-gray-700' : '',
                (columnIndex + 1) % group === 0 ? 'group-border-right' : '',
                (rowIndex + 1) % group === 0 ? 'group-border-bottom' : '',
              ]"
              :style="{ width: cellSize, height: cellSize }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <p
      v-if="validationMessage"
      class="text-center text-sm text-red-600 dark:text-red-400"
      role="alert"
    >
      {{ validationMessage }}
    </p>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

.clue-input-error {
  border-color: #dc2626 !important;
  background: #fef2f2;
}
.dark .clue-input-error {
  border-color: #f87171 !important;
  background: #450a0a;
}
.icon {
  @apply w-6 h-6;
}
.input {
  @apply border dark:border-gray-700 rounded px-2 py-1 w-20;
}
.input-group {
  @apply flex flex-col space-y-1;
}
.input-label {
  @apply text-sm font-medium uppercase text-gray-700 dark:text-gray-300;
}
.solve-button {
  @apply bg-gray-950 hover:bg-gray-700 text-white font-bold rounded-lg cursor-pointer size-14 w-36;
}
.nonogram-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
}

.nonogram-layout {
  display: grid;
  width: max-content;
  min-width: 0;
  margin: 0 auto;
}

.column-clues {
  display: grid;
  align-items: end;
  background: #f3f4f6;
}

.column-clue {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0;
  padding-bottom: 0.375rem;
}

.row-clues {
  display: grid;
  align-items: center;
  width: 100%;
  min-width: 0;
  background: #f3f4f6;
  overflow: visible;
}

.row-clue {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0;
  padding-right: 0.25rem;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.clue-input {
  width: var(--cell-size, 1.5rem);
  height: var(--cell-size, 1.5rem);
  box-sizing: border-box;
  padding: 0;
  border-radius: 0;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #111827;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  outline: none;
}

.dark .clue-input {
  border-color: #475569;
  background: #374151;
  color: #f8fafc;
}

.clue-input:hover {
  @apply border-gray-400 bg-white dark:bg-gray-600;
}

.clue-input:focus {
  @apply relative z-10 border-2 border-blue-600 bg-white dark:border-blue-400 dark:bg-gray-600;
}

.nonogram-corner {
  background: #e5e7eb;
  border-right: 2px solid #111827;
  border-bottom: 2px solid #111827;
}

.column-clues,
.row-clues,
.nonogram-corner {
  @apply dark:bg-gray-700;
}

.nonogram-corner {
  @apply dark:border-gray-100;
}
.group-border-right {
  border-right: 2px solid #000 !important;
}

.group-border-bottom {
  border-bottom: 2px solid #000 !important;
}

:global(.dark) .group-border-right {
  border-right-color: #f9fafb !important;
}

:global(.dark) .group-border-bottom {
  border-bottom-color: #f9fafb !important;
}
</style>
