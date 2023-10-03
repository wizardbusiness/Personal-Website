import React, { useState, useMemo, useEffect } from "react";
import "../../styles/tailwind.css";

const createSkylineEffect = (numStructs: number, direction: string) => {
  const structs = [];
  let i = 0;
  while (i < numStructs) {
    structs.push(
      <Polygon
        delay={i}
        baseHeight={(i % 2) * 10 + i * 5}
        key={`struct${i}`}
      />,
    );
    i++;
  }
  return direction === "left"
    ? structs.sort((a, b) => (a < b ? 1 : -1))
    : structs;
};

function Polygon({ delay, baseHeight }) {
  const [, setAddedClass] = useState("");
  useEffect(() => {
    setAddedClass("build");
  }, []);
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const width = `${randomIntFromInterval(10, 20)}px`;
  const height = `${randomIntFromInterval(20, 30) + baseHeight}px`;
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
    clipPath: `polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 0 50%)`,
    transitionDelay: `${400 - delay * 200}ms`,
  };
  return (
    <div data-effect style={shapeStyles} className={`structure bg-slate-100`} />
  );
}

const SkylineEffect = () => {
  const skylineLeft = useMemo(() => createSkylineEffect(5, "left"), []);
  const skylineRight = useMemo(() => createSkylineEffect(5, "right"), []);
  return (
    <div data-effect-container className="absolute h-32 w-1/2">
      <div className="absolute bottom-0 left-2 flex items-end gap-2 self-end">
        {skylineLeft}
      </div>
      <div className="absolute bottom-0 right-2 flex items-end gap-2 self-end">
        {skylineRight}
      </div>
    </div>
  );
};

export default SkylineEffect;
