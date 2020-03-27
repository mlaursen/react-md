import React, { FC, ReactNode } from "react";

export interface CustomLabelProps {
  isDefault: boolean;
  children: ReactNode;
}

const CustomLabel: FC<CustomLabelProps> = ({ children, isDefault }) => {
  if (!isDefault) {
    return <>{children}</>;
  }

  return (
    <>
      {children}{" "}
      <small>
        <i>(site default)</i>
      </small>
    </>
  );
};

export default CustomLabel;
