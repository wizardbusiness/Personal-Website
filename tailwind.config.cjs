/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "foggy-glass": "#E5E7EB50",
        "moon-shine": "#F3F3F330",
      },
      spacing: {
        84: "21rem",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fallfrom: {
          "0%": { transform: "translateY(0vh)" },
          "100%": { transform: "translateY(50vh)" },
        },
        fallto: {
          "0%": { transform: "translateY(-20vh)" },
          "100%": { transform: "translateY(3.5vh)" },
        },
        risefrom: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-30vh)" },
        },
        riseto: {
          "0%": { transform: "translateY(30vh)" },
          "100%": { transform: "translateY(0vh)" },
        },
        squish: {
          "0%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%) scaleX(100%)",
          },
          "75%": {
            transformOrigin: "bottom",
            transform: "scaleY(10%) scaleX(100%)",
          },
          "100%": {
            transformOrigin: "bottom",
            transform: "scaleY(10%) scaleX(120%)",
            backgroundColor: "white",
          },
        },
        grow: {
          "0%": {
            transformOrigin: "bottom",
            transform: "scaleY(0%)",
          },
          "100%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%)",
          },
        },
      },
      animation: {
        "blinking-cursor": "blink 1.5s steps(1) 6 forwards",
        "fall-to": "fallto 0.3s forwards",
        "fall-from": "fallfrom 0.3s forwards ease-out",
        "rise-to": "riseto 0.5s forwards",
        "rise-from": "risefrom 0.5s forwards",
        "squish-down": "squish 0.2s 0.2s forwards ease-out",
        grow: "grow 0.5s forwards ease-out",
      },
    },
  },
  plugins: [],
};
