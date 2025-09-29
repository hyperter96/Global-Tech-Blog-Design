export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        blue: {
          900: '#1E3A8A', // Primary color
          400: '#60A5FA', // Primary color for dark mode
        },
        cyan: {
          600: '#06B6D4', // Technology color
        },
        orange: {
          500: '#F97316', // CTA color
        },
        slate: {
          50: '#F8FAFC',  // Background color
          700: '#334155', // Text color
          800: '#1E293B', // Main text color
          900: '#0F172A', // Dark mode background
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}