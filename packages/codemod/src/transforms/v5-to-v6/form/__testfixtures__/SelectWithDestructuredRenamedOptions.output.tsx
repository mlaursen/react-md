 // TODO: The `Select` component no longer provides the `option` and `listboxChangeEventData` as the 2nd and 3rd arguments for the `onChange` handler. Check if the code needs to be updated.
import states from "constants/states";
import { type ReactElement, useState } from "react";
import { Option, Select } from "react-md";

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
      }}>{states.map(({ abbreviation, name }) => {
        return <Option key={abbreviation} value={abbreviation}>{name}</Option>;
      })}</Select>
  );
}

