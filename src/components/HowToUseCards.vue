<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface HowToCard {
  title: string
  subTitle: string
  icon?: string
  color?: string
}

const howToCards: HowToCard[] = [
  {
    title: 'Resolución instantánea',
    subTitle: 'Resuelve la mayoría de puzzles en menos de un segundo usando lógica avanzada.',
    icon: 'mdi:lightning-bolt',
    color: 'bg-cyan-400',
  },
  {
    title: 'Cualquier tamaño de cuadrícula',
    subTitle: 'Soporta desde 3x3 hasta 30x30. Configura tus propias dimensiones',
    icon: 'mdi:crop-free',
    color: 'bg-purple-400',
  },
  {
    title: '100% Privado',
    subTitle: 'Todo se ejecuta en el navegador. Ningún dato es enviado.',
    icon: 'mdi:lock',
    color: 'bg-yellow-400',
  },
]

const howToSubCards: HowToCard[] = [
  {
    title: 'Coloca Tamaño de Grid',
    subTitle:
      'Introduce la anchura y altura de tu Puzzle (Ejemplo: 10x10). El tamaño del grupo determina el espaciado.',
  },
  {
    title: 'Introduce números de Fila',
    subTitle:
      'Click en las celdas del lado izquierdo y escribe sus números en cada fila. Usa las flechas para moverte entre filas.',
  },
  {
    title: 'Introduce números de Columna',
    subTitle: 'Click en las celdas del lado derecho y escribe sus números en cada columna.',
  },
  {
    title: 'Click en Resolver!',
    subTitle:
      'Haz click en el botón Resolver para ver la solución del puzzle. Negro = Relleno, Blanco = Vacío.',
  },
]
</script>

<template>
  <section class="text-center mb-5">
    <div class="flex justify-center">
      <div
        v-for="howToCard in howToCards"
        class="mx-2 w-54 rounded-lg border bg-white p-5 hover:shadow-[4px_4px_0_0_rgb(0_0_0)] dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-[4px_4px_0_0_rgb(255_255_255)] transition-shadow"
      >
        <Icon
          v-if="howToCard.icon"
          :icon="howToCard.icon"
          class="w-10 h-10 mb-2 rounded-md border p-1 inline-block dark:border-white"
          :class="howToCard.color"
        />
        <h3 class="font-bold dark:text-white">{{ howToCard.title }}</h3>
        <p class="text-gray-400 text-sm">{{ howToCard.subTitle }}</p>
      </div>
    </div>
  </section>
  <section>
    <div
      class="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl border p-5 mb-5 flex flex-col w-full max-w-2xl justify-center mx-auto"
    >
      <h3 class="font-bold text-lg dark:text-white">Cómo usarlo</h3>
      <p class="text-gray-500 dark:text-gray-300">
        Este solver usas una cuadrícula visual interactiva, como un tablero real de puzzle.
        Introduce los números directamente en las cuadrículas y deja que el solver haga el resto.
      </p>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div
          v-for="(howToSubCard, index) in howToSubCards"
          class="flex bg-gray-200 dark:bg-gray-600 border rounded-xl w-full p-4"
        >
          <span
            class="flex size-8 shrink-0 items-center justify-center text-white bg-black rounded-md mr-4"
            >{{ index + 1 }}</span
          >
          <section class="flex flex-col">
            <h3 class="font-bold text-lg dark:text-white">{{ howToSubCard.title }}</h3>
            <p class="text-gray-500 dark:text-gray-300">{{ howToSubCard.subTitle }}</p>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
