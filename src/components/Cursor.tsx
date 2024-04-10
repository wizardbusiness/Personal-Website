import React from "react";

const Cursor = ({ animStart }) => {
  return (
    <div
      className={`inline-block h-7 w-4 bg-gray-100 lg:h-9 lg:w-5 xl:h-12 xl:w-7 2xl:h-20 2xl:w-10 ${
        animStart && "animate-blinking-cursor"
      }`}
      onAnimationStart={(e) => e.stopPropagation()}
      onAnimationEnd={(e) => e.stopPropagation()}
    />
  );
};

export default Cursor;
