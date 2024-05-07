import React from "react";

import FirTree from "./treeSvgComponents/FirTree";

const Forest = ({ forestData, renderSkyline }) => {
  const forestChunk = forestData.map((treeProps, index) => {
    return <FirTree key={`tree${index}`} {...treeProps} renderSkyline={renderSkyline} />;
  });
  return <>{forestChunk}</>;
};

export default Forest;
