import disableScroll from "./disableScroll";
/**
 * Handles all the transitions, animations and effects when a user
 * navigates from the landing section to the about section.
 *
 */

/**
 * *************************************
 * * LANDING SECTION -> ABOUT SECTION *
 * *************************************
 */
function handleTransitionToAboutSection() {
  /**
   * SELECTED ELEMENTS
   * -----------------
   */

  /**
   * @constant landingSection
   * @description The landing <section> is where the user journey starts
   */
  const landingSection = document.querySelector("#landing");

  /**
   * @constant fadeOnTransitionGroup
   * @description Elements being faded out when the transition takes place
   */
  const fadeOnTransitionGroup: NodeListOf<HTMLDivElement> =
    document.querySelectorAll(".fade-out-on-transition-away");

  /**
   * @constant captionContainerInstances
   * @description Caption container component instances.
   * 2 instances -
   * - one in landing section
   * - one in about section to mimic page transition
   */
  const captionContainerInstances: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#caption-container");

  const overlayedTransitionElement: HTMLDivElement =
    captionContainerInstances[0];
  const overlayedTransitionElementReplacement = captionContainerInstances[1];

  /**
   * @constant aboutSectionTextContentContainer
   * @description The container that overlayedTransitionElement will transition to and "collide" with.
   */
  const aboutSectionTextContentContainer: HTMLElement =
    document.querySelector("#text-content");

  /**
   * @constant nextSectionTransitionGroupContainer
   * @description The container that will be transitioned up to "collide" with the
   * overlayedTransitionElement.
   */
  const nextSectionTransitionGroupContainer: HTMLDivElement =
    document.querySelector("[data-about-translate-up]");

  /**
   * EVENT HANDLING
   * --------------
   * In sequence of effect
   */
  // 1. Disable user scroll when handleTransitionToNextSection is invoked

  disableScroll(true);

  // 2. When user scrolls up on landing page start the programmatic transition to the next section
  /**
   * @constant handleScrollUpEvent
   * @description curried function for handling scrolling up
   * - Fades out elements not being animated
   * - Scales up caption container
   */
  const handleScrollUpEvent = handleScrollUp(
    fadeOnTransitionGroup,
    overlayedTransitionElement,
    scaleOverlayedTransitionElement,
  );
  landingSection.addEventListener("wheel", handleScrollUpEvent);

  const detachOverlayedElement = positionOverlayedElementAtCorrectOffset(
    overlayedTransitionElement,
    computeScaledRectBounds,
  );

  // 3. Detach captionContainer from document flow by setting to position fixed at computed position
  /**
   * @const detachOverlayedElement
   * @description
   *  curried function
   *  - computes the actual rect bounds for the element since transformed bounds are innacurate for element positioning
   *  - changes caption container position to fixed.
   */
  overlayedTransitionElement.addEventListener(
    "animationend",
    detachOverlayedElement,
  );

  // 4a. scroll to the next section
  overlayedTransitionElement.addEventListener(
    "animationend",
    programaticallyScrollToNextSection,
  );

  // b.- handles overlay element position in viewport while scrolling (slowly moves down)

  const translateOverlayedElementWhileScrolling = translateOverlayedElement(
    overlayedTransitionElement,
    2, //base speed (px)
    1.02, // delta
    20, // terminal velocity
  );

  window.addEventListener("scroll", translateOverlayedElementWhileScrolling, {
    once: true,
  });

  // 5. Wait until the caption container is at the target position in the viewport
  // Then translate the next section's transition group up towards the caption container
  /**
   * @description Custom Event Listener
   * Checks if captionContainer element is at the target position in the viewport
   * and handles the event by translating the next section up from viewport bottom
   */

  checkIfElementAtTargetPosition(
    overlayedTransitionElement,
    nextSectionTransitionGroupContainer,
    handleContainerAtTarget,
    window.innerHeight * 0.55,
  );

  // 6. Wait for the container to collide with the <header> element, then handle the collision by
  // swapping in the overlayedTransitionElementReplacement and animating it
  /**
   *  @description Custom Event Listener
   *  - detects collision between the OverlayedTransitionElement component
   *    on the landing page and the info container div in the about section
   *  - handles the collision by hiding the caption container and
   *    "swapping in" (making visible) the OverlayedTransitionElement in the about section,
   *    and animating the swapped in OverlayedTransitionElement
   */

  checkForElementBoundsCollisionWithNextSection(
    overlayedTransitionElement,
    aboutSectionTextContentContainer,
    overlayedTransitionElementReplacement,
    handleCollision,
  );

  overlayedTransitionElementReplacement.addEventListener(
    "animationend",
    enableScroll,
  );

  // The end of the scroll signals the end of the transition, and user scrolling is reenabled
}

