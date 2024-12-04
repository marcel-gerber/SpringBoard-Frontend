/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'custom-radial': 'radial-gradient(circle at right top, #141414, rgb(22 163 74 / 0.2), rgb(2 132 199 / 0.2), #141414)',
      }
    },
  },
  plugins: [],
}

