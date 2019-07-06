import React, { FC, Fragment } from "react";
import { bem } from "@react-md/theme";
import scssVariables from "@react-md/theme/dist/scssVariables";

import "./ColorPalette.scss";
import About from "./About";
import Color, { ColorValue } from "./Color";
import ColorList from "./ColorList";

interface ColorMap {
  [baseColor: string]: ColorValue[];
}

// get all the colors from the color palette
// only the color variables in this package will not be prefixed
// with rmd-theme
const colorKeys = Object.keys(scssVariables).filter(
  name => !/^rmd-theme/.test(name)
);

const uniqueColors = Array.from(
  new Set(
    colorKeys
      .map(k => k.replace("rmd-", "").replace(/(-a)?\-\d+$/, ""))
      .filter(k => !k.includes("-base"))
  )
);

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

const block = bem("color-palette");

const ColorPalette: FC = () => {
  return (
    <Fragment>
      <About />
      <div className={block()}>
        {Object.entries(colorMap).map(([baseColor, colors]) => (
          <ColorList key={baseColor} baseColor={baseColor} colors={colors} />
        ))}
        <ul className={block("list")}>
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
    </Fragment>
  );
};

export default ColorPalette;
