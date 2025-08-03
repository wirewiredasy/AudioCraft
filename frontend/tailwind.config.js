/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Color Scheme
        primary: {
          main: '#2563eb',    // Blue-600 - main action buttons
          hover: '#1d4ed8',   // Blue-700 - button hover
          light: '#60a5fa',   // Blue-400 - lighter accent
        },
        secondary: '#1e293b', // Slate-800 - for depth
        background: '#f8fafc', // Light gray for soft feel
        surface: '#ffffff',   // Pure white cards
        text: {
          primary: '#0f172a', // Dark slate - good readability
          secondary: '#475569', // Slate gray - description/subtext
        },
        success: '#22c55e',   // Green for good actions
        error: '#ef4444',     // Red for warnings/errors
        border: '#e2e8f0',    // Light gray for dividers, inputs
        'input-border': '#cbd5e1', // Input field borders
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'pulse-subtle': 'pulse 2s ease-in-out infinite',
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}