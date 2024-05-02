import React, { useState, useEffect } from "react";

const useRootMutationObserver = () => {
  const [attributesChanged, setAttibutesChanged] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          setAttibutesChanged(true);
        }
      });
    });

    const root = document.querySelector("html");

    observer.observe(root, { attributes: true });
  }, []);

  return attributesChanged;
};

export default useRootMutationObserver;
