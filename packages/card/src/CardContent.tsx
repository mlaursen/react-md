import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { CardContentClassNameOptions } from "./styles";
import { cardContent } from "./styles";

export interface CardContentProps
  extends HTMLAttributes<HTMLDivElement>,
    CardContentClassNameOptions {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent(props, ref) {
    const {
      children,
      className,
      disablePadding,
      disableLastChildPadding,
      ...remaining
    } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        className={cardContent({
          className,
          disablePadding,
          disableLastChildPadding,
        })}
      >
        {children}
      </div>
    );
  }
);
