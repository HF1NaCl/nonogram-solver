<script setup lang="ts">
import NonogramCard from '@/components/NonogramCard/NonogramCard.vue'
import AboutCard from '@/components/AboutCard.vue'
import HowToUseCards from '@/components/HowToUseCards.vue'
</script>

<template>
  <section class="my-5 text-center">
    <h1 class="title">Resuelve cualquier</h1>
    <h1
      class="inline-block text-3xl font-bold dark:text-white bg-cyan-400 rounded-lg px-2 py-2 border dark:border-white mb-2"
    >
      Nonograma instantáneamente
    </h1>
    <h3 class="inline-block text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
      Introduzca los números en las casillas. Fila a la Izquierda, y columnas encima. Haz Click en
      Resolver para ver la respuesta.
    </h3>
  </section>
  <section id="resolution" class="scroll-mt-4">
    <NonogramCard />
  </section>
  <section id="howToUse" class="scroll-mt-4">
    <HowToUseCards />
  </section>
  <section id="about" class="scroll-mt-4">
    <AboutCard />
  </section>
</template>

<style scoped>
@reference "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

.title {
  @apply text-3xl font-bold mb-2 dark:text-white;
}
</style>
