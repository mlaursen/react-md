import { Button } from "@react-md/core/button/Button";
import { cssUtils } from "@react-md/core/cssUtils";
import {
  DEFAULT_OVERLAY_CLASSNAMES,
  DEFAULT_OVERLAY_TIMEOUT,
} from "@react-md/core/overlay/styles";
import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
import { useToggle } from "@react-md/core/useToggle";
import ErrorOutlineIcon from "@react-md/material-icons/ErrorOutlineIcon";
import KeyboardArrowRightIcon from "@react-md/material-icons/KeyboardArrowRightIcon";
import { type ReactElement, useEffect } from "react";

import styles from "./ScssCodeError.module.scss";

export interface ScssCodeErrorProps {
  error: Error;
}

export function ScssCodeError({
  error,
}: Readonly<ScssCodeErrorProps>): ReactElement {
  const { enable, toggle, toggled } = useToggle(true);
  const { elementProps, rendered } = useCSSTransition({
    appear: true,
    transitionIn: toggled,
    temporary: true,
    timeout: DEFAULT_OVERLAY_TIMEOUT,
    classNames: DEFAULT_OVERLAY_CLASSNAMES,
    className: cssUtils({
      className: styles.tooltip,
      textColor: "error",
    }),
  });
  useEffect(() => {
    enable();
  }, [enable, error]);

  return (
    <>
      <Button
        aria-label="Hide"
        aria-pressed={!toggled}
        iconSize="small"
        floating="top-right"
        floatingProps={{ absolute: true, className: styles.fab }}
        theme="error"
        onClick={toggle}
      >
        {toggled ? <KeyboardArrowRightIcon /> : <ErrorOutlineIcon />}
      </Button>
      {rendered && (
        <pre {...elementProps}>
          <code>{error.message}</code>
        </pre>
      )}
    </>
  );
}
