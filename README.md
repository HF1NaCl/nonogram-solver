# Nonogram Solver

Aplicación web para introducir las pistas de un nonograma y calcular su solución. El proyecto es una reimplementación con Vue y TypeScript, inspirada en [Nonogram Solver](https://nonogramsolver.com/).

## Funciones

- Configurar el ancho y alto de la cuadrícula entre 3 y 30; inicia en 10 × 10.
- Introducir las pistas de filas y columnas directamente en la cuadrícula.
- Navegar entre pistas con las flechas del teclado.
- Validar pistas inválidas, pistas que no caben en una línea y diferencias en el total de celdas rellenas entre filas y columnas.
- Resolver en un Web Worker para mantener la interfaz disponible. El resultado indica si el puzzle tiene una solución, varias o ninguna; la resolución se interrumpe tras 30 segundos.
- Agrupar visualmente las celdas y limpiar las pistas para empezar de nuevo.
- Ejecutar el solver en el navegador; no se envían las pistas a un servidor.

## Requisitos

- Node.js `^22.18.0` o `>=24.12.0`
- pnpm 10

## Instalación y desarrollo

```sh
pnpm install
pnpm dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación.

## Comprobaciones

```sh
pnpm test:unit --run
pnpm build
```

Para ejecutar las pruebas en modo interactivo, usa `pnpm test:unit`. Para generar cobertura, usa `pnpm coverage`.

## Despliegue

El workflow de GitHub Actions en `.github/workflows/deploy.yml` ejecuta las pruebas y la compilación en cada push a `main` y también se puede iniciar manualmente. Si todo pasa, publica `dist/` en GitHub Pages. En **Settings → Pages**, selecciona **GitHub Actions** como origen.

Para publicar este repositorio como sitio de proyecto, configura también `base: '/nonogram-solver/'` en Vite para que se resuelvan correctamente los recursos bajo la URL de GitHub Pages.

## Estado actual del proyecto

La aplicación permite configurar nonogramas de 3 × 3 a 30 × 30, validar sus pistas y resolverlos en el navegador. El workflow de GitHub Actions está preparado para probar, compilar y desplegar en GitHub Pages. El proyecto continúa en desarrollo.

## Tecnologías

Vue 3, TypeScript, Vite, Tailwind CSS, Reka UI, Web Workers y Vitest.

## Créditos e inspiración

- [Nonogram Solver](https://nonogramsolver.com/) — inspiración para el proyecto.
- [Dima Fedoriaka](https://fedimser.github.io/nonogram.html) — inspiración para el algoritmo.
- [Tan Li Hau](https://lihautan.com/nonogram/) — inspiración para la representación visual.
