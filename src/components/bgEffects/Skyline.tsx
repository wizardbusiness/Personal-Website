import React, { useState, useEffect, useRef } from "react";
import { randomIntFromInterval } from "../../scripts/randomFromInterval";
import Forest from "./Forest";
import CityPark from "./CityPark";
import { useStore } from "@nanostores/react";
import { renderSkyline, forestState, cityParkState, cityBuildingsState } from "../../store";
import "../../styles/tailwind.css";

const Window = ({ showWindow, delay, renderSkyline }) => {
  const [lightOn, setLightOn] = useState(false);
  const [frequency, setFrequency] = useState(randomIntFromInterval(3000, 80000));

  useEffect(() => {
    const cycleLight = setInterval(() => {
      setFrequency(randomIntFromInterval(3000, 80000));
      setLightOn(!lightOn);
    }, frequency);

    return () => clearInterval(cycleLight);
  }, [lightOn, frequency]);

  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      renderSkyline ? setLightOn(true) : setLightOn(false);
    }, delay);

    return () => clearTimeout(setTimeoutID);
  }, [renderSkyline, delay]);

  return (
    <div
      className={`window ${
        showWindow && lightOn ? "opacity-1" : "opacity-0"
      } h-[3px] w-[3px] bg-gray-100 shadow-[0px_0px_2px_2px_rgba(232,232,232,0.3)] transition-opacity duration-100`}
    />
  );
};

const Windows = ({ shapeH, shapeW, delay, renderSkyline }) => {
  const rows = Math.floor(shapeH / 7.5);
  const columns = Math.floor(shapeW / 7.5);
  const totalWindows = rows * columns;
  const windowsProps = [];
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
    const totalDelay = delay * i;
    windowsProps.push({ showWindow, totalDelay });
    i++;
  }

  const delayEffectMsOnShow = windowsProps.map((windowProps) => windowProps.totalDelay).reverse();
  const delayEffectMsOnHide = [...delayEffectMsOnShow].reverse();

  const windows = windowsProps.map((windowProps, i) => {
    const { showWindow } = windowProps;

    return renderSkyline ? (
      <Window
        key={`window${i}`}
        showWindow={showWindow}
        delay={delayEffectMsOnShow[i]}
        renderSkyline={renderSkyline}
      />
    ) : (
      <Window
        key={`window${i}`}
        showWindow={showWindow}
        delay={delayEffectMsOnHide[i]}
        renderSkyline={renderSkyline}
      />
    );
  });
  return windows;
};

const Building = ({ height, width, nodeVals, transitionDelay, delayEffectMs, renderSkyline }) => {
  const [build, setBuild] = useState(false);
  const shapeRef = useRef(null);

  useEffect(() => {
    const setTimeoutID = setTimeout(
      () => (renderSkyline ? setBuild(true) : setBuild(false)),
      renderSkyline ? transitionDelay : transitionDelay + 100,
    );
    return () => clearTimeout(setTimeoutID);
  }, [renderSkyline, build, delayEffectMs]);

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
          build ? "scale-y-100" : "scale-y-0"
        } structure flex origin-bottom flex-wrap place-content-evenly
          gap-[2px] border ${build ? "border-slate-600 bg-slate-600" : "border-foggy-glass bg-foggy-glass"}  
          transition-all ${renderSkyline ? "duration-[200ms]" : "duration-[300ms] ease-quick-slow"} `}
      >
        <Windows shapeH={height} shapeW={width} delay={40} renderSkyline={renderSkyline} />
      </div>
    </>
  );
};

type CityChunkProps = {
  direction: "left" | "right";
  chunkData: any;
  renderSkyline: boolean;
  delayEffectMs: number;
};

const CityChunk = ({ direction, chunkData, renderSkyline, delayEffectMs }: CityChunkProps) => {
  const sortedChunkData =
    direction === "left"
      ? chunkData.sort((a, b) => (a.transitionDelay < b.transitionDelay ? 1 : -1))
      : chunkData.sort((a, b) => (a.transitionDelay < b.transitionDelay ? -1 : 1));

  const transitionDelays = sortedChunkData.map((obj) => obj.transitionDelay);
  const sortedTransitionDelays = renderSkyline ? transitionDelays : transitionDelays.reverse();
  const cityChunk = sortedChunkData.map((obj, i) => {
    const { nodeVals, width, height } = obj;
    return (
      <Building
        key={`struct${i}`}
        nodeVals={nodeVals}
        width={width}
        height={height}
        transitionDelay={sortedTransitionDelays[i]}
        delayEffectMs={delayEffectMs}
        renderSkyline={renderSkyline}
      />
    );
  });

  return (
    <div id={`city-${direction}`} className={`bottom-1 flex w-1/3 items-end justify-end gap-2`}>
      {cityChunk}
    </div>
  );
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
  const [delayEffectMs, setDelayEffectMs] = useState<number>(0);

  const $renderSkyline = useStore(renderSkyline);
  const $forestState = useStore(forestState);
  const $cityParkState = useStore(cityParkState);
  const $cityBuildingsState = useStore(cityBuildingsState);

  useEffect(() => {
    const delayEffectMs = $forestState.forestRight[$forestState.forestRight.length - 1]?.transitionDelay || 0;
    setDelayEffectMs(delayEffectMs);
  }, [$forestState]);

  return (
    <div
      data-effects-container
      onTransitionEnd={(e) => e.stopPropagation()}
      className="absolute bottom-0 -z-10 flex h-32 w-[var(--info-cont-width)] items-end justify-center"
    >
      <div id="forest-left" className="absolute bottom-0 left-0 flex h-full w-1/4 items-end">
        <Forest forestData={$forestState.forestLeft} renderSkyline={$renderSkyline} />
      </div>
      <div className="absolute flex h-full w-1/2 items-end">
        <CityChunk
          direction="left"
          chunkData={$cityBuildingsState.cityBuildingsLeft}
          renderSkyline={$renderSkyline}
          delayEffectMs={delayEffectMs}
        />
        <CityPark
          delayEffectMs={delayEffectMs}
          cityParkState={$cityParkState}
          renderSkyline={$renderSkyline}
        />
        <CityChunk
          direction="right"
          chunkData={$cityBuildingsState.cityBuildingsRight}
          renderSkyline={$renderSkyline}
          delayEffectMs={delayEffectMs}
        />
      </div>
      <div id="forest-right" className="absolute -right-2 flex h-full w-1/4 items-end">
        <Forest forestData={$forestState.forestRight} renderSkyline={$renderSkyline} />
      </div>
    </div>
  );
};

export default Skyline;
