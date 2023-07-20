/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1ABB9A",
        dark: "#002B56",
        'ligher-text': '#A1ADB2',
        'light-text': '#5C6366',
        stroke: '#E1F2EC'
      }
    },
  },
  plugins: [],
}
