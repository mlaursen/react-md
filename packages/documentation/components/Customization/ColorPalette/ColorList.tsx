import React, { FunctionComponent } from "react";

interface ColorValue {
  name: string;
  value: string;
}

export interface ColorListProps {
  baseColor: string;
  colors: ColorValue[];
}

const Color: FunctionComponent<ColorValue> = ({ name, value }) => (
  <li
    className={`color-palette__color color-palette__color--name.replace(/^rmd-/, "")`}
  >
    {name}: {value}
  </li>
);

const ColorList: FunctionComponent<ColorListProps> = props => {
  return null;
};

export default ColorList;
