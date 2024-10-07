/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        'background': '#1b1b1b',
        'background-secondary': '#2b2b2b',
        'primary': '#58dea3',
        'primary-hover': '#4dc08f',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

