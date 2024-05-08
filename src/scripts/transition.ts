import { slide } from "astro/transitions";
import CaptionContainer from "../components/CaptionContainer.astro";
import disableScroll from "./disableScroll";
import { renderSkyline } from "../store";

// elements
const root: HTMLElement = document.querySelector(":root");
const body: HTMLElement = document.querySelector("body");
const main: HTMLElement = document.querySelector("main");
const landingSection: HTMLElement = document.querySelector("#landing");
const infoSection: HTMLElement = document.querySelector("#info");
const myTitle: HTMLElement = document.querySelector("#my-title");
const landingSectionContentGroup: NodeListOf<HTMLElement> =
  document.querySelectorAll(".landing-transition-group");
const infoSectionContentGroup: HTMLElement = document.querySelector("#info-section-content-group");

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
  "animate-scooch-up",
  "animate-long-blink",
  "animate-pulse",
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
      const preNavClosing = checkIfPreNavClosing();
      if (inTransition || preNavClosing) reject(event);
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
const schoochUp = animateElement("animate-scooch-up");
const pulse = animateElement("animate-pulse");

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

function clearPropertyFromEachElement(
  elements: NodeListOf<HTMLElement>,
  cssClass: string,
  action: "remove" | "add",
) {
  elements.forEach((element) => {
    if (action === "add") {
      element.classList.add(cssClass);
    } else if (action === "remove") {
      element.classList.remove(cssClass);
    }
  });
}

function clearPropertiesAndSetNew(classRootStrs: string[]) {
  return (element: HTMLElement, freshClass?: string) => {
    classRootStrs.forEach((classRootStr) => {
      element.classList.forEach((cssClass) => {
        cssClass.includes(classRootStr) && element.classList.remove(cssClass);
      });
    });
    if (!freshClass) return;
    element.classList.add(freshClass);
  };
}

const setTransitionDuration = clearPropertiesAndSetNew(["duration"]);
const clearTransitionProperties = clearPropertiesAndSetNew(["duration", "transition", "translate"]);
const setTransitionTiming = clearPropertiesAndSetNew(["ease"]);
const setTransitionProperty = clearPropertiesAndSetNew(["transition"]);

const clearAnimationProperties = clearPropertiesAndSetNew(["animate"]);
const setTranslateDistance = clearPropertiesAndSetNew(["translate"]);
const setOpacity = clearPropertiesAndSetNew(["opacity"]);
const setScale = clearPropertiesAndSetNew(["scale"]);
const setPosition = clearPropertiesAndSetNew(["relative", "fixed", "absolute"]);
const setBottom = clearPropertiesAndSetNew(["bottom"]);

const clearPlacementProperties = clearPropertiesAndSetNew(["left", "right", "top", "bottom"]);

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

const changeParentToLandingContainerFromBody = changeElementParent(body, captionLandingContainer);
const changeParentToinfoContainer = changeElementParent(captionLandingContainer, captionInfoContainer);
const changeParentToBodyFromInfoContainer = changeElementParent(captionInfoContainer, body);
// ******************************************************************************************************

function changeElementPositionType(
  oldPositionType: "absolute" | "relative",
  newPositionType: "fixed" | "relative",
) {
  return (element: HTMLElement) => {
    const changePositionType = replaceCSSClass(oldPositionType, newPositionType);
    changePositionType(element);
  };
}

const changeElementPositionToRelative = changeElementPositionType("absolute", "relative");
const changeElementPositionToFixed = changeElementPositionType("relative", "fixed");

// ******************************************************************************************************
// getBounding client rect with whole values
function getBoundingClientRect(element: HTMLElement) {
  const { top, bottom, left, right } = element.getBoundingClientRect();
  return {
    top: Math.floor(top),
    bottom: Math.floor(bottom),
    left: Math.floor(left),
    right: Math.floor(right),
  };
}

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
  direction: "up" | "down",
  finishTransition: () => void,
  overlapObserverEntries: OverlapObserverEntry[],
) {
  observeTargetsOverlap(overlapObserverEntries, finishTransition, direction);
}

// ******************************************************************************************************

type CallBackArgs = HTMLElement[] | [HTMLElement, string?] | [...HTMLElement[], string[]] | string[];
type ModifyElementEntry = {
  callbackArgs?: CallBackArgs;
  callback: (...args: CallBackArgs) => void;
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
      (!entryProcessed && direction === "up" && firstElTop >= secondElTop && firstElTop <= secondElBottom)
    ) {
      observerEntry.forModificationOnObservedOverlap.forEach((entry) => {
        entry.callback(...entry.callbackArgs);
      });
      observerEntry.entryProcessed = true;
    }
  });
  const lastEntryProcessed = overlapObserverEntries[overlapObserverEntries.length - 1].entryProcessed;
  if (lastEntryProcessed) {
    // clearTransitionProperties(captionComponent);
    finishTransition();
    return;
  } else {
    requestAnimationFrame(() => {
      observeTargetsOverlap(overlapObserverEntries, finishTransition, direction);
    });
  }
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

