import React, { useState, useMemo, useEffect } from "react";
import "../../styles/tailwind.css";
import { initial, random } from "lodash";

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
    const amplitude = 12 * Math.cos(baseHeight);
    return index % 2 === 0
      ? baseHeight ** 1.5 + noise * 10 + amplitude
      : baseHeight ** 1.4 + amplitude;
  };

  useEffect(() => {
    setAddedClass("build");
  }, []);
  // only represent values for targetable nodes not all nodes. each pair represents the targetable values for a quadrant
  // css polygons have a percentage based scale where
  // the upper left is 0% 0% and the lower right is 100% 100%, these values represent these.
  const initialNodeValPairs = [
    // upper left, lower left
    [0, 50],
    [50, 100],
    // upper right, lower right
    [100, 50],
    [50, 100],
  ];

  const chooseNodeValues = (nodeValPairs: number[][]) => {
    const targetIndex = randomIntFromInterval(0, nodeValPairs.length - 1); // will randomly select index to modify values at.
    return targetIndex;
  };
  // customizable node values
  const setNodeVals = (
    targetIndex: number,
    nodeValuePairs: number[][],
    probability: number = 0.3,
  ) => {
    // set the probability that a modification will take place. currently 30%
    const modCheckPass = Math.random() <= probability ? true : false;
    // if check doesn't pass dont modify any node values
    if (modCheckPass === false) return nodeValuePairs;
    // choose modded values
    const moddedValues = nodeValuePairs.map((valPair: number[], index) => {
      if (index === targetIndex) {
        // modify the values;
        return valPair.map((value: number) => {
          return randomIntFromInterval(0, 80);
        });
      } else {
        // otherwise leave them alone
        return valPair;
      }
    });
    return moddedValues;
  };

  const targetIndex = chooseNodeValues(initialNodeValPairs);
  const nodeVals = setNodeVals(targetIndex, initialNodeValPairs, 0.4);
  const width = randomIntFromInterval(15, 25);
  const height = Math.floor(calcHeightMod(baseHeight));
  const shapeStyles = {
    height: `${height}px`,
    width: `${width}px`,
    clipPath: `polygon(${nodeVals[0][0]}% 0, ${nodeVals[2][0]}% 0, 100% ${nodeVals[2][1]}%, 100% 100%, 0 100%, 0 ${nodeVals[0][1]}%)`,
    transitionDelay: `${numStructs * 100 - delay * 200}ms`,
  };
  return (
    <div
      data-effect
      style={shapeStyles}
      className={`structure flex flex-wrap place-content-evenly gap-[2px] bg-slate-100`}
    >
      <Windows shapeH={height} shapeW={width} />
    </div>
  );
}

const Windows = ({ shapeH, shapeW }) => {
  const rows = Math.floor(shapeH / 7.5);
  const columns = Math.floor(shapeW / 7.5);
  const totalWindows = rows * columns;
  const windows = [];
  let i = 0;
  let showWindow = Math.random() <= 0.5 ? true : false;
  let intervalCounter = 0;
  while (i < totalWindows) {
    if (showWindow === true) {
      let incrementBy = randomIntFromInterval(1, 2);
      intervalCounter += incrementBy;
      if (intervalCounter > 4) {
        showWindow = false;
        intervalCounter = 0;
      }
    } else if (showWindow === false) {
      let incrementBy = randomIntFromInterval(1, 2);
      intervalCounter += incrementBy;
      if (intervalCounter > 2) {
        showWindow = true;
        intervalCounter = 0;
      }
    }
    windows.push(<Window key={`window${i}`} showWindow={showWindow} />);
    i++;
  }
  return windows;
};

const Window = ({ showWindow }) => {
  const style = {
    backgroundColor: showWindow ? "rgb(100 116 139)" : "transparent",
  };
  return <div style={style} className=" h-[5px] w-[5px]" />;
};

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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
