"use client";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import type { ButtonProps, ButtonType } from "../button/Button";
import { Button } from "../button/Button";
import { useIcon } from "../icon/IconProvider";
import { bem } from "../utils/bem";
import { useCurrentToastActions } from "./useCurrentToastActions";

const styles = bem("rmd-toast-x");
const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export interface ToastCloseButtonProps extends ButtonProps {
  /**
   * Note: This default value will only be used if the {@link buttonType} is not
   * `"text"` and an `aria-labelledby` is not provided.
   *
   * @defaultValue `"Close"`
   */
  "aria-label"?: string;

  /** @defaultValue `"icon-square"` */
  buttonType?: ButtonType;

  /**
   * Set this to `true` when there is a close button visible and the content is
   * stacked. This will update the styles so the button renders next to the
   * content and above the action button.
   *
   * @defaultValue `false`
   */
  reordered?: boolean;
}

/**
 * **Client Component**
 *
 * This button will automatically close the toast when clicked unless
 * `event.stopPropagation()` is called from the `onClick` prop.
 *
 * @remarks \@since 6.0.0
 */
export const ToastCloseButton = forwardRef<
  HTMLButtonElement,
  ToastCloseButtonProps
>(function ToastCloseButton(props, ref) {
  const {
    buttonType = "icon-square",
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = buttonType !== "text" && !ariaLabelledBy
      ? "Close"
      : undefined,
    children: propChildren,
    className,
    onClick = noop,
    reordered,
    ...remaining
  } = props;

  const children = useIcon("close", propChildren);
  const { removeToast } = useCurrentToastActions();

  return (
    <Button
      {...remaining}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      onClick={(event) => {
        onClick(event);
        if (event.isPropagationStopped()) {
          return;
        }

        removeToast(true);
      }}
      className={cnb(styles({ reordered }), className)}
      buttonType={buttonType}
    >
      {children}
    </Button>
  );
});
