import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import {
  DEFAULT_DIALOG_CLASSNAMES,
  DEFAULT_DIALOG_TIMEOUT,
} from "@react-md/core/dialog/styles";
import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
import { type ReactElement } from "react";

export interface ReturnToTopProps {
  visible: boolean;
  scrollToTop: () => void;
}

export function ReturnToTop({
  visible,
  scrollToTop,
}: Readonly<ReturnToTopProps>): ReactElement {
  const { elementProps: floatingProps } = useCSSTransition({
    timeout: DEFAULT_DIALOG_TIMEOUT,
    classNames: DEFAULT_DIALOG_CLASSNAMES,
    transitionIn: visible,
    exitedHidden: true,
  });

  return (
    <TooltippedButton
      aria-label="Return to top"
      floating="bottom-right"
      onClick={scrollToTop}
      floatingProps={floatingProps}
      tooltip="Return to top"
      tooltipProps={{ textOverflow: "nowrap" }}
    >
      <ArrowUpwardIcon />
    </TooltippedButton>
  );
}
