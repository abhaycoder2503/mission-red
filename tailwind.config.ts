import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        space: '#070b1a',
        glow: '#70e1ff',
        mars: '#ff7a59'
      }
    },
  },
  plugins: [],
} satisfies Config;