module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor:{
        "flare-light-blue": "#55dde0",
        "flare-dark-blue": "#33658a",
        "flare-charcoal-blue": "#2f4858",
        "flare-orange": "#f26419",
      },
      fontFamily:{
        "lexend" : ["Lexend", "sans-serif"],
      },
      height:{
        "1/10" : "10%",
        "9/10" : "90%",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
