import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils";

const styles = bem("rmd-toast-content");

/**
 * @remarks \@since 6.0.0
 */
export interface ToastContentProps extends HTMLAttributes<HTMLDivElement> {
  /** @defaultValue `false` */
  action?: boolean;
  /** @defaultValue `false` */
  stacked?: boolean;
  /** @defaultValue `false` */
  multiline?: boolean;
  /** @defaultValue `false` */
  closeButton?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export const ToastContent = forwardRef<HTMLDivElement, ToastContentProps>(
  function ToastContent(props, ref) {
    const {
      className,
      children,
      action,
      stacked,
      multiline,
      closeButton,
      ...remaining
    } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        className={cnb(
          styles({
            gap: action && closeButton,
            "v-padding": multiline && (closeButton || !action),
            "t-padding": multiline && stacked,
          }),
          className
        )}
      >
        {children}
      </div>
    );
  }
);
