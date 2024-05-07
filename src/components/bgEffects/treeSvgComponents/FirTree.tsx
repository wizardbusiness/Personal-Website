import React, { useState, useEffect } from "react";
import { render } from "react-dom";

type Props = {
  height: number;
  width: number;
  scaleX: number;
  scaleY: number;
  direction: "left" | "right";
  offset: number;
  transitionDelay: number;
  renderSkyline: boolean;
};

const FirTree = ({
  height,
  width,
  scaleX,
  scaleY,
  direction,
  offset,
  transitionDelay,
  renderSkyline,
}: Props) => {
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    const setTimeoutID = setTimeout(() => (renderSkyline ? setGrow(true) : setGrow(false)), transitionDelay);
    return () => clearTimeout(setTimeoutID);
  }, [renderSkyline, transitionDelay]);
  
  return (
    <svg
      height={`${height || 70}px`}
      width={`${width}px`}
      className={`{${grow ? "scale-100" : "scale-0"} tree absolute transition-transform duration-[500ms]`}
      style={{
        fill: "#2b3c56",
        stroke: "#2b3c56",
        strokeMiterlimit: 10,
        transform: grow ? `scale(${scaleX}, ${scaleY})` : `scale(${scaleX / 4}, 0)`,
        transformBox: "fill-box",
        transformOrigin: "bottom",
        [direction]: `${offset}px`,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 898.57 583.99"
    >
      <g>
        <polygon
          className="cls-2"
          points="396.63 729.14 257.4 729.59 269.57 590.77 383.55 590.4 396.63 729.14"
        />
        <path
          className="cls-1"
          d="m278.74,256.84c-57.52,31.33-42.6,127.06-86.16,227.54C129.17,630.66-7.07,669.1.83,688.53c7.06,17.35,190.73-38.51,206.19-46.3s101.2,88.39,121.59,87.36c21.09-1.07,82.73-107.78,97.73-98.48,102.79,63.72,219.86,101.15,226.89,88.11,7.88-14.62-145.04-74.59-212.44-247.83-36.8-94.59-34.85-188.88-93.83-216.1-3.08-1.42-36.05-15.97-68.23,1.56Z"
        />
        <path
          className="cls-1"
          d="m285.87,223.83c-52.31,24.83-38.33,101.45-77.65,181.64-57.24,116.74-181.29,146.95-174.01,162.51,6.5,13.9,108.34-4.09,198.96-52.92,28.52-15.37,51.92-31.63,89.1-33.13,41.56-1.67,71.97,16.25,97.49,30.19,93.96,51.36,202.99,93.35,209.34,82.95,7.13-11.66-132.52-60.22-194.65-199.03-33.92-75.79-32.51-151.19-86.39-173.19-2.81-1.15-32.93-12.92-62.2.98Z"
        />
        <path
          className="cls-1"
          d="m288.03,118.99c-39.88,22.54-26.95,86.9-55.25,155.86-41.19,100.39-136.55,129.6-130.48,142.54,5.42,11.56,83.89-6.66,152.81-50.62,21.69-13.83,39.39-28.27,68.18-30.64,32.18-2.64,56.24,11.61,76.41,22.65,74.25,40.64,159.92,72.92,164.57,63.94,5.21-10.07-104.39-47-156.34-162.52-28.37-63.08-29.33-126.86-71.7-143.87-2.21-.89-25.88-9.95-48.2,2.66Z"
        />
        <path
          className="cls-1"
          d="m318.87.5c-18.18.02-13.4,79.72-60.98,160.96-50.87,86.85-127.77,117.72-123.24,127.67,1.09,2.4,7.17,4.21,134.46-37.74,20.86-6.87,37.29-12.45,59.76-10.16,15.14,1.54,32.29,7.81,65.99,20.3,21.55,7.98,24.38,9.7,37.36,14.5,15.34,5.68,82.79,30.68,87.16,20.29,5.09-12.11-87.74-43.54-143.21-142.13C332.34,76.3,336.59.48,318.87.5Z"
        />
      </g>
    </svg>
  );
};

export default FirTree;
