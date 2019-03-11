import React, { FunctionComponent, forwardRef } from "react";
import cn from "classnames";
import { Button, ButtonProps } from "@react-md/button";
import { WithForwardedRef } from "@react-md/utils";

export interface AppBarNavProps extends ButtonProps {}

type WithRef = WithForwardedRef<HTMLButtonElement>;

/**
 * This component is really just a simple wrapper for the `Button` component that adds some
 * additional styles for adding spacing before and after this button so that it aligns to
 * the main "keyline" of your application's navigation. In simpler terms, it will make
 * the left side of the icon in this button aligns with all the other icons that appear in
 * `ListItem`s in your main navigation.
 *
 * This component is generally really only used when you want to have a temporary navigation
 * element like a hamburger menu.
 */
const AppBarNav: FunctionComponent<AppBarNavProps & WithRef> = ({
  className,
  forwardedRef,
  children,
  ...props
}) => (
  <Button
    {...props}
    ref={forwardedRef}
    className={cn("rmd-app-bar__nav", className)}
  >
    {children}
  </Button>
);

AppBarNav.defaultProps = {
  buttonType: "icon",
  theme: "clear",
};

if (process.env.NODE_ENV !== "production") {
  AppBarNav.displayName = "AppBarNav";
}

export default forwardRef<HTMLButtonElement, AppBarNavProps>((props, ref) => (
  <AppBarNav {...props} forwardedRef={ref} />
));
