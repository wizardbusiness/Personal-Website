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
    const parkElements = Array.from(document.querySelectorAll(".park-tree"));
    const scrollCaret: HTMLElement =
      document.querySelector("[data-scroll-btn]");
    const handleScrollPrev = (e: TouchEvent) => {
      setCurrentTouchPosit(e.touches[0].clientY);
      const swipeDistance = initialTouchPosit - currentTouchPosit;
      if (currentTouchPosit > 0) {
        parkElements.forEach((element: SVGElement) => {
          element.style.transform = "scale(0, 0)";
          // keep this at zero, otherwise transition will still be happening as container floats up
          element.style.transitionDelay = `0ms`;
        });
        buildingElements.forEach((element: HTMLElement) => {
          const transitionDelayMs = Number(
            element.style.transitionDelay.replace("ms", ""),
          );
          element.style.transform = "scale(0, 0)";
          element.style.transitionDelay = `${transitionDelayMs - 200}ms`;
        });
        forestElements.forEach((element: SVGElement) => {
          const transitionDelayMs = Number(
            element.style.transitionDelay.replace("ms", ""),
          );
          element.style.transform = "scale(0, 0)";
          element.style.transitionDelay = `${transitionDelayMs - 600}ms`;
          setTransitionCount((prev) => Math.max(prev, transitionDelayMs)); // 300 is arbitrary, replace with variable
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
