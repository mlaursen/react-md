/* eslint-disable react/prop-types */
import React, { FC, Fragment, ReactNode } from "react";
import { IconRotator, TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/theme";

export interface ToggleChildrenProps {
  visible: boolean;
  dropdownIcon: ReactNode;
  disableDropdownIcon: boolean;
}

const block = bem("rmd-menu-icon");

const ToggleChildren: FC<ToggleChildrenProps> = ({
  dropdownIcon,
  disableDropdownIcon,
  children,
  visible,
}) => {
  if (disableDropdownIcon || !dropdownIcon) {
    return <Fragment>{children}</Fragment>;
  }

  const icon = (
    <IconRotator rotated={visible} className={block()}>
      {dropdownIcon}
    </IconRotator>
  );
  return (
    <TextIconSpacing icon={icon} iconAfter>
      {children}
    </TextIconSpacing>
  );
};

export default ToggleChildren;
