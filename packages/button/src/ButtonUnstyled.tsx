import { cnb } from "cnbuilder";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

/** @remarks \@since 6.0.0 */
export interface ButtonUnstyledClassNameOptions {
  className?: string;
}

/**
 * This requires the `$disable-unstyled-utility-class` to be `false` to use.
 *
 * @remarks \@since 6.0.0
 */
export function buttonUnstyled(
  options: ButtonUnstyledClassNameOptions = {}
): string {
  const { className } = options;

  return cnb("rmd-button-unstyled", className);
}

/**
 * The props for the unstyled button are just all the normal button html
 * attributes without the `type` since this component forces the `type="button"`
 * value.
 *
 * @remarks \@since 6.0.0 Renamed from `UnstyledButtonProps`
 */
export type ButtonUnstyledProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

/**
 * A simple wrapper for a `<button type="button">` that applies the unstyled
 * utility class.
 *
 * Requires the `$disable-unstyled-utility-class` to be `false` to use.
 *
 * @see {@link buttonUnstyled}
 * @remarks \@since 6.0.0 Renamed from `UnstyledButton`
 */
export const ButtonUnstyled = forwardRef<
  HTMLButtonElement,
  ButtonUnstyledProps
>(function ButtonUnstyled(props, ref) {
  const { children, className, ...remaining } = props;
  return (
    <button
      {...remaining}
      ref={ref}
      type="button"
      className={buttonUnstyled({ className })}
    >
      {children}
    </button>
  );
});
