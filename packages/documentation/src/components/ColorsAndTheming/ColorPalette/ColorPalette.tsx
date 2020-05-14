import React, { FC } from "react";
import scssVariables from "@react-md/theme/dist/scssVariables";

import About from "./About";
import Color, { ColorValue } from "./Color";
import ColorList from "./ColorList";

import styles from "./ColorPalette.module.scss";

interface ColorMap {
  [baseColor: string]: ColorValue[];
}

// get all the colors from the color palette
// only the color variables in this package will not be prefixed
// with rmd-theme
const colorKeys = Object.keys(scssVariables).filter(
  (name) => !/^rmd-theme/.test(name)
);

const uniqueColors = Array.from(
  new Set(
    colorKeys
      .map((k) => k.replace("rmd-", "").replace(/(-a)?-\d+$/, ""))
      .filter((k) => !k.includes("-base"))
  )
);

const colorMap = uniqueColors.reduce<ColorMap>((map, color) => {
  const r = new RegExp(`rmd-${color}-(\\d|a)`);
  map[color] = colorKeys
    .filter((k) => r.test(k))
    .map((k) => ({
      name: k,
      value: scssVariables[k as "rmd-red-500"],
    }));
  return map;
}, {});

const ColorPalette: FC = () => {
  return (
    <>
      <About />
      <div className={styles.container}>
        {Object.entries(colorMap).map(([baseColor, colors]) => (
          <ColorList key={baseColor} baseColor={baseColor} colors={colors} />
        ))}
        <ul className={styles.list}>
          <Color
            primary="black"
            name="rmd-black-base"
            value={scssVariables["rmd-black-base"]}
          />
          <Color
            primary="white"
            secondary
            name="rmd-white-base"
            value={scssVariables["rmd-white-base"]}
          />
        </ul>
      </div>
    </>
  );
};

export default ColorPalette;
