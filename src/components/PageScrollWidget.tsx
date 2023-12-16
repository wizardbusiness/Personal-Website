import React, { useState, useEffect, useRef } from "react";
import useSwipeNext from "../scripts/hooks/useSwipeNext";
import useScrollNext from "../scripts/hooks/useScrollNext";
import useScrollPrev from "../scripts/hooks/useScrollPrev";
import "../styles/tailwind.css";
import useSwipePrev from "../scripts/hooks/useSwipePrev";

const PageScrollWidget = ({
  pageUrl,
  navDirection,
  isTouchDevice,
  children,
}) => {
  const swipeableAreaRef = useRef(null);
  const transformDistanceOnSwipeNext = useSwipeNext(swipeableAreaRef);
  const transformDistanceOnSwipePrev = useSwipePrev(swipeableAreaRef);
  useScrollNext();
  useScrollPrev();

  return (
    <a
      data-swipeable
      style={{
        transform: `translateY(${
          (navDirection === "next" && transformDistanceOnSwipeNext) ||
          transformDistanceOnSwipePrev
        }px)`,
        opacity: `${1 - Math.abs(transformDistanceOnSwipeNext) / 100}`,
      }}
      href={pageUrl}
      data-scroll-btn={navDirection}
      className={
        navDirection === "next"
          ? "flex w-[50vw] translate-y-4 flex-col items-center"
          : "nav-scroll m-0 flex w-[40vw] -translate-y-4 cursor-default flex-col items-center justify-center text-lg lg:h-[10vh]"
      }
      ref={swipeableAreaRef}
    >
      {navDirection === "next" && (
        <div
          data-caret
          className=" w-fit translate-y-2 text-center text-gray-400 "
        >
          {!!isTouchDevice ? "Swipe" : "Scroll"}
        </div>
      )}
      {navDirection === "prev" && (
        <div
          data-caret
          className=" w-fit translate-y-4 text-center text-gray-400 opacity-30"
        >
          {!!isTouchDevice ? "Swipe Back" : "Scroll Back"}
        </div>
      )}
      {children}
    </a>
  );
};

export default PageScrollWidget;
