import React, { useEffect, useState, useRef } from "react";
import useIsTouchDevice from "./useIsTouchDevice";

const useSwipeNext = (swipeableAreaRef) => {
  const [initialTouchPosit, setInitialTouchPosit] = useState(0);
  const [currentTouchPosit, setCurrentTouchPosit] = useState(0);
  const [transformDistanceY, setTransformDistanceY] = useState(0);
  const [defaultCaretPositTop, setDefaultCaretPositTop] = useState(0);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (location.href.includes("/Main")) return;
    const swipeContainer: HTMLDivElement = document.querySelector(
      "[data-swipe-container]",
    );
    const swipeableArea: HTMLLinkElement =
      document.querySelector("[data-swipeable]");
    const swipeContainerTop = Math.floor(
      swipeContainer.getBoundingClientRect().top,
    );
    const transitionGroup = document.querySelector("[data-transition-group]");
    const taglineContainer = document.querySelector("[data-subheader]");

    const handleTouchStart = (e: TouchEvent) => {
      setInitialTouchPosit(Math.floor(e.touches[0].clientY));
    };
    const handleTouchMove = (e: TouchEvent) => {
      setCurrentTouchPosit(Math.floor(e.touches[0].clientY));
      const transformDistanceY = currentTouchPosit - initialTouchPosit;
      if (
        swipeContainerTop - defaultCaretPositTop >= transformDistanceY - 20 &&
        transformDistanceY < 0 &&
        !clicked
      ) {
        setClicked(true);
        setCurrentTouchPosit(Math.floor(e.touches[0].clientY));
        swipeableArea.classList.add("animate-fade-out");
        transitionGroup.classList.add("transition");
        taglineContainer.classList.add("animate-fall-from");
        taglineContainer.addEventListener("animationend", () => {
          swipeableArea.click();
        });
      } else if (
        swipeContainerTop - defaultCaretPositTop < transformDistanceY &&
        transformDistanceY < 0 &&
        !clicked
      ) {
        setTransformDistanceY(
          Math.floor(Math.abs(transformDistanceY) ** 1.1 * -1),
        );
      }
    };
    swipeableArea.addEventListener("touchstart", handleTouchStart);
    swipeableArea.addEventListener("touchmove", handleTouchMove);
    return () => {
      swipeableArea.removeEventListener("touchstart", handleTouchStart);
      swipeableArea.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentTouchPosit, transformDistanceY]);

  useEffect(() => {
    setDefaultCaretPositTop(
      Math.floor(swipeableAreaRef.current?.getBoundingClientRect().top),
    );
  }, [swipeableAreaRef]);

  return transformDistanceY;
};

export default useSwipeNext;
