module.exports = {
    theme: {
      extend: {
        animation: {
          aurora: 'aurora 60s linear infinite',
          'pulse-slow': 'pulse-slow 10s ease-in-out infinite',
        },
        keyframes: {
          aurora: {
            from: { backgroundPosition: '0% 0%, 0% 0%' },
            to: { backgroundPosition: '100% 100%, 100% 100%' }
          },
          'pulse-slow': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.7 }
          }
        }
      }
    }
  }