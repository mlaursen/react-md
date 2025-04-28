import states from "constants/states";
import { type ReactElement, useState } from "react";
import { Select } from "react-md";

export default function SimpleSelectExample(): ReactElement {
  const [value, setValue] = useState("");
  return (
    <Select
      id="simple-select-example"
      label="A Label"
      placeholder="Choose..."
      name="select"
      options={states.map(({ abbreviation, name }) => ({
        label: name,
        value: abbreviation,
      }))}
      value={value}
      onChange={(value) => setValue(value)}
    />
  );
}

