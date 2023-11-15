import React, { useState, useEffect } from "react";

const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const checkIfTouchDevice =
      "ontouchstart" in document || navigator.maxTouchPoints > 0 ? true : false;
    setIsTouchDevice(checkIfTouchDevice);
  }, []);
  return isTouchDevice;
};

export default useIsTouchDevice;
