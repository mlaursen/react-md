import { type ButtonHTMLAttributes, type ReactElement, type Ref } from "react";

import { buttonUnstyled } from "./styles.js";

/**
 * The props for the unstyled button are just all the normal button html
 * attributes without the `type` since this component forces the `type="button"`
 * value.
 *
 * @since 6.0.0 Renamed from `UnstyledButtonProps`
 */
export interface ButtonUnstyledProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  ref?: Ref<HTMLButtonElement>;
}

/**
 * A simple wrapper for a `<button type="button">` that applies the unstyled
 * utility class.
 *
 * Requires the `$disable-unstyled-utility-class` to be `false` to use.
 *
 * @see {@link https://react-md.dev/components/button-unstyled | ButtonUnstyled Demos}
 * @see {@link buttonUnstyled}
 * @since 6.0.0 Renamed from `UnstyledButton`
 */
export function ButtonUnstyled(props: ButtonUnstyledProps): ReactElement {
  const { ref, children, className, ...remaining } = props;

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
}