/**
 * @function handleScrollUpEvent
 * @description
 * - Fades out elements not being animated
 * - Scales up caption container
 * - handles overlay element position in viewport while scrolling (slowly moves down)
 */

// ----------------------------------------------------------------------------------

function handleScrollUp(
  fadeOnTransitionGroup: NodeListOf<HTMLDivElement>,
  overlayedTransitionElement: HTMLDivElement,
  scaleOverlayedTransitionElement: ScaleOverlayedTransitionElement,
) {
  return (e: WheelEvent) => {
    if (e.deltaY > 0) {
      fadeOutElements(fadeOnTransitionGroup);
      scaleOverlayedTransitionElement(overlayedTransitionElement);
    }
  };
}

function fadeOutElements(elementsGroup: NodeListOf<HTMLDivElement>) {
  elementsGroup.forEach((element) => {
    if (element.id === "scroll-caret") {
      element.classList.add("animate-swipe-up");
    } else {
      element.classList.add("transition", "opacity-0", "-translate-y-10");
    }
  });
}

type ScaleOverlayedTransitionElement = (
  overlayedTransitionElement: HTMLDivElement,
) => void;

function scaleOverlayedTransitionElement(
  overlayedTransitionElement: HTMLDivElement,
): void {
  overlayedTransitionElement.classList.add("animate-scale-up");
}

// ----------------------------------------------------------------------------------

function positionOverlayedElementAtCorrectOffset(
  OverlayedTransitionElement: HTMLDivElement,
  calculateOffset: ComputeScaledRectBounds,
): () => void {
  return () => {
    const offset = calculateOffset(OverlayedTransitionElement, 1.3);
    OverlayedTransitionElement.style.top = `calc(${
      window.innerHeight * 0.77
    }px + ${offset.top}px)`;
    OverlayedTransitionElement.style.left = `${offset.left}px`;
    OverlayedTransitionElement.style.position = "fixed";
  };
}

type ComputeScaledRectBounds = (
  OverlayedTransitionElement: HTMLDivElement,
  scale: number,
) => Record<PositionKeys, number>;
type PositionKeys = "left" | "right" | "top" | "bottom";

function computeScaledRectBounds(
  OverlayedTransitionElement: HTMLDivElement,
  scale: number,
): Record<PositionKeys, number> {
  const postTransformRect = OverlayedTransitionElement.getBoundingClientRect();

  const postTransformRectHeight = postTransformRect.height;
  const preTransformRectHeight = postTransformRect.height / scale;
  // difference in height between scaled and non scaled div height
  const heightDiff = postTransformRectHeight - preTransformRectHeight;

  const postTransformRectWidth = postTransformRect.width;
  const preTransformRectWidth = postTransformRect.width / scale;
  // difference in width between scaled and non scaled div height
  const widthDiff = postTransformRectWidth - preTransformRectWidth;

  const top = Math.floor(postTransformRect.top + heightDiff / 2);
  const left = Math.floor(postTransformRect.left + widthDiff / 2);
  const right = Math.floor(postTransformRect.right - widthDiff / 2);
  const bottom = Math.floor(postTransformRect.bottom + heightDiff / 2);

  return { top, left, right, bottom };
}

type TranslateElementPosit = () => void;

