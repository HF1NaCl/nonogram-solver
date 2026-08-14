<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'reka-ui'

const emits = defineEmits<{
  (e: 'clear'): void
}>()
</script>

<template>
  <AlertDialogRoot>
    <AlertDialogTrigger as-child>
      <button type="button" class="clear-button inline-flex items-center justify-center gap-2">
        <Icon icon="mdi:reload" class="icon" />
        <span>Limpiar</span>
      </button>
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 z-50 bg-black/50" />

      <AlertDialogContent
        class="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-xl outline-none dark:border-gray-700 dark:bg-gray-800"
      >
        <AlertDialogTitle class="text-lg font-bold text-gray-900 dark:text-white">
          ¿Limpiar las pistas?
        </AlertDialogTitle>

        <AlertDialogDescription class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Se eliminarán todos los números introducidos en las filas y columnas.
        </AlertDialogDescription>

        <div class="mt-6 flex justify-end gap-3">
          <AlertDialogCancel
            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            class="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            @click="emits('clear')"
          >
            Limpiar
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<style scoped>
@reference "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

.clear-button {
  @apply text-sm bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg cursor-pointer size-10 w-28 border-2;
}
</style>
