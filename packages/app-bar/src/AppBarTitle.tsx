import React, { forwardRef, FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

export interface IAppBarTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    IWithForwardedRef<HTMLHeadingElement> {
  /**
   * Boolean if the title should be placed at the `$rmd-app-bar-title-keyline`.
   */
  keyline?: boolean;
}

export interface IAppBarTitleDefaultProps {
  keyline: boolean;
}

export type AppBarTitleWithDefaultProps = IAppBarTitleProps &
  IAppBarTitleDefaultProps;

const AppBarTitle: FunctionComponent<IAppBarTitleProps> = ({
  keyline,
  className,
  forwardedRef,
  children,
  ...props
}) => (
  <h6
    {...props}
    className={cn(
      "rmd-app-bar__title",
      {
        "rmd-app-bar__title--keyline": keyline,
      },
      className
    )}
    ref={forwardedRef}
  >
    {children}
  </h6>
);

const defaultProps: IAppBarTitleDefaultProps = {
  keyline: false,
};

AppBarTitle.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  // there's a problem with forwardedRef components that set the `displayName` to `undefined`
  AppBarTitle.displayName = "AppBarTitle";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    AppBarTitle.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      keyline: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLHeadingElement, IAppBarTitleProps>(
  (props, ref) => <AppBarTitle {...props} forwardedRef={ref} />
);
