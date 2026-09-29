/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B19',
          900: '#0B132B',
          850: '#111D3E',
          800: '#1C2541',
          700: '#2A3656',
          600: '#3A4B7C',
        },
        maritime: {
          blue: '#1E6091',
          light: '#3A86FF',
          accent: '#10B981', // Emerald green accent
          mint: '#34D399',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
