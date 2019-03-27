import React, { FunctionComponent, forwardRef } from "react";
import cn from "classnames";
import { Button, ButtonProps } from "@react-md/button";
import { WithForwardedRef } from "@react-md/utils";
import { bem } from "@react-md/theme";

export interface AppBarActionProps extends ButtonProps {
  /**
   * Boolean if this is the first action within the app bar. This is really just used to
   * automatically right-align all the actions by applying `margin-left: auto` to this action.
   */
  first?: boolean;

  /**
   * Boolean if this is the last action within the app bar's row. This will just apply the
   * `$rmd-app-bar-lr-margin` as `margin-right`.
   *
   * NOTE: This should not be used when using an overflow menu.
   */
  last?: boolean;
}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<AppBarActionProps, "first" | "last" | "buttonType" | "theme">
>;
type WithDefaultProps = AppBarActionProps & DefaultProps & WithRef;

const block = bem("rmd-app-bar");

/**
 * This component is really just a simple wrapper for the `Button` component that adds a few
 * additional styles to prevent the button from shrinking when an `AppBar` has a lot of content.
 * It also will automatically add spacing either before or after this button when the `first`
 * or `last` props are provided.
 */
const AppBarAction: FunctionComponent<
  AppBarActionProps & WithRef
> = providedProps => {
  const {
    className,
    first,
    last,
    children,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <Button
      {...props}
      ref={forwardedRef}
      className={cn(block("action", { first, last }), className)}
    >
      {children}
    </Button>
  );
};

const defaultProps: DefaultProps = {
  first: false,
  last: false,
  buttonType: "icon",
  theme: "clear",
};

AppBarAction.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  AppBarAction.displayName = "AppBarAction";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    AppBarAction.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      first: PropTypes.bool,
      last: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLButtonElement, AppBarActionProps>(
  (props, ref) => <AppBarAction {...props} forwardedRef={ref} />
);
