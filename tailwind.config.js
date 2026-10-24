/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FFF8F2',
          50: '#FFFCFA',
          100: '#FFF8F2',
          200: '#FDF1E6',
          300: '#F7E3D0',
        },
        blush: {
          DEFAULT: '#F7DDE3',
          50: '#FDF7F9',
          100: '#F7DDE3',
          200: '#EEBDCA',
          300: '#E49DB0',
        },
        dustyRose: {
          DEFAULT: '#D98C9A',
          light: '#E5A5B1',
          dark: '#BD6D7C',
        },
        burgundy: {
          DEFAULT: '#652D42',
          400: '#8A3E5B',
          500: '#75324C',
          600: '#652D42',
          700: '#522335',
          800: '#3F1A28',
          900: '#2C111C',
          950: '#1A0710',
        },
        gold: {
          champagne: '#D7B98E',
          light: '#E8D2B2',
          dark: '#BF9E6E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', '"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'polaroid': '0 10px 25px -5px rgba(101, 45, 66, 0.12), 0 8px 10px -6px rgba(101, 45, 66, 0.08)',
        'polaroid-hover': '0 20px 35px -5px rgba(101, 45, 66, 0.2), 0 10px 15px -5px rgba(101, 45, 66, 0.12)',
        'romantic': '0 12px 36px -8px rgba(217, 140, 154, 0.35)',
        'soft-glow': '0 0 30px rgba(215, 185, 142, 0.28)',
        'burgundy-glow': '0 0 35px rgba(101, 45, 66, 0.35)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.025)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
