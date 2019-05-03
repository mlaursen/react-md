import React, { FunctionComponent, HTMLAttributes } from "react";
import { Button } from "@react-md/button";
import { ViewHeadlineSVGIcon, CloseSVGIcon } from "@react-md/material-icons";

export interface ToggleProps {
  onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
  isLargeDesktop: boolean;
  isDialogVisible: boolean;
}

const Toggle: FunctionComponent<ToggleProps> = ({
  onClick,
  isLargeDesktop,
  isDialogVisible,
}) => (
  <Button
    id="table-of-contents-toggle"
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

export default Toggle;
