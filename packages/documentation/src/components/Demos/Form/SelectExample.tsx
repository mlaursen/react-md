import React, { FC, useCallback, useState } from "react";
import {
  Checkbox,
  Fieldset,
  ListboxOption,
  Select,
  useCheckboxState,
} from "@react-md/form";

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
  const [disableMovementChange, handleMovementChange] = useCheckboxState(false);

  return (
    <TextFieldThemeConfig
      idPrefix="custom-select"
      disableRightIcon
      renderField={({ rightChildren: _rightChildren, ...props }) => (
        <Select
          {...props}
          id="custom-select-1"
          options={options}
          value={value}
          onChange={handleChange}
          disableMovementChange={disableMovementChange}
        />
      )}
    >
      <Fieldset legend="Select options">
        <Checkbox
          id="custom-select-disable-movement"
          label="Disable keyboard movement change"
          checked={disableMovementChange}
          onChange={handleMovementChange}
        />
      </Fieldset>
    </TextFieldThemeConfig>
  );
};

export default SelectExample;
