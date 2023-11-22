import type { ReactElement, FC } from "react";

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomDecNumFromInterval = (
  min: number,
  max: number,
  decPlaces = 1,
) => {
  return (
    Math.round((Math.random() * (max - min) + min) * 10 ** decPlaces) /
    10 ** decPlaces
  );
};

type elArray = (number | string)[] | FC[];
export const randomElFromArray = (elArray: elArray): number | string | FC => {
  const elsLength = elArray.length;
  const randomIndex = Math.floor(Math.random() * elsLength);
  return elArray[randomIndex];
};
