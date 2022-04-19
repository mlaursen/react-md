import type { ReactElement } from "react";
import { useState } from "react";
import { NativeSelect } from "@react-md/form";

import states from "constants/states";

export default function SimpleNativeSelect(): ReactElement {
  const [value, setValue] = useState("");
  return (
    <NativeSelect
      id="simple-native-select"
      name="select"
      label="A Label"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    >
      <option value="" disabled hidden />
      {states.map(({ name, abbreviation }) => (
        <option key={abbreviation} value={abbreviation}>
          {name}
        </option>
      ))}
    </NativeSelect>
  );
}
