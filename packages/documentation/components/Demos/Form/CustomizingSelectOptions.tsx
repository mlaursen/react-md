import React, { FC, useState, useCallback } from "react";
import { Select } from "@react-md/form";

import immutableStates from "constants/states";

import "./CustomizingSelectOptions.scss";

// { name: string, abbreviation: string }
const states = immutableStates.slice();

const CustomizingSelectOptions: FC = () => {
  const [state, setState] = useState("");
  const handleStateChange = useCallback((nextValue: string) => {
    setState(nextValue);
  }, []);

  return (
    <div className="customizing-select-options">
      <Select
        id="select-1"
        label="State"
        placeholder="Colorado"
        labelKey="name"
        valueKey="abbreviation"
        value={state}
        onChange={handleStateChange}
        options={states}
        disableMovementChange
      />
    </div>
  );
};

export default CustomizingSelectOptions;