const transitionStep = ["", "a", "b", "c", "d", "e", "f", "g"] as const;
export type TransitionStep = (typeof transitionStep)[number];

function setCurrTransitionStep(step: TransitionStep) {
  captionComponent.setAttribute("data-transition-step", String(step));
}

function getCurrTransitionStep() {
  return captionComponent.getAttribute("data-transition-step");
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

function handleUserOnLandingSection(e: Event, deltaY: number) {
  const inTransition = checkIfInTransition();
  if (inTransition) {
    e.preventDefault();
    disableScroll(true);
  } else if (!inTransition && deltaY >= 0) {
    setCurrTransitionStep("a");
    setInTransition(true);
    setupElementForMove(captionComponent, changeElementPositionToFixed);
    setTranslateDistance(captionComponent, "-translate-y-[80vh]");
    setTransitionDuration(captionComponent, "duration-[800ms]");
    setTransitionTiming(captionComponent, "ease-out");
    // captionComponentBg.classList.replace("bg-foggy-glass", "bg-[#656C7D]");
    [...landingSectionContentGroup, landingSectionCaret].forEach((element) => slideUpAndFade(element));
  }
}

function goToInfoSection() {
  setCurrTransitionStep("b");
  setTransitionTiming(captionComponent, "ease-in-out-polar");
  setTransitionDuration(captionComponent, "duration-[3500ms]");
  setTranslateDistance(captionComponent, "translate-y-[0vh]");

  const finishTransitionToInfoSection = () => {
    setTranslateDistance(captionComponent, "translate-y-[0vh]");
    setTranslateDistance(captionComponentFg, "-translate-y-[4vh]");
    setTranslateDistance(captionComponentBg, "translate-y-[0vh]");
  };

  // LINK #checkPosition
  // ANCHOR[id=checkPositionCallForwardNav]
  // LINK #moveElement
  // ANCHOR[id=moveElementToinfoCall]
  moveElement(captionComponent, "down", finishTransitionToInfoSection, [
    {
      observedElOne: captionComponent,
      observedElTwo: myTitle,
      tweakOverlapValueBy: { elOne: { bottom: 0 } },
      forModificationOnObservedOverlap: [
        {
          callbackArgs: ["c"],
          // LINK #translations
          callback: function (...args: [TransitionStep]) {
            const timeoutID = setTimeout(() => {
              setCurrTransitionStep(...args);
            }, 1700);
          },
        },
        {
          callbackArgs: [],
          // LINK #translations
          callback: () => infoSection.scrollIntoView({ behavior: "smooth" }),
        },
      ],
      entryProcessed: false,
    },
    {
      observedElOne: captionComponent,
      observedElTwo: captionLandingContainer,
      tweakOverlapValueBy: { elOne: { bottom: 0 } },
      forModificationOnObservedOverlap: [
        {
          callbackArgs: [infoSectionContentGroup],
          // LINK #translations
          callback: function (...contentGroup: [HTMLElement]) {
            const timeoutId = setTimeout(() => {
              translateUp(...contentGroup);
              clearTimeout(timeoutId);
            }, 1800);
          },
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
          callbackArgs: ["d"],
          // LINK #animations
          callback: setCurrTransitionStep,
        },
        {
          callbackArgs: [captionComponent, "absolute"],
          // LINK #animations
          callback: setPosition,
        },
        {
          callbackArgs: [captionComponent, "-bottom-1"],
          // LINK #animations
          callback: setBottom,
        },
        {
          callbackArgs: [captionComponent],
          // LINK #animations
          callback: changeParentToinfoContainer,
        },
        // {
        //   callbackArgs: [captionComponent, "translate-y-[0vh]"],
        //   // LINK #animations
        //   callback: setTranslateDistance,
        // },
        {
          callbackArgs: [captionComponentBg],
          // LINK #animations
          callback: squish,
        },
        {
          callbackArgs: [],
          // LINK #animations
          callback: () => renderSkyline.set(true),
        },
      ],
      entryProcessed: false,
    },
  ]);
}

function handleUserOnInfoSection(e: WheelEvent, deltaY: number) {
  const preNavOpen = checkIfPreNavOpen();
  const preNavOpening = checkIfPreNavOpening();
  const preNavClosing = checkIfPreNavClosing();
  const inTransition = checkIfInTransition();

  // clear float animation from captionComponent, but not animations on child elements
  if (preNavClosing) {
    clearAnimationProperties(captionComponent);
  }
  if (!preNavOpen && deltaY < 0) {
    setOpacity(infoSectionCaret, "opacity-75");
  } else if (!preNavOpen && deltaY > 0) {
    setOpacity(infoSectionCaret, "opacity-0");
    setScale(infoSectionCaret, "scale-75");
  }

  if (preNavOpening || preNavClosing || inTransition) {
    e.preventDefault();
  } else if (!preNavOpen && deltaY < 0 && window.scrollY <= 25) {
    e.preventDefault();
    setPreNavOpening(true);
    renderSkyline.set(false);
    increaseHeight(infoSectionPreNavArea);
    setOpacity(infoSectionNavBar, "opacity-0");
    setScale(infoSectionCaret, "scale-100");
    playAnimationsInSequence([
      [squelch, captionComponentBg],
      [floatUp, captionComponentBg],
      [floatUpMore, captionComponent],
      [floatInPlace, captionComponent],
    ]);
  } else if ((preNavOpen && deltaY > 0) || (preNavOpening && deltaY > 0)) {
    e.preventDefault();
    setPreNavClosing(true);
    setPreNavOpening(false);
    renderSkyline.set(true);
    setOpacity(infoSectionCaret, "opacity-0");
    setScale(infoSectionCaret, "scale-75");
    setOpacity(infoSectionNavBar, "opacity-1");
    decreaseHeight(infoSectionPreNavArea);
    clearAnimationProperties(captionComponent);
    playAnimationsInSequence([
      [bringDown, captionComponentBg],
      [squish, captionComponentBg],
    ]);
    squish(captionComponentBg);
  } else if (preNavOpen && deltaY <= 25) {
    // hide nav bar from user
    setOpacity(infoSectionNavBar, "opacity-0");
    // slide info section content down to simulate caption component moving away from section
    setTranslateDistance(infoSectionContentGroup, "translate-y-[100vh]");
    goToLandingSection();
  }
}

function goToLandingSection() {
  setCurrTransitionStep("e");
  setInTransition(true);
  // clean up info section
  setPreNavOpen(false);
  slideUpAndFade(infoSectionCaret);
  decreaseHeight(infoSectionPreNavArea);
  setOpacity(infoSectionNavBar, "opacity-0");
  setOpacity(landingSectionCaret, "opacity-0");

  // set up caption component for move
  setupCaptionComponentForMoveToLanding();
  // set up landing section
  setOpacity(landingSection, "opacity-0");
  // use delay to keep info section in view during info section transform
  const timeoutID = setTimeout(() => {
    setCurrTransitionStep("f");
    showSection([landingSection]);
    landingSection.scrollIntoView();
  }, 500);

  function setupCaptionComponentForMoveToLanding() {
    const ccBoundingRect = getBoundingClientRect(captionComponentFg);
    changeElementPositionToFixed(captionComponent);
    changeParentToBodyFromInfoContainer(captionComponent);
    document.documentElement.style.setProperty("--caption-container-top", `${ccBoundingRect.top}px`);
    document.documentElement.style.setProperty("--caption-container-left", `${ccBoundingRect.left}px`);
    captionComponent.classList.add("top-[--caption-container-top]", "left-[--caption-container-left]");
    // add in new transition properties
    setTransitionDuration(captionComponent, "duration-[4000ms]");
    setTransitionTiming(captionComponent, "ease-in-out");
    // clear animation on caption component (if present, will interfere with translate transform)
    clearAnimationProperties(captionComponent);
    clearTransitionProperties(captionComponentFg);
    clearTransitionProperties(captionComponentBg);

    clearAnimationProperties(captionComponent);
    clearAnimationProperties(captionComponentBg);
    clearAnimationProperties(captionComponentFg);
    setTranslateDistance(captionComponent, "translate-y-0");
    const timeoutID = setTimeout(() => {
      setTranslateDistance(captionComponent, "translate-y-[50vh]");
      clearTimeout(timeoutID);
    }, 20);
  }

  function finishTransitionToLandingSection() {
    [captionComponent, captionComponentBg, captionComponentFg, infoSectionCaret, landingSectionCaret].forEach(
      (element) => clearAnimationProperties(element),
    );
    setOpacity(infoSectionCaret, "opacity-0");
    clearPlacementProperties(captionComponent);
  }
  // LINK #moveElement
  // ANCHOR[id=moveElementToLandingCall]
  moveElement(captionComponent, "up", finishTransitionToLandingSection, [
    {
      observedElOne: captionComponent,
      observedElTwo: captionLandingContainer,
      forModificationOnObservedOverlap: [
        {
          callbackArgs: ["g"],
          callback: setCurrTransitionStep,
        },
        {
          callbackArgs: [captionComponent, captionComponentBg, captionComponentFg],
          callback: removeAllAnimationsFromElement,
        },
        {
          callbackArgs: [captionComponent],
          callback: changeParentToLandingContainerFromBody,
        },
        {
          callbackArgs: [captionComponent],
          callback: changeElementPositionToRelative,
        },
        {
          callbackArgs: [captionComponent],
          callback: clearPlacementProperties,
        },
        {
          callbackArgs: [captionComponent, "translate-y-0"],
          callback: setTranslateDistance,
        },
        {
          callbackArgs: [landingSection, "opacity-1"],
          callback: setOpacity,
        },
        {
          callbackArgs: [...landingSectionContentGroup],
          callback: function () {
            const elements = [...arguments];
            elements.forEach((element) => slideDown(element));
          },
        },
      ],
      entryProcessed: false,
    },
  ]);
}

function handleSwipe(section: HTMLElement, callback) {
  return (e: TouchEvent) => {
    const startClientY = e.touches[0].clientY;
    let deltaY = 0;
    function getCurrClientY(e: TouchEvent) {
      const currClientY = e.touches[0].clientY;
      deltaY = startClientY - currClientY;
      callback(e, deltaY);
    }
    function removeTouchListeners() {
      section.removeEventListener("touchmove", getCurrClientY);
      section.removeEventListener("touchend", removeTouchListeners);
    }
    section.addEventListener("touchmove", getCurrClientY, { passive: false });
    section.addEventListener("touchend", removeTouchListeners);
  };
}

function handleScroll(section: HTMLElement, callback) {
  return (e: WheelEvent) => {
    callback(e, e.deltaY);
  };
}

const handleScrollOnLandingSection = handleScroll(landingSection, handleUserOnLandingSection);
const handleSwipeOnLandingSection = handleSwipe(landingSection, handleUserOnLandingSection);

// ******************************************************************************************************
// DO STUFF HERE

// start with scroll disabled

window.addEventListener("beforeunload", () => {
  showSection([landingSection]);
  disableScroll(true);
  window.scrollTo(0, 0);
});

// set css variables in advance - this lets them also be accessible to the skyline effect, which is a react component.
const captionComponentWidth = captionComponent.getBoundingClientRect().width;
const infoSectionWidth = infoSectionContentGroup.getBoundingClientRect().width;

document.documentElement.style.setProperty("--caption-width", `${captionComponentWidth}px`);
document.documentElement.style.setProperty("--info-cont-width", `${infoSectionWidth}px`);
// have to do this again to get mutation observer to fire for some unknown reason
const clearTimeoutID = setTimeout(
  () => document.documentElement.style.setProperty("--info-cont-width", `${infoSectionWidth}px`),
  20,
);

clearTimeout(clearTimeoutID);

// EVENT LISTENERS

main.addEventListener(
  "wheel",
  (e) => {
    const inTransition = checkIfInTransition();
    if (inTransition) {
      e.preventDefault();
      disableScroll(true);
    }
  },
  { passive: false },
);

main.addEventListener(
  "touchmove",
  (e) => {
    const inTransition = checkIfInTransition();
    if (inTransition) {
      e.preventDefault();
      disableScroll(true);
    }
  },
  { passive: false },
);

landingSection.addEventListener("wheel", handleScrollOnLandingSection, { passive: false });
landingSection.addEventListener("touchstart", handleSwipeOnLandingSection, { passive: false });

const handleSwipeOnInfoSection = handleSwipe(infoSection, handleUserOnInfoSection);
const handleScrollOnInfoSection = handleScroll(infoSection, handleUserOnInfoSection);
infoSection.addEventListener("touchstart", handleSwipeOnInfoSection, { passive: false });
infoSection.addEventListener("wheel", handleScrollOnInfoSection, { passive: false });

myTitle.addEventListener("animationend", () => {
  if (myTitle.classList.contains("animate-slide-down")) {
    setCurrTransitionStep("");
    setInTransition(false);
    setOpacity(landingSectionCaret, "opacity-1");
  }
});

captionComponent.addEventListener("transitionend", () => {
  const currSection = getCurrSection();
  const inTransition = checkIfInTransition();
  const currTransitionStep = getCurrTransitionStep();
  if (currSection === "landing" && inTransition && currTransitionStep === "a") {
    goToInfoSection();
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

infoSectionContentGroup.addEventListener("transitionend", () => {
  const inTransition = checkIfInTransition();
  const currSection = getCurrSection();
  if (inTransition && currSection === "info") {
    setCurrTransitionStep("");
    setInTransition(false);
    changeElementOpacityToOne(infoSectionNavBar);
    hideSection([landingSection]);
    infoSection.scrollIntoView();
    disableScroll(false);
  }
});

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
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
