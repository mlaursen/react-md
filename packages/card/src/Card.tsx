import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { CardClassNameOptions } from "./styles";
import { card } from "./styles";

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardClassNameOptions {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  props,
  ref
) {
  const {
    children,
    className,
    bordered = false,
    raiseable = false,
    fullWidth = false,
    ...remaining
  } = props;

  return (
    <div
      {...remaining}
      ref={ref}
      className={card({
        className,
        bordered,
        raiseable,
        fullWidth,
      })}
    >
      {children}
    </div>
  );
});
