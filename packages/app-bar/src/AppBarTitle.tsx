import { Typography } from "@react-md/core";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { AppBarTitleClassNameOptions } from "./getAppBarClassName";
import { getAppBarTitleClassName } from "./getAppBarClassName";

export interface AppBarTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    AppBarTitleClassNameOptions {}

export const AppBarTitle = forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  function AppBarTitle(props, ref) {
    const {
      keyline = false,
      noWrap = false,
      children,
      className,
      ...remaining
    } = props;
    return (
      <Typography
        ref={ref}
        {...remaining}
        type="headline-6"
        className={getAppBarTitleClassName({
          className,
          keyline,
          noWrap,
        })}
      >
        {children}
      </Typography>
    );
  }
);
