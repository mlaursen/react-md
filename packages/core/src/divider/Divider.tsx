import {
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

import { type DividerClassNameOptions, divider } from "./styles.js";

export type DividerElement = HTMLHRElement | HTMLDivElement;

/**
 * @since 6.0.0 Extends the {@link DividerClassNameOptions}
 */
export interface DividerProps
  extends HTMLAttributes<DividerElement>, DividerClassNameOptions {
  ref?: Ref<DividerElement>;
}

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
 * @see {@link https://react-md.dev/components/divider | Divider Demos}
 */
export function Divider(props: DividerProps): ReactElement {
  const {
    ref,
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
