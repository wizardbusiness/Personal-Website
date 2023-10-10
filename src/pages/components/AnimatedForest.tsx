import React from "react";
import {
  randomIntFromInterval,
  randomDecNumFromInterval,
} from "../../scripts/randomIntFromInterval";
import Tree from "./Tree";

const AnimatedForest = ({ trees, direction }) => {
  const createForestChunk = (trees: number) => {
    const chunk = [];
    let i = 0;

    while (i < trees) {
      const height = 30;
      const scaleX = randomDecNumFromInterval(0.7, 1.1, 2);
      const scaleY = randomDecNumFromInterval(0.98, 3, 2);
      const style = {
        left: `${i * randomDecNumFromInterval(10, 10.7, 2)}px`,
      };
      chunk.push(
        <div style={style} className="absolute">
          <Tree
            transDelay={
              direction === "left"
                ? trees * 50 - randomIntFromInterval(0, 50) * i
                : i * randomIntFromInterval(75, 125)
            }
            height={height}
            scaleX={scaleX}
            scaleY={scaleY}
          />
        </div>,
      );
      i++;
    }
    return direction === "left"
      ? chunk.sort((a, b) => (b < a ? 1 : -1))
      : chunk;
  };

  const forest = createForestChunk(trees);
  return <div className="relative flex items-end">{forest}</div>;
};

export default AnimatedForest;
