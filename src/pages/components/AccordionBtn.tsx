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
      />
      {!active && (
        <rect
          id="vertical"
          fill="#E5E7EB"
          x="40%"
          y="0"
          height="100%"
          width="20%"
        />
      )}
    </svg>
  );
};

export default AccordionBtnIcon;
