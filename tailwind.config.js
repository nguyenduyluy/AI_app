/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // App Theme (Light Mode for Dashboard)
        "app-bg": "#F8FAFC",
        "app-text": "#1E293B",
        "primary": "#00D656", 
        "primary-dark": "#00B046",
        "primary-light": "#E6FFF0",
        
        // Auth Theme (Dark Mode - Strict Match)
        "auth-bg": "#121212", 
        "auth-card": "#27272a", 
        "auth-text": "#FFFFFF",
        "auth-primary": "#f97316", // Orange-500
        "auth-primary-hover": "#ea580c", // Orange-600
        "auth-border": "#3f3f46",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "body": ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow-green': '0 8px 20px -4px rgba(0, 214, 86, 0.4)',
        'glow-orange': '0 8px 20px -4px rgba(249, 115, 22, 0.4)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'scale-up': 'scale-up 0.3s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}