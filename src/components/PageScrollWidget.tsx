import React, { useState, useEffect, useRef } from "react";

const PageScrollWidget = ({ pageUrl, scrollDirection, children }) => {
  const scrollableAreaRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const initialTouchPosit = useRef(null);

  useEffect(() => {
    const taglineContainer = document.querySelector("[data-subheader]");
    const transitionGroup = document.querySelector("[data-transition-group]");
  }, []);

  const handleSwipe = () => {
    let initialTouchPosit: number;
    let touchClientY: number;
    let swipeComplete: boolean;
    const handleTouchMove = (e: TouchEvent) => {
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
  };
  return (
    <div
      ref={scrollContainerRef}
      onTouchStart={(e) => (initialTouchPosit.current = e.touches[0].clientY)}
      className="flex h-1/5 w-full items-end justify-center"
    >
      <a
        href={pageUrl}
        data-scroll-btn={scrollDirection}
        className={
          scrollDirection === "up"
            ? "nav-scroll m-0 flex w-[40vw] translate-y-1/2 cursor-default flex-col justify-center text-lg lg:h-[10vh] lg:-translate-y-4"
            : "flex w-[50vw] flex-col items-center lg:translate-y-4"
        }
        ref={scrollableAreaRef}
      >
        {scrollDirection === "down" && (
          <div
            data-test
            className=" w-fit translate-y-2 text-center text-gray-400 "
          >
            Scroll
          </div>
        )}
        {children}
      </a>
    </div>
  );
};

export default PageScrollWidget;
