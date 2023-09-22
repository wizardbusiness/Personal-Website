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
  const width = `${Math.floor(Math.random() * 40)}px`;
  const height = `${Math.floor(Math.random() * 80)}px`;
  const shapeStyles = {
    backgroundColor: "white",
    height: height,
    width: width,
    clipPath: "polygon(30% 0%, 100% 0, 100% 50%, 100% 100%, 0 100%, 0 15%)",
  };
  return <div style={shapeStyles} />;
}

const Skyline = () => {
  // const skylineLeft = useMemo(() => createSkylineBg(3), [])
  // const skylineRight = useMemo(() => createSkylineBg(3), [])
  return (
    <div className="absolute h-32 w-2/5">
      <div className="absolute bottom-0 left-2 self-end">Hi</div>
      <div className="absolute bottom-0 right-2 self-end">Hi</div>
    </div>
  );
};

export default Skyline;
