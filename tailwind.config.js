// ═══════════════════════════════════════════
// tailwind.config.js — this.is.ryad.portfolio
// ═══════════════════════════════════════════

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        dark: {
          950: '#08090d',
          900: '#0d0f14',
          800: '#13161d',
          700: '#1a1d27',
          600: '#232733',
        },
        accent: {
          DEFAULT: '#ff0000',
          light: '#ff3333',
          dim: '#8b0000',
          dark: '#660000',
          glow: 'rgba(255,0,0,0.15)',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,0,0,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(255,0,0,0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
}
