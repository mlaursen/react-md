import { type ReactElement, useState } from "react";
import { Select } from "react-md";

const FRUITS = ["Appple", "Banana", "Peach", "Pineapple"];

export default function SimpleSelectExample(): ReactElement {
  const [value, setValue] = useState("");
  return (
    <Select
      id="simple-select-example"
      label="A Label"
      placeholder="Choose..."
      name="select"
      options={FRUITS}
      value={value}
      onChange={(value) => setValue(value)}
    />
  );
}
