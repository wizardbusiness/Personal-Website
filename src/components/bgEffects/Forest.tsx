import React, { useEffect, useState } from "react";
import {
  randomIntFromInterval,
  randomDecNumFromInterval,
  randomElFromArray,
} from "../../scripts/randomFromInterval";
import FirTree from "./treeSvgComponents/FirTree";

const Forest = ({ forestData, direction, renderSkyline }) => {
  // const [forestChunk, setForestChunk] = useState([]);

  const forestChunk = forestData.map((treeProps, index) => {
    return <FirTree key={`tree${index}`} {...treeProps} renderSkyline={renderSkyline} />;
  });

  return <>{forestChunk}</>;
};

export default Forest;
