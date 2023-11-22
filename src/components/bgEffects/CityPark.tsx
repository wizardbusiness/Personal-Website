import React, {
  useState,
  useRef,
  type RefObject,
  useEffect,
  type FC,
  type ReactElement,
} from "react";
import OakTree from "./treeSvgComponents/OakTree";
import OakTree2 from "./treeSvgComponents/OakTree2";
import Spruce from "./treeSvgComponents/Spruce";
import PineTree from "./treeSvgComponents/PineTree";
import {
  randomIntFromInterval,
  randomDecNumFromInterval,
  randomElFromArray,
} from "../../scripts/randomFromInterval";

type treeProps = {
  position: number;
  height: number;
  scaleX: number;
  scaleY: number;
  foliageTranslate: number;
  offset: number;
  color: string;
  zIndex: number;
  flipTrunk: number;
};

const CityPark = (props) => {
  const widthRef: RefObject<HTMLDivElement> = useRef(null);

  const handleTreeFill = () => {
    const trees = [];
    const width = widthRef.current?.getBoundingClientRect().width;
    if (width === undefined) return;
    const treeComponents = [PineTree];

    const colors = ["#39455e", "#2B3C56"];
    let unfilledWidth = width;
    let i = 0;
    let position = 0;
    while (unfilledWidth > position + 15) {
      console.log(unfilledWidth);
      const treeProps: treeProps = {
        position: position,
        height: 25,
        scaleX:
          unfilledWidth - position < 30 ? 0.7 : randomElFromArray([-1, 1]),
        scaleY:
          unfilledWidth - position < 30
            ? 0.7
            : randomDecNumFromInterval(0.8, 1.2),
        foliageTranslate: randomIntFromInterval(10, 20),
        offset: randomIntFromInterval(0, 10),
        color: randomElFromArray(colors),
        zIndex: randomElFromArray([1, 2, 3, 4, 5]),
        flipTrunk: randomElFromArray([-1, 1]),
        randomDelay: randomIntFromInterval(1000, 1520) + props.delayParkEffect,
        ...props,
      };

      const Tree = randomElFromArray(treeComponents) as FC;
      trees.push(<Tree key={`tree${i}`} {...treeProps} />);
      position += 30 - treeProps.offset;
      i++;
    }
    return trees;
  };

  const trees = handleTreeFill();

  return (
    <div className="flex w-1/3 justify-center">
      <div
        data-park
        ref={widthRef}
        className="relative h-full w-4/5 lg:w-11/12"
      >
        {trees}
      </div>
    </div>
  );
};

export default CityPark;
