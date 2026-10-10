/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        // Slowed down for better visibility of larger colorful logos
        marquee: 'marquee 100s linear infinite',
        'marquee-reverse': 'marquee-reverse 100s linear infinite',
        'testimonial-marquee': 'testimonial-marquee 100s linear infinite',
        'testimonial-marquee-reverse': 'testimonial-marquee-reverse 100s linear infinite',
        "testimonial-marquee": "testimonial-scroll linear infinite",
        "testimonial-marquee-reverse": "testimonial-scroll-reverse linear infinite"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-33.33%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'testimonial-marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.33%)' }, // Moves across one full set of 3
        },
        'testimonial-marquee-reverse': {
          '0%': { transform: 'translateX(-33.33%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        "testimonial-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "testimonial-scroll-reverse": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" }
        }
      },
      colors: {
        primary: {
          DEFAULT: 'var(--ecell-primary)',
          hover: 'var(--ecell-primary-hover)',
          light: '#FF8533',
          dark: '#CC5500',
        },
        secondary: {
          DEFAULT: 'var(--ecell-secondary)',
          light: '#FFD166',
          dark: '#D48806',
        },
        accent: {
          orange: '#FF6B00',
          gold: '#F5A623',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      lineHeight: {
        'relaxed-custom': '1.5',
        'heading': '1.2',
      },
    },
  },
  plugins: [
    // This plugin allows us to use 'group-hover:pause' or 'hover:pause'
    function ({ addUtilities }) {
      addUtilities({
        '.pause': {
          'animation-play-state': 'paused',
        },
      })
    },
  ],
};
