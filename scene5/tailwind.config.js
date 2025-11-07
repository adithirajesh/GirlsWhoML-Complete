/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#261033',
        secondary: '#D89EFA',
        accent: '#F6D55C',
        cream: '#F5F3ED',
        dark: '#393939',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        alata: ['Alata', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
