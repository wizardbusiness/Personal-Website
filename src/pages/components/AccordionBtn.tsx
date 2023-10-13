import React from "react";

const AccordionBtnIcon = ({ height, width, active }) => {
  console.log(active);
  return (
    <svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
      <rect
        id="horizontal"
        fill="#E5E7EB"
        x="0"
        y="40%"
        height="20%"
        width="100%"
      >
        <animateTransform begin="click" />
      </rect>
      <rect
        id="vertical"
        fill="#E5E7EB"
        x="40%"
        y="0"
        height="100%"
        width="20%"
      >
        <animateTransform
          xlinkHref="#vertical"
          begin="click"
          attributeName="transform"
          type="rotate"
          dur="0.3s"
          fill="freeze"
          from={
            active
              ? `0 ${width / 2} ${height / 2}`
              : `90 ${width / 2} ${height / 2}`
          }
          to={
            active
              ? `90 ${width / 2} ${height / 2}`
              : `0 ${width / 2} ${height / 2}`
          }
        />
      </rect>
    </svg>
  );
};

export default AccordionBtnIcon;
