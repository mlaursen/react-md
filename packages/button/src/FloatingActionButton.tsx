import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { FloatingActionButtonClassNameOptions } from "./styles";
import { fab } from "./styles";

/** @remarks \@since 6.0.0 */
export interface FloatingActionButtonProps
  extends HTMLAttributes<HTMLSpanElement>,
    FloatingActionButtonClassNameOptions {}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export const FloatingActionButton = forwardRef<
  HTMLSpanElement,
  FloatingActionButtonProps
>(function FloatingActionButton(props, ref) {
  const {
    children,
    className,
    position = null,
    absolute = false,
    ...remaining
  } = props;
  if (!position) {
    return <>{children}</>;
  }

  return (
    <span
      {...remaining}
      ref={ref}
      className={fab({
        className,
        position,
        absolute,
      })}
    >
      {children}
    </span>
  );
});
