/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'game-bg': '#0f172a',
        'maze-path': '#10b981',
        'maze-wall': '#ef4444',
        'food-gold': '#fbbf24',
        'neon-green': '#39ff14',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 0.5s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
