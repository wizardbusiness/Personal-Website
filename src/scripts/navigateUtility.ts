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

const checkUserInterupt = (e: WheelEvent, subheader: HTMLElement) => {
  if (e.deltaY > 0) {
    const effects = document.querySelectorAll("[data-effect]");
    effects.forEach((effect) => effect.classList.remove("build"));
    subheader.addEventListener("animationend", () => {});
    subheader.classList.add("animate-rise-from", "translate-y-[5px]");
  }
};

// controls transitions and animations when scrolling from landing page to info page
const scrollDown = (scrollBtn: HTMLElement) => {
  const subheader = document.querySelector("[data-subheader-landing]");
  subheader.classList.add("animate-fall-from");
  subheader.addEventListener("animationend", () => {
    scrollBtn.click();
  });

  // const awaitViewTransition = async () => {};
};

// controls transitions and animations when scrolling from info page to landing page
const scrollUp = (scrollBtn: HTMLElement) => {
  const subheaderMain = document.querySelector("[data-subheader-main]");

  const effectContainer = document.querySelector("[data-effect-container]");

  const effects = document.querySelectorAll("[data-effect]");
  effects.forEach((effect) => effect.classList.remove("build"));

  const transitionDone = _.after(effects.length, () => {
    subheaderMain.classList.add("animate-rise-from", "translate-y-[5px]");
  });

  let transitionCount = 0;
  effectContainer.addEventListener("transitionend", () => {
    transitionDone();
  });

  subheaderMain.addEventListener("animationend", () => {
    scrollBtn.click();
  });
};

// throttles interaction to prevent performance drain and visual artefacts caused by aggressive or velocity enabled scrolling / gestures.
// const navigateWithThrottle = _.throttle(scrollToPage, 1500, { leading: true });
const scrollContainer = document.querySelector("html");
// scrollContainer.addEventListener("wheel", (e) => navigateWithThrottle(e));
