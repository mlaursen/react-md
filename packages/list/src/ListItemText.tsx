import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { getListItemTextClassName } from "./styles";

export interface ListItemTextProps extends HTMLAttributes<HTMLSpanElement> {
  secondaryText?: ReactNode;
  secondaryTextClassName?: string;
}

export const ListItemText = forwardRef<HTMLSpanElement, ListItemTextProps>(
  function ListItemText(props, ref) {
    const {
      className,
      secondaryText,
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
