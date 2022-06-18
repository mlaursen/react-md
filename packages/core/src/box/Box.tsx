import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { BoxOptions } from "./styles";
import { box } from "./styles";

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, BoxOptions {}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  props,
  ref
) {
  const {
    className,
    children,
    grid = false,
    flexDirection = "row",
    gridName = "",
    gridAutoType = "fit",
    alignItems,
    justifyContent,
    disableWrap = false,
    disablePadding = false,
    ...remaining
  } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={box({
        className,
        grid,
        flexDirection,
        gridName,
        gridAutoType,
        alignItems,
        justifyContent,
        disableWrap,
        disablePadding,
      })}
    >
      {children}
    </div>
  );
});
