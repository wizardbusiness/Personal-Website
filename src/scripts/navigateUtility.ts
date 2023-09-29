import _ from "lodash";

/**
 * translates wheel events into click events
 * controls transition and animation logic when navigating between landing page and info page
 *
 * @param e
 * @returns
 */

const scrollToPage = (e: WheelEvent) => {
  // view transitions in astro only work if link is clicked, so we make scrolling click the link.
  const scrollBtn = document.querySelector("[data-scroll-btn]") as HTMLElement;
  const direction = scrollBtn.dataset.scrollBtn;

  if (direction === "down" && e.deltaY < 0) {
    scrollDown(scrollBtn);
  } else if (direction === "up" && e.deltaY > 0) {
    scrollUp(scrollBtn);
  }
  return;
};

// controls transitions and animations when scrolling from landing page to info page
const scrollDown = (scrollBtn: HTMLElement) => {
  const subheader = document.querySelectorAll("[data-subheader-landing]")[0];
  subheader.classList.add("animate-fall-from");
  subheader.addEventListener("animationend", () => {
    scrollBtn.click();
  });
};

// controls transitions and animations when scrolling from info page to landing page
const scrollUp = (scrollBtn: HTMLElement) => {
  const subheaderMain = document.querySelector("[data-subheader-main]");

  const effectContainer = document.querySelector("[data-effect-container]");

  const effects = document.querySelectorAll("[data-effect]");
  effects.forEach((effect) => effect.classList.remove("build"));
  const done = _.after(effects.length, () => {
    subheaderMain.classList.add("animate-rise-from", "translate-y-[5px]");
  });
  effectContainer.addEventListener("transitionend", () => {
    done();
  });

  subheaderMain.addEventListener("animationend", () => {
    scrollBtn.click();
  });
};

// throttles interaction to prevent performance drain and visual artefacts caused by aggressive or velocity enabled scrolling / gestures.
const navigateWithThrottle = _.throttle(scrollToPage, 600, { leading: true });
const scrollContainer = document.querySelector("html");
scrollContainer.addEventListener("wheel", (e) => navigateWithThrottle(e));
