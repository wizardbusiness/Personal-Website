import React, { useState, useEffect, useRef } from "react";
import "../styles/tailwind.css";

const PageScrollWidget = ({ pageUrl, scrollDirection, children }) => {
  const [initialTouchPosit, setInitialTouchPosit] = useState(0);
  const [currentTouchPosit, setCurrentTouchPosit] = useState(0);
  const [transformDistanceY, setTransformDistanceY] = useState(0);
  const [defaultCaretPositTop, setDefaultCaretPositTop] = useState(0);
  const [nav, setNav] = useState(false);

  let swipeableAreaRef = useRef(null);
  const swipeContainerRef = useRef(null);

  useEffect(() => {
    const swipeContainer = document.querySelector("[data-swipe-container]");
    const swipeableArea: HTMLLinkElement =
      document.querySelector("[data-swipeable]");
    const swipeContainerTop = Math.floor(
      swipeContainer.getBoundingClientRect().top,
    );
    const handleNavTransition = () => {};
    const handleTouchStart = (e) => {
      setInitialTouchPosit(Math.floor(e.touches[0].clientY));
    };
    const handleTouchMove = (e) => {
      setCurrentTouchPosit(Math.floor(e.touches[0].clientY));
      const transformDistanceY = currentTouchPosit - initialTouchPosit;
      if (
        swipeContainerTop - defaultCaretPositTop >= transformDistanceY - 20 &&
        transformDistanceY < 0 &&
        !nav
      ) {
        setNav(true);
        const transitionGroup = document.querySelector(
          "[data-transition-group]",
        );
        console.log(transitionGroup);
        const taglineContainer = document.querySelector("[data-subheader]");
        const caret = document.querySelector("[data-caret]");
        swipeableArea.classList.add("animate-fade-out");
        transitionGroup.classList.add("transition");
        taglineContainer.classList.add("animate-fall-from");
        taglineContainer.addEventListener("animationend", () => {
          caret.classList.remove("move-down");
          transitionGroup.classList.remove("transition");
          swipeableArea.click();
        });
      } else if (
        swipeContainerTop - defaultCaretPositTop < transformDistanceY - 20 &&
        transformDistanceY < 0 &&
        !nav
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
  }, [currentTouchPosit]);

  useEffect(() => {
    setDefaultCaretPositTop(
      Math.floor(swipeableAreaRef.current?.getBoundingClientRect().top),
    );
  }, [swipeableAreaRef, swipeContainerRef]);

  const handleSwipe = () => {
    // if (swipeComplete) {
    //   scrollContainer.removeEventListener("touchmove", handleTouchMove);
    //   scrollableArea.classList.add("animate-fade-out");
    //   transitionGroup.classList.add("transition");
    //   taglineContainer.classList.add("animate-fall-from");
    //   taglineContainer.addEventListener("animationend", () => {
    //     scrollCaret.classList.remove("move-down");
    //     transitionGroup.classList.remove("transition");
    //     scrollCaret.click();
    //   });
    // }
  };
  // const handleClick = () => {
  //   setRegisterEvent(true);
  // };
  return (
    <div
      data-swipe-container
      ref={swipeContainerRef}
      className="flex h-1/5 w-full  items-end justify-center"
    >
      <a
        data-swipeable
        style={{
          transform: `translateY(${transformDistanceY}px)`,
          // backgroundColor: `${registerEvent && "red"}`,
        }}
        href={pageUrl}
        data-scroll-btn={scrollDirection}
        className={
          scrollDirection === "up"
            ? "nav-scroll m-0 flex w-[40vw] translate-y-1/2 cursor-default flex-col justify-center text-lg lg:h-[10vh] lg:-translate-y-4"
            : "flex w-[50vw] flex-col items-center lg:translate-y-4"
        }
        ref={swipeableAreaRef}
      >
        {scrollDirection === "down" && (
          <div
            data-caret
            className=" w-fit translate-y-2 text-center text-gray-400 "
          >
            Swipe
          </div>
        )}
        {children}
      </a>
    </div>
  );
};

export default PageScrollWidget;
