import React, { FC, useState, useCallback } from "react";
import { Select, ListboxOption } from "@react-md/form";

import TextFieldThemeConfig from "./TextFieldThemeConfig";

const options = Array.from(new Array(8), (_, i) => `Option ${i + 1}`);

const SelectExample: FC = () => {
  const [value, setValue] = useState("");
  const handleChange = useCallback(
    (nextValue: string, _option: ListboxOption) => {
      setValue(nextValue);
    },
    []
  );
  return (
    <TextFieldThemeConfig
      idPrefix="custom-select"
      disableRightIcon
      renderField={({ rightChildren, ...props }) => (
        <Select
          {...props}
          id="custom-select-1"
          options={options}
          value={value}
          onChange={handleChange}
        />
      )}
    />
  );
};

export default SelectExample;
