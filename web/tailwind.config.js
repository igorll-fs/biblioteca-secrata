/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors — A Biblioteca Secrata
        brand: {
          forest: '#0B2017',      // Primary dark background
          olive: '#434B3D',       // Secondary dark
          chocolate: '#4E3621',   // Accent brown
          gold: '#C59B5F',        // Primary accent (buttons, links)
          cream: '#EADFC9',       // Light accent
          parchment: '#F5F1EB',   // Light background
        },
        // Semantic aliases
        primary: '#0B2017',
        accent: '#C59B5F',
        surface: '#F5F1EB',
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(11, 32, 23, 0.12)',
        'brand-gold': '0 4px 24px rgba(197, 155, 95, 0.2)',
        'card': '0 2px 12px rgba(11, 32, 23, 0.08)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0B2017 0%, #434B3D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C59B5F 0%, #8B6914 100%)',
        'cream-gradient': 'linear-gradient(135deg, #F5F1EB 0%, #EADFC9 100%)',
      },
    },
  },
  plugins: [],
};
