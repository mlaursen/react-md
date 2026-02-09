import { getMaterialSymbolsUrl } from "@react-md/core/icon/getMaterialSymbolsUrl";

const families = [
  "Material+Icons",
  "Material+Icons+Outlined",
  "Material+Icons+Round",
  "Material+Icons+Sharp",
  "Material+Icons+Two+Tone",
]
  .map((name) => `family=${name}`)
  .join("&");

export const EVERY_ICON_AND_SYMBOL_GOOGLE_FONT_URL = getMaterialSymbolsUrl({
  names: [],
  family: ["outlined", "rounded", "sharp"],
  fill: { min: 0, max: 1 },
  grade: { min: -25, max: 200 },
  opticalSize: { min: 20, max: 48 },
  weight: { min: 100, max: 700 },
}).replace("?family", `?${families}&family`);
