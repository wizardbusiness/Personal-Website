import React, { useEffect, useState } from "react";

const useScrollPrev = () => {
  const [deltaY, setDeltaY] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [transitionCount, setTransitionCount] = useState(0);
  const [effectElementsCount, setEffectElementsCount] = useState(0);
  useEffect(() => {
    if (!location.href.includes("/Main")) return;
    const taglineContainer = document.querySelector("[data-subheader]");
    const buildingElements = Array.from(
      document.querySelectorAll(".structure"),
    );
    const forestElements = Array.from(document.querySelectorAll(".tree"));
    const parkElements = Array.from(document.querySelectorAll(".park-tree"));
    setEffectElementsCount((prevLength) =>
      forestElements.length > prevLength ? forestElements.length : prevLength,
    );
    const scrollContainer = document.querySelector("main");
    const scrollCaret: HTMLElement =
      document.querySelector("[data-scroll-btn]");
    const handleScrollPrev = (e: WheelEvent) => {
      setDeltaY(e.deltaY);
      if (deltaY < 0) {
        parkElements.forEach((element: SVGElement) => {
          element.style.transform = "scale(0, 0)";
          element.style.transitionDelay = `100ms`;
        });
        buildingElements.forEach((element: HTMLElement) =>
          element.classList.remove("build"),
        );
        forestElements.forEach((element: SVGElement) => {
          const transitionDelayMs = Number(
            element.style.transitionDelay.replace("ms", ""),
          );
          element.style.transform = "scale(0, 0)";
          console.log(element.style.transitionDelay);
          element.style.transitionDelay = `${transitionDelayMs - 600}ms`;
          setTransitionCount((prev) => Math.max(prev, transitionDelayMs - 300)); // 300 is arbitrary, replace with variable
          element.addEventListener("transitionend", () =>
            setTransitionCount((prevCount) => (prevCount += 1)),
          );
        });

        scrollCaret.classList.add("animate-fade-out");
      }
    };

    if (transitionCount > 0 && !clicked) {
      const handleTransitionPrev = () => {
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
        taglineContainer.classList.add("animate-rise-from"),
          taglineContainer.addEventListener("animationend", () =>
            scrollCaret.click(),
          );

        setClicked(true);
      };

      setTimeout(() => handleTransitionPrev(), transitionCount);
    }
    scrollContainer.addEventListener("wheel", handleScrollPrev);
    return () => {
      scrollContainer.removeEventListener("wheel", handleScrollPrev);
    };
  }, [deltaY, transitionCount]);

  return;
};

export default useScrollPrev;
