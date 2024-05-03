export default function observeMutations(element: HTMLElement) {
  let mutationObserved = false;
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") mutationObserved = true;
    });
  });

  mutationObserver.observe(element, { attributes: true });

  return mutationObserved;
}
