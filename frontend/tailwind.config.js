/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        dark: '#0a0a0f',
        'dark-2': '#0d0d15',
        'dark-3': '#12121a',
        neon: '#00d4ff',
        purple: '#7c3aed',
      },
    },
  },
  plugins: [],
};
