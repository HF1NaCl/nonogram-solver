<script setup lang="ts">
import LanguageComboBox from './shared/LanguageComboBox.vue'
</script>

<template>
  <header
    class="flex justify-between items-center bg-white dark:bg-gray-800 h-15 max-w-2xl w-full mx-auto border dark:border-gray-700 rounded-2xl px-4"
  >
    <div class="flex items-center gap-2">
      <AppLogo />
    </div>
    <div class="flex items-center gap-2">
      <span class="header-button">Resolución</span>
      <span class="header-button">Acerca De</span>
      <LanguageComboBox class="ml-2" />
    </div>
  </header>
</template>

<style scoped>
@reference "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

.header-button {
  @apply text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-200 hover:cursor-pointer;
}
</style>
