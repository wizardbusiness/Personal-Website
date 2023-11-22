import React from "react";

const Spruce = ({
  height = 30,
  scaleX = 1,
  scaleY = 1,
  position = 2,
  color = "blue",
  zIndex = 1,
  foliageTranslate,
}) => {
  console.log("height", height);
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 252.51 415.56"
      className="tree absolute bottom-0"
      style={{
        height: height,
        fill: color,
        stroke: "#2b3c56",
        strokeMiterlimit: 10,
        transform: `scale(${scaleX}, ${scaleY})`,
        transformBox: "fill-box",
        transformOrigin: "bottom",
        left: `${position}px`,
        zIndex: zIndex,
        transitionDelay: `${Math.random()}s`,
      }}
    >
      <g id="Foliage-3" data-name="Foliage">
        <path
          className="cls-1"
          d="m241.83,197.56c.58,16.15-16.57,55.5-11.57,63.5,5.57,9.21,20.56-7.29,19.09,1.84-18.56,65.5-47.26,148.94-127.07,152.52-10.88-2.18-21.91-10.42-29.7-19.64-10.11-14.15-24.53-26.21-35.21-40.52-45.38-54.42,9.68-31.29,7.72-48.32-8-18-32-35.77-37.2-57.5-3.55-14.82,27.49-8.28,28.75-11.14,2.52-5.74-28.86-26.8-22.02-32.3,7-6,44.04,5.92,41.48-2.2-8.2-19.15-42.31-50.42-40.01-70.48,5-17,44.49,14.87,39.76-7.51-.01-3.26-18.82-45.41-18.83-48.65-.09-29.11,6.57,3.46,45.57-3.29,4.91-5,3.79-35.59,7.7-44.38,3.76-7.91,7.6-15.8,11.8-23.6,4-6,11-2,14,2,13,19-.68,32.25,21.51,39.24,2.57.59,31.17-15.87,32.27-13.52,13.22,28.27-12.81,42.8-12.91,45.48-.92,24.59,33.87-6.94,40.87,15.06,1,4-22.3,41.04-19.98,44.56,21.24,9.93,24.64,1.94,36.82-.62,25,18-23.21,40.93-26.8,65.71-.68,2.92,21.66-13.58,33.96-6.24Z"
        />
      </g>
    </svg>
  );
};

export default Spruce;
