/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'meta': "url('../public/download.jfif')",
        'coin': "url('../public/icon-buy-and-sell.svg')",
        'body': "url('../public/64133690-empty-transparent-background-gray-chess-board.webp')",
      }
    },
  },
  plugins: [],
}