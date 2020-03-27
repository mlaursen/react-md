import React, { FC } from "react";
import { Select, ListboxProps } from "@react-md/form";

interface Color {
  [key: string]: string;
  name: string;
  value: string;
}

export interface ColorPickerProps extends ListboxProps {
  name: string;
  colors: Color[];
}

const ColorPicker: FC<ColorPickerProps> = ({
  colors,
  name,
  value,
  onChange,
}) => {
  return (
    <Select
      id={`color-${name}`}
      options={colors}
      labelKey="name"
      valueKey="value"
      value={value}
      onChange={onChange}
    />
  );
};

export default ColorPicker;
