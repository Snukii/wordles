import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'

export default defineConfig({
  safelist: [
    "bg-green-700",
    "bg-yellow-700",
    "bg-red-700",
    "bg-true-gray-800",
    "start-1",
    "start-2",
    "start-3",
    "start-4",
    "start-5",
    "start-6"
  ],
  attributify: true,
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    require('windicss/plugin/filters'),
    require('windicss/plugin/forms'),
  ],
})
