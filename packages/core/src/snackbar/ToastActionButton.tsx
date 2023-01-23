import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { useHideToast } from ".";
import type { ButtonProps, ButtonTheme } from "../button";
import { Button } from "../button";
import { bem } from "../utils/bem";

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

  /** @defaultValue `false` */
  reordered?: boolean;
}

/**
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
  const hideToast = useHideToast();

  return (
    <Button
      {...remaining}
      ref={ref}
      onClick={(event) => {
        onClick(event);
        if (event.isPropagationStopped()) {
          return;
        }

        hideToast();
      }}
      theme={theme}
      className={cnb(styles({ reordered }), className)}
    >
      {children}
    </Button>
  );
});
