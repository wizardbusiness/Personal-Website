import React from "react";

const Bonsai = ({
  height,
  scaleX,
  scaleY,
  position,
  color,
  zIndex,
  foliageTranslate,
}) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 364.48 313.72"
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
      <g id="Trunk">
        <path
          className="cls-1"
          d="m214.95,294.96c-8.08,1.29-14.08-5.71-22.54-3.15-17.56-3.6-40.68,12.82-52.55-1.55-4-4,11-9,16-14,24.13-25.33-23.03-38.55,10-127,3.07-9.05.86-19.54-.1-29.22-.9-7.78,3.1-25.78,12.1-18.78,6.32,4.21-1.76,25.8,19.13,24.19,7.75-.64,19.67-9.23,24.87-3.19,6,6.75.19,13.5-6.08,19.43-33.71,22.33-40.53,60.71-35.39,97.83,1.02,2.61,2.44,5.1,4.12,7.49,9.35,15.79,37.36,26.94,30.44,47.96Z"
        />
      </g>
      <g id="Foliage-2" data-name="Foliage">
        <path
          className="cls-1"
          d="m296.98,123.78c-32.05,25.62-55.33,38.63-85.25,1.5-1.97-4.49-10.94-3.74-15.53-5.74-11.34-15.28,12.66-28.28,23.66-33.28,12-6,27-6,38.95-.26,17.66,6.21,57.56,14.84,38.16,37.78Z"
        />
        <path
          className="cls-1"
          d="m227.6,65.96c-21.48,33.71-104.95,75.93-127.73,25.3-6.86-37.91-13.72-43.4,18.18-70.35,18.12-11.44,41.87-13.61,61.55-4.77,19.07,10.96,57.57,21.09,48.01,49.81Z"
        />
        <path
          className="cls-1"
          d="m184.83,202.34c-17.93,14.5-32.33,30.23-57.79,28.26-13.2-1.16-28.32-5.44-40.25-12.68-13.82-11.56-29.47-29.14-15.51-46.82,14.83-14.22,50.48-36.96,71.59-24.85,14,10,25,21,40,30,8.59,5.21,10.98,18.59,1.96,26.08Z"
        />
      </g>
    </svg>
  );
};

export default Bonsai;
