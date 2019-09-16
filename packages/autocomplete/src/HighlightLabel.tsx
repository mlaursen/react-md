/* eslint-disable react/prop-types */
import React, { FC, ReactNode, Fragment } from "react";

export interface HighlightLabelProps {
  value: string;
  enabled: boolean;
  children: ReactNode;
}

const HighlightLabel: FC<HighlightLabelProps> = ({
  enabled,
  value,
  children,
}) => {
  if (!enabled || !value || typeof children !== "string") {
    return <Fragment>{children}</Fragment>;
  }

  const i = children.toLowerCase().indexOf(value);
  if (i === -1) {
    return <Fragment>{children}</Fragment>;
  }

  const end = i + value.length;
  return (
    <Fragment>
      {children.substring(0, i)}
      <strong>{children.substring(i, end)}</strong>
      {children.substring(end)}
    </Fragment>
  );
};

export default HighlightLabel;
