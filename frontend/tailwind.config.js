/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      gridTemplateColumns: {
        'layout': '1fr repeat(8, minmax(min-content, 14rem)) 1fr'
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto'
      },
      backgroundImage:
      {
        'hero': "url('/public/wave-haikei.svg')"
      },
      colors: {
        'main': '#1E1D2F',
        'main-hover': '#00334D',
        'second': '#8F5AFF',
        'third': '#2D2B43'
      }
    },
  },
  plugins: [],
}