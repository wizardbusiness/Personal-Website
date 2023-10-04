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
    const noise = Math.random();
    const randomAmplitude = 15 * Math.cos(baseHeight * noise + noise * 100);
    return baseHeight ** 1.4 + randomAmplitude;
  };

  useEffect(() => {
    setAddedClass("build");
  }, []);
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const initialNodeVals = [0, 0, 100, 0, 100, 50]; // customizable node values
  const setPNodes = (initalVals: number[]) => {
    // map over pNodes, choose a random value to modify.
    const modifyValAtIndex = randomIntFromInterval(0, initalVals.length - 1);
    const modCheckPass = Math.random() > 0.7 ? true : false;
    return initalVals.map((nodeVal, index) => {
      if (index === modifyValAtIndex && modCheckPass)
        return randomIntFromInterval(50, 100);
      return nodeVal;
    });
  };
  const pNodeVals = setPNodes(initialNodeVals);
  const width = `${randomIntFromInterval(15, 25)}px`;
  const height = `${calcHeightMod(baseHeight)}px`;
  const shapeStyles = {
    height: height,
    width: width,
    clipPath: `polygon(${pNodeVals[0]}% ${pNodeVals[1]}%, ${pNodeVals[2]}% ${pNodeVals[3]}%, 100% 50%, ${pNodeVals[4]}% 100%, 0 100%, 0 ${pNodeVals[5]}%)`,
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
