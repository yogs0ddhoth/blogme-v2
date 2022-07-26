/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin infinite 20s linear',
      },
      colors: {
        'react-background': '#282c34',
        'react-blue': '#61dafb',
        'white': ''
      },
    },
  },
  plugins: [],
}
