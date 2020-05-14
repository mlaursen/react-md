import React, { FC, HTMLAttributes, ReactNode } from "react";
import { ViewHeadlineSVGIcon, CloseSVGIcon } from "@react-md/material-icons";

import Button from "components/Button";

import styles from "./Toggle.module.scss";

export interface ToggleProps {
  onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
  isLargeDesktop: boolean;
  isDialogVisible: boolean;
}

const Toggle: FC<ToggleProps> = ({
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
      className={styles.button}
      aria-label="Table of Contents"
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
