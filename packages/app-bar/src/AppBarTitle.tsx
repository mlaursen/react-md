import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { AppBarColorInherit, useInheritContext } from "./useInheritContext";

export interface AppBarTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    AppBarColorInherit {
  /**
   * Boolean if the title should be placed at the `$rmd-app-bar-title-keyline`.
   */
  keyline?: boolean;

  /**
   * Boolean if the title should not automatically try to wrap the content and span two
   * lines if it is too big. This will automatically add trailing ellipsis for the
   * text overflow as well.
   */
  noWrap?: boolean;
}

type WithRef = WithForwardedRef<HTMLHeadingElement>;
type DefaultProps = Required<Pick<AppBarTitleProps, "keyline" | "noWrap">>;
type WithDefaultProps = AppBarTitleProps & DefaultProps & WithRef;

const block = bem("rmd-app-bar");

/**
 * This component is used to create a title for your application. If your app
 * is not using the `AppBarNav` component, you can enable the `keyline` prop
 * to ensure that your title aligns with the keyline of your navigation element.
 */
const AppBarTitle: FC<AppBarTitleProps & WithRef> = providedProps => {
  const {
    keyline,
    className,
    forwardedRef,
    children,
    inheritColor,
    noWrap,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <h6
      {...props}
      className={cn(
        block("title", {
          "no-wrap": noWrap,
          keyline,
          inherit: useInheritContext(inheritColor),
        }),
        className
      )}
      ref={forwardedRef}
    >
      {children}
    </h6>
  );
};

const defaultProps: DefaultProps = {
  noWrap: true,
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
      noWrap: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  (props, ref) => <AppBarTitle {...props} forwardedRef={ref} />
);
