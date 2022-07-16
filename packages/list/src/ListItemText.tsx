import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { listItemTExt } from "./styles";

export interface ListItemTextProps extends HTMLAttributes<HTMLSpanElement> {
  secondaryText?: ReactNode;
  secondaryTextClamped?: boolean;
  secondaryTextClassName?: string;
}

export const ListItemText = forwardRef<HTMLSpanElement, ListItemTextProps>(
  function ListItemText(props, ref) {
    const {
      className,
      secondaryText,
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
