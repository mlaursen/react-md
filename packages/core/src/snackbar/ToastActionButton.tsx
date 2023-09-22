"use client";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { Button, type ButtonProps } from "../button/Button.js";
import { type ButtonTheme } from "../button/buttonStyles.js";
import { bem } from "../utils/bem.js";
import { useCurrentToastActions } from "./useCurrentToastActions.js";

const styles = bem("rmd-toast-action");
const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export interface ToastActionButtonProps extends ButtonProps {
  /** @defaultValue `"secondary"` */
  theme?: ButtonTheme;

  /**
   * Set this to `true` when there is a close button visible and the content is
   * stacked. This will update the styles so the button renders in the bottom
   * right below the content and close button.
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
export const ToastActionButton = forwardRef<
  HTMLButtonElement,
  ToastActionButtonProps
>(function ToastActionButton(props, ref) {
  const {
    className,
    children,
    theme = "secondary",
    onClick = noop,
    reordered,
    ...remaining
  } = props;
  const { removeToast } = useCurrentToastActions();

  return (
    <Button
      {...remaining}
      ref={ref}
      onClick={(event) => {
        onClick(event);
        if (event.isPropagationStopped()) {
          return;
        }

        removeToast(true);
      }}
      theme={theme}
      className={cnb(styles({ reordered }), className)}
    >
      {children}
    </Button>
  );
});
