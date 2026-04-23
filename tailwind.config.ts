import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0c2340',
        'navy-light': '#243352',
        cream: '#faf6f1',
        'cream-dark': '#f0e8dd',
        ochre: '#c4943a',
        'ochre-light': '#d4a94f',
        ocean: '#2a6496',
        teal: '#1ebeb1',
        'teal-light': '#3ed4c8',
        'teal-dark': '#179e93',
      },
      fontFamily: {
        display: ['var(--font-source-serif)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
