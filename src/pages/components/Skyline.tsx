import React, { useState, useMemo, useEffect } from "react";
import "../../styles/tailwind.css";

const createSkylineBg = (numStructs: number, direction: string) => {
  const structs = [];
  let i = 0;
  while (i < numStructs) {
    structs.push(
      <SkylineShape delay={i} direction={direction} key={`struct${i}`} />,
    );
    i++;
  }
  return structs;
};

function SkylineShape({ delay, direction }) {
  const [addedClass, setAddedClass] = useState("");
  useEffect(() => {
    setAddedClass("build");
  }, []);
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const width = `${randomIntFromInterval(10, 30)}px`;
  const height = `${randomIntFromInterval(30, 70)}px`;
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
    clipPath: `polygon(12% 0, 92% 0, 92% 50%, 92% 100%, 12% 100%, 12% 50%);`,
    transitionDelay:
      direction === "right" ? `${400 - delay * 200}ms` : `${delay * 200}ms`,
  };
  return (
    <div data-effect style={shapeStyles} className={`structure bg-slate-100`} />
  );
}

const Skyline = () => {
  const skylineLeft = useMemo(() => createSkylineBg(3, "left"), []);
  const skylineRight = useMemo(() => createSkylineBg(3, "right"), []);
  return (
    <div className="absolute h-32 w-1/2">
      <div className="absolute bottom-0 left-2 flex items-end gap-2 self-end">
        {skylineLeft}
      </div>
      <div className="absolute bottom-0 right-2 flex items-end gap-2 self-end">
        {skylineRight}
      </div>
    </div>
  );
};

export default Skyline;
