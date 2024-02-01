import checkSupportsPassiveEvent from "./checkSupportsPassiveEvent";

function preventDefault(e: Event) {
  e.preventDefault();
}

// disable touch scroll
function preventDefaultForScrollKeys(e: KeyboardEvent) {
  // keyboard keys used to scroll
  const scrollKeys = { 37: 1, 38: 1, 39: 1, 40: 1 };
  if (e.key in scrollKeys) {
    e.preventDefault();
  }
  return false;
}

const passiveSupported = checkSupportsPassiveEvent();

function disableScrollOnAllDevices() {
  const wheelOpt = passiveSupported ? { passive: false } : false;
  window.addEventListener("wheel", preventDefault, wheelOpt);
  window.addEventListener("touchmove", preventDefault, wheelOpt);
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}
function enableScrollOnAllDevices() {
  window.removeEventListener("wheel", preventDefault);
  window.removeEventListener("touchmove", preventDefault);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

export default function disableScroll(disable: boolean) {
  if (disable) {
    disableScrollOnAllDevices();
  } else if (!disable) {
    enableScrollOnAllDevices();
  }
  return;
}
