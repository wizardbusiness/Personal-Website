import disableScroll from "./disableScroll";
/**
 * Handles all the transitions, animations and effects when a user
 * navigates from the landing section to the about section.
 *
 * The code is wrapped in a single function to assist with cpu caching.
 *
 */
const handleTransitionToNextSection = () => {
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
    document.querySelectorAll(".fade-out-on-transition");

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
    document.querySelector("#translate-up-on-transition");

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
  window.addEventListener(
    "scroll",
    () =>
      translateOverlayedTransitionElementWhileScrolling(
        overlayedTransitionElement,
      ),
    { once: true },
  );

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
};

handleTransitionToNextSection();

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
      window.innerHeight * 0.35
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

function translateOverlayedTransitionElementWhileScrolling(
  overlayedTransitionElement: HTMLDivElement,
): void {
  overlayedTransitionElement.style.top = `calc(${overlayedTransitionElement.style.top} + 10px)`;
  // a little bit funky, but because the element is removed when the scroll is complete,
  // this is an easy way to return out of the function execution
  if (overlayedTransitionElement.style.display === "none") return;
  requestAnimationFrame(() =>
    translateOverlayedTransitionElementWhileScrolling(
      overlayedTransitionElement,
    ),
  );
}

// ----------------------------------------------------------------------------------

function programaticallyScrollToNextSection() {
  const body = document.querySelector("body");
  body.classList.add("scrollbar-hide");
  // add px because smooth scrollBy decelerates scrollspeed at the end of the scroll
  // which messes with the impact animation effect
  window.scrollBy({ top: window.innerHeight + 50, behavior: "smooth" });
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
    // target posit below the starting posit will trigger the callback
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

type HandleContainerAtTarget = (nextSectionTextContent: HTMLElement) => void;

function handleContainerAtTarget(nextSectionTextContent: HTMLElement) {
  nextSectionTextContent.classList.replace("top-[100vh]", "top-[10vh]");
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

export default handleTransitionToNextSection;
