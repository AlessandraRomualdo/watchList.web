/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        'background': '#1b1b1b',
        'primary': '#58dea3',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

