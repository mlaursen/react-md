import React, { FunctionComponent, HTMLAttributes, ReactNode } from "react";
import { ViewHeadlineSVGIcon, CloseSVGIcon } from "@react-md/material-icons";

import Button from "components/Button";

export interface ToggleProps {
  onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
  isLargeDesktop: boolean;
  isDialogVisible: boolean;
}

const Toggle: FunctionComponent<ToggleProps> = ({
  onClick,
  isLargeDesktop,
  isDialogVisible,
}) => {
  let tooltip: ReactNode = null;
  if (!isLargeDesktop) {
    tooltip = "Table of Contents";
  }

  return (
    <Button
      id="table-of-contents-toggle"
      tooltip={tooltip}
      theme="clear"
      buttonType="icon"
      className="table-of-contents-toggle"
      aria-labelledby="table-of-contents-title"
      onClick={onClick}
      disabled={isLargeDesktop}
    >
      {!isLargeDesktop && isDialogVisible ? (
        <CloseSVGIcon />
      ) : (
        <ViewHeadlineSVGIcon />
      )}
    </Button>
  );
};

export default Toggle;
