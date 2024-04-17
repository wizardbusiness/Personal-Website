import disableScroll from "./disableScroll";

// elements
const body: HTMLElement = document.querySelector("body");
const main: HTMLElement = document.querySelector("main");
const landingSection: HTMLElement = document.querySelector("#landing");
const infoSection: HTMLElement = document.querySelector("#info");
const myTitle: HTMLElement = document.querySelector("#my-title");
const landingSectionContentGroup: NodeListOf<HTMLElement> =
  document.querySelectorAll(".landing-transition-group");
const infoSectionContentGroup: HTMLElement = document.querySelector("#text-content");

const captionComponent: HTMLElement = document.querySelector("#caption-container");
const captionComponentBg: HTMLElement = document.querySelector("#caption-container-bg");
const captionComponentFg: HTMLElement = document.querySelector("#caption-container-fg");
const captionLandingContainer: HTMLElement = document.querySelector(".caption-landing-container");
const captionInfoContainer: HTMLElement = document.querySelector(".caption-info-container");

const sectionNavCarets: NodeListOf<HTMLElement> = document.querySelectorAll("#scroll-caret");
const landingSectionCaret: HTMLElement = sectionNavCarets[0];
const infoSectionCaret: HTMLElement = sectionNavCarets[1];

const infoSectionNavBar: HTMLElement = document.querySelector(".info-section-nav-bar");
const infoSectionPreNavArea: HTMLElement = document.querySelector("#nav-check");

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
  "animate-float-up-more",
  "animate-float-in-place",
  "animate-bring-down",
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

function waitForAnimationToFinish(element, eventName) {
  return new Promise((resolve, reject) => {
    function eventHandler(event: Event) {
      event.stopPropagation();
      const inTransition = checkIfInTransition();
      if (inTransition) reject(event);
      element.removeEventListener(eventName, eventHandler);
      resolve(event);
    }
    element.addEventListener(eventName, eventHandler);
  });
}

async function playAnimationsInSequence(animations) {
  while (animations.length > 0) {
    const curr = animations.shift();
    const currAnimation = curr[0];
    const currElement = curr[1];
    try {
      currAnimation(currElement);
      await waitForAnimationToFinish(currElement, "animationend");
    } catch (error) {
      console.log("break");
      break;
    }
  }
}

// ANCHOR[id=animateElements]
function animateElement(newAnimation: Animations) {
  return (element: HTMLElement) => {
    // remove all animations from the element before adding new ones
    removeAllAnimationsFromElement(element);
    element.classList.add(newAnimation);
  };
}

const slideUpAndFade = animateElement("animate-slide-up");
const squelch = animateElement("animate-squelch");
const squish = animateElement("animate-squish-down-lg");
const floatUp = animateElement("animate-float-up");
const floatUpMore = animateElement("animate-float-up-more");
const floatInPlace = animateElement("animate-float-in-place");
const bringDown = animateElement("animate-bring-down");
const slideDown = animateElement("animate-slide-down");

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

function clearPropertiesAndReplace(classRootStrs: string[]) {
  return (element: HTMLElement, freshClasses?: string[]) => {
    classRootStrs.forEach((classRootStr) => {
      element.classList.forEach((cssClass) => {
        cssClass.includes(classRootStr) && element.classList.remove(cssClass);
      });
    });
    if (!freshClasses) return;
    freshClasses.forEach((freshClass) => element.classList.add(freshClass));
  };
}

const setTransitionDuration = clearPropertiesAndReplace(["duration"]);
const clearTransitionProperties = clearPropertiesAndReplace(["duration", "transition", "translate"]);
const setEaseProperty = clearPropertiesAndReplace(["ease"]);

const clearAnimationProperties = clearPropertiesAndReplace(["animate"]);
const setTranslateDistance = clearPropertiesAndReplace(["translate"]);

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

const changeParentToLandingContainer = changeElementParent(captionInfoContainer, captionLandingContainer);
const changeParentToinfoContainer = changeElementParent(captionLandingContainer, captionInfoContainer);
// ******************************************************************************************************

function changeElementPositionType(
  oldPositionType: "fixed" | "relative",
  newPositionType: "fixed" | "relative",
) {
  return (element: HTMLElement) => {
    const changePositionType = replaceCSSClass(oldPositionType, newPositionType);
    changePositionType(element);
  };
}

const changeElementPositionToRelative = changeElementPositionType("fixed", "relative");
const changeElementPositionToFixed = changeElementPositionType("relative", "fixed");

// ******************************************************************************************************

// Move captionContainer

