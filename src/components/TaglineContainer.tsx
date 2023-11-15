import React, { useEffect, useState, useMemo } from "react";
import Cursor from "./Cursor";

export default function Tagline({ repositTxt, children, animateBg }) {
  return (
    <div
      data-subheader
      className={`relative flex items-center justify-center gap-2 whitespace-nowrap
        before:z-auto before:h-24 before:w-[70vw] before:self-end before:rounded-md
        before:bg-foggy-glass before:sm:h-28 before:sm:w-[45vw] before:md:w-[35vw] lg:h-32 lg:before:w-[43vw] xl:before:w-[32vw] 2xl:before:w-[22vw] ${
          animateBg &&
          "before:animate-squish-down-sm before:[transform-origin:bottom] lg:before:w-[70vw] lg:before:scale-y-[4%] lg:before:animate-squish-down-lg"
        }`}
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
