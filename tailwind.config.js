module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
    theme: {
      extend: {},
    },
    daisyui: {

      plugins: [
        // require('@tailwindcss/forms'),
        require("daisyui")
      ],
      
    }
  }