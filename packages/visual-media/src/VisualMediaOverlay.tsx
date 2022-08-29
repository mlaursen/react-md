import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { VisualMediaOverlayClassNameOptions } from "./styles";
import { visualMediaOverlay } from "./styles";

export interface VisualMediaOverlayProps
  extends HTMLAttributes<HTMLSpanElement>,
    VisualMediaOverlayClassNameOptions {}

export const VisualMediaOverlay = forwardRef<
  HTMLSpanElement,
  VisualMediaOverlayProps
>(function VisualMediaOverlay(props, ref) {
  const { className, children, position = "bottom", ...remaining } = props;

  return (
    <span
      {...remaining}
      ref={ref}
      className={visualMediaOverlay({ className, position })}
    >
      {children}
    </span>
  );
});