function translateOverlayedElement(
  overlayedTransitionElement: HTMLDivElement,
  baseSpeedInPx: number,
  delta: number,
  speedLimit: number,
): TranslateElementPosit {
  function translateElementPosit(): void {
    if (baseSpeedInPx < speedLimit) baseSpeedInPx = baseSpeedInPx ** delta;
    overlayedTransitionElement.style.top = `calc(${overlayedTransitionElement.style.top} + ${baseSpeedInPx}px)`;
    // a little bit funky, but because the element is removed when the scroll is complete,
    // this is an easy way to return out of the function execution
    if (overlayedTransitionElement.style.display === "none") return;
    requestAnimationFrame(translateElementPosit);
  }

  return translateElementPosit;
}

// ----------------------------------------------------------------------------------

function programaticallyScrollToNextSection() {
  window.scrollBy({
    // landing section height + nav check div height
    top: window.innerHeight,
    behavior: "smooth",
  });
}

// ----------------------------------------------------------------------------------

// detectWhenContainerPositionAtTarget
function checkIfElementAtTargetPosition(
  overlayedTransitionElement: HTMLDivElement,
  nextSectionTransitionGroupContainer: HTMLElement,
  handleAtTarget: HandleContainerAtTarget,
  targetPosit: number,
) {
  const containerBottomY =
    overlayedTransitionElement.getBoundingClientRect().bottom;
  if (
    // need to check if caption container position is fixed, otherwise any
    // target posit below the target posit will trigger the callback
    overlayedTransitionElement.style.position === "fixed" &&
    containerBottomY >= targetPosit
  ) {
    handleAtTarget(nextSectionTransitionGroupContainer);
    return;
  }
  requestAnimationFrame(() =>
    checkIfElementAtTargetPosition(
      overlayedTransitionElement,
      nextSectionTransitionGroupContainer,
      handleAtTarget,
      targetPosit,
    ),
  );
}

type HandleContainerAtTarget = (nextSection: HTMLElement) => void;

function handleContainerAtTarget(nextSection: HTMLElement) {
  nextSection.classList.replace("top-[100vh]", "top-[0vh]");
}

// ----------------------------------------------------------------------------------

function checkForElementBoundsCollisionWithNextSection(
  overlayedTransitionElement: HTMLDivElement,
  nextSectionElement: HTMLElement,
  overlayedTransitionElementReplacement: HTMLDivElement,
  handleCollision: HandleCollision,
) {
  const intervalId = setInterval(() => {
    const overlayedTransitionElementBottom =
      overlayedTransitionElement.getBoundingClientRect().bottom;
    const nextSectionElementTop =
      nextSectionElement.getBoundingClientRect().top;
    if (nextSectionElementTop - overlayedTransitionElementBottom <= 0) {
      handleCollision(
        overlayedTransitionElement,
        overlayedTransitionElementReplacement,
      );
      clearInterval(intervalId);
    }
  }, 5);
}

type HandleCollision = (
  overlayedTransitionElement: HTMLDivElement,
  overlayedTransitionElementReplacement: HTMLDivElement,
) => void;

function handleCollision(
  overlayedTransitionElement: HTMLDivElement,
  overlayedTransitionElementReplacement: HTMLDivElement,
) {
  overlayedTransitionElement.style.display = "none";
  overlayedTransitionElementReplacement.children[0].classList.replace(
    "opacity-0",
    "opacity-[0.8]",
  );
  overlayedTransitionElementReplacement.children[0].classList.add(
    "before:animate-squish-down-lg",
  );
}

function enableScroll() {
  disableScroll(false);
}

/**
 * ************************************
 * * ABOUT SECTION -> LANDING SECTION *
 * ************************************
 */

