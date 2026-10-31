/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./index-react.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#070609',
        surface: '#0E0D13',
        'surface-elevated': '#15141C',
        primary: '#9333EA',
        'electric-purple': '#A855F7',
        'deep-purple': '#581C87',
        'text-hero': '#FFFFFF',
        'text-body': '#9696A6',
        'text-muted': '#5E5E6E',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
    },
  },
  plugins: [],
}
