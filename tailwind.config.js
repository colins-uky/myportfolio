/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
      fontFamily : {
        Lato: ['Lato', 'sans-serif'],
        Bruno: ["'Bruno Ace SC'", 'cursive'],
      },

    colors: {
      'jet': '#343434',
      'bright': '#FBFFFE',
      'yellow': '#FFB100',
      'munsell': '#62929E',
      'cambridge': '#6BAB90',
      'rblack': '#222222',
      'red': '#FF0000',
      'green': '#00FF00',
      'blue': '#0000FF',
      'white': '#DFDFDF',
      'black': '#1a1a1a',
      'grey' : '#bcbcbc',
      'lgrey' : '#dddddd',
      'dgrey' : '#787c7e',
      'wordle-green' : '#6aaa64',
      'wordle-yellow' : '#c9b458'

    },
  },
  plugins: [],
}
