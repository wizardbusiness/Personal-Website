/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xl: "2000px",
        "2xl": "3500px",
      },
      colors: {
        "foggy-glass": "#E5E7EB50",
        "moon-shine": "#F3F3F330",
        "blue-smoke": "#223249",
        dusk: "#1d2a44",
      },
      spacing: {
        84: "21rem",
      },
      transitionTimingFunction: {
        "eease-in": "cubic-bezier(1, 0, 1, 1)",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleup: {
          "0%": {
            transform: "translateY(0vh)",
          },
          "40%": {
            transform: "translateY(-70vh) scale(130%)",
            transformOrigin: "bottom",
            opacity: 0.8,
          },
          "100%": {
            transform: "translateY(-70vh) scale(130%)",
            transformOrigin: "bottom",
            opacity: 0.8,
          },
        },
        floatup: {
          "0%": {
            transform: "translateY(0vh)",
            transformOrigin: "bottom",
          },
          "10%": { transform: "translateY(0vh) scaleY(110%) scaleX(100%)", transformOrigin: "bottom" },
          "15%": { transform: "translateY(-2vh) scaleY(90%) scaleX(110%)", transformOrigin: "bottom" },
          "25%": { transform: "translateY(-2vh)  scaleY(105%) scaleX(95%)", transformOrigin: "bottom" },
          "100%": { transform: "translateY(-4vh) scaleY(100%) scaleX(100%)" },
        },
        floatupMore: {
          "0%": {
            transform: "translateY(0vh)",
            transformOrigin: "bottom",
          },
          "100%": {
            transform: "translateY(-3vh)",
            transformOrigin: "bottom",
          },
        },
        floatInPlace: {
          "0%": {
            transform: "translateY(-3vh)",
          },
          "50%": {
            transform: "translateY(-2.5vh)",
          },
          "100%": {
            transform: "translateY(-3vh)",
          },
        },
        bringDown: {
          "0%": {
            transform: "translateY(-5vh)",
          },
          "100%": {
            transform: "translateY(0vh)",
          },
        },

        "slide-up": {
          "100%": {
            transform: "translateY(-10vh)",
            opacity: 0,
          },
        },
        "slide-down": {
          "0%": {
            transform: "translateY(-75vh)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        scoochup: {
          "0%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { opacity: "0.8", transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0px)", opacity: "0.5" },
        },
        collision: {
          "0%": {
            transform: "perspective(600px) rotateX(0deg)",
            transformOrigin: "bottom",
            width: "30vw",
          },
          "40%": {
            transform: "perspective(600px) rotateX(50deg) scaleY(60%)",
            transformOrigin: "bottom",
            width: "40vw",
          },
          "75%": {
            transform: "perspective(600px) rotateX(50deg) scaleY(7%)",
            transformOrigin: "bottom",
            width: "75vw",
          },
          "100%": {
            transform: "perspective(600px) rotateX(0deg) scaleY(4%)",
            transformOrigin: "bottom",
            width: "75vw",
          },
        },
        "squish-lg": {
          "0%": {
            transform: "perspective(600px) rotateX(0deg) scaleY(100%)",
            transformOrigin: "bottom",
          },
          "40%": {
            transform: "perspective(600px) rotateX(50deg) scaleY(20%)",
            transformOrigin: "bottom",
          },
          "50%": {
            transform: "perspective(600px) rotateX(50deg) scaleY(10%)",
            transformOrigin: "bottom",
          },
          "75%": {
            transform: "perspective(600px) rotateX(50deg) scaleY(7%)",
            transformOrigin: "bottom",
            width: "var(--caption-width)",
          },
          "100%": {
            transform: "perspective(600px) rotateX(0deg) scaleY(4%)",
            transformOrigin: "bottom",
            width: "var(--info-cont-width)",
          },
        },
        squelch: {
          "0%": {
            transform: "perspective(600px) rotateX(0deg) scaleY(4%)",
            transformOrigin: "bottom",
            width: "var(--info-cont-width)",
          },
          "25%": {
            transform: "perspective(600px) rotateX(50deg) scaleY(20%)",
            transformOrigin: "bottom",
          },
          "50%": {
            transform: "perspective(600px) rotateX(50deg) scaleY(40%)",
            width: "var(--caption-width)",
            transformOrigin: "bottom",
          },
          "75%": {
            backgroundColor: "foggy-glass",
          },
          "100%": {
            transform: "perspective(600px) rotateX(0deg)",
            transformOrigin: "bottom",
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
        "fade-in-resume": {
          "0%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "85%",
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
      },
      animation: {
        "blinking-cursor": "blink 1.5s steps(1) 6 forwards",
        "scale-up": "scaleup 0.8s forwards ease-out",
        "slide-up": "slide-up 0.2s forwards",
        "slide-down": "slide-down 1.2s forwards",
        "squish-down-lg": "squish-lg 0.4s forwards",
        "squish-down-sm": "squish-sm 0.2s forwards ease-in",
        squelch: "squelch 0.6s forwards ease-in-out",
        "float-up": "floatup 1.3s forwards ease-out",
        "float-up-more": "floatupMore 5s ease-in forwards",
        "float-in-place": "floatInPlace 3s forwards ease-in infinite",
        "bring-down": "bringDown 0.2s forwards",
        grow: "grow 0.5s forwards ease-out",
        "open-accordion": "open 0.2s forwards ease-in",
        "close-accordion": "close 0.2s forwards ease-out",
        "fade-in": "fadein 1.5s forwards ease",
        "fade-in-resume": "fade-in-resume 0.6s forwards ease",
        "fade-out": "fadeout 0.2s forwards ease",
        "fade-out-slow": "fadeout 0.4s forwards ease",
        "scooch-up": "scoochup 1.2s infinite",
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
