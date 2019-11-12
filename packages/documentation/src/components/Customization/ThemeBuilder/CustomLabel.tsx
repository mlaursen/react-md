import React, { FC, ReactNode, Fragment } from "react";

export interface CustomLabelProps {
  isDefault: boolean;
  children: ReactNode;
}

const CustomLabel: FC<CustomLabelProps> = ({ children, isDefault }) => {
  if (!isDefault) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Fragment>
      {children}{" "}
      <small>
        <i>(site default)</i>
      </small>
    </Fragment>
  );
};

export default CustomLabel;
