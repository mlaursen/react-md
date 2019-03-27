import React, { FunctionComponent } from "react";

import scssVariables from "@react-md/theme/dist/scssVariables";

const colorKeys = Object.keys(scssVariables).filter(
  name => !/rmd-(theme|light)/.test(name)
);
const uniqueColors = Array.from(
  new Set(
    colorKeys
      .map(k => k.replace("rmd-", "").replace(/(-a)?\-\d+$/, ""))
      .filter(k => !k.includes("-base"))
  )
);

interface ColorValue {
  name: string;
  value: string;
}

interface ColorMap {
  [baseColor: string]: ColorValue[];
}

const colorMap = uniqueColors.reduce<ColorMap>((map, color) => {
  const r = new RegExp(`rmd-${color}-(\\d|a)`);
  map[color] = colorKeys
    .filter(k => r.test(k))
    .map(k => ({
      name: k,
      value: scssVariables[k as "rmd-red-500"],
    }));
  return map;
}, {});

const ColorPalette: FunctionComponent = () => {
  const blocks = Object.entries(colorMap).map(([baseColor, colors]) => {});
  return null;
};

export default ColorPalette;
