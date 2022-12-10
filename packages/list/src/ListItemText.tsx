import type { PropsWithRef } from "@react-md/core";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { listItemTExt } from "./styles";

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
        className={listItemTExt({
          className,
        })}
      >
        {children}
        {secondaryText && (
          <span
            {...secondaryTextProps}
            className={listItemTExt({
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