function setupElementForMove(
  element: HTMLElement,
  changeElementPositionToFixed: (element: HTMLElement) => void,
) {
  if (!element.classList.contains("fixed")) {
    changeElementPositionToFixed(element);
  }
}

//LINK #moveELementToinfoCall
//LINK #moveElementToLandingCall
// ANCHOR[id=moveElement]

function moveElement(
  element: HTMLElement,
  freshCSSClasses: string[],
  translate: (element: HTMLElement, freshClasses: string[]) => void,
  direction: "up" | "down",
  finishTransition: () => void,
  overlapObserverEntries: OverlapObserverEntry[],
) {
  translate(element, freshCSSClasses);
  observeTargetsOverlap(overlapObserverEntries, finishTransition, direction);
}

// ******************************************************************************************************

type ModifyElementEntry = {
  callbackArgs?: string[];
  callbackToModifyEls: (element: HTMLElement, args: string[]) => void;
  elsBeingModified: HTMLElement[];
};

type TweakOverlapValueBy = {
  elOne?: { top?: number; bottom?: number };
  elTwo?: { top?: number; bottom?: number };
};

type OverlapObserverEntry = {
  observedElOne: HTMLElement;
  observedElTwo: HTMLElement;
  tweakOverlapValueBy?: TweakOverlapValueBy;
  forModificationOnObservedOverlap: ModifyElementEntry[];
  entryProcessed: boolean;
};

// ANCHOR[id=checkPosition]
// LINK #checkPositionCall
// LINK #checkPositionCallBackNav
function observeTargetsOverlap(
  overlapObserverEntries: OverlapObserverEntry[],
  finishTransition: () => void,
  direction: "up" | "down",
): boolean {
  overlapObserverEntries.forEach((observerEntry) => {
    const firstElTop =
      observerEntry.observedElOne.getBoundingClientRect().top +
      (observerEntry.tweakOverlapValueBy?.elOne?.top || 0);
    const firstElBottom =
      observerEntry.observedElOne.getBoundingClientRect().bottom +
      (observerEntry.tweakOverlapValueBy?.elOne?.bottom || 0);
    const secondElTop =
      observerEntry.observedElTwo.getBoundingClientRect().top +
      (observerEntry.tweakOverlapValueBy?.elTwo?.top || 0);
    const secondElBottom =
      observerEntry.observedElTwo.getBoundingClientRect().bottom +
      (observerEntry.tweakOverlapValueBy?.elTwo?.bottom || 0);
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
          entry.callbackToModifyEls(el, entry.callbackArgs);
        });
      });
      observerEntry.entryProcessed = true;
    }
  });
  const lastEntryProcessed = overlapObserverEntries[overlapObserverEntries.length - 1].entryProcessed;
  if (lastEntryProcessed) {
    clearTransitionProperties(captionComponent, []);
    finishTransition();
    return;
  } else {
    requestAnimationFrame(() => {
      observeTargetsOverlap(overlapObserverEntries, finishTransition, direction);
    });
  }
}

// ******************************************************************************************************

// ANCHOR[id=programaticallyScroll]
// LINK #programiticallyScrollCall
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
// DATA ATTRIBUTES STATE
function getCurrSection(): "landing" | "info" {
  const currSection = body.getAttribute("data-section");
  if (currSection === "landing" || currSection === "info") {
    return currSection;
  } else {
    throw new Error("Invalid transition direction");
  }
}

function setCurrSection(section: "landing" | "info") {
  body.setAttribute("data-section", section);
}

function checkIfInTransition() {
  const inTransition = body.getAttribute("data-in-transition");
  return inTransition === "true" ? true : false;
}

function setInTransition(inTransition: string | boolean) {
  body.setAttribute("data-in-transition", String(inTransition));
}

function checkIfPreNavOpen(): boolean {
  const preNavOpen = infoSectionPreNavArea.getAttribute("data-pre-nav-open");
  return preNavOpen === "true" ? true : false;
}

function setPreNavOpen(open: boolean) {
  infoSectionPreNavArea.setAttribute("data-pre-nav-open", String(open));
}

function checkIfPreNavOpening(): boolean {
  const preNavOpening = infoSectionPreNavArea.getAttribute("data-pre-nav-opening");
  return preNavOpening === "true" ? true : false;
}

function setPreNavOpening(opening: boolean) {
  infoSectionPreNavArea.setAttribute("data-pre-nav-opening", String(opening));
}

function checkIfPreNavClosing(): boolean {
  const preNavClosing = infoSectionPreNavArea.getAttribute("data-pre-nav-closing");
  return preNavClosing === "true" ? true : false;
}

