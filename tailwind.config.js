/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to left, rgb(255, 115, 86), rgb(251, 67, 87))',
      },
      boxShadow: {
        'custom-shadow': '1px 3px 6px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}