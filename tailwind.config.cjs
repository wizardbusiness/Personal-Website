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
          "100%": { transform: "translateY(5px)" },
        },
        risefrom: {
          "0%": { transform: "translateY(5px)" },
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
        open: {
          "0%": {
            height: "0",
          },
          "100%": {
            height: "var(--radix-accordion-content-height)",
          },
        },
        close: {
          "0%": {
            height: "var(--radix-accordion-content-height)",
          },
          "100%": {
            height: "0",
          },
        },
        fadein: {
          "0%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        fadeout: {
          "0%": {
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        impact: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(5px)",
          },
        },
        buoy: {
          "0%": {
            transform: "translateY(5px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "blinking-cursor": "blink 1.5s steps(1) 6 forwards",
        "fall-to": "fallto 0.3s forwards ease-in",
        "fall-from": "fallfrom 0.3s forwards ease-out",
        "rise-to": "riseto 0.5s forwards",
        "rise-from": "risefrom 0.5s 0.5s forwards",
        "squish-down": "squish 0.2s 0.2s forwards ease-out",
        grow: "grow 0.5s forwards ease-out",
        "open-accordion": "open 0.2s forwards ease-in",
        "close-accordion": "close 0.2s forwards ease-out",
        "fade-in": "fadein 0.2s forwards ease",
        "fade-out": "fadeout 0.2s forwards ease",
        impact: "impact 0.05s 0.3s forwards",
        buoy: "buoy 0.1s 0.2s fowards ease-in",
      },
      gridTemplateColumns: {
        "nav-lg": "40% 20% 33% 2% 5%",
      },
    },
  },
  plugins: [require("tailwindcss-radix")],
};
