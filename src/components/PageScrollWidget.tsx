import React, {
  useState,
  useEffect,
  useRef,
} from "react";

const PageScrollWidget = ({ pageUrl, scrollDirection, children }) => {
  const [initialTouchPosit, setInitialTouchPosit] = useState(0);
  const [currentTouchPosit, setCurrentTouchPosit] = useState(0);
  const [transformDistanceY, setTransformDistanceY] = useState(0);
  const [defaultCaretTopBound, setDefaultCaretTopBound] = useState(0);

  let swipeableAreaRef = useRef(null);
  const swipeContainerRef = useRef(null);

  useEffect(() => {
    const handleSwipe = () => {};
    const taglineContainer = document.querySelector("[data-subheader]");
    const transitionGroup = document.querySelector("[data-transition-group]");
    const transformDistanceY = currentTouchPosit - initialTouchPosit;

    if (
      swipeContainerRef.current?.getBoundingClientRect().top -
        defaultCaretTopBound <
      transformDistanceY
    ) {
      setTransformDistanceY(transformDistanceY);
    }
  }, [currentTouchPosit]);

  useEffect(() => {
    setDefaultCaretTopBound(
      swipeableAreaRef.current?.getBoundingClientRect().top,
    );
  }, []);

  const handleTouchStart = (e) => {
    setInitialTouchPosit(e.touches[0].clientY);
    // swipeableAreaRef.current = {
    //   clientY: e.touches[0].clientY,
    //   top: swipeContainerTopPosit,
    // };
  };

  const handleTouchMove = (e) => {
    setCurrentTouchPosit(e.touches[0].clientY);
  };

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
  return (
    <div
      ref={swipeContainerRef}
      className="flex h-1/5 w-full items-end justify-center"
    >
      <a
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        style={{
          transform: `translateY(${transformDistanceY}px)`,
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
            data-test
            className=" w-fit translate-y-2 text-center text-gray-400 "
          >
            {transformDistanceY}
          </div>
        )}
        {children}
      </a>
    </div>
  );
};

export default PageScrollWidget;
