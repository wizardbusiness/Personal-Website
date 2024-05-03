import React, { useEffect, useState } from "react";
import observeMutations from "../mutationObserver";

type buildingData = {
  nodeVals: number[];
  height: number;
  width: number;
  transitionDelay: number;
};

type cityData = {
  skylineLeft: buildingData[];
  skylineRight: buildingData[];
};

const useGetDataFromDataAttribute = (dataAttributeStr: string) => {
  const [data, setData] = useState<cityData>({ skylineLeft: [], skylineRight: [] });

  useEffect(() => {
    const handleSetData = (element) => {
      if (!element) console.error(`no element with ${dataAttributeStr} attribute found`);
      const dataString = element.getAttribute(dataAttributeStr);
      if (dataString.length === 0) return;
      const data = JSON.parse(dataString);
      setData(data);
    };

    const element: HTMLElement = document.querySelector(`[${dataAttributeStr}]`);

    function getData(element: HTMLElement, dataAttributeStr: string) {
      return new Promise((resolve, reject) => {
        const dataString = element.getAttribute(dataAttributeStr);
        if (dataString.length > 0) resolve(dataString);
        else reject(`Data attribute ${dataAttributeStr} not yet updated with data`);
      });
    }
    let setTimeoutID: number;
    function tryGetData(element: HTMLElement, dataAttributeStr: string, retry = 1, retryLimit = 3) {
      getData(element, dataAttributeStr)
        .then((dataString: string) => {
          clearTimeout(setTimeoutID);
          console.log(`Data on ${dataAttributeStr} found!`);
          const data = JSON.parse(dataString);
          setData(data);
        })
        .catch((error) => {
          if (retry <= 3) {
            console.log(error, `Retrying: ${retry} of ${retryLimit}`);
            setTimeoutID = setTimeout(
              () => tryGetData(element, dataAttributeStr, (retry += 1), retryLimit),
              100,
            );
          } else {
            clearTimeout(setTimeoutID);
            console.log("Error: Retry Limit Reached");
          }
        });
    }
    tryGetData(element, dataAttributeStr);
  }, []);
  return data;
};

export default useGetDataFromDataAttribute;
