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
        'primary-dark': '#1f8030',
        'primary-active': '#58de71',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

