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

// functions

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
