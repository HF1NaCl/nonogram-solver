# Project Context

This is a nonogram solver, which it needs to be simplistic and User Friendly experience.
The Main goal is to keep an easy to use Nonogram solver, and the user can input the numbers correctly to solve it.

## What needs:

Due to the project nature, it's making use of Vue.js, so, taking that, the project needs to meet that specifications:

-TailwindCSS to make the CSS more easier to the developer.
-Mantain simplistic design and not overload with effects and colors.
-RekaUI can help with custom components. (Just with the necessary ones, otherwise, don't use it)
-Mantain the Clean Code to be easily readable, and newcomers developers can read this project easily.
-It should have Vitest unit tests to make sure the solver works what needs.
-WebWorker should use only the JS navigator to solve the Nonogram as fast as possible.
-Documentation needs to be clear for PNPM and resulting newer builds.

With that said, the scope of the project is small, due to the technical view of the Frontend, and the most complex logic should reside on the WebWorker, to solve the nonograms

## Non-goals

-Overengineered components and fancy visuals to the page
-A lot of text to explain how it works
-Dirty code and unreadable ones.
