import React, { useRef, useState, useEffect } from "react";
import {
  randomIntFromInterval,
  randomDecNumFromInterval,
} from "../../scripts/randomIntFromInterval";
import Tree from "./Tree";

const AnimatedForest = ({ chunkWidth, direction }) => {
  const createForestChunk = () => {
    const chunk = [];
    let treeOffset = 0;
    const boxSize = 40;
    while (treeOffset < chunkWidth - boxSize) {
      const delayRandom = randomIntFromInterval(1, 3);
      const style = {
        [direction === "left" ? "right" : "left"]: `${treeOffset}px`,
        transitionDelay: `${320 + delayRandom * treeOffset}ms`,
      };
      const scaleX = randomDecNumFromInterval(0.7, 1.4, 2);
      const scaleY = randomDecNumFromInterval(0.98, 2.2, 2);
      treeOffset += boxSize / randomIntFromInterval(2, 3);
      chunk.push(
        <Tree
          key={`tree${treeOffset}`}
          style={style}
          transDelay={
            direction === "left"
              ? treeOffset * delayRandom - treeOffset * delayRandom
              : treeOffset * delayRandom
          }
          height={boxSize}
          width={boxSize}
          scaleX={scaleX}
          scaleY={scaleY}
        />,
      );
    }
    return direction === "left"
      ? chunk.sort((a, b) => (b < a ? 1 : -1))
      : chunk;
  };

  const forestChunk = createForestChunk();
  return <>{forestChunk}</>;
};

export default AnimatedForest;
