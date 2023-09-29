import _ from "lodash";

const scrollToPage = (e: WheelEvent) => {
  // view transitions in astro only work if link is clicked, so we make scrolling click the link.
  const scrollBtn = document.querySelectorAll(
    "[data-scroll-btn]",
  )[0] as HTMLElement;
  const direction = scrollBtn.dataset.scrollBtn;

  if (direction === "down" && e.deltaY < 0) {
    const subheader = document.querySelectorAll("[data-subheader-landing]")[0];
    subheader.classList.add("animate-fall-from");
    subheader.addEventListener("animationend", () => {
      scrollBtn.click();
    });
  }
  if (direction === "up" && e.deltaY > 0) {
    const subheaderMain = document.querySelectorAll("[data-subheader-main]")[0];

    const effectContainer = document.querySelector("[data-effect-container]");

    const effects = document.querySelectorAll("[data-effect]");
    effects.forEach((effect) => effect.classList.remove("build"));
    const done = _.after(effects.length, () => {
      // subheaderMain.classList.remove("animate-fall-to");
      subheaderMain.classList.add("animate-rise-from", "translate-y-[5px]");
    });
    effectContainer.addEventListener("transitionend", () => {
      console.log("transition");
      done();
    });

    subheaderMain.addEventListener("animationend", () => {
      scrollBtn.click();
    });
  }
  return;
};

const navigateWithThrottle = _.throttle(scrollToPage, 600, { leading: true });
const scrollContainer = document.querySelector("html");
scrollContainer.addEventListener("wheel", (e) => navigateWithThrottle(e));
