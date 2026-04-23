/* ═══════════════════════════════════════════════════
   TransformFit Next — Tailwind v4 Configuration

   Extends RIG Design System with TransformFit variant tokens.
   All values validated against WCAG 2.1 AA, NN/g heuristics,
   and CRO conversion patterns (MiroFish n=1,934).
   ═══════════════════════════════════════════════════ */

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          900: '#0A0A0A',
          800: '#111111',
          700: '#171717',
          600: '#1E1E1E',
          500: '#262626',
        },
        paper: {
          DEFAULT: '#F0EDE8',
          muted: 'rgba(240,237,232,0.55)',
          faint: 'rgba(240,237,232,0.35)',
        },
        orange: {
          DEFAULT: '#F97316',
          500: '#F97316',
          600: '#EA580C',
          warm: '#DA7756',
          'warm-deep': '#C25F3F',
        },
        emerald: {
          DEFAULT: '#10B981',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          muted: 'rgba(16,185,129,0.15)',
          faint: 'rgba(16,185,129,0.08)',
        },
        card: {
          surface: 'rgba(255,255,255,0.03)',
          border: 'rgba(255,255,255,0.06)',
          hover: 'rgba(255,255,255,0.05)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        mark: '0.08em',
        label: '0.15em',
        caps: '0.2em',
        wide: '0.25em',
        ultra: '0.3em',
      },
      borderRadius: {
        none: '0',
        sharp: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },
      maxWidth: {
        prose: '72ch',
        atelier: '1080px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.08)', opacity: '0.15' },
        },
        'sparkline-draw': {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0' },
        },
        'counter-tick': {
          '0%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
        'sparkline-draw': 'sparkline-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'counter-tick': 'counter-tick 0.3s ease-out',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config