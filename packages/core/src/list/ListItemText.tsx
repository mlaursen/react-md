import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { PropsWithRef } from "../types";
import { listItemText } from "./listItemStyles";

/**
 * @internal
 */
export interface ListItemTextProps extends HTMLAttributes<HTMLSpanElement> {
  secondaryText?: ReactNode;
  secondaryTextProps?: PropsWithRef<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

  /** @defaultValue `false` */
  secondaryTextClamped?: boolean;
  secondaryTextClassName?: string;
}

/**
 * This is mostly an internal componecnt that can conditionally render secondary
 * text within list items.
 *
 * @internal
 */
export const ListItemText = forwardRef<HTMLSpanElement, ListItemTextProps>(
  function ListItemText(props, ref) {
    const {
      className,
      secondaryText,
      secondaryTextProps,
      secondaryTextClamped = false,
      secondaryTextClassName,
      children,
      ...remaining
    } = props;

    return (
      <span
        {...remaining}
        ref={ref}
        className={listItemText({
          className,
        })}
      >
        {children}
        {secondaryText && (
          <span
            {...secondaryTextProps}
            className={listItemText({
              clamped: secondaryTextClamped,
              className: secondaryTextClassName,
              secondary: true,
            })}
          >
            {secondaryText}
          </span>
        )}
      </span>
    );
  }
);
