/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1800px",
      },
      colors: {
        "foggy-glass": "#E5E7EB50",
        "moon-shine": "#F3F3F340",
        "blue-smoke": "#223249",
        dusk: "#1d2a44",
      },
      spacing: {
        84: "21rem",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fallnext: {
          "0%": { transform: "translateY(0vh)" },
          "40%": {
            transform: "translateY(-20vh) scale(120%)",
            opacity: 0.8,
          },
          "70%": {
            transform: "translateY(-20vh) scale(120%)",
            opacity: 0.8,
          },
          "100%": { transform: "translateY(50vh) scale(100%)" },
        },
        fallto: {
          "0%": { transform: "translateY(-25vh)" },
          "100%": { transform: "translateY(0)" },
        },
        risefrom: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-30vh)" },
        },
        riseto: {
          "0%": { transform: "translateY(30vh)" },
          "100%": { transform: "translateY(0vh)" },
        },
        "swipe-down": {
          "0%": {
            opacity: "100%",
            transform: "translateY(0%)",
          },
          "100%": {
            opacity: "0%",
            transform: "translateY(100%)",
          },
        },
        "swipe-up": {
          "100%": {
            transform: "translateY(-75%)",
            opacity: 0,
          },
        },
        scoochup: {
          "0%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(-10px)", opacity: "0.5" },
        },
        "squish-sm": {
          "0%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%) scaleX(100%)",
          },
          "75%": {
            transformOrigin: "bottom",
            transform: "scaleY(10%)",
            width: "70vw",
          },
          "100%": {
            transformOrigin: "bottom",
            transform: "scaleY(4%)",
            width: "90vw",
            backgroundColor: "rgb(71 85 105)",
          },
        },
        "squish-lg": {
          "0%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%) scaleX(100%)",
            width: "30vw",
          },
          "75%": {
            transformOrigin: "bottom",
            transform: "scaleY(10%)",
            width: "30vw",
          },
          "100%": {
            transformOrigin: "bottom",
            transform: "scaleY(4%)",
            width: "70vw",
            backgroundColor: "rgb(71 85 105)",
          },
        },
        "squelch-sm": {
          "0%": {
            transformOrigin: "bottom",
            transform: "scaleY(4%)",
            width: "90vw",
            backgroundColor: "rgb(71 85 105)",
          },
          "25%": {
            transformOrigin: "bottom",
            transform: "scaleY(10%)",
            width: "70vw",
          },
          "50%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%)",
            width: "70vw",
            backgroundColor: "foggy-glass",
          },
          "100%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%) scaleX(100%) translateY(-40vh)",
            width: "70vw",
          },
        },
        "squelch-lg": {
          "0%": {
            transformOrigin: "bottom",
            transform: "scaleY(4%)",
            width: "70vw",
            backgroundColor: "rgb(71 85 105)",
          },
          "25%": {
            transformOrigin: "bottom",
            transform: "scaleY(10%)",
            width: "30vw",
          },
          "50%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%)",
            width: "30vw",
            backgroundColor: "foggy-glass",
          },
          "100%": {
            transformOrigin: "bottom",
            transform: "scaleY(100%) scaleX(100%) translateY(-40vh)",
            width: "30vw",
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
        longblink: {
          "0%": {
            opacity: "30%",
          },
          "20%": {
            opacity: "0%",
          },
          "50%": {
            opacity: "30%",
          },
          "70%": {
            opacity: "80%",
          },
          90: {
            opacity: "100%",
          },
          "100%": {
            opacity: "30%",
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
        spread: {
          "0%": {
            transformOrigin: "center",
            transform: "scaleX(0)",
          },
          "100%": {
            transform: "scaleY(4%) scaleX(200%)",
            backgroundColor: "rgb(71 85 105)",
          },
        },
      },
      animation: {
        "blinking-cursor": "blink 1.5s steps(1) 6 forwards",
        "fall-to": "fallto 0.2s forwards ease-in",
        "fall-next": "fallnext 0.6s forwards ease-out",
        "rise-to": "riseto 0.5s forwards",
        "rise-from": "risefrom 0.2s 0.3s forwards",
        "swipe-down": "swipe-down 0.2s forwards",
        "swipe-up": "swipe-up 0.2s forwards",
        "squish-down-lg": "squish-lg 0.2s 0.1s forwards ease-in",
        "squish-down-sm": "squish-sm 0.2s 0.1s forwards ease-in",
        "squelch-up-lg": "squelch-lg 0.5s forwards ease-in",
        "squelch-up-sm": "squelch-sm 0.5s forwards ease-in",
        grow: "grow 0.5s forwards ease-out",
        "open-accordion": "open 0.2s forwards ease-in",
        "close-accordion": "close 0.2s forwards ease-out",
        "fade-in": "fadein 0.2s forwards ease",
        "fade-out": "fadeout 0.2s forwards ease",
        "fade-in-slow": "fadein 0.3s forwards ease-in",
        "fade-out-slow": "fadeout 0.4s forwards ease",
        buoy: "buoy 0.1s 0.2s fowards ease-in",
        spread: "spread 0.2s forwards ease-out",
        "scooch-up&pulse": "scoochup 1.2s infinite",
        "long-blink": "longblink 1s forwards",
      },
      gridTemplateColumns: {
        "nav-lg": "40% 20% 33% 2% 5%",
        "nav-mobile": "40% 10% 40%",
        "content-main-lg": "50% 45%", // leave a little extra room to right of grid for a more organic looking result
        "content-main-mobile": "65% 30%",
      },
      gridTemplateRows: {
        "content-main-mobile": "min(40%, 15vh) 1fr",
        "content-main-lg": "42% 25% 25%",
      },
    },
  },
  plugins: [require("tailwindcss-radix")],
};
