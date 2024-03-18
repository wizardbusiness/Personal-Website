// elements
const landingSection: HTMLElement = document.querySelector("#landing");
const aboutSection: HTMLElement = document.querySelector("#about");

const landingSectionContentGroup: NodeListOf<HTMLElement> = document.querySelectorAll(".transition-group");
const aboutSectionContentGroup: HTMLElement = document.querySelector("#text-content");

const sectionCaptionComponents: NodeListOf<HTMLElement> = document.querySelectorAll("#caption-container");
const captionComponentLanding: HTMLElement = sectionCaptionComponents[0];
const captionComponentAbout: HTMLElement = sectionCaptionComponents[1];
const landingComponentInitPosit: DOMRect = captionComponentLanding.getBoundingClientRect();
const aboutComponentInitPosit: DOMRect = captionComponentAbout.getBoundingClientRect();

const sectionNavCarets: NodeListOf<HTMLElement> = document.querySelectorAll("#scroll-caret");
const landingSectionCaret: HTMLElement = sectionNavCarets[0];
const aboutSectionCaret: HTMLElement = sectionNavCarets[1];

const aboutSectionPreNavArea: HTMLElement = document.querySelector("#nav-check");

// data-attributes

// ------------------------------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------------------------------

// ******************************************************************************************************
// Move captionContainer
function moveCaptionComponent(
  captionComponent: HTMLElement,
  speed: number,
  acceleration: number,
  limit: number,
  direction: number,
  destination: number,
) {
  if (speed <= limit) speed = speed ** acceleration;
  let componentTopPosition = Number(captionComponent.style.top);
  componentTopPosition = Number(`calc(${direction}1 * ${componentTopPosition} + ${speed}px)`);
  if (componentTopPosition === destination) return;

  requestAnimationFrame(() =>
    moveCaptionComponent(captionComponent, speed, acceleration, limit, direction, destination),
  );
}

function moveCaptionComponentDown() {
  let destination = aboutComponentInitPosit.top;
  moveCaptionComponent(captionComponentLanding, 15, 1.02, 20, 1, destination);
}

function moveCaptionComponentUp() {
  let destination = landingComponentInitPosit.top;
  moveCaptionComponent(captionComponentAbout, 15, 1.02, 20, -1, destination);
}

// ******************************************************************************************************

function checkIfCaptionComponentAtPosition(
  currComponentPosition: number,
  targetPosition: number,
  callback: Function,
  cbArgs: HTMLElement[],
) {
  if (currComponentPosition === targetPosition) {
    callback(cbArgs);
  } else {
    requestAnimationFrame(() => {
      checkIfCaptionComponentAtPosition(currComponentPosition, targetPosition, callback, cbArgs);
    });
  }
}

function checkIfLandingCaptionAtCoords() {
  const currComponentPosition = document
    .querySelectorAll("#caption-container")[0]
    .getBoundingClientRect().top;
  const targetPosition = window.innerHeight * 0.55;
  const cbArgs: HTMLElement[] = [aboutSectionContentGroup];
  const handleAtTargetPosition = (cbArgs: HTMLElement[]) => {
    cbArgs.forEach((element) => element.classList.replace("translate-y-[100vh]", "translate-y-[0vh]"));
  };
  checkIfCaptionComponentAtPosition(currComponentPosition, targetPosition, handleAtTargetPosition, cbArgs);
}

function checkIfAboutCaptionAtCoords() {
  const currComponentPosition = document
    .querySelectorAll("#caption-container")[1]
    .getBoundingClientRect().top;
  const targetPosition = landingComponentInitPosit.top;
  const cbArgs: HTMLElement[] = [...landingSectionContentGroup];
  const handleAtTargetPosition = (cbArgs: HTMLElement[]) => {
    cbArgs.forEach((element) => {
      element.classList.replace("animate-slide-up", "animate-slide-down");
      element.classList.replace("opacity-0", "opacity-1");
    });
  };
  checkIfCaptionComponentAtPosition(currComponentPosition, targetPosition, handleAtTargetPosition, cbArgs);
}

// ******************************************************************************************************

function programaticallyScrollToNextSection() {
  window.scrollBy({
    // landing section height + nav check div height
    top: window.innerHeight,
    behavior: "smooth",
  });
}

// ******************************************************************************************************

// all animations that can apply to an element involved in the transition
// NOTE: not exhaustive to all animations used in project

const animations = [
  "animate-slide-up",
  "animate-slide-down",
  "animate-scale-up",
  "animate-squish-down-lg",
  "animate-squish-down-sm",
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

type Animations = (typeof animations)[number];

function animateElements(animation: Animations) {
  // const animations: Animations[] = Object.values(Animations);
  return (elements: NodeListOf<HTMLElement>) => {
    // remove all animations from the element before
    elements.forEach((element) => {
      animations.forEach((animation) => {
        if (element.classList.contains(animation)) {
          element.classList.remove(animation);
        }
      });
    });
    elements.forEach((element) => {
      element.classList.add(animation);
    });
  };
}

const slideUpAndFade = animateElements("animate-slide-up");
const slideDown = animateElements("animate-slide-down");

// ******************************************************************************************************
const translations = ["translate-y-[0vh]", "translate-y-[100vh]"] as const;

type Translations = (typeof translations)[number];

function translateElements(freshTranslation: Translations, staleTranslation: Translations) {
  return (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      element.classList.replace(staleTranslation, freshTranslation);
    });
  };
}

const translateSectionContentUp = translateElements("translate-y-[100vh]", "translate-y-[0vh]");
const translateSectionContentDown = translateElements("translate-y-[0vh]", "translate-y-[100vh]");
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

const opacities = ["opacity-[0.8]", "opacity-0"] as const;

type Opacities = (typeof opacities)[number];

function changeElementOpacity(freshOpacity: Opacities, staleOpacity: Opacities) {
  return (element: HTMLElement) => {
    element.classList.replace(staleOpacity, freshOpacity);
  };
}

const increaseElementOpacity = changeElementOpacity("opacity-0", "opacity-[0.8]");
const decreaseElementOpacity = changeElementOpacity("opacity-[0.8]", "opacity-0");
