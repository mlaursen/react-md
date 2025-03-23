import { type ElementType, type HTMLAttributes, forwardRef } from "react";

import { type DividerClassNameOptions, divider } from "./styles.js";

export type DividerElement = HTMLHRElement | HTMLDivElement;

/**
 * @since 6.0.0 Extends the {@link DividerClassNameOptions}
 */
export interface DividerProps
  extends HTMLAttributes<DividerElement>,
    DividerClassNameOptions {}

/**
 * @example Simple Example
 * ```tsx
 * import { Divider } from "@react-md/core/divider/Divider";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return  <Divider />;
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/divider|Divider Demos}
 */
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
