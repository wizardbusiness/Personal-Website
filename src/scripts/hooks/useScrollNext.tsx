import React, { useEffect, useState } from "react";

const useScrollNext = () => {
  const [deltaY, setDeltaY] = useState(0);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (location.href.includes("/Main")) return;
    console.log(location.href);
    const taglineContainer = document.querySelector("[data-subheader]");
    const transitionGroup = document.querySelector("[data-transition-group]");
    const scrollContainer = document.querySelector("main");
    const scrollCaret: HTMLElement =
      document.querySelector("[data-scroll-btn]");
    const handleScrollNext = (e: WheelEvent) => {
      setDeltaY(e.deltaY);
      if (deltaY > 0 && !clicked) {
        scrollCaret.classList.add("animate-fade-out");
        transitionGroup.classList.add("transition");
        taglineContainer.classList.add("animate-fall-from");
        taglineContainer.addEventListener("animationend", () => {
          scrollCaret.click();
        });
        setClicked(true);
      }
    };
    scrollContainer.addEventListener("wheel", handleScrollNext);
    return () => {
      scrollContainer.removeEventListener("wheel", handleScrollNext);
    };
  }, [deltaY]);

  return;
};

export default useScrollNext;
