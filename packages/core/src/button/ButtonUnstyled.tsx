import { type ButtonHTMLAttributes, forwardRef } from "react";

import { buttonUnstyled } from "./styles.js";

/**
 * The props for the unstyled button are just all the normal button html
 * attributes without the `type` since this component forces the `type="button"`
 * value.
 *
 * @since 6.0.0 Renamed from `UnstyledButtonProps`
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
 * @since 6.0.0 Renamed from `UnstyledButton`
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
