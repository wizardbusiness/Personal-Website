import React, { useEffect, useState, useMemo } from "react";
import Cursor from "./Cursor";

export default function Tagline({ repositTxt, children, animateBg }) {
  return (
    <div
      data-subheader
      className={`relative flex h-32 w-2/5 items-center justify-center gap-2 whitespace-nowrap text-gray-100 before:h-32 before:w-full ${
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
