/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF8F5',
          card: '#FFFFFF',
          muted: '#F4EFEB',
          border: '#E8E2D9',
        },
        ink: {
          DEFAULT: '#191716',
          muted: '#66615C',
          faint: '#9C968F',
          dark: '#0F0E0D',
        },
        terracotta: {
          50: '#FDF7F4',
          100: '#FCEEE8',
          500: '#C25E38',
          600: '#A84E2B',
          700: '#8A3E20',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'paper-sm': '0 1px 3px rgba(25, 23, 22, 0.04), 0 1px 2px rgba(25, 23, 22, 0.03)',
        'paper-md': '0 4px 12px rgba(25, 23, 22, 0.06), 0 1px 3px rgba(25, 23, 22, 0.04)',
        'paper-lg': '0 12px 28px rgba(25, 23, 22, 0.08), 0 4px 10px rgba(25, 23, 22, 0.04)',
      },
    },
  },
  plugins: [],
};
