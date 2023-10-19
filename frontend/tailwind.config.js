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
        'main': '#002233',
        'main-hover': '#00334D',
        'second': '#0066FF'
      }
    },
  },
  plugins: [],
}