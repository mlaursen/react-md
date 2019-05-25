import React, { FC } from "react";
import { bem } from "@react-md/theme";
import Color, { ColorValue } from "./Color";

interface ColorListProps {
  baseColor: string;
  colors: ColorValue[];
}

const block = bem("color-palette");

const ColorList: FC<ColorListProps> = ({ baseColor, colors }) => {
  const baseName = `rmd-${baseColor}-500`;
  const baseValue = (colors.find(c => c.name === baseName) || colors[6]).value;
  return (
    <ol className={block("list")}>
      <Color
        key="primary"
        primary={baseColor}
        name={baseName}
        value={baseValue}
      />
      {colors.map(({ name, value }) => (
        <Color
          key={name}
          name={name}
          value={value}
          secondary={name.includes("-a-100")}
        />
      ))}
    </ol>
  );
};

export default ColorList;
