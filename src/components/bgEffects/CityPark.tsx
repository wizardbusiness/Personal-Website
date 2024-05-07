import React, { useState, useRef, type RefObject, useEffect, type FC, type ReactElement } from "react";
import OakTree from "./treeSvgComponents/OakTree";
import OakTree2 from "./treeSvgComponents/OakTree2";
import Spruce from "./treeSvgComponents/Spruce";
import PineTree from "./treeSvgComponents/PineTree";
import Bonsai from "./treeSvgComponents/Bonsai";
import {
  randomIntFromInterval,
  randomDecNumFromInterval,
  randomElFromArray,
} from "../../scripts/randomFromInterval";
import { useStore } from "@nanostores/react";
import { cityParkState } from "../../store";

type treeProps = {
  width: number;
  height: number;
  position: number;
  scaleX: number;
  scaleY: number;
  foliageTranslate: number;
  offset: number;
  color: string;
  zIndex: number;
  flipTrunk: number;
};

const CityPark = ({ delayEffectMs, cityParkState, renderSkyline }) => {
  return (
    <div id="city-park" className="flex h-[40px] w-1/3 pl-2 pr-2">
      {cityParkState.map((treeData, index) => (
        <PineTree
          {...treeData}
          delayEffectMs={delayEffectMs}
          renderSkyline={renderSkyline}
          key={`tree-${index}`}
        />
      ))}
    </div>
  );
};

export default CityPark;
