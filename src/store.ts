import { atom } from "nanostores";

export const renderSkyline = atom(false);
export const cityBuildingsState = atom({ cityBuildingsLeft: [], cityBuildingsRight: [] });
export const cityParkState = atom([]);
export const forestState = atom({ forestLeft: [], forestRight: [] });
