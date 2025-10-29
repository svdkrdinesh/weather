/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-sky': 'linear-gradient(to bottom right, #a1c4fd, #c2e9fb)',
        'gradient-sunset': 'linear-gradient(to bottom right, #fbc2eb, #a6c1ee)',
      },
    },
  },
  plugins: [],
}
