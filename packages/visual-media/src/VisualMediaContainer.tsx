import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { VisualMediaContainerClassNameOptions } from "./styles";
import { visualMediaContainer } from "./styles";

export interface VisualMediaContainerProps
  extends HTMLAttributes<HTMLSpanElement>,
    VisualMediaContainerClassNameOptions {}

export const VisualMediaContainer = forwardRef<
  HTMLSpanElement,
  VisualMediaContainerProps
>(function VisualMediaContainer(props, ref) {
  const {
    className,
    fullWidth = false,
    aspectRatio,
    responsive = "auto",
    children,
    ...remaining
  } = props;

  return (
    <span
      {...remaining}
      ref={ref}
      className={visualMediaContainer({
        className,
        fullWidth,
        aspectRatio,
        responsive,
      })}
    >
      {children}
    </span>
  );
});
