import React from "react";

const Cursor = ({ animStart }) => {
  return (
    <div
      className={`inline-block h-6 w-3 bg-gray-100 lg:h-8 lg:w-4 xl:h-12 xl:w-7 2xl:h-20 2xl:w-10 ${
        animStart && "animate-blinking-cursor"
      }`}
      onAnimationEnd={(e) => e.stopPropagation()}
    />
  );
};

export default Cursor;
