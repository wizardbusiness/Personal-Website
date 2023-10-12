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