function handleTransitionToLandingSection() {
  const aboutSection: HTMLElement = document.querySelector("#about");
  const landingSection: HTMLElement = document.querySelector("#landing");
  const navCheckContainer: HTMLDivElement =
    document.querySelector("#nav-check");
  /**
   * @constant captionContainerInstances
   * @description Caption container component instances.
   * 2 instances -
   * - one in landing section
   * - one in about section to mimic page transition
   */
  const captionContainerInstances: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#caption-container");

  const captionMsgInstances: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#caption");
  const caption = captionMsgInstances[1];
  const captionReplacement = captionContainerInstances[0];

  const overlayedTransitionElement: HTMLDivElement =
    captionContainerInstances[1];
  const overlayedTransitionElementReplacement = captionContainerInstances[0];

  const overlayedTransitionElementBg = overlayedTransitionElement.children[0];
  // scroll caret section
  // listen for scroll on about section

  function handleIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting === true) {
        disableScroll(false);
      }
    });
  }

  function createObserver(threshold, handleIntersect) {
    let observer: IntersectionObserver;

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: threshold, // fraction of target that needs to be visible for callback to fire, expressed as value between 0 and 1
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(aboutSection);
  }

  aboutSection.addEventListener("transitionend", () => {
    landingSection.classList.replace("flex", "hidden");
  });

  function toggleTransitionReady() {
    const transitionReady = navCheckContainer.getAttribute(
      "data-transition-ready",
    );
    transitionReady
      ? navCheckContainer.setAttribute("data-transition-ready", "false")
      : navCheckContainer.setAttribute("data-transition-ready", "true");
  }

  navCheckContainer.addEventListener("transitionend", toggleTransitionReady);

  overlayedTransitionElement.addEventListener("animationend", () => {
    aboutSection.setAttribute("data-transition-complete", "true");
  });
  // aboutSection.classList.replace("absolute", "fixed");
  // disableScroll(true);

  function scrollToLandingSection() {
    disableScroll(true);
    landingSection.classList.replace("hidden", "flex");
    aboutSection.scrollIntoView(); // VERY IMPORTANT - otherwise page jumps horribly as landing section is painted
    // aboutSection.style.display = "fixed";
    landingSection.scrollIntoView({ block: "start", behavior: "smooth" });
    disableScroll(false);
  }

  function openStagingContainer() {
    navCheckContainer.classList.replace("h-0", "h-[10vh]");
    overlayedTransitionElementBg.classList.replace(
      "before:animate-squish-down-lg",
      "before:animate-squelch",
    );
    caption.classList.add("animate-float-up");
  }

  function closeStagingContainer() {
    navCheckContainer.setAttribute("data-transition-ready", "false");
    navCheckContainer.classList.replace("h-[10vh]", "h-0");
    landingSection.classList.replace("flex", "hidden");
    overlayedTransitionElement.children[0].classList.replace(
      "before:animate-squelch",
      "before:animate-squish-down-lg",
    );
    caption.classList.replace("animate-float-up", "animate-float-down");
  }

  function handleOpenCloseStaging(e: WheelEvent) {
    if (aboutSection.getAttribute("data-transition-complete") === "true") {
      // if scrolling up and transition ready
      if (
        e.deltaY < 0 &&
        navCheckContainer.getAttribute("data-transition-ready") === "true"
      ) {
        scrollToLandingSection();
        // if staging container closed
      } else if (e.deltaY < 0 && window.scrollY === 0) {
        openStagingContainer();
      } else if (
        // if staging container open, close
        e.deltaY > 0 &&
        window.scrollY === 0
      ) {
        closeStagingContainer();
      }
    }
  }

  window.addEventListener("wheel", handleOpenCloseStaging);

  createObserver(0, handleIntersect); // temporary, so i can work on this section without fucking up scroll

  // if user scrolls to top of section,
  // replace nav to about animation with nav to landing animation
  // and detach container
  // if user keeps scrolling up, disable scroll
  // programatically scroll to landing section,
  // while repositioning captioncontainer so it drifts down towards
  // the bottom of the screen
  // bring the moon down from the top of the screen and fade in other elements
  // reenable scroll
  // else if user scrolls back down, collide the captioncontainer with the text container again.
}

handleTransitionToAboutSection();
handleTransitionToLandingSection();

// export default handleTransitionToAboutSection;
