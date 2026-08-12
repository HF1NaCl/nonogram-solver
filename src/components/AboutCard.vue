<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col w-full max-w-2xl bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl h-full justify-center p-6 mb-4 mx-auto"
  >
    <h2 class="h2-title">Acerca del Nonogram Solver</h2>
    <p class="paragraph">
      Nonogram Solver es una aplicación web que permite a los usuarios resolver rompecabezas de
      Nonogram de manera rápida y eficiente. Los Nonogram, también conocidos como Picross o
      Griddlers, son rompecabezas lógicos en los que los jugadores deben colorear celdas en una
      cuadrícula según las pistas numéricas proporcionadas para revelar una imagen oculta.
    </p>
    <h2 class="h2-title">¿Te parece familiar esta página?</h2>
    <p class="paragraph">
      Si has llegado a esta página, es posible que hayas visitado el sitio web de
      <a
        href="https://nonogramsolver.com/"
        class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Nonogram Solver</a
      >
      antes. Sin embargo, esta versión es una reimplementación completa del proyecto original,
      utilizando tecnologías modernas y mejores prácticas de desarrollo web. (Usando Vue.js y otras
      tecnologías)
    </p>
    <h2 class="h2-title">¿Por qué existe este proyecto si ya existe el original?</h2>
    <p class="paragraph">
      Esta reimplementación tiene como objetivo principal aprender y aplicar nuevas tecnologías y
      mejores prácticas de desarrollo web. Además, permite experimentar con diferentes enfoques y
      mejorar la experiencia del usuario. El texto introducido en la página original, no será
      colocada de nuevo aquí, puesto que sería muy redundante.
    </p>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

.h2-title {
  @apply text-lg font-bold mb-2 text-black dark:text-white;
}
.paragraph {
  @apply text-gray-500 dark:text-gray-300 mb-4;
}
</style>
