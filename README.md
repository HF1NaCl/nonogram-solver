# Nonogram Solver

Un resolvedor de nonogramas simple y fácil de usar. Ingresa los números de las pistas y resuelve el puzzle de forma rápida. Altamente basado en nonogramsolver.com como un ejercicio de cómo hacer un Solver.

## ¿Qué es un nonograma?

Un nonograma es un puzzle lógico donde debes llenar una cuadrícula de celdas basándote en números que indican cuántas celdas consecutivas deben estar rellenas en cada fila y columna.

## Características del proyecto

- Interfaz minimalista y fácil de usar
- Solver rápido usando WebWorker
- Validación automática de pistas
- Diseño responsive con TailwindCSS
- Código limpio y bien documentado

## Estructura del Proyecto

```
nonogram-solver/
├── src/
│   ├── components/           # Componentes Vue reutilizables
│   │   ├── AboutCard.vue
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── NonogramCard.vue
│   │   └── shared/           # Componentes compartidos
│   │       ├── AppLogo.vue
│   │       ├── ClearButton.vue
│   │       ├── LanguageComboBox.vue
│   │       └── TooltipTheme.vue
│   ├── composables/          # Lógica reutilizable (Vue Composition API)
│   │   ├── useClueNavigation.ts
│   │   ├── useClueValidation.ts
│   │   ├── useNonogramClues.ts
│   │   └── useNonogramSolver.ts
│   ├── interfaces/           # Tipos TypeScript
│   │   ├── CellState.type.ts
│   │   ├── NonogramPuzzle.type.ts
│   │   └── SolverStatus.type.ts
│   ├── views/                # Vistas principales
│   │   └── HomeView.vue
│   ├── layouts/              # Layouts
│   │   └── MainLayout.vue
│   ├── router/               # Configuración de rutas
│   │   └── index.ts
│   ├── stores/               # Estado (Pinia)
│   ├── assets/               # Recursos estáticos
│   │   └── main.css
│   ├── App.vue               # Componente raíz
│   └── main.ts               # Punto de entrada
├── public/                   # Archivos públicos estáticos
├── package.json
├── vite.config.ts            # Configuración de Vite
├── vitest.config.ts          # Configuración de Vitest
├── tsconfig.json             # Configuración de TypeScript
└── PROJECT_CONTEXT.md        # Especificaciones del proyecto
```

### Requisitos

- Node.js (v18 o superior)
- pnpm

### Instalación

```sh
pnpm install
```

### Desarrollo

```sh
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

### Construcción para Producción

```sh
pnpm build
```

### Pruebas Unitarias

```sh
pnpm test:unit
```

## Tecnologías Utilizadas

- Lenguaje: Vue y TS, con TailwindCSS
- Build Tool: Vite
- Entorno: Visual Studio Code
- Pruebas: Vitest

## Estado del Proyecto

Todavía está en desarrollo, por lo que si quieres usar algún Nonogram Solver estable, usa el mencionado en los créditos.

## Créditos

- Proyecto original y base: nonogramsolver.com por Puzzle Rocket
