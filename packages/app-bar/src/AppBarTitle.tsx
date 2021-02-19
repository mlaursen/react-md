import React, { forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { AppBarColorInherit, useInheritContext } from "./useInheritContext";

export interface AppBarTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    AppBarColorInherit {
  /**
   * Boolean if the title should be placed at the `$rmd-app-bar-title-keyline`.
   */
  keyline?: boolean;

  /**
   * Boolean if the title should not automatically try to wrap the content and
   * span two lines if it is too big. This will automatically add trailing
   * ellipsis for the text overflow as well.
   */
  noWrap?: boolean;
}

const block = bem("rmd-app-bar");

/**
 * This component is used to create a title for your application. If your app is
 * not using the `AppBarNav` component, you can enable the `keyline` prop to
 * ensure that your title aligns with the keyline of your navigation element.
 */
export const AppBarTitle = forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  function AppBarTitle(
    {
      noWrap = true,
      keyline = false,
      className,
      children,
      inheritColor,
      ...props
    },
    ref
  ) {
    return (
      <h6
        {...props}
        ref={ref}
        className={cn(
          block("title", {
            "no-wrap": noWrap,
            keyline,
            inherit: useInheritContext(inheritColor),
          }),
          className
        )}
      >
        {children}
      </h6>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    AppBarTitle.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      keyline: PropTypes.bool,
      noWrap: PropTypes.bool,
      inheritColor: PropTypes.bool,
    };
  } catch (e) {}
}
