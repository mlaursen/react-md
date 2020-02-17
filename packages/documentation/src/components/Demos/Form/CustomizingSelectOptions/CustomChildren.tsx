import React, { FC, Fragment } from "react";
import { Select } from "@react-md/form";

import desserts from "constants/desserts";

import useSelect from "./useSelect";

const options = desserts.map(({ name, calories }, i) => ({
  // this is required for a11y so that the user can still "search"
  // for this field by typing letters while the select is visible.
  // if this was not provided, a warning would be thrown in the console
  // for this select component explaining that the `children` prop
  // can't be used for searching since it is not a string
  label: name,
  value: `dessert-${i}`,
  children: (
    <Fragment>
      <span className="rmd-typography--bold">{name.substring(0, 3)}</span>
      {name.substring(3)}
      <span className="rmd-typography--italic">{` (${calories} kcal)`}</span>
    </Fragment>
  ),
}));

const CustomChildren: FC = () => {
  const [value, handleChange] = useSelect(options[0].value);
  return (
    <Select
      id="select-using-custom-children"
      label="State"
      placeholder="Colorado"
      options={options}
      value={value}
      onChange={handleChange}
    />
  );
};

export default CustomChildren;
