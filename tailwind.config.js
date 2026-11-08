/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fairy: {
          pink: {
            50: '#fff5f8',
            100: '#ffe6ee',
            200: '#ffd0e0',
            300: '#ffacc6',
            400: '#ff7fa7',
            500: '#f85687',
            DEFAULT: '#ffb3cb',
          },
          lavender: {
            50: '#faf7fd',
            100: '#f2eafb',
            200: '#e5d7f7',
            300: '#cfb7f0',
            400: '#b48ee4',
            500: '#9b6bd5',
            DEFAULT: '#dcc6f5',
          },
          blue: {
            50: '#f2f9fe',
            100: '#e1f2fc',
            200: '#c5e5fa',
            300: '#99d2f6',
            400: '#64baee',
            DEFAULT: '#bfe4fa',
          },
          cream: {
            50: '#fffdf9',
            100: '#fdfbf5',
            200: '#fbf7ee',
            300: '#f5eee0',
            DEFAULT: '#fffaf3',
          },
          gold: {
            50: '#fefcf2',
            100: '#fdf7db',
            200: '#fbedb3',
            300: '#f8dc81',
            400: '#ecc449',
            500: '#d9a92a',
            DEFAULT: '#dfb76c',
          },
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'sparkle': 'sparkle 2.5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-2deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'magical-radial': 'radial-gradient(circle at 50% 20%, rgba(255, 230, 238, 0.8) 0%, rgba(242, 234, 251, 0.7) 40%, rgba(255, 250, 243, 0.9) 100%)',
        'fairy-gradient': 'linear-gradient(135deg, #ffe6ee 0%, #f2eafb 50%, #e1f2fc 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(223, 183, 108, 0.2), transparent)',
      },
      boxShadow: {
        'fairy': '0 10px 30px -10px rgba(248, 86, 135, 0.15), 0 4px 12px -2px rgba(155, 107, 213, 0.12)',
        'fairy-hover': '0 20px 40px -15px rgba(248, 86, 135, 0.25), 0 8px 20px -4px rgba(155, 107, 213, 0.2)',
        'gold-glow': '0 0 25px rgba(223, 183, 108, 0.35)',
      },
    },
  },
  plugins: [],
};

