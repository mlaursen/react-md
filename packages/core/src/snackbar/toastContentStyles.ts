import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-toast-content");

/**
 * @remarks \@since 6.0.0
 */
export interface ToastContentClassNameOptions {
  className?: string;
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
export function toastContent(
  options: ToastContentClassNameOptions = {}
): string {
  const { action, closeButton, multiline, stacked, className } = options;

  return cnb(
    styles({
      gap: action && closeButton,
      "v-padding": multiline && (closeButton || !action),
      "t-padding": multiline && stacked,
    }),
    className
  );
}
