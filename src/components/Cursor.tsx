import React from "react";

const Cursor = ({ animStart }) => {
  return (
    <div
      className={`inline-block h-6 w-3 bg-gray-100 lg:h-8 lg:w-4 ${
        animStart && "animate-blinking-cursor"
      }`}
    />
  );
};

export default Cursor;
