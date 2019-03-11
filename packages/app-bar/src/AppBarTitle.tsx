import React, { forwardRef, FunctionComponent, HTMLAttributes } from "react";
import cn from "classnames";
import { WithForwardedRef } from "@react-md/utils";

export interface AppBarTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Boolean if the title should be placed at the `$rmd-app-bar-title-keyline`.
   */
  keyline?: boolean;
}

type WithRef = WithForwardedRef<HTMLHeadingElement>;
type DefaultProps = Required<Pick<AppBarTitleProps, "keyline">>;
type WithDefaultProps = AppBarTitleProps & DefaultProps & WithRef;

/**
 * This component is used to create a title for your application. If your app
 * is not using the `AppBarNav` component, you can enable the `keyline` prop
 * to ensure that your title aligns with the keyline of your navigation element.
 */
const AppBarTitle: FunctionComponent<
  AppBarTitleProps & WithRef
> = providedProps => {
  const {
    keyline,
    className,
    forwardedRef,
    children,
    ...props
  } = providedProps as WithDefaultProps;

  return (
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
};

const defaultProps: DefaultProps = {
  keyline: false,
};

AppBarTitle.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
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

export default forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  (props, ref) => <AppBarTitle {...props} forwardedRef={ref} />
);
