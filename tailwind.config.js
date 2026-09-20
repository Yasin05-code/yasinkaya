/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        // Pencere başlıklarının anlam taşıyan renkleri
        personal: '#7c3aed',
        research: '#ea580c',
        client:   '#1d4ed8',
        contact:  '#15803d',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        win:      '10px 10px 0 0 #000',
        'win-sm': '6px 6px 0 0 #000',
        'win-xs': '4px 4px 0 0 #000',
      },
    },
  },
  plugins: [],
};