function setPreNavClosing(Closing: boolean) {
  infoSectionPreNavArea.setAttribute("data-pre-nav-closing", String(Closing));
}
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// WHEEL AND TOUCH MOVE EVENT LISTENER CALLBACKS
function goToInfoSection() {
  setEaseProperty(captionComponent, ["ease-in"]);
  setTransitionDuration(captionComponent, ["duration-[1500ms]"]);
  setTranslateDistance(captionComponent, ["translate-y-[100vh]"]);
  const finishTransitionToInfoSection = () => {
    setTranslateDistance(captionComponentFg, ["-translate-y-[5vh]"]);
    setTranslateDistance(captionComponentBg, ["translate-y-[0vh]"]);
  };
  // LINK #programaticallyScroll
  // ANCHOR[id=programiticallyScrollCall]
  programaticallyScrollToNextSection();
  // LINK #checkPosition
  // ANCHOR[id=checkPositionCallForwardNav]
  // LINK #moveElement
  // ANCHOR[id=moveElementToinfoCall]
  moveElement(
    captionComponent,
    ["translate-y-[100vh]"],
    translateDown,
    "down",
    finishTransitionToInfoSection,
    [
      {
        observedElOne: captionComponent,
        observedElTwo: infoSection,
        tweakOverlapValueBy: { elOne: { bottom: 100 } },
        forModificationOnObservedOverlap: [
          {
            elsBeingModified: [infoSection],
            callbackArgs: [],
            // LINK #translations
            callbackToModifyEls: translateUp,
          },
        ],
        entryProcessed: false,
      },
      {
        observedElOne: captionComponent,
        observedElTwo: infoSectionContentGroup,
        tweakOverlapValueBy: { elOne: { bottom: 0 } },
        forModificationOnObservedOverlap: [
          {
            elsBeingModified: [captionComponent],
            callbackArgs: [],
            // LINK #animations
            callbackToModifyEls: changeElementPositionToRelative,
          },
          {
            elsBeingModified: [captionComponent],
            callbackArgs: [],
            // LINK #animations
            callbackToModifyEls: changeParentToinfoContainer,
          },
        ],
        entryProcessed: false,
      },
      {
        observedElOne: captionComponent,
        observedElTwo: infoSectionContentGroup,
        tweakOverlapValueBy: { elOne: { bottom: 0 } },
        forModificationOnObservedOverlap: [
          {
            callbackArgs: [],
            elsBeingModified: [captionComponentBg],
            // LINK #animations
            callbackToModifyEls: squish,
          },
        ],
        entryProcessed: false,
      },
    ],
  );
}

function goToLandingSection() {
  setInTransition(true);
  // clean up info section
  setPreNavOpen(false);
  decreaseHeight(infoSectionPreNavArea);
  changeElementOpacityToZero(infoSectionNavBar);
  changeElementOpacityToZero(infoSectionCaret);
  // set up landing section
  showSection([landingSection]);
  // set up caption component for move
  // clear animation on caption component (if present, will interfere with translate transform)
  clearAnimationProperties(captionComponent);
  // clear and set translate duration and distance
  setTransitionDuration(captionComponent, ["duration-[1000ms]"]);
  // scroll to landing section
  infoSection.scrollIntoView(); // VERY IMPORTANT - otherwise page jumps to landing section as soon as it is painted
  landingSection.scrollIntoView({ block: "start", behavior: "smooth" });

  function finishTransitionToLandingSection() {
    [captionComponent, captionComponentBg, captionComponentFg].forEach((element) =>
      clearAnimationProperties(element),
    );
    changeElementPositionToRelative(captionComponent);
    changeParentToLandingContainer(captionComponent);
    setTranslateDistance(captionComponentFg, ["translate-y-[0vh]"]);
    setTranslateDistance(captionComponentBg, ["translate-y-[0vh]"]);
    setTranslateDistance(captionComponent, ["translate-y-[0vh]"]);
    // reset info section translate distance
    setTranslateDistance(infoSection, ["translate-y-[100vh]"]);
  }
  // LINK #moveElement
  moveElement(
    captionComponent,
    ["-translate-y-[100vh]"],
    setTranslateDistance,
    "up",
    finishTransitionToLandingSection,
    [
      {
        observedElOne: captionComponentBg,
        observedElTwo: captionLandingContainer,
        forModificationOnObservedOverlap: [
          {
            callbackToModifyEls: removeAllAnimationsFromElement,
            elsBeingModified: [captionComponent, captionComponentBg, captionComponentFg],
          },
          {
            callbackToModifyEls: slideDown,
            elsBeingModified: [...landingSectionContentGroup],
          },
        ],
        entryProcessed: false,
      },
    ],
  );
}

// ******************************************************************************************************
// DO STUFF HERE

