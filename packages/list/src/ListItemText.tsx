import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { getListItemTextClassName } from "./styles";

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
        className={getListItemTextClassName({
          className,
        })}
      >
        {children}
        {secondaryText && (
          <span
            className={getListItemTextClassName({
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
