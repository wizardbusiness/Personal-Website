import React, { useEffect, useState } from "react";
import observeMutations from "../mutationObserver";

const useGetDataFromDataAttribute = (dataAttributeStr: string) => {
  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    const getData = (element) => {
      if (!element) console.error(`no element with ${dataAttributeStr} attribute found`);
      const dataString = element.getAttribute(dataAttributeStr);
      const data = JSON.parse(dataString);
      setDataState(data);
    };
    const element: HTMLElement = document.querySelector(`[${dataAttributeStr}]`);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === dataAttributeStr) {
          observer.disconnect();
          getData(element);
        }
      });
    });

    observer.observe(element, { attributes: true });
  }, []);
  return dataState;
};

export default useGetDataFromDataAttribute;
