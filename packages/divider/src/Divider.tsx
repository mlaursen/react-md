import type { ElementType, HTMLAttributes } from "react";
import { forwardRef } from "react";

import type { DividerClassNameOptions } from "./styles";
import { divider } from "./styles";

export type DividerElement = HTMLHRElement | HTMLDivElement;

export interface DividerProps
  extends HTMLAttributes<DividerElement>,
    DividerClassNameOptions {}

export const Divider = forwardRef<DividerElement, DividerProps>(
  function Divider(props, ref) {
    const {
      inset = false,
      vertical = false,
      role = "separator",
      className,
      ...remaining
    } = props;

    const Component = (vertical ? "div" : "hr") as ElementType;

    return (
      <Component
        {...remaining}
        ref={ref}
        role={role}
        className={divider({
          inset,
          vertical,
          className,
        })}
      />
    );
  }
);
