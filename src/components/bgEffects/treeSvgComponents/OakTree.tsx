import React, { useState, useEffect } from "react";

const OakTree = ({
  height,
  scaleX,
  scaleY,
  position,
  color,
  zIndex,
  foliageTranslate,
  randomDelay,
}) => {
  const [grow, setGrow] = useState("");
  useEffect(() => {
    setGrow("grow");
  }, []);
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 280.65 267.28"
      className={`tree ${grow} absolute bottom-0`}
      style={{
        height: height,
        fill: color,
        stroke: "#2b3c56",
        strokeMiterlimit: 10,
        transform: grow && `scale(${scaleX}, ${scaleY})`,
        transformBox: "fill-box",
        transformOrigin: "bottom",
        left: `${position}px`,
        zIndex: zIndex,
        transitionDelay: `${randomDelay}ms`,
      }}
    >
      <g id="Trunk-3" data-name="Trunk" style={{ fill: "#324968" }}>
        <path
          className="cls-2"
          d="m128.75,267.47c4.87-26.96-4.13-55.96-28.13-72.96-3-3-3-6-4-10.04,0-2.96,1.5-5.46,3.62-7.21s4.88-2.75,7.38-2.75c6,0,11,3,14.87,8.24,2.02,2.29,3.73,4.8,4.93,7.15,1.54,2.56,3.15,5.39,4.83,8.23,2.79,4.73,5.8,9.5,8.96,13.02,3.16,3.52,6.45,5.79,9.78,5.48,11.63-4.12,12.63-18.12,21.41-24.85,1.87-1.92,4.01-3.89,6.47-5.88,1.78-1.44,4.2-3.27,6.12-5.43,7.63-5.96-2.37-12.96.63-19.96,2-3,5-5,8-4,5,3,1,14,9,13,3-1,4-7,8-5,3,1,9,8,5,10-10,3-20,3-28.09,9.74-2.73,2.24-5.44,4.81-8.04,7.64-14.87,17.62-34.87,51.62-16.87,72.62-4,2-8,3-13.01,3.48-3.69.35-6.7.6-9.14.82-7.33.14-9.6.84-11.72-1.34Z"
        />
      </g>
      <g
        id="Foliage-5"
        data-name="Foliage"
        style={{ transform: `translateY(${-1 * foliageTranslate}%)` }}
      >
        <path
          className="cls-1"
          d="m280.21,175.55c-1.47,19.53-19.86,30.79-35.18,40.52-22.15,10.92-45.63-6.18-68.31,2.84-23,10.69-39.34,8.36-62.48.24-12-3.29-24.5-4.34-36.93-4.27-30.13,3.54-69.26-8.11-73.36-42.72.08-17.03,15.57-26.88,25.63-39.59,25.31-37.35,53.62-68.8,102.24-69.63,33.5-13.8,100.57,32.65,115.05,64.05,1.16,2.94,4.37,6.78,8.81,9.54,17.78,12.8,24.06,15.04,24.53,39.03Z"
        />
      </g>
    </svg>
  );
};

export default OakTree;
