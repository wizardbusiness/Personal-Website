import React, { useState, useEffect } from "react";

const useSwipePrev = (swipeableAreaRef) => {
  const [initialTouchPosit, setInitialTouchPosit] = useState(0);
  const [currentTouchPosit, setCurrentTouchPosit] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [transitionCount, setTransitionCount] = useState(0);
  const [effectElementsCount, setEffectElementsCount] = useState(0);
  useEffect(() => {
    if (!location.href.includes("/Main")) return;
    const taglineContainer = document.querySelector("[data-subheader]");
    const swipeContainer = document.querySelector("[data-swipe-container]");
    const buildingElements = Array.from(
      document.querySelectorAll(".structure"),
    );
    const forestElements = Array.from(document.querySelectorAll(".tree"));
    setEffectElementsCount((prevLength) =>
      forestElements.length > prevLength ? forestElements.length : prevLength,
    );
    const scrollCaret: HTMLElement =
      document.querySelector("[data-scroll-btn]");
    const handleScrollPrev = (e: TouchEvent) => {
      setCurrentTouchPosit(e.touches[0].clientY);
      const swipeDistance = initialTouchPosit - currentTouchPosit;
      if (currentTouchPosit > 0) {
        buildingElements.forEach((element) =>
          element.classList.remove("build"),
        );
        forestElements.forEach((element) => {
          element.classList.remove("grow");
          element.addEventListener("transitionend", () =>
            setTransitionCount((prevCount) => (prevCount += 1)),
          );
        });
        scrollCaret.classList.add("animate-swipe-down");
      }
    };

    if (
      transitionCount >= Math.floor(effectElementsCount) &&
      transitionCount > 0 &&
      !clicked
    ) {
      taglineContainer.classList.replace(
        "2xl:before:w-[22vw]",
        "2xl:before:w-[70vw]",
      );
      taglineContainer.classList.replace(
        "lg:before:animate-squish-down-lg",
        "lg:before:animate-squelch-up-lg",
      );
      taglineContainer.classList.replace(
        "before:animate-squish-down-sm",
        "before:animate-squelch-up-sm",
      );
      taglineContainer.classList.add("animate-rise-from");
      taglineContainer.addEventListener(
        "animationend",
        () => {
          scrollCaret.click();
        },
        // taglineContainer.classList.remove("animate-rise-from"),
      );
      setClicked(true);
    }
    swipeContainer.addEventListener("touchmove", handleScrollPrev);
    return () => {
      swipeContainer.removeEventListener("touchmove", handleScrollPrev);
    };
  }, [currentTouchPosit, transitionCount]);

  return;
};

export default useSwipePrev;
