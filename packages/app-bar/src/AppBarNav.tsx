import React, { FunctionComponent, forwardRef } from "react";
import cn from "classnames";
import { Button, IButtonProps } from "@react-md/button";
import { IWithForwardedRef } from "@react-md/utils";

export interface IAppBarNavProps
  extends IButtonProps,
    IWithForwardedRef<HTMLButtonElement> {}

const AppBarNav: FunctionComponent<IAppBarNavProps> = ({
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
};

if (process.env.NODE_ENV !== "production") {
  // there's a problem with forwardedRef components that set the `displayName` to `undefined`
  AppBarNav.displayName = "AppBarNav";
}

export default forwardRef<HTMLButtonElement, IAppBarNavProps>((props, ref) => (
  <AppBarNav {...props} forwardedRef={ref} />
));
