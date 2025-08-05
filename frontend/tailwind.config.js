/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Enable preflight for proper CSS resets
  darkMode: 'class',
  theme: {
    extend: {
      // Only extend utilities, don't override base styles
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'pulse-subtle': 'pulse 2s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        wave: {
          '0%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
          '100%': { transform: 'scaleY(0.8)' },
        },
      },
    },
  },
  plugins: [],
}