/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        netflix: {
          red: '#e50914',
          dark: '#141414',
          black: '#000000',
          gray: '#808080',
        }
      },
      backgroundImage: {
        'gradient-netflix': 'linear-gradient(135deg, #e50914 0%, #b20710 100%)',
        'gradient-dark': 'linear-gradient(135deg, #141414 0%, #000000 100%)',
      },
    },
  },
  plugins: [],
}