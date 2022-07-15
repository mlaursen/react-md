import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { ListItemText } from "./ListItemText";
import type { ListSubheaderClassNameOptions } from "./styles";
import { getListSubheaderClassName } from "./styles";

export interface ListSubheaderProps
  extends HTMLAttributes<HTMLLIElement>,
    ListSubheaderClassNameOptions {
  textProps?: HTMLAttributes<HTMLSpanElement>;
}

export const ListSubheader = forwardRef<HTMLLIElement, ListSubheaderProps>(
  function ListSubheader(props, ref) {
    const {
      inset = false,
      className,
      children,
      textProps,
      ...remaining
    } = props;

    return (
      <li
        {...remaining}
        ref={ref}
        className={getListSubheaderClassName({
          inset,
          className,
        })}
      >
        <ListItemText {...textProps}>{children}</ListItemText>
      </li>
    );
  }
);
