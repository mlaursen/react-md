import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@react-md/button";

import {
  AppBarActionClassNameProps,
  useActionClassName,
} from "./useActionClassName";

export interface AppBarActionProps
  extends ButtonProps,
    AppBarActionClassNameProps {}

/**
 * This component is really just a simple wrapper for the `Button` component
 * that adds a few additional styles to prevent the button from shrinking when
 * an `AppBar` has a lot of content.  It also will automatically add spacing
 * either before or after this button when the `first` or `last` props are
 * provided.
 */
export const AppBarAction = forwardRef<HTMLButtonElement, AppBarActionProps>(
  function AppBarAction(
    {
      className,
      first = false,
      last = false,
      children,
      inheritColor,
      floating,
      theme = floating ? "secondary" : "clear",
      buttonType = "icon",
      ...props
    },
    ref
  ) {
    return (
      <Button
        {...props}
        theme={theme}
        buttonType={buttonType}
        floating={floating}
        ref={ref}
        className={useActionClassName({ first, last, inheritColor, className })}
      >
        {children}
      </Button>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    AppBarAction.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      first: PropTypes.bool,
      last: PropTypes.bool,
      theme: PropTypes.oneOf([
        "primary",
        "secondary",
        "warning",
        "error",
        "clear",
      ]),
      buttonType: PropTypes.oneOf(["text", "icon"]),
      floating: PropTypes.oneOf([
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ]),
      inheritColor: PropTypes.bool,
    };
  } catch (e) {}
}
