/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0D0C',
        canvas: '#F2ECE4',
        mist: '#CBBEAF',
        ember: '#D86D4A',
        gold: '#E1C16B',
        pine: '#18211B'
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['"Segoe UI"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 24px 80px rgba(216, 109, 74, 0.18)'
      }
    }
  },
  plugins: []
};
