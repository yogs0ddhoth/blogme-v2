/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'react-background': '#282c34',
      'react-blue': '#61dafb',
    },
    extend: {
      animation: {
        'spin-slow': 'spin infinite 20s linear',
        'loader-spin': 'spin infinite 1.2s linear'
      },
    },
  },
  plugins: [],
}
