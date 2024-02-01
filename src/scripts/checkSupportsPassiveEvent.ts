interface customEventListenerOptions extends EventListenerOptions {
  get passive(): boolean;
}

export default function checkSupportsPassiveEvent() {
  let supportsPassive = false;
  try {
    const options: customEventListenerOptions = {
      get passive() {
        supportsPassive = true;
        return false;
      },
    };
    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch (err) {
    supportsPassive = false;
  }
  return supportsPassive;
}
