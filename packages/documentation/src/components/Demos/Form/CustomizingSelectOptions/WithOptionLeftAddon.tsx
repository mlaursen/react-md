import React, { FC, Fragment } from "react";
import { Avatar } from "@react-md/avatar";
import scssVariables from "@react-md/avatar/dist/scssVariables";
import { Select, useCheckboxState, Checkbox } from "@react-md/form";
import { CloseSVGIcon } from "@react-md/material-icons";

import immutableStates from "constants/states";
import useSelect from "./useSelect";

const COLORS = Object.keys(scssVariables["rmd-avatar-colors"]);
const states = immutableStates.map(({ name, abbreviation }, i) => ({
  leftAvatar: <Avatar color={COLORS[i % COLORS.length]}>{abbreviation}</Avatar>,
  label: name,
  value: abbreviation,
  children: (
    <span>
      {name} (<span className="rmd-typography--italic">{abbreviation}</span>)
    </span>
  ),
  rightIcon: <CloseSVGIcon />,
}));

const WithOptionLeftAddon: FC = () => {
  const [value, handleChange] = useSelect("");
  const [disableLeftAddon, handleLeftAddonChange] = useCheckboxState(false);
  return (
    <Fragment>
      <Checkbox
        id="enable-left-addon"
        label="Disable Left Addon"
        checked={disableLeftAddon}
        onChange={handleLeftAddonChange}
      />
      <Select
        id="select-using-left-addon"
        label="State"
        placeholder="Colorado"
        options={states}
        value={value}
        onChange={handleChange}
        disableLeftAddon={disableLeftAddon}
        displayLabelClassName="customizing-select-options__value"
      />
    </Fragment>
  );
};

export default WithOptionLeftAddon;
