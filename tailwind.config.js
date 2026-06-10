/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#FCF8F8',      // Blanco cálido de fondo
          brand: '#B87373',   // Rosa viejo del logo
          dark: '#5C4D4D',    // Marrón ceniza para textos
        }
      }
    },
  },
  plugins: [],
}