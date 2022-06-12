import { Typography } from "@react-md/core";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { AppBarTitleClassNameOptions } from "./styles";
import { getAppBarTitleClassName } from "./styles";

export interface AppBarTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    AppBarTitleClassNameOptions {}

export const AppBarTitle = forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  function AppBarTitle(props, ref) {
    const {
      noWrap = false,
      keyline = "small",
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
          noWrap,
          keyline,
          className,
        })}
      >
        {children}
      </Typography>
    );
  }
);
