/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily : {
        Lato: ['Lato', 'sans-serif'],
      }
    },
    colors: {
      'jet': '#343434',
      'bright': '#FBFFFE',
      'yellow': '#FFB100',
      'munsell': '#62929E',
      'cambridge': '#6BAB90',
      'rblack': '#222222',
    },
  },
  plugins: [],
}
