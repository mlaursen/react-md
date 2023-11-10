"use client";
import {
  Button,
  DEFAULT_DIALOG_CLASSNAMES,
  DEFAULT_DIALOG_TIMEOUT,
  Tooltip,
  useCSSTransition,
  useIntersectionObserver,
  useTooltip,
} from "@react-md/core";
import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
import { useCallback, useState, type ReactElement } from "react";

export function ReturnToTop(): ReactElement {
  const [visible, setVisible] = useState(false);
  const targetRef = useIntersectionObserver({
    onUpdate: useCallback(([entry]) => {
      setVisible(!entry.isIntersecting);
    }, []),
  });

  const { elementProps, tooltipProps } = useTooltip();
  const { elementProps: floatingProps } = useCSSTransition({
    timeout: DEFAULT_DIALOG_TIMEOUT,
    classNames: DEFAULT_DIALOG_CLASSNAMES,
    transitionIn: visible,
    exitedHidden: true,
  });
  return (
    <>
      <span ref={targetRef} />
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
      <Tooltip {...tooltipProps} textOverflow="nowrap">
        Return to top
      </Tooltip>
    </>
  );
}
