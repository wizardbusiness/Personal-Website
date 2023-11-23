import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { randomIntFromInterval } from "../../scripts/randomFromInterval";
import Forest from "./Forest";
import CityPark from "./CityPark";
import "../../styles/tailwind.css";

const Building = ({ delay, height, width }) => {
  const [build, setBuild] = useState(false);
  const [render, setRender] = useState(false);
  const [, setTransitionEnd] = useState(false);
  const shapeRef = useRef(null);

  const handleTransitionEnd = () => {
    setTransitionEnd(true);
  };

  useEffect(() => {
    setRender(true);
    const delayBuild = setTimeout(() => {
      setBuild(true);
    }, 375);
    return () => {
      clearTimeout(delayBuild);
    };
  }, [render]);
  // only represent values for targetable nodes not all nodes. each pair represents the targetable values for a quadrant
  // css polygons have a percentage based scale where
  // the upper left is 0% 0% and the lower right is 100% 100%, these values represent these.
  const initialNodeValPairs = [
    // upper left, lower left
    [0, 50],
    [50, 100],
    // upper right, lower right
    [100, 50],
    [50, 100],
  ];

  const chooseNodeValues = (nodeValPairs: number[][]) => {
    const targetIndex = randomIntFromInterval(0, nodeValPairs.length - 1); // will randomly select index to modify values at.
    return targetIndex;
  };
  // customizable node values
  const setNodeVals = (
    targetIndex: number,
    nodeValuePairs: number[][],
    probability: number = 0.3,
  ) => {
    // set the probability that a modification will take place. currently 30%
    const modCheckPass = Math.random() <= probability ? true : false;
    // if check doesn't pass dont modify any node values
    if (modCheckPass === false) return nodeValuePairs;
    // choose values to modify by target index
    const moddedValues = nodeValuePairs.map((valPair: number[], index) => {
      if (index === targetIndex) {
        // modify the values;
        return valPair.map((value: number) => {
          return randomIntFromInterval(0, 80);
        });
      } else {
        // leave untargeted indexes alone.
        return valPair;
      }
    });
    return moddedValues;
  };
  // memoize all to avoid values changing in non deterministic way during rerendering due to random values.
  const targetIndex = useMemo(() => chooseNodeValues(initialNodeValPairs), []);
  const nodeVals = useMemo(
    () => setNodeVals(targetIndex, initialNodeValPairs, 0.4),
    [],
  );
  const shapeStyles = {
    height: `${height}px`,
    width: `${width}px`,
    clipPath: `polygon(${nodeVals[0][0]}% 0, ${nodeVals[2][0]}% 0, 100% ${nodeVals[2][1]}%, 100% 100%, 0 100%, 0 ${nodeVals[0][1]}%)`,
    transitionDelay: `${delay * 120}ms`,
  };
  return (
    <>
      {render && (
        <div
          ref={shapeRef}
          data-effect
          style={shapeStyles}
          className={`structure ${
            build && "build"
          } flex flex-wrap place-content-evenly gap-[2px] border border-slate-600 bg-slate-600`}
          onTransitionEnd={handleTransitionEnd}
        >
          <Windows shapeH={height} shapeW={width} delay={delay} />
        </div>
      )}
    </>
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

const Window = ({ showWindow }) => {
  const [lightOn, setLightOn] = useState(showWindow);
  const [frequency, setFrequency] = useState(
    randomIntFromInterval(3000, 150000),
  );

  useEffect(() => {
    const cycleLight = setInterval(() => {
      setFrequency(randomIntFromInterval(10000, 150000));
      setLightOn(!lightOn);
    }, frequency);

    return () => clearInterval(cycleLight);
  }, [lightOn, frequency]);

  return (
    <div
      className={`window ${lightOn && "show"} h-[3px] w-[3px] bg-gray-100`}
    />
  );
};

type CityChunkProps = {
  direction: "left" | "right";
  cityChunkWidth: number;
};

const CityChunk = ({ direction, cityChunkWidth }: CityChunkProps) => {
  const renderStructures = (direction: "left" | "right") => {
    const calcHeightMod = (index: number, min: number, max: number) => {
      const noise = randomIntFromInterval(-10, 10);
      const height = 10 * index + 30 * Math.cos((20 * i) ** 1 / 2) + noise;
      const heightClamp =
        height > max ? randomIntFromInterval(10, height / 2) : 0;
      return height < min ? min : height - heightClamp;
    };

    const structs = [];
    let remainingChunkSpace = cityChunkWidth;
    let i = 0;
    while (remainingChunkSpace > 0) {
      const structureWidth: number = randomIntFromInterval(15, 25);
      const structureHeight: number = calcHeightMod(i, 20, 60);
      structs.push(
        <Building
          key={`struct${i}`}
          width={structureWidth}
          height={structureHeight}
          delay={i}
        />,
      );
      remainingChunkSpace -= structureWidth;
      i++;
    }
    return direction === "left"
      ? structs.sort((a, b) => (a.props.index < b.props.index ? 1 : -1))
      : structs.sort((a, b) => (a.props.index < b.props.index ? -1 : 1));
  };

  const chunk = renderStructures(direction);

  return (
    <div className={`bottom-1 flex w-1/3 items-end justify-end gap-2`}>
      {chunk}
    </div>
  );
};

const Skyline = () => {
  const [forestWidth, setForestWidth] = useState<number>(0);
  const [cityWidth, setCityWidth] = useState<number>(0);
  const [delayEffectMs, setDelayEffectMs] = useState<number>(0);
  const forestWidthRef = useRef<HTMLDivElement>(null);
  const cityWidthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const forestWidth = Math.floor(
      forestWidthRef.current?.getBoundingClientRect().width,
    );
    setForestWidth(forestWidth);

    const cityWidth = Math.floor(
      cityWidthRef.current?.getBoundingClientRect().width,
    );
    setCityWidth(cityWidth);
  }, [forestWidthRef, cityWidth]);
  return (
    <div
      data-effects-container
      onTransitionEnd={(e) => e.stopPropagation()}
      className="absolute bottom-1 flex h-32 w-[90vw] items-end justify-center lg:w-[70vw]"
    >
      <div
        data-forest
        ref={forestWidthRef}
        className="absolute left-0 flex h-full w-1/4 items-end"
      >
        <Forest
          chunkWidth={forestWidth}
          direction={"left"}
          setDelayEffectMs={setDelayEffectMs}
        />
      </div>
      <div ref={cityWidthRef} className="absolute flex w-1/2">
        <CityChunk
          direction="left"
          cityChunkWidth={Math.floor(cityWidth / 4)}
        />
        <CityPark delayEffectMs={delayEffectMs} />
        <CityChunk
          direction="right"
          cityChunkWidth={Math.floor(cityWidth / 4)}
        />
      </div>
      <div
        data-forest
        className="absolute -right-2 flex h-full w-1/4 items-end"
      >
        <Forest
          setDelayEffectMs={setDelayEffectMs}
          chunkWidth={forestWidth}
          direction={"right"}
        />
      </div>
    </div>
  );
};

export default Skyline;
