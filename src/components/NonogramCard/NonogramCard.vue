<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { useNonogramClues } from '@/composables/useNonogramClues'
import { useClueValidation } from '@/composables/useClueValidation'
import { useNonogramSolver } from '@/composables/useNonogramSolver'
import ClearButton from '../shared/ClearButton.vue'
import GridTable from './GridTable/GridTable.vue'
import './NonogramCard.css'

const width = ref(10)
const height = ref(10)
const group = ref(5)

const { rowClues, columnClues, clearClues } = useNonogramClues(width, height)

const { rowErrors, columnErrors, validationMessage, hasCellCountMismatch, cellCountMessage } =
  useClueValidation(rowClues, columnClues, width, height)

const hasErrors = computed(() => Boolean(validationMessage.value))

const { grid, status, errorMessage, canSolve, startSolving, resetGrid } = useNonogramSolver(
  width,
  height,
  rowClues,
  columnClues,
  hasErrors,
  hasCellCountMismatch,
  cellCountMessage,
)

const cellSize = computed(() => {
  if (typeof window === 'undefined') {
    return '24px'
  }

  const availableWidth = Math.max(220, window.innerWidth - 120)
  const totalColumns = width.value + Math.ceil(width.value / 2)
  const maxCell = Math.max(18, Math.min(28, Math.floor(availableWidth / totalColumns)))

  return `${maxCell}px`
})

const clearPuzzle = () => {
  clearClues()
  resetGrid()
}
</script>

<template>
  <div class="nonogram-card">
    <div class="nonogram-controls">
      <div class="nonogram-input-group">
        <label class="nonogram-input-label">Anchura</label>
        <input v-model="width" type="number" class="nonogram-input" min="3" max="30" />
      </div>

      <div class="nonogram-input-group">
        <label class="nonogram-input-label">Altura</label>
        <input v-model="height" type="number" class="nonogram-input" min="3" max="30" />
      </div>

      <div class="nonogram-input-group">
        <label class="nonogram-input-label">Grupo</label>
        <input v-model="group" type="number" class="nonogram-input" min="2" max="10" />
      </div>

      <div class="flex items-center gap-2">
        <button class="nonogram-solve-button" :disabled="!canSolve" @click="startSolving">
          <Icon icon="mdi:wand" class="icon" />
          <span>{{ status === 'solving' ? 'Resolviendo...' : 'Resolver!' }}</span>
        </button>
        <ClearButton @clear="clearPuzzle" />
      </div>
    </div>

    <div class="nonogram-wrapper">
      <!-- Tabla completa con pistas y celdas -->
      <GridTable
        :grid="grid"
        :row-clues="rowClues"
        :column-clues="columnClues"
        :row-errors="rowErrors"
        :column-errors="columnErrors"
        :width="width"
        :height="height"
        :cell-size="cellSize"
        :group="group"
      />
    </div>

    <p
      v-if="validationMessage"
      class="text-center text-sm text-red-600 dark:text-red-400"
      role="alert"
    >
      {{ validationMessage }}
    </p>
    <p
      v-else-if="errorMessage"
      class="text-center text-sm text-red-600 dark:text-red-400"
      role="alert"
    >
      {{ errorMessage }}
    </p>
    <p v-else-if="cellCountMessage" class="text-center text-sm text-gray-600 dark:text-gray-300">
      {{ cellCountMessage }}
    </p>
    <p v-else-if="status === 'unsolvable'" class="text-center text-sm" role="status">
      El puzzle no tiene solución.
    </p>
    <p v-else-if="status === 'multiple-solutions'" class="text-center text-sm" role="status">
      El puzzle tiene varias soluciones posibles.
    </p>
    <p
      v-else-if="status === 'solved'"
      class="text-center text-sm text-green-600 dark:text-green-400"
      role="status"
    >
      Puzzle resuelto.
    </p>
  </div>
</template>
