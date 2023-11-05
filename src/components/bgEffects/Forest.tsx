import React from "react";
import {
  randomIntFromInterval,
  randomDecNumFromInterval,
} from "../../scripts/randomFromInterval";
import FirTree from "./FirTree";

const Forest = ({ chunkWidth, direction }) => {
  const createForestChunk = () => {
    const chunk = [];
    let treeOffset = 0;
    const boxSize = 40;
    while (treeOffset < chunkWidth - boxSize) {
      const style = {
        [direction === "left" ? "right" : "left"]: `${treeOffset}px`,
        transitionDelay: `${270 + treeOffset * 4}ms`,
      };
      const scaleX = randomDecNumFromInterval(0.7, 1.4, 2);
      const scaleY = randomDecNumFromInterval(0.98, 2.2, 2);
      treeOffset += boxSize / randomIntFromInterval(2, 3);
      chunk.push(
        <FirTree
          key={`tree${treeOffset}`}
          style={style}
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

export default Forest;
