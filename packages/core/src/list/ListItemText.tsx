import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { type PropsWithRef } from "../types.js";
import { listItemText } from "./listItemStyles.js";

/**
 * @internal
 */
export interface ListItemTextProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  secondaryText?: ReactNode;
  secondaryTextProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>>;

  /** @defaultValue `false` */
  secondaryTextClamped?: boolean;
  secondaryTextClassName?: string;
}

/**
 * This is mostly an internal component that can conditionally render secondary
 * text within list items.
 *
 * @internal
 */
export function ListItemText(props: ListItemTextProps): ReactElement {
  const {
    ref,
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
