/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Lora: "Lora",
        LosefinSans: "Josefin Sans",
        poppins: "Poppins",
        Shadows: "Shadows Into Light",
        Parisienne : 'Parisienne'
      },
      colors: {
        red: "#ff0000"
      }
    },
  },
  plugins: [],
}