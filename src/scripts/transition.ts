import disableScroll from "./disableScroll";

// elements
const body: HTMLElement = document.querySelector("body");
const landingSection: HTMLElement = document.querySelector("#landing");
const aboutSection: HTMLElement = document.querySelector("#about");

const landingSectionContentGroup: NodeListOf<HTMLElement> =
  document.querySelectorAll(".landing-transition-group");
const aboutSectionContentGroup: HTMLElement = document.querySelector("#text-content");

const captionComponent: HTMLElement = document.querySelector("#caption-container");
const captionLandingContainer: HTMLElement = document.querySelector(".caption-landing-container");
const captionAboutContainer: HTMLElement = document.querySelector(".caption-about-container");

const sectionNavCarets: NodeListOf<HTMLElement> = document.querySelectorAll("#scroll-caret");
const landingSectionCaret: HTMLElement = sectionNavCarets[0];
const aboutSectionCaret: HTMLElement = sectionNavCarets[1];

const aboutSectionNavBar: HTMLElement = document.querySelector(".about-section-nav-bar");
const aboutSectionPreNavArea: HTMLElement = document.querySelector("#nav-check");

// ------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------------------------------
// ANCHOR[id=cssUtilities]
// ******************************************************************************************************
function replaceCSSClass(staleClass: string, freshClass: string) {
  return (element: HTMLElement) => {
    element.classList.replace(staleClass, freshClass);
  };
}
// ******************************************************************************************************
function addCSSClass(freshClass: string) {
  return (element: HTMLElement) => {
    element.classList.add(freshClass);
  };
}
// ******************************************************************************************************

function resetAllStyleProperties() {
  return (element: HTMLElement) => {
    element.attributeStyleMap.clear();
  };
}

// ******************************************************************************************************

// all animations that can apply to an element involved in the transition
// NOTE: not exhaustive to all animations used in project

// ANCHOR[id=animations]
// LINK #listeners

const animationLib = [
  "animate-slide-up",
  "animate-slide-down",
  "animate-scale-up",
  "animate-squish-down-lg",
  "animate-squish-down-sm",
  "before:animate-squish-down-sm",
  "before:animate-squish-down-lg",
  "animate-squelch",
  "before:animate-squelch",
  "animate-float-up",
  "animate-grow",
  "animate-fade-in",
  "animate-fade-out",
  "fade-out-slow",
  "scooch-up",
  "long-blink",
] as const;

type Animations = (typeof animationLib)[number];
function removeAllAnimationsFromElement(element: HTMLElement) {
  animationLib.forEach((animation) => {
    if (element.classList.contains(animation)) {
      element.classList.remove(animation);
    }
  });
}

// ANCHOR[id=animateElements]
function animateElement(newAnimation: Animations) {
  return (element: HTMLElement) => {
    // remove all animations from the element before adding new ones
    removeAllAnimationsFromElement(element);
    element.classList.add(newAnimation);
  };
}

const scaleUp = animateElement("animate-scale-up");
const slideUpAndFade = animateElement("animate-slide-up");
const slideDown = animateElement("animate-slide-down");
const squelch = animateElement("before:animate-squelch");
const squish = animateElement("before:animate-squish-down-lg");
const floatUp = animateElement("animate-float-up");

// ******************************************************************************************************

// ******************************************************************************************************

const translations = ["translate-y-[0vh]", "translate-y-[100vh]"] as const;

type Translations = (typeof translations)[number];

// ANCHOR[id=translations]
function translateElement(staleTranslation: Translations, freshTranslation: Translations) {
  return (element: HTMLElement) => {
    const translateElement = replaceCSSClass(staleTranslation, freshTranslation);
    translateElement(element);
  };
}

const translateUp = translateElement("translate-y-[100vh]", "translate-y-[0vh]");
const translateDown = translateElement("translate-y-[0vh]", "translate-y-[100vh]");

// ******************************************************************************************************

const heights = ["h-0", "h-[10vh]"] as const;
type Heights = (typeof heights)[number];

function changeElementHeight(staleHeight: Heights, freshHeight: Heights) {
  return (element: HTMLElement) => {
    const changeHeight = replaceCSSClass(staleHeight, freshHeight);
    changeHeight(element);
  };
}

const decreaseHeight = changeElementHeight("h-[10vh]", "h-0");
const increaseHeight = changeElementHeight("h-0", "h-[10vh]");

// ******************************************************************************************************

const cssDisplay = ["flex", "hidden"] as const;
type CSSDisplay = (typeof cssDisplay)[number];

function changeElementDisplayType(staleDisplay: CSSDisplay, freshDisplay: CSSDisplay) {
  return (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      const changeDisplay = replaceCSSClass(staleDisplay, freshDisplay);
      changeDisplay(element);
    });
  };
}

// ANCHOR[id=hideSection]
const hideSection = changeElementDisplayType("flex", "hidden");
// ANCHOR[id=showSection]
const showSection = changeElementDisplayType("hidden", "flex");

const hideElement = changeElementDisplayType("flex", "hidden");
const showElement = changeElementDisplayType("hidden", "flex");

// ******************************************************************************************************

const opacities = ["opacity-0", "opacity-1"] as const;
type Opacity = (typeof opacities)[number];

function changeElementOpacity(staleOpacity: Opacity, freshOpacity: Opacity) {
  return (element: HTMLElement) => {
    const changeOpacity = replaceCSSClass(staleOpacity, freshOpacity);
    changeOpacity(element);
  };
}

const changeElementOpacityToOne = changeElementOpacity("opacity-0", "opacity-1");
const changeElementOpacityToZero = changeElementOpacity("opacity-1", "opacity-0");
// ******************************************************************************************************

function changeElementParent(oldParent: HTMLElement, newParent: HTMLElement) {
  return (childElement: HTMLElement) => {
    if (![...oldParent.children].includes(childElement)) {
      console.error("child doesnt exist on parent");
    }
    oldParent.removeChild(childElement);
    newParent.appendChild(childElement);
  };
}

const changeParentToLandingContainer = changeElementParent(captionAboutContainer, captionLandingContainer);
const changeParentToAboutContainer = changeElementParent(captionLandingContainer, captionAboutContainer);
// ******************************************************************************************************

function changeElementPositionType(oldPositionType: "fixed" | "static", newPositionType: "fixed" | "static") {
  return (element: HTMLElement) => {
    const changePositionType = replaceCSSClass(oldPositionType, newPositionType);
    changePositionType(element);
  };
}

const changeElementPositionToStatic = changeElementPositionType("fixed", "static");
const changeElementPositionToFixed = changeElementPositionType("static", "fixed");
// ******************************************************************************************************
function setElTopStylePropertyToCurrentPosition(element: HTMLElement) {
  element.style.top = `${element.getBoundingClientRect().top}px`;
}
// ******************************************************************************************************

// Move captionContainer

function setupElementForMove(
  element: HTMLElement,
  setElTopStyleToCurrentPosition: (element: HTMLElement) => void,
  changeElementPositionToFixed: (element: HTMLElement) => void,
) {
  if (!element.style.top || !element.classList.contains("fixed")) {
    changeElementPositionToFixed(element);
    setElTopStyleToCurrentPosition(element);
  }
}

//LINK #moveELementToAboutCall
//LINK #moveElementToLandingCall
// ANCHOR[id=moveElement]
function moveElement(
  element: HTMLElement,
  speed: number,
  acceleration: number,
  limit: number,
  direction: "up" | "down",
  overlapObserverEntries: OverlapObserverEntry[],
) {
  //setup
  // if (!element.style.top || !element.classList.contains("fixed")) {
  //   element.style.top = `${element.getBoundingClientRect().top}px`;
  //   changeElementPositionToFixed(element);
  // }
  // accelerate
  if (speed <= limit) speed = speed ** acceleration;
  element.style.top = `calc(${element.style.top} + ${speed}px)`;
  const allEntriesProcessed = observeTargetsOverlap(overlapObserverEntries, direction);
  if (allEntriesProcessed) return;

  requestAnimationFrame(() =>
    moveElement(element, speed, acceleration, limit, direction, overlapObserverEntries),
  );
}

function moveElementV2(
  element: HTMLElement,
  direction: "up" | "down",
  overlapObserverEntries: OverlapObserverEntry[],
) {
  translateDown(element);
  observeTargetsOverlap(overlapObserverEntries, direction);

  // requestAnimationFrame(() =>
  //   moveElement(element, speed, acceleration, limit, direction, overlapObserverEntries),
  // );
}

// ******************************************************************************************************

type ModifyElementEntry = {
  callbackToModifyEls: (element: HTMLElement) => void;
  elsBeingModified: HTMLElement[];
};

type OverlapObserverEntry = {
  observedElOne: HTMLElement;
  observedElTwo: HTMLElement;
  forModificationOnObservedOverlap: ModifyElementEntry[];
  entryProcessed: boolean;
};

// ANCHOR[id=checkPosition]
// LINK #checkPositionCall
// LINK #checkPositionCallBackNav
function observeTargetsOverlap(
  overlapObserverEntries: OverlapObserverEntry[],
  direction: "up" | "down",
): boolean {
  overlapObserverEntries.forEach((observerEntry) => {
    const firstElTop = observerEntry.observedElOne.getBoundingClientRect().top;
    const firstElBottom = observerEntry.observedElOne.getBoundingClientRect().bottom;
    const secondElTop = observerEntry.observedElTwo.getBoundingClientRect().top;
    const secondElBottom = observerEntry.observedElTwo.getBoundingClientRect().bottom;
    const entryProcessed = observerEntry.entryProcessed;
    if (
      (!entryProcessed &&
        direction === "down" &&
        firstElBottom >= secondElTop &&
        firstElTop <= secondElBottom) ||
      (!entryProcessed && direction === "up" && firstElTop <= secondElTop)
    ) {
      observerEntry.forModificationOnObservedOverlap.forEach((entry) => {
        entry.elsBeingModified.forEach((el) => {
          entry.callbackToModifyEls(el);
        });
      });
      observerEntry.entryProcessed = true;
    }
  });
  const lastEntryProcessed = overlapObserverEntries[overlapObserverEntries.length - 1].entryProcessed;
  if (lastEntryProcessed) {
    changeElementPositionToStatic(captionComponent);
    captionComponent.classList.replace("translate-y-[100vh]", "translate-y-[0vh]");
    return;
  } else {
    requestAnimationFrame(() => {
      observeTargetsOverlap(overlapObserverEntries, direction);
    });
  }
}

// ******************************************************************************************************
// ANCHOR[id=getElementPosition]
function accountForTransformInCalcdRectBound(element: HTMLElement, rectBound: "top" | "bottom") {
  return element.getBoundingClientRect()[rectBound];
}
// ******************************************************************************************************

// ANCHOR[id=scroll]
function programaticallyScrollToNextSection() {
  window.scrollBy({
    // landing section height + nav check div height
    top: window.innerHeight,
    behavior: "smooth",
  });
}
// ******************************************************************************************************
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// data-attributes

function getTransitionDirection(): "next" | "prev" {
  const direction = body.getAttribute("data-transition-direction");
  if (direction === "next" || direction === "prev") {
    return direction;
  } else {
    throw new Error("Invalid transition direction");
  }
}

function setTransitionDirection(direction: "next" | "prev") {
  body.setAttribute("data-transition-direction", direction);
}

function checkIfInTransition() {
  const inTransition = body.getAttribute("data-in-transition");
  return inTransition === "true" ? true : false;
}

function setInTransition(inTransition: string | boolean) {
  body.setAttribute("data-in-transition", String(inTransition));
}

function checkIfPreNavOpen(): boolean {
  const preNavOpen = aboutSectionPreNavArea.getAttribute("data-pre-nav-open");
  return preNavOpen === "true" ? true : false;
}

function setPreNavOpen(open: boolean) {
  aboutSectionPreNavArea.setAttribute("data-pre-nav-open", String(open));
}

function checkIfPreNavOpening(): boolean {
  const preNavOpening = aboutSectionPreNavArea.getAttribute("data-pre-nav-opening");
  return preNavOpening === "true" ? true : false;
}

function setPreNavOpening(opening: boolean) {
  aboutSectionPreNavArea.setAttribute("data-pre-nav-opening", String(opening));
}

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// start with scroll disabled
disableScroll(true);
// Listeners
// ANCHOR[id=listeners]
// LINK #animations
// LINK #transitions

function moveElementFromLandingToAboutOnAnimEnd() {
  // LINK #moveElement
  // ANCHOR[id=moveElementToAboutCall]
  programaticallyScrollToNextSection();
  // LINK #checkPosition
  // ANCHOR[id=checkPositionCallForwardNav]
  moveElementV2(captionComponent, "down", [
    {
      observedElOne: captionComponent,
      observedElTwo: aboutSection,
      forModificationOnObservedOverlap: [
        {
          elsBeingModified: [aboutSection],
          // LINK #translationsflask125

          callbackToModifyEls: translateUp,
        },
      ],
      entryProcessed: false,
    },
    {
      observedElOne: captionComponent,
      observedElTwo: aboutSectionContentGroup,
      forModificationOnObservedOverlap: [
        {
          elsBeingModified: [captionComponent],
          // LINK #animations
          callbackToModifyEls: changeParentToAboutContainer,
        },
        {
          elsBeingModified: [captionComponent],
          // LINK #animations
          callbackToModifyEls: changeElementPositionToStatic,
        },
        {
          elsBeingModified: [captionComponent],
          // LINK #animations
          callbackToModifyEls: squish,
        },
      ],
      entryProcessed: false,
    },
  ]);
}

