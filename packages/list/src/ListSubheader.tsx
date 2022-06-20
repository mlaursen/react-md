import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { ListSubheaderClassNameOptions } from "./styles";
import { getListSubheaderClassName } from "./styles";

export interface ListSubheaderProps
  extends HTMLAttributes<HTMLLIElement>,
    ListSubheaderClassNameOptions {}

export const ListSubheader = forwardRef<HTMLLIElement, ListSubheaderProps>(
  function ListSubheader(props, ref) {
    const { inset = false, className, children, ...remaining } = props;
    return (
      <li
        {...remaining}
        ref={ref}
        className={getListSubheaderClassName({
          inset,
          className,
        })}
      >
        {children}
      </li>
    );
  }
);
