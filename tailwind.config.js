// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'josefin-sans': ['josefin-sans', 'sans-serif'],
      },
      colors: {
        'Dark-Black': ['#121212'],
        'Blue-Black': ['#232231'],
        'Blue-Light': ['#81B8BF'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}