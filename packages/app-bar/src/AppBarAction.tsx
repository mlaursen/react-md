import React, { FC, forwardRef } from "react";
import { Button, ButtonProps } from "@react-md/button";
import { WithForwardedRef } from "@react-md/utils";

import useActionClassName, {
  AppBarActionClassNameProps,
} from "./useActionClassName";

export interface AppBarActionProps
  extends ButtonProps,
    AppBarActionClassNameProps {}

type WithRef = WithForwardedRef<HTMLButtonElement>;
type DefaultProps = Required<
  Pick<AppBarActionProps, "first" | "last" | "buttonType" | "theme">
>;
type WithDefaultProps = AppBarActionProps & DefaultProps & WithRef;

/**
 * This component is really just a simple wrapper for the `Button` component that adds a few
 * additional styles to prevent the button from shrinking when an `AppBar` has a lot of content.
 * It also will automatically add spacing either before or after this button when the `first`
 * or `last` props are provided.
 */
const AppBarAction: FC<AppBarActionProps & WithRef> = providedProps => {
  const {
    className,
    first,
    last,
    children,
    forwardedRef,
    inheritColor,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <Button
      {...props}
      ref={forwardedRef}
      className={useActionClassName({ first, last, inheritColor, className })}
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
