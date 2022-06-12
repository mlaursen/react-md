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
    column = false,
    gridName = "",
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
        column,
        gridName,
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
