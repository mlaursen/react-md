import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
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
function AppBarTitle(
  {
    noWrap = true,
    keyline = false,
    className,
    children,
    inheritColor,
    ...props
  }: AppBarTitleProps,
  ref?: Ref<HTMLHeadingElement>
): ReactElement {
  return (
    <h6
      {...props}
      ref={ref}
      className={cnb(
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

const ForwardedAppBarTitle = forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  AppBarTitle
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedAppBarTitle.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      keyline: PropTypes.bool,
      noWrap: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedAppBarTitle;