function landingToAboutInitOnScrollOrSwipe() {
  [...landingSectionContentGroup, landingSectionCaret].forEach((element) => {
    slideUpAndFade(element);
  });
  // scaleUp(captionComponent);
}

captionComponent.addEventListener("transitionend", () => {
  const transitionDirection = getTransitionDirection();
  if (transitionDirection === "next") {
    captionComponent.classList.replace("-translate-y-[80vh]", "translate-y-[100vh]");
  }
});

landingSection.addEventListener(
  "wheel",
  (e: WheelEvent) => {
    const transitionDirection = getTransitionDirection();
    const inTransition = checkIfInTransition();
    if (inTransition) {
      e.preventDefault();
    }
    if (transitionDirection === "next" && e.deltaY >= 0) {
      setInTransition(true);
      setupElementForMove(
        captionComponent,
        changeElementPositionToFixed,
        setElTopStylePropertyToCurrentPosition,
      );
      captionComponent.classList.replace("translate-y-[0vh]", "-translate-y-[80vh]");

      // landingToAboutInitOnScrollOrSwipe();
    }
  },
  { passive: false },
);

// ANCHOR[id=checkPositionListen]

captionComponent.addEventListener("transitionend", () => {
  const transitionDirection = getTransitionDirection();
  const inTransition = checkIfInTransition();
  if (transitionDirection === "next" && inTransition) {
    setTransitionDirection("prev");
    moveElementFromLandingToAboutOnAnimEnd();
  } else if (transitionDirection === "prev" && inTransition) {
    setInTransition(false);
    disableScroll(false);
    hideSection([landingSection]);
  } else if (transitionDirection === "prev" && !inTransition) {
    floatUp(captionComponent);
  }
});

function scrollToLandingSection() {
  showSection([landingSection]);
  aboutSection.scrollIntoView(); // VERY IMPORTANT - otherwise page to landing section as soon as it is painted
  landingSection.scrollIntoView({ block: "start", behavior: "smooth" });
  // LINK #moveElement
  moveElement(captionComponent, -9, 1.02, -15, "up", [
    {
      observedElOne: captionComponent,
      observedElTwo: captionLandingContainer,
      forModificationOnObservedOverlap: [
        { callbackToModifyEls: changeElementPositionToStatic, elsBeingModified: [captionComponent] },
        {
          callbackToModifyEls: changeParentToLandingContainer,
          elsBeingModified: [captionComponent],
        },
        {
          callbackToModifyEls: removeAllAnimationsFromElement,
          elsBeingModified: [captionComponent],
        },
        {
          callbackToModifyEls: slideDown,
          elsBeingModified: [...landingSectionContentGroup],
        },
      ],
      entryProcessed: false,
    },
  ]);
  setInTransition(false);
}

aboutSection.addEventListener("wheel", (e: WheelEvent) => {
  const preNavOpen = checkIfPreNavOpen();
  const preNavOpening = checkIfPreNavOpening();
  if (preNavOpening) {
    return;
  } else if (!preNavOpen && e.deltaY < 0 && window.scrollY <= 25) {
    disableScroll(true);
    setPreNavOpening(true);
    increaseHeight(aboutSectionPreNavArea);
    squelch(captionComponent);
  } else if (preNavOpen && e.deltaY > 0) {
    decreaseHeight(aboutSectionPreNavArea);
    squish(captionComponent);
    disableScroll(false);
    setPreNavOpen(false);
  } else if (preNavOpen && e.deltaY <= 25) {
    setTransitionDirection("next");
    setInTransition(true);
    disableScroll(true);
    setPreNavOpen(false);
    decreaseHeight(aboutSectionPreNavArea);
    setupElementForMove(
      captionComponent,
      changeElementPositionToFixed,
      setElTopStylePropertyToCurrentPosition,
    );
    scrollToLandingSection();
  }
});

aboutSection.addEventListener("transitionend", () => {
  changeElementOpacityToOne(aboutSectionNavBar);
});

aboutSectionPreNavArea.addEventListener("transitionend", () => {
  setPreNavOpening(false);
  setPreNavOpen(true);
});

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

// const observeLandingSection = observeSection(handleTransitionToAboutSection); // LINK #landingSection
// const observeAboutSection = observeSection(handleTransitionToLandingSection); // LINK #aboutSection

// const landingSectionObserver = new IntersectionObserver(observeLandingSection, options);

// const aboutSectionObserver = new IntersectionObserver(observeAboutSection, options);

// landingSectionObserver.observe(landingSection);
// aboutSectionObserver.observe(aboutSection);
