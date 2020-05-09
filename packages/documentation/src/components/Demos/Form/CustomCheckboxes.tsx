import React, { FC } from "react";
import { Divider } from "@react-md/divider";
import { Checkbox, Form, InputToggleProps, useChecked } from "@react-md/form";
import {
  FavoriteBorderFontIcon,
  FavoriteSVGIcon,
} from "@react-md/material-icons";

import "./CustomCheckboxes.scss";

const CustomCheckbox: FC<InputToggleProps> = ({
  defaultChecked = false,
  onChange: propOnChange,
  ...props
}) => {
  const [checked, onChange] = useChecked(defaultChecked, propOnChange);

  return (
    <Checkbox
      {...props}
      checked={checked}
      onChange={onChange}
      icon={checked ? <FavoriteSVGIcon /> : <FavoriteBorderFontIcon />}
      disableIconOverlay
    />
  );
};

const CustomCheckboxes: FC = () => (
  <Form>
    <CustomCheckbox
      id="custom-checkbox-1"
      name="custom-checkbox"
      label="Checkbox 1"
    />
    <CustomCheckbox
      id="custom-checkbox-2"
      name="custom-checkbox"
      label="Checkbox 2"
      defaultChecked
    />
    <CustomCheckbox
      id="custom-checkbox-3"
      name="custom-checkbox"
      label="Checkbox 3"
      disabled
    />
    <CustomCheckbox
      id="custom-checkbox-4"
      name="custom-checkbox"
      label="Checkbox 4"
      disabled
      defaultChecked
    />
    <Divider />
    <Checkbox
      id="custom-checkbox-5"
      label="Super Small"
      name="custom-checkbox"
      className="super-small-toggle"
    />
    <Checkbox
      id="custom-checkbox-6"
      label="Super Large"
      name="custom-checkbox"
      className="super-large-toggle"
    />
  </Form>
);

export default CustomCheckboxes;
