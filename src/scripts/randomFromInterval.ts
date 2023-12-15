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

export const generateWeightedRandomInRange = (
  min: number,
  max: number,
  mean: number,
  variance: number,
) => {
  const u1 = Math.random();
  const u2 = Math.random();

  const weightedRandom =
    mean + Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * variance;
  return Math.max(min, Math.min(max, weightedRandom));
};

/**
 *
 * @param min
 * @param max
 * @param curve
 *
 */

type coordNode = {
  x: number;
  y: number;
};
export const generatedWeightedCoords = (
  innerWidth: number,
  innerHeight: number,
  width: number,
  height: number,
  variance: number,
  slope: number,
  intercept: number,
  i: number,
  count: number,
): coordNode => {
  const normalRandom = () => {
    return (
      Math.sqrt(-2 * Math.log(Math.random())) *
      Math.cos(2 * Math.PI * Math.random())
    );
  };
  const x = Math.floor(((innerWidth - width) / count) * i + width);
  const y = i * slope + normalRandom() * variance + intercept + height;
  // const y = 500;

  return { x: x, y: y };
};
