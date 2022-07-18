import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { VisualMediaOverlayClassNameOptions } from "./styles";
import { visualMediaOverlay } from "./styles";

export interface VisualMediaOverlayProps
  extends HTMLAttributes<HTMLDivElement>,
    VisualMediaOverlayClassNameOptions {}

export const VisualMediaOverlay = forwardRef<
  HTMLDivElement,
  VisualMediaOverlayProps
>(function VisualMediaOverlay(props, ref) {
  const { className, children, position = "bottom", ...remaining } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={visualMediaOverlay({ className, position })}
    >
      {children}
    </div>
  );
});