// start with scroll disabled
disableScroll(true);

// EVENT LISTENERS

main.addEventListener("wheel", (e) => {
  const inTransition = checkIfInTransition();
  if (inTransition) {
    e.preventDefault();
    disableScroll(true);
  }
});

function handleUserScrollOnLandingSection(e) {
  const inTransition = checkIfInTransition();
  if (inTransition) {
    e.preventDefault();
    disableScroll(true);
    // return;
  } else if (!inTransition && e.deltaY >= 0) {
    console.log(e.deltaY);
    setInTransition(true);
    setupElementForMove(captionComponent, changeElementPositionToFixed);
    setTranslateDistance(captionComponent, ["-translate-y-[80vh]"]);
    setTransitionDuration(captionComponent, ["duration-[800ms]"]);
    setEaseProperty(captionComponent, ["ease-out"]);
    [...landingSectionContentGroup, landingSectionCaret].forEach((element) => slideUpAndFade(element));
  }
}

landingSection.addEventListener("wheel", handleUserScrollOnLandingSection, { passive: false });

function handleUserScrollOnInfoSection(e: WheelEvent) {
  const preNavOpen = checkIfPreNavOpen();
  const preNavOpening = checkIfPreNavOpening();
  const preNavClosing = checkIfPreNavClosing();
  const inTransition = checkIfInTransition();
  // clear float animation from captionComponent, but not animations on child elements
  if (preNavClosing) {
    clearAnimationProperties(captionComponent);
  }
  if (preNavOpening || preNavClosing || inTransition) {
    e.preventDefault();
  } else if (!preNavOpen && e.deltaY < 0 && window.scrollY <= 25) {
    e.preventDefault();
    setPreNavOpening(true);
    increaseHeight(infoSectionPreNavArea);
    playAnimationsInSequence([
      [squelch, captionComponentBg],
      [floatUp, captionComponentBg],
      [floatUpMore, captionComponent],
      [floatInPlace, captionComponent],

      // [floatInPlace, captionComponent],
    ]);
  } else if ((preNavOpen && e.deltaY > 0) || (preNavOpening && e.deltaY > 0)) {
    e.preventDefault();
    setPreNavOpening(false);
    setPreNavClosing(true);
    decreaseHeight(infoSectionPreNavArea);
    playAnimationsInSequence([
      [bringDown, captionComponentBg],
      [squish, captionComponentBg],
    ]);
    squish(captionComponentBg);
  } else if (preNavOpen && e.deltaY <= 25) {
    goToLandingSection();
  }
}

infoSection.addEventListener("wheel", handleUserScrollOnInfoSection, { passive: false });

myTitle.addEventListener("animationend", () => {
  if (myTitle.classList.contains("animate-slide-down")) {
    setInTransition(false);
  }
});

captionComponent.addEventListener("transitionend", () => {
  const currSection = getCurrSection();
  const inTransition = checkIfInTransition();
  if (currSection === "landing" && inTransition) {
    goToInfoSection();
  } else if (currSection === "landing") {
    setTranslateDistance(captionComponent, ["translate-y-[100vh]"]);
  }
});

infoSectionPreNavArea.addEventListener("transitionend", () => {
  const preNavOpening = checkIfPreNavOpening();
  const preNavClosing = checkIfPreNavClosing();
  if (preNavOpening) {
    setPreNavOpening(false);
    setPreNavOpen(true);
  } else if (preNavClosing) {
    setPreNavClosing(false);
    setPreNavOpen(false);
    disableScroll(false);
  }
});

infoSectionNavBar.addEventListener("transitionend", (e: TransitionEvent) => {
  e.stopPropagation();
});

infoSection.addEventListener("transitionend", () => {
  const inTransition = checkIfInTransition();
  const currSection = getCurrSection();
  if (inTransition && currSection === "info") {
    changeElementOpacityToOne(infoSectionNavBar);
    changeElementOpacityToOne(infoSectionCaret);
    setInTransition(false);
    disableScroll(false);
    hideSection([landingSection]);
    window.scrollTo(0, 0);
  }
});

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.87,
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

const observeLandingSection = observeSection(() => {
  setCurrSection("landing");
}); // LINK #landingSection
const observeInfoSection = observeSection(() => {
  const inTransition = checkIfInTransition();
  if (!inTransition) {
    disableScroll(false);
  }
  setCurrSection("info");
}); // LINK #infoSection

const landingSectionObserver = new IntersectionObserver(observeLandingSection, options);
const infoSectionObserver = new IntersectionObserver(observeInfoSection, options);

landingSectionObserver.observe(landingSection);
infoSectionObserver.observe(infoSection);
