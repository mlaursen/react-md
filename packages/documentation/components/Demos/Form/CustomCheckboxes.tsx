import React, { FC } from "react";
import {
  Checkbox,
  Form,
  InputToggleProps,
  useCheckboxState,
} from "@react-md/form";
import {
  FavoriteBorderFontIcon,
  FavoriteSVGIcon,
} from "@react-md/material-icons";

const CustomCheckbox: FC<InputToggleProps> = ({
  defaultChecked = false,
  ...props
}) => {
  const [checked, onChange] = useCheckboxState(defaultChecked, props.onChange);

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
  </Form>
);

export default CustomCheckboxes;
