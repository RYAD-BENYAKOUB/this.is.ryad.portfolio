// ═══════════════════════════════════════════
// tailwind.config.js — Mohammed Ryad Portfolio
// ═══════════════════════════════════════════

tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#007acc',
          hover: '#0098ff',
          dim: '#0062a3',
          glow: 'rgba(0,122,204,0.15)',
        },
        secondary: {
          DEFAULT: '#4fc1ff',
          dim: '#007acc',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'float': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(10px, -12px)' },
          '66%': { transform: 'translate(-8px, 8px)' },
        },
      },
    },
  },
}
