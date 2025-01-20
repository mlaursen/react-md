"use client";

import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import {
  DEFAULT_DIALOG_CLASSNAMES,
  DEFAULT_DIALOG_TIMEOUT,
} from "@react-md/core/dialog/styles";
import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
import { useIntersectionObserver } from "@react-md/core/useIntersectionObserver";
import ArrowUpwardIcon from "@react-md/material-icons/ArrowUpwardIcon";
import { type ReactElement, useCallback, useState } from "react";

export function ReturnToTop(): ReactElement {
  const [visible, setVisible] = useState(false);
  const targetRef = useIntersectionObserver({
    onUpdate: useCallback(([entry]) => {
      setVisible(!entry.isIntersecting);
    }, []),
  });

  const { elementProps: floatingProps } = useCSSTransition({
    timeout: DEFAULT_DIALOG_TIMEOUT,
    classNames: DEFAULT_DIALOG_CLASSNAMES,
    transitionIn: visible,
    exitedHidden: true,
  });
  return (
    <>
      <span ref={targetRef} />
      <TooltippedButton
        aria-label="Return to top"
        floating="bottom-right"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        floatingProps={floatingProps}
        tooltip="Return to top"
        tooltipProps={{ textOverflow: "nowrap" }}
      >
        <ArrowUpwardIcon />
      </TooltippedButton>
    </>
  );
}
