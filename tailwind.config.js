/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // CSS variable references for dynamic theming
        // Format: rgb(var(--color-name) / <alpha-value>) enables opacity support
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-snake-head) / <alpha-value>)', // Reuse snake-head for primary-light
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          light: 'rgb(var(--color-surface) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          light: 'rgb(var(--color-surface-light) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        },
        // Game-specific colors
        snake: {
          DEFAULT: 'rgb(var(--color-snake) / <alpha-value>)',
          head: 'rgb(var(--color-snake-head) / <alpha-value>)',
        },
        food: 'rgb(var(--color-food) / <alpha-value>)',
        board: {
          DEFAULT: 'rgb(var(--color-board) / <alpha-value>)',
          cell: 'rgb(var(--color-board-cell) / <alpha-value>)',
        },
      },
      fontFamily: { game: ['Fredoka', 'Comic Sans MS', 'cursive'] },
    },
  },
  plugins: [],
};
