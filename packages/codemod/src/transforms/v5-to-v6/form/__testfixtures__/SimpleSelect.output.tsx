 // TODO: The `Select` component no longer provides the `option` and `listboxChangeEventData` as the 2nd and 3rd arguments for the `onChange` handler. Check if the code needs to be updated.
import { ReactNode, useState, type ReactElement } from "react";
import { Option, Select } from "react-md";

const FRUITS = ["Appple", "Banana", "Peach", "Pineapple"];

export default function SimpleSelectExample(): ReactElement {
  const [value, setValue] = useState("");
  return (
    <Select
      id="simple-select-example"
      label="A Label"
      placeholder="Choose..."
      name="select"
      value={value}
      onChange={event => {
        const value = event.currentTarget.value;
        setValue(value);
      }}>{FRUITS.map(option => {
        // TODO: Update this code to match the option type
        let label: ReactNode;

        let value: string | number;

        if (option === null) {
          label = "";
          value = "";
        } else if (typeof option === "string" || typeof option === "number") {
          label = option;
          value = option;
        } else {
          label = option.label;
          value = option.value;
        }

        return <Option key={value} value={value}>{label}</Option>;
      })}</Select>
  );
}
