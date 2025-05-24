"use client";

import { cnb } from "cnbuilder";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button/Button.js";
import { type ButtonType } from "../button/styles.js";
import { getIcon } from "../icon/config.js";
import { bem } from "../utils/bem.js";
import { useCurrentToastActions } from "./useCurrentToastActions.js";

const styles = bem("rmd-toast-x");
const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0
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
 * @see {@link https://react-md.dev/components/snackbar | Snackbar Demos}
 * @since 6.0.0
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

  const children = getIcon("close", propChildren);
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
