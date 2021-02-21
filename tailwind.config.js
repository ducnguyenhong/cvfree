module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme('colors'),
      // cvfree: '#A4CF51',
      cvfree: '#f2f8f2'
      // edffed
    })
  },
  variants: {
    extend: {}
  },
  plugins: []
}
