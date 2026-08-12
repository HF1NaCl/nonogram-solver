<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div
    class="flex items-center space-x-4 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl h-full justify-center p-6 mb-4"
  >
    <div class="input-group">
      <span class="input-label">Anchura</span>
      <input type="number" class="input" value="10" min="3" />
    </div>
    <div class="input-group">
      <span class="input-label">Altura</span>
      <input type="number" class="input" value="10" min="3" />
    </div>
    <div class="input-group">
      <span class="input-label">Grupo</span>
      <input type="number" class="input" value="5" min="2" />
    </div>
    <button class="solve-button inline-flex items-center justify-center gap-2">
      <Icon icon="mdi:wand" class="icon" />
      <span>Resolver!</span>
    </button>
    <button class="clear-button inline-flex items-center justify-center gap-2">
      <Icon icon="mdi:reload" class="icon" />
      <span>Limpiar</span>
    </button>
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
</style>
