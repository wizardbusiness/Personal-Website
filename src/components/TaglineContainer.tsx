import React, { useEffect, useState, useMemo } from "react";
import Cursor from "./Cursor";

export default function Tagline({ repositTxt, children, animateBg }) {
  return (
    <div
      data-subheader
      className={`relative flex items-center justify-center gap-2 whitespace-nowrap text-gray-100 before:h-24 before:w-[70vw] sm:before:h-28 lg:h-32 lg:w-2/5 lg:before:w-[30vw] ${
        animateBg && "before:animate-squish-down"
      } before:rounded-md before:bg-foggy-glass`}
    >
      <div
        className={`absolute flex ${
          repositTxt && "-translate-y-7"
        } flex-nowrap gap-2`}
      >
        {children}
      </div>
    </div>
  );
}
