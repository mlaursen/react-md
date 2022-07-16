import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { ListItemText } from "./ListItemText";
import type { ListSubheaderClassNameOptions } from "./styles";
import { listSubheader } from "./styles";

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
        className={listSubheader({
          inset,
          className,
        })}
      >
        <ListItemText {...textProps}>{children}</ListItemText>
      </li>
    );
  }
);
