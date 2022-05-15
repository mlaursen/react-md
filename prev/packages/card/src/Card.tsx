import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the card should gain additional box-shadow elevation once
   * hovered.
   */
  raisable?: boolean;

  /**
   * Boolean if the card should no longer be `display: inline-block`, but
   * instead `display: block; width: 100%;`.
   */
  fullWidth?: boolean;

  /**
   * Boolean if the card should use a border instead of box-shadow. Enabling
   * this prop will always disable the `raisable` prop.
   */
  bordered?: boolean;

  /** @deprecated \@since 5.1.3 Use {@link raisable} instead. */
  raiseable?: boolean;
}

const block = bem("rmd-card");

/**
 * This is the root card component that should be used along side all the other
 * card parts. It adds some general styles and elevation to help show
 * prominence.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    children,
    raiseable = false,
    raisable = raiseable,
    fullWidth = false,
    bordered = false,
    ...props
  },
  ref
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        block({
          bordered,
          shadowed: !bordered,
          raisable: !bordered && raisable,
          "full-width": fullWidth,
        }),
        className
      )}
    >
      {children}
    </div>
  );
});
