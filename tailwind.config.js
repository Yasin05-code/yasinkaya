/** @type {import('tailwindcss').Config} */

// Tum renkler burada. Bir tonu degistirmek icin yalnizca bu dosyayi duzenle.
const ink = '#1E1B2E';

module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        ink,
        paper: '#FFFCF7',
        // Sicak, hafif mor tonlu notr gri (Tailwind'in soguk grisinin yerine)
        gray: {
          100: '#F4F1EC',
          200: '#E9E4DC',
          400: '#A39CAD',
          600: '#6B6475',
          700: '#4D4757',
          800: '#2E2A38',
          900: ink,
        },
        // Pencere basliklarinin anlam tasiyan renkleri (hepsi paper uzerinde WCAG AA)
        personal: { 50: '#F1EEFF', 100: '#E4DEFF', DEFAULT: '#5B47E0' },
        research: { 50: '#FFF2EC', 100: '#FFE0D3', DEFAULT: '#C24A1F' },
        client:   { 50: '#EDF3FF', 100: '#DCE7FF', DEFAULT: '#2459C4' },
        contact:  { 50: '#EAFAF4', 100: '#D3F3E7', DEFAULT: '#0D7A62' },
        sun:      { 50: '#FFF9EB', 100: '#FFF1CC', 200: '#FFE6A3', 300: '#FFD166', 400: '#FFC23D' },
        rose:     { 100: '#FFE1E8', 500: '#EF5A7A', 600: '#D1365B' },
        mint:     { 400: '#4CD39B' },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        win:      `10px 10px 0 0 ${ink}`,
        'win-sm': `6px 6px 0 0 ${ink}`,
        'win-xs': `4px 4px 0 0 ${ink}`,
        'win-2xs': `2px 2px 0 0 ${ink}`,
      },
    },
  },
  plugins: [],
};
