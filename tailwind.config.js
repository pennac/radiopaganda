/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'puro-negro': '#050505',
        'gris-industrial': '#1C1C1C',
        'oxido': '#8B4513',
        'rojo-sangre': '#8A0303',
        'blanco-optico': '#FFFFFF',
        'acido': '#BFFF00'
      },
      fontFamily: {
        brutal: ['Anton', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
