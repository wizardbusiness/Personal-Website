/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        'foggy-glass': '#E5E7EB50'
      },
      keyframes: {
        blink: {
          '50%': {opacity: '0'},
          '100%': {opacity: '1'},
        }
      },
      animation: {
        'blinking-cursor': 'blink 1.5s steps(1) 6 forwards'
      }
    },
	},
	plugins: [],
}
