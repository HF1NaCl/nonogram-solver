<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  footer: boolean
}>()

const logoClass = computed(() =>
  props.footer
    ? 'text-xl font-bold text-black dark:text-white'
    : 'text-2xl font-bold text-black dark:text-white',
)
</script>

<template>
  <h1 :class="[logoClass]">NonoSolver</h1>
</template>
