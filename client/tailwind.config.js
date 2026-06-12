/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mystic: {
          deep: '#0a1a0f',      // Deep forest green background
          earth: '#0d0d08',     // Dark earth
          dark: '#1a2410',      // Dark olive card background
          medium: '#2a381d',    // Medium olive for borders and inputs
          gold: '#c9a84c',      // Primary gold accent
          amber: '#e8b84b',     // Warm amber accent
          softGold: '#d4af6a',  // Soft gold for meta text/subtitles
          white: '#f5f0e8',     // Warm white body text
          silver: '#a3a99e',    // Dusty leaf silver for secondary text
        }
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(201, 168, 76, 0.35)',
        'glow-intense': '0 0 25px rgba(232, 184, 75, 0.6)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
