<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref, watch } from 'vue'

const width = ref(10)
const height = ref(10)
const group = ref(5)

const maxRowClues = computed(() => Math.ceil(width.value / 2))
const maxColumnClues = computed(() => Math.ceil(height.value / 2))

const cells = computed(() => {
  const w = width.value
  const h = height.value
  const arr = []
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      arr.push({ r, c })
    }
  }
  return arr
})

const createClues = (lineCount: number, maxClues: number) =>
  Array.from({ length: lineCount }, () => Array.from({ length: maxClues }, () => ''))

const rowClues = ref(createClues(height.value, maxRowClues.value))
const columnClues = ref(createClues(width.value, maxColumnClues.value))

const rowClueWidth = computed(() => {
  const inputWidth = 1.5
  const gap = 0.125
  const padding = 0.5
  const clues = maxRowClues.value

  return `${clues * inputWidth + (clues - 1) * gap + padding}rem`
})

const resizeClues = (currentClues: string[][], lineCount: number, maxClues: number) =>
  Array.from({ length: lineCount }, (_, lineIndex) =>
    Array.from({ length: maxClues }, (_, clueIndex) => currentClues[lineIndex]?.[clueIndex] ?? ''),
  )

watch([width, height], () => {
  rowClues.value = resizeClues(rowClues.value, height.value, maxRowClues.value)

  columnClues.value = resizeClues(columnClues.value, width.value, maxColumnClues.value)
})
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
        <button class="solve-button inline-flex items-center justify-center gap-2">
          <Icon icon="mdi:wand" class="icon" />
          <span>Resolver!</span>
        </button>
        <button class="clear-button inline-flex items-center justify-center gap-2">
          <Icon icon="mdi:reload" class="icon" />
          <span>Limpiar</span>
        </button>
      </div>
    </div>

    <div class="nonogram-wrapper">
      <div
        class="nonogram-layout"
        :style="{
          gridTemplateColumns: `${rowClueWidth} auto`,
          gridTemplateRows: `auto auto`,
        }"
      >
        <!-- Esquina superior izquierda -->
        <div class="nonogram-corner"></div>

        <!-- Pistas superiores -->
        <div class="column-clues" :style="{ gridTemplateColumns: `repeat(${width}, 1.5rem)` }">
          <div
            v-for="(clues, columnIndex) in columnClues.slice(0, width)"
            :key="`column-${columnIndex}`"
            class="column-clue"
          >
            <input
              v-for="(_, clueIndex) in clues"
              :key="`column-${columnIndex}-${clueIndex}`"
              v-model="clues[clueIndex]"
              class="clue-input"
              type="text"
              inputmode="numeric"
              maxlength="2"
            />
          </div>
        </div>

        <!-- Pistas izquierdas -->
        <div class="row-clues" :style="{ gridTemplateRows: `repeat(${height}, 1.5rem)` }">
          <div
            v-for="(clues, rowIndex) in rowClues.slice(0, height)"
            :key="`row-${rowIndex}`"
            class="row-clue"
          >
            <input
              v-for="(_, clueIndex) in clues"
              :key="`row-${rowIndex}-${clueIndex}`"
              v-model="clues[clueIndex]"
              class="clue-input"
              type="text"
              inputmode="numeric"
              maxlength="2"
            />
          </div>
        </div>

        <!-- Tabla principal -->
        <div
          class="grid gap-0"
          :style="{
            gridTemplateColumns: `repeat(${width}, 1.5rem)`,
            gridTemplateRows: `repeat(${height}, 1.5rem)`,
          }"
        >
          <div
            v-for="cell in cells"
            :key="`${cell.r}-${cell.c}`"
            :class="[
              'flex items-center justify-center select-none bg-white dark:bg-gray-800',
              'border border-gray-300 dark:border-gray-700',
              (cell.c + 1) % group === 0 ? 'group-border-right' : '',
              (cell.r + 1) % group === 0 ? 'group-border-bottom' : '',
            ]"
            style="width: 1.5rem; height: 1.5rem"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

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
.clear-button {
  @apply text-sm bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg cursor-pointer size-10 w-28 border-2;
}
.nonogram-wrapper {
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
}

.nonogram-layout {
  display: grid;
  width: max-content;
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
}

.row-clue {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0;
  padding-right: 0.375rem;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.clue-input {
  @apply w-6 h-6 box-border p-0 rounded-none border border-gray-300 bg-gray-50 text-gray-900 text-center text-xs font-semibold;
  @apply dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100;
  outline: none;
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
