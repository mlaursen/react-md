import { ReactElement } from "react";
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

export default function ColorPicker({
  colors,
  name,
  value,
  onChange,
}: ColorPickerProps): ReactElement {
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
}
