import React, { FC } from "react";

import Color, { ColorValue } from "./Color";

import styles from "./ColorPalette.module.scss";

interface ColorListProps {
  baseColor: string;
  colors: ColorValue[];
}

const ColorList: FC<ColorListProps> = ({ baseColor, colors }) => {
  const baseName = `rmd-${baseColor}-500`;
  const baseValue = (colors.find((c) => c.name === baseName) || colors[6])
    .value;
  return (
    <ol className={styles.list}>
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
