import React, { useMemo } from "react";

const createSkylineBg = (numStructs: number) => {
  const structs = [];
  while (numStructs > 0) {
    structs.push(<SkylineShape key={`struct${numStructs}`} />);
    numStructs--;
  }
  return structs;
};

function SkylineShape() {
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const width = `${randomIntFromInterval(10, 30)}px`;
  const height = `${randomIntFromInterval(30, 70)}px`;
  const pNodes = [];
  let i = 0;
  while (i <= 4) {
    const slant = randomIntFromInterval(0, 100);
    pNodes.push(`${slant}%`);
    i++;
  }
  const shapeStyles = {
    height: height,
    width: width,
    clipPath: `polygon(${pNodes[0]} 0%, ${pNodes[0]} 0, 100% ${pNodes[1]}, 100% 100%, 0 100%, 0 ${pNodes[2]})`,
  };
  return (
    <div
      data-effect
      style={shapeStyles}
      className="hidden animate-grow bg-gray-100"
    />
  );
}

const Skyline = () => {
  const skylineLeft = useMemo(() => createSkylineBg(3), []);
  const skylineRight = useMemo(() => createSkylineBg(3), []);
  return (
    <div className="absolute h-32 w-1/2">
      <div className="absolute bottom-0 left-2 flex items-end self-end">
        {skylineLeft}
      </div>
      <div className="absolute bottom-0 right-2 flex items-end self-end">
        {skylineRight}
      </div>
    </div>
  );
};

export default Skyline;
