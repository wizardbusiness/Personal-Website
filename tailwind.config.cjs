/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        'foggy-glass': '#E5E7EB50',
        'moon-shine': '#F3F3F330'
      },
      spacing: {
          '84': '21rem'
      }, 
      keyframes: {
        blink: {
          '50%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        fall: {
          '0%': {transform: 'translateY(-20vh)'},
          '100%': {transform: 'translateY(2.5rem)'}
        },
        rise: {
          '0%': {transform: 'translateY(3rem)'},
          '100%': {transform: 'translateY(0)'}
        },
      },
      animation: {
        'blinking-cursor': 'blink 1.5s steps(1) 6 forwards',
        'falldown': 'fall 0.2s forwards ease-in',
        'riseup': 'rise 1.5s forwards'
      },
        
    },
	},
	plugins: [],
}
