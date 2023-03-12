import {
  Button,
  DEFAULT_DIALOG_CLASSNAMES,
  DEFAULT_DIALOG_TIMEOUT,
  Tooltip,
  useCSSTransition,
  useTooltip,
} from "@react-md/core";
import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
import type { ReactElement } from "react";

export interface ReturnToTopProps {
  visible: boolean;
}

export function ReturnToTop(props: ReturnToTopProps): ReactElement {
  const { visible } = props;

  const { elementProps, tooltipProps } = useTooltip();
  const { elementProps: floatingProps } = useCSSTransition({
    timeout: DEFAULT_DIALOG_TIMEOUT,
    classNames: DEFAULT_DIALOG_CLASSNAMES,
    transitionIn: visible,
    exitedHidden: true,
  });
  return (
    <>
      <Button
        {...elementProps}
        floatingProps={floatingProps}
        aria-label="Return to top"
        floating="bottom-right"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ArrowUpwardIcon />
      </Button>
      <Tooltip {...tooltipProps} disableLineWrap>
        Return to top
      </Tooltip>
    </>
  );
}
