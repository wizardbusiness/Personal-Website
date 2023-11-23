import React, { useEffect, useState } from "react";
import {
  randomIntFromInterval,
  randomDecNumFromInterval,
} from "../../scripts/randomFromInterval";
import FirTree from "./treeSvgComponents/FirTree";

const Forest = ({ chunkWidth, direction, setDelayEffectMs }) => {
  const [forestChunk, setForestChunk] = useState([]);
  useEffect(() => {
    const createForestChunk = () => {
      const chunk = [];
      let treeOffset = 0;
      const boxSize = 40;
      while (treeOffset < chunkWidth - boxSize) {
        const style = {
          [direction === "left" ? "left" : "right"]: `${treeOffset}px`,
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
      setDelayEffectMs(treeOffset);
      direction === "left"
        ? setForestChunk(chunk.sort((a, b) => (b < a ? 1 : -1)))
        : setForestChunk(chunk);
    };
    createForestChunk();
  }, [chunkWidth]);

  return <>{forestChunk}</>;
};

export default Forest;
