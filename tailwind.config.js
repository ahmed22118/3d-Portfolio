/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030712',
        'bg-soft': '#0a0f1e',
        primary: '#00E5FF',
        secondary: '#7C3AED',
        accent: '#22C55E',
        ink: '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,229,255,0.45), 0 0 60px rgba(0,229,255,0.15)',
        'glow-violet': '0 0 20px rgba(124,58,237,0.45), 0 0 60px rgba(124,58,237,0.15)',
        'glow-green': '0 0 20px rgba(34,197,94,0.45), 0 0 60px rgba(34,197,94,0.15)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        scanline: 'scanline 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
