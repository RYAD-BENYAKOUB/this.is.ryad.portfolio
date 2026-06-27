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
          950: '#020617',   // slate-950
          900: '#0f172a',   // slate-900
          800: '#1e293b',   // slate-800
          700: '#334155',   // slate-700
          600: '#475569',   // slate-600
        },
        accent: {
          DEFAULT: '#6366f1', // indigo-500
          light: '#22d3ee',   // cyan-400
          dim: '#4f46e5',     // indigo-600
          dark: '#312e81',    // indigo-900
          glow: 'rgba(34,211,238,0.15)', // cyan glow
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(34,211,238,0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
}
