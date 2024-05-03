import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
  useCallback,
} from "react";
import useGetDataFromDataAttribute from "../../scripts/hooks/useGetDataFromDataAttribute";
import { randomIntFromInterval } from "../../scripts/randomFromInterval";
import Forest from "./Forest";
import CityPark from "./CityPark";
import { useStore } from "@nanostores/react";
import { renderSkyline } from "../../store";
import "../../styles/tailwind.css";
import { render } from "react-dom";

const Window = ({ showWindow }) => {
  const [lightOn, setLightOn] = useState(showWindow);
  const [frequency, setFrequency] = useState(randomIntFromInterval(3000, 150000));

  useEffect(() => {
    const cycleLight = setInterval(() => {
      setFrequency(randomIntFromInterval(10000, 150000));
      setLightOn(!lightOn);
    }, frequency);

    return () => clearInterval(cycleLight);
  }, [lightOn, frequency]);

  return (
    <div
      className={`window ${
        lightOn && "show"
      } h-[3px] w-[3px] bg-gray-100 shadow-[0px_0px_2px_2px_rgba(232,232,232,0.3)]`}
    />
  );
};

const Windows = ({ shapeH, shapeW, delay }) => {
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
  return windows.sort((a, b) => (a < b ? 1 : -1));
};

const Building = ({ height, width, nodeVals, transitionDelay, renderSkyline }) => {
  const [build, setBuild] = useState(false);
  const [, setTransitionEnd] = useState(false);
  const shapeRef = useRef(null);

  useEffect(() => {
    const setTimeoutID = setTimeout(
      () => (renderSkyline ? setBuild(true) : setBuild(false)),
      transitionDelay,
    );
    return () => clearTimeout(setTimeoutID);
  }, [renderSkyline, build]);

  const shapeStyles = {
    height: `${height}px`,
    width: `${width}px`,
    clipPath: `polygon(${nodeVals[0][0]}% 0, ${nodeVals[2][0]}% 0, 100% ${nodeVals[2][1]}%, 100% 100%, 0 100%, 0 ${nodeVals[0][1]}%)`,
  };
  return (
    <>
      <div
        ref={shapeRef}
        data-effect
        style={shapeStyles}
        className={`${
          build ? "scale-100" : "scale-0"
        } structure flex origin-bottom flex-wrap place-content-evenly
          gap-[2px] border border-slate-600 bg-slate-600 
          transition-transform duration-[200ms]`}
      >
        <Windows shapeH={height} shapeW={width} delay={transitionDelay} />
      </div>
    </>
  );
};

type CityChunkProps = {
  direction: "left" | "right";
  chunkData: any;
  renderSkyline: boolean;
};

const CityChunk = ({ direction, chunkData, renderSkyline }: CityChunkProps) => {
  const sortedChunkData =
    direction === "left"
      ? chunkData.sort((a, b) => (a.transitionDelay < b.transitionDelay ? 1 : -1))
      : chunkData.sort((a, b) => (a.transitionDelay < b.transitionDelay ? -1 : 1));

  const transitionDelays = sortedChunkData.map((obj) => obj.transitionDelay);
  const sortedTransitionDelays = renderSkyline ? transitionDelays : transitionDelays.reverse();
  const cityChunk = sortedChunkData.map((obj, i) => {
    const { nodeVals, width, height, transitionDelay } = obj;
    return (
      <Building
        key={`struct${i}`}
        nodeVals={nodeVals}
        width={width}
        height={height}
        transitionDelay={sortedTransitionDelays[i]}
        renderSkyline={renderSkyline}
      />
    );
  });

  return <div className={`bottom-1 flex w-1/3 items-end justify-end gap-2`}>{cityChunk}</div>;
};

type buildingData = {
  nodeVals: number[];
  height: number;
  width: number;
  transitionDelay: number;
};
type cityData = {
  skylineLeft: buildingData[];
  skylineRight: buildingData[];
};

const Skyline = () => {
  const [forestWidth, setForestWidth] = useState<number>(0);
  const [skylineWidth, setSkylineWidth] = useState("");
  const [cityWidth, setCityWidth] = useState<number>(0);
  const [cityData, setCityData] = useState<cityData>({ skylineLeft: [], skylineRight: [] });
  const [delayEffectMs, setDelayEffectMs] = useState<number>(0);
  const forestWidthRef = useRef<HTMLDivElement>(null);
  const cityWidthRef = useRef<HTMLDivElement>(null);

  const cityChunks = useGetDataFromDataAttribute("data-skyline-data");

  useEffect(() => {
    setCityData(cityChunks);
  }, [cityChunks]);

  const $renderSkyline = useStore(renderSkyline);
  return (
    <div
      data-effects-container
      onTransitionEnd={(e) => e.stopPropagation()}
      className="absolute bottom-0 flex h-32 w-[var(--info-cont-width)] items-end justify-center"
    >
      <div data-forest ref={forestWidthRef} className="absolute bottom-0 left-0 flex h-full w-1/4 items-end">
        <Forest chunkWidth={forestWidth} direction={"left"} setDelayEffectMs={setDelayEffectMs} />
      </div>
      <div ref={cityWidthRef} className="absolute flex h-full w-1/2">
        <CityChunk direction="left" chunkData={cityData.skylineLeft} renderSkyline={$renderSkyline} />
        <CityPark delayEffectMs={delayEffectMs} />
        <CityChunk direction="right" chunkData={cityData.skylineRight} renderSkyline={$renderSkyline} />
      </div>
      <div data-forest className="absolute -right-2 flex h-full w-1/4 items-end">
        <Forest chunkWidth={forestWidth} direction={"right"} setDelayEffectMs={setDelayEffectMs} />
      </div>
    </div>
  );
};

export default Skyline;
