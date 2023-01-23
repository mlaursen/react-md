import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import type { ButtonProps, ButtonType } from "../button";
import { Button } from "../button";
import { useIcon } from "../icon";
import { bem } from "../utils";
import { useHideToast } from "./useToast";

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

  /** @defaultValue `false` */
  reordered?: boolean;
}

/**
 * This button will automatically close the toast when clicked.
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
    "aria-label": ariaLabel = buttonType === "text" && !ariaLabelledBy
      ? "Close"
      : undefined,
    children: propChildren,
    className,
    onClick = noop,
    reordered,
    ...remaining
  } = props;

  const children = useIcon("close", propChildren);
  const hideToast = useHideToast();

  return (
    <Button
      {...remaining}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={ref}
      onClick={(event) => {
        onClick(event);
        hideToast();
      }}
      className={cnb(styles({ reordered }), className)}
      buttonType={buttonType}
    >
      {children}
    </Button>
  );
});
