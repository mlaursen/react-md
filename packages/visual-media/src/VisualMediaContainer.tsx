import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { VisualMediaContainerClassNameOptions } from "./styles";
import { visualMediaContainer } from "./styles";

export interface VisualMediaContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VisualMediaContainerClassNameOptions {}

export const VisualMediaContainer = forwardRef<
  HTMLDivElement,
  VisualMediaContainerProps
>(function VisualMediaContainer(props, ref) {
  const {
    className,
    fullWidth = false,
    aspectRatio,
    disableAuto = false,
    children,
    ...remaining
  } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={visualMediaContainer({
        className,
        fullWidth,
        aspectRatio,
        disableAuto,
      })}
    >
      {children}
    </div>
  );
});
