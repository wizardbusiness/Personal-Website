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
    subheaderMain.classList.add("animate-rise-from");
    subheaderMain.addEventListener("animationend", () => {
      scrollBtn.click();
    });
  }
  return;
};

const navigateWithThrottle = _.throttle(scrollToPage, 600, { leading: true });
const scrollContainer = document.querySelector("html");
scrollContainer.addEventListener("wheel", (e) => navigateWithThrottle(e));
