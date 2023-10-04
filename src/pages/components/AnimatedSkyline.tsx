import React, { useState, useMemo, useEffect } from "react";
import "../../styles/tailwind.css";

const createSkylineEffect = (numStructs: number, direction: string) => {
  const structs = [];
  let i = 0;
  while (i < numStructs) {
    structs.push(
      <Polygon
        numStructs={numStructs}
        delay={i}
        index={i}
        baseHeight={10 + i}
        key={`struct${i}`}
      />,
    );
    i++;
  }
  return direction === "left"
    ? structs.sort((a, b) => (a < b ? 1 : -1))
    : structs;
};

function Polygon({ delay, numStructs, baseHeight, index }) {
  const [, setAddedClass] = useState("");
  const calcHeightMod = (i: number) => {
    const noise = 1.5 + Math.random();
    const randomAmplitude = 3 * Math.cos(noise * baseHeight);
    return baseHeight * 2 + randomAmplitude * 3;
  };

  useEffect(() => {
    setAddedClass("build");
  }, []);
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const width = `${randomIntFromInterval(15, 25)}px`;
  const height = `${calcHeightMod(baseHeight)}px`;
  const pNodes = [];
  let i = 0;
  while (i <= 4) {
    const slant = randomIntFromInterval(0, 100);
    pNodes.push(`${slant}%`);
    i++;
  }
  const shapeStyles = {
    height: height,
    width: width,
    clipPath: `polygon(0 ${0}%, ${100}% ${0}%, 100% 60%, ${100}% 100%, 0 100%, 0 50%)`,
    transitionDelay: `${numStructs * 100 - delay * 200}ms`,
  };
  return (
    <div data-effect style={shapeStyles} className={`structure bg-slate-100`} />
  );
}

const AnimatedSkyline = () => {
  const skylineLeft = useMemo(() => createSkylineEffect(10, "left"), []);
  const skylineRight = useMemo(() => createSkylineEffect(10, "right"), []);
  return (
    <div data-effect-container className="absolute h-32 w-1/2">
      <div className="absolute bottom-0 left-0 flex items-end gap-2 self-end">
        {skylineLeft}
      </div>
      <div className="absolute bottom-0 right-2 flex items-end gap-2 self-end">
        {skylineRight}
      </div>
    </div>
  );
};

export default AnimatedSkyline;
