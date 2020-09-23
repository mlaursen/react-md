/* eslint-disable react/prop-types */
import React, { ReactElement, ReactNode } from "react";
import { IconRotator, TextIconSpacing } from "@react-md/icon";
import { bem } from "@react-md/utils";

export interface ToggleChildrenProps {
  children?: ReactNode;
  visible: boolean;
  dropdownIcon: ReactNode;
  disableDropdownIcon: boolean;
}

const block = bem("rmd-menu-icon");

export function ToggleChildren({
  dropdownIcon,
  disableDropdownIcon,
  children,
  visible,
}: ToggleChildrenProps): ReactElement {
  if (disableDropdownIcon || !dropdownIcon) {
    return <>{children}</>;
  }

  return (
    <TextIconSpacing
      icon={
        <IconRotator rotated={visible} className={block()}>
          {dropdownIcon}
        </IconRotator>
      }
      iconAfter
    >
      {children}
    </TextIconSpacing>
  );
}
