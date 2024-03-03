import disableScroll from "./disableScroll";

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
};

function observeSection(callback: Function) {
  return (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting === true) {
        callback();
      }
    });
  };
}

const observeLandingSection = observeSection(handleTransitionToAboutSection); // LINK #landingSection
const observeAboutSection = observeSection(handleTransitionToLandingSection); // LINK #aboutSection

const landingSection = document.querySelector("#landing");
const aboutSection = document.querySelector("#about");

const landingSectionObserver = new IntersectionObserver(
  observeLandingSection,
  options,
);

const aboutSectionObserver = new IntersectionObserver(
  observeAboutSection,
  options,
);

landingSectionObserver.observe(landingSection);
aboutSectionObserver.observe(aboutSection);

/**
 * ANCHOR[id=landingSection]
 * *************************************
 * * LANDING SECTION -> ABOUT SECTION *
 * *************************************
 * @description Handles all the transitions, animations and effects when a user
 * navigates from the landing section to the about section.
 *
 */

function handleTransitionToAboutSection() {
  /**
   * -------------------------
   * SECTION SELECTED ELEMENTS
   * -------------------------
   */

  /**
   * @description The landing <section> is where the user journey starts
   */
  const landingSection = document.querySelector("#landing");

  /**
   * @description Elements being faded out when the transition takes place
   */
  const fadeOnTransitionGroup: NodeListOf<HTMLDivElement> =
    document.querySelectorAll(".fade-out-on-transition-away");

  /**
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
   * @description The container that overlayedTransitionElement will transition to and "collide" with.
   */
  const aboutSectionTextContentContainer: HTMLElement =
    document.querySelector("#text-content");

  /**
   * @description The container that will be transitioned up to "collide" with the
   * overlayedTransitionElement.
   */
  const nextSectionTransitionGroupContainer: HTMLDivElement =
    document.querySelector("[data-about-translate-up]");

  /**
   * -------------------------------------
   * SECTION EVENT LISTENERS AND CALLBACKS
   * -------------------------------------
   * In sequence of effect
   */

  // 1. Disable user scroll when handleTransitionToNextSection is invoked
  disableScroll(true);

  const transitionReady = landingSection.getAttribute("data-transition-ready");
  if (transitionReady === "false") return;

  landingSection.setAttribute("data-transition-ready", "false");

  /**
   * 2. When user scrolls up on landing page start the programmatic transition to the next section
   *
   * @param {WheelEvent} e
   * @description
   * - Fades out elements not being animated
   * - Scales up caption container
   */

  function handleScrollUp(e: WheelEvent) {
    if (e.deltaY > 0) {
      fadeOutElements(fadeOnTransitionGroup);
      scaleOverlayedTransitionElement(overlayedTransitionElement);
      landingSection.removeEventListener("wheel", handleScrollUp);
    }
  }

  landingSection.addEventListener("wheel", handleScrollUp);

  function positionOverlayedElementAtCorrectOffset() {
    // LINK #computeScaledRectBounds
    const offset = computeScaledRectBounds(overlayedTransitionElement, 1.3);
    overlayedTransitionElement.style.top = `calc(${
      window.innerHeight * 0.77
    }px + ${offset.top}px)`;
    overlayedTransitionElement.style.left = `${offset.left}px`;
    overlayedTransitionElement.style.position = "fixed";
    overlayedTransitionElement.removeEventListener(
      "animationend",
      positionOverlayedElementAtCorrectOffset,
    );
  }

  /**
   * 3. Detach captionContainer from document flow by setting to position fixed at computed position
   *
   * @const detachOverlayedElement
   * @description
   *  curried function
   *  - computes the actual rect bounds for the element since transformed bounds are innacurate for element positioning
   *  - changes caption container position to fixed.
   */
  overlayedTransitionElement.addEventListener(
    "animationend",
    positionOverlayedElementAtCorrectOffset,
  );

  /**
   * 4a. Scroll to the next section
   * @description scrolls the height of the window
   */

  function programaticallyScrollToNextSection() {
    window.scrollBy({
      // landing section height + nav check div height
      top: window.innerHeight,
      behavior: "smooth",
    });

    overlayedTransitionElement.removeEventListener(
      "animationend",
      programaticallyScrollToNextSection,
    );
  }

  overlayedTransitionElement.addEventListener(
    "animationend",
    programaticallyScrollToNextSection,
  );

  /**
   * 4b. slowly translate transition element down to simulate falling
   * LINK #translateOverlayedElement
   */
  const translateOverlayedElementWhileScrolling = translateOverlayedElement(
    overlayedTransitionElement,
    2, //base speed (px)
    1.02, // delta
    20, // terminal velocity
  );

  window.addEventListener("scroll", translateOverlayedElementWhileScrolling, {
    once: true, // automatically removes itself
  });

  // 5. Wait until the caption container is at the target position in the viewport
  // Then translate the next section's transition group up towards the caption container

  /**
   * @param {HTMLDivElement} overlayedTransitionElement
   * @param {HTMLElement} nextSectionTransitionGroupContainer
   * @param {function} handleAtTarget
   * @param {number} targetPosit
   * @description Checks if captionContainer element is at the target position in the viewport
   * and handles the event by translating the next section up from viewport bottom
   * ANCHOR[id=checkIfElementAtTargetPosition]
   * NOTE: uses request animation frame instead of event listener
   */

  function checkIfElementAtTargetPosition(
    overlayedTransitionElement: HTMLDivElement,
    nextSectionTransitionGroupContainer: HTMLElement,
    // LINK #handleContainerAtTarget
    handleAtTarget: HandleContainerAtTarget,
    targetPosit: number,
  ) {
    const containerBottomY =
      overlayedTransitionElement.getBoundingClientRect().bottom;
    if (
      // need to check if caption container position is fixed, otherwise any
      // target posit below the target posit will trigger the callback which may cause unintended side effects.
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

  checkIfElementAtTargetPosition(
    overlayedTransitionElement,
    nextSectionTransitionGroupContainer,
    handleContainerAtTarget,
    window.innerHeight * 0.55,
  );

  /**
   * 6. Wait for the container to collide with the <header> element, then handle the collision by
   * swapping in the overlayedTransitionElementReplacement and animating it
   *
   * @param {HTMLDivElement} overlayedTransitionElement
   * @param {HTMLElement} nextSectionElement
   * @param {HTMLDivElement} overlayedTransitionElementReplacement
   * @param {function} handleCollision
   * @description
   *  - detects collision with next section when transitioning to about section.
   *  - handles the collision by hiding the transitioned element and
   *    "swapping in" (making visible) the duplicate element in the about section,
   *    and then animating the swapped in element
   */
  // ANCHOR[id=checkForElementBoundsCollisionWithNextSection]
  function checkForElementBoundsCollisionWithNextSection(
    overlayedTransitionElement: HTMLDivElement,
    nextSectionElement: HTMLElement,
    overlayedTransitionElementReplacement: HTMLDivElement,
    // LINK #handleCollision
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

  checkForElementBoundsCollisionWithNextSection(
    overlayedTransitionElement,
    aboutSectionTextContentContainer,
    overlayedTransitionElementReplacement,
    handleCollision,
  );

  /**
   * 7. The end of the scroll signals the end of the transition, and user scrolling is reenabled
   *
   * @description reenables scroll on the window
   */

  function enableScroll() {
    disableScroll(false);
    overlayedTransitionElementReplacement.removeEventListener(
      "animationend",
      enableScroll,
    );
  }

  overlayedTransitionElementReplacement.addEventListener(
    "animationend",
    enableScroll,
  );
}

/**
 * -------------------------------------------------------------
 * SECTION HELPER FUNCTIONS FOR 'HANDLETRANSITIONTOABOUTSECTION'
 * -------------------------------------------------------------
 */

/**
 * @param elementsGroup
 * @description Fades out elements on landing page
 */

function fadeOutElements(elementsGroup: NodeListOf<HTMLDivElement>) {
  elementsGroup.forEach((element) => {
    if (element.id === "scroll-caret") {
      element.classList.add("animate-swipe-up");
    } else {
      element.classList.add("transition", "opacity-0", "-translate-y-10");
    }
  });
}

/**
 * @param overlayedTransitionElement
 * @description Scales up the caption container element which remains in view during transition
 */

function scaleOverlayedTransitionElement(
  overlayedTransitionElement: HTMLDivElement,
): void {
  overlayedTransitionElement.classList.add("animate-scale-up");
}

// ----------------------------------------------------------------------------------

/**
 *
 * @param OverlayedTransitionElement
 * @param scale
 * @returns {Object<PositionKeys>}
 * @description computes the actual bounds of the scaled element in the cssom layout
 *
 */

type PositionKeys = "left" | "right" | "top" | "bottom";
// ANCHOR[id=computeScaledRectBounds]
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

/**
 * @param overlayedTransitionElement
 * @param baseSpeedInPx
 * @param delta
 * @param speedLimit
 * @returns {TranslateElementPosit}
 * @description moves the caption container down the viewport so that it appears to fall
 * LINK[id=translateOverlayedElement]
 */
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

type HandleContainerAtTarget = (nextSection: HTMLElement) => void;
/**
 * @param nextSection
 * @description Helper function used in checkIfElementAtTargetPosition.
 * Moves the next section content div up to the top of container
 * ANCHOR[id=handleContainerAtTarget]
 *
 * Link to function call
 * LINK #checkIfElementAtTargetPosition
 */
function handleContainerAtTarget(nextSection: HTMLElement) {
  nextSection.classList.replace("top-[100vh]", "top-[0vh]");
}

// ----------------------------------------------------------------------------------

type HandleCollision = (
  overlayedTransitionElement: HTMLDivElement,
  overlayedTransitionElementReplacement: HTMLDivElement,
) => void;
/**
 * @param overlayedTransitionElement
 * @param overlayedTransitionElementReplacement
 * @description helper function triggers squish animation on overlayedTransitionElementReplacement
 * ANCHOR[id=handleCollision]
 * Called in checkForElementBoundsCollisionWithNextSection
 * LINK #checkForElementBoundsCollisionWithNextSection
 */
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

/**
 * ANCHOR[id=aboutSection]
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
   * - one in about section
   */
  const captionContainerInstances: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#caption-container");

  const captionMsgInstances: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#caption");
  const caption = captionMsgInstances[1];

  const overlayedTransitionElement: HTMLDivElement =
    captionContainerInstances[1];
  const overlayedTransitionElementReplacement = captionContainerInstances[0];

  const overlayedTransitionElementBg = overlayedTransitionElement.children[0];
  // scroll caret section
  // listen for scroll on about section

  aboutSection.addEventListener("transitionend", () => {
    landingSection.classList.replace("flex", "hidden");
    aboutSection.setAttribute("data-transition-complete", "true");
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

  // aboutSection.classList.replace("absolute", "fixed");
  // disableScroll(true);
  /**
   * ANCHOR[id=scrollToLanding]
   */
  function scrollToLandingSection() {
    // disableScroll(true);
    landingSection.classList.replace("hidden", "flex");
    aboutSection.scrollIntoView(); // VERY IMPORTANT - otherwise page jumps horribly as landing section is painted
    landingSection.scrollIntoView({ block: "start", behavior: "smooth" });
    // disableScroll(false);
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
    overlayedTransitionElementBg.classList.replace(
      "before:animate-squelch",
      "before:animate-squish-down-lg",
    );
    caption.classList.replace("animate-float-up", "animate-float-down");
  }

  function handleScrollWhileStagingOpen(e: WheelEvent) {
    if (aboutSection.getAttribute("data-transition-complete") === "true") {
      // if scrolling up and transition ready
      if (
        e.deltaY < 0 &&
        navCheckContainer.getAttribute("data-transition-ready") === "true"
      ) {
        overlayedTransitionElement.classList.add("opacity-0");
        overlayedTransitionElementReplacement.classList.remove(
          "animate-scale-up",
        );
        overlayedTransitionElementReplacement.style.display = "inline";
        overlayedTransitionElementReplacement.style.position = "fixed";
        const elementTop =
          overlayedTransitionElement.getBoundingClientRect().top;
        // -15vh is the translate distance specified in animate-float-up, thus the calc
        // LINK tailwind.config.cjs#animate-float-up
        overlayedTransitionElementReplacement.style.top = `calc(${elementTop}px - 15vh)`;
        // LINK #scrollToLanding
        scrollToLandingSection();

        window.removeEventListener("wheel", handleScrollWhileStagingOpen);
        // if staging container closed
      } else if (e.deltaY < 0 && window.scrollY === 0) {
        disableScroll(true);
        openStagingContainer();
      } else if (
        // if staging container open, close
        e.deltaY > 0 &&
        window.scrollY === 0
      ) {
        disableScroll(false);
        closeStagingContainer();
      }
    }
  }

  window.addEventListener("wheel", handleScrollWhileStagingOpen);

  // createObserver(0, handleIntersect); // temporary, so i can work on this section without fucking up scroll

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

// export default handleTransitionToAboutSection;
