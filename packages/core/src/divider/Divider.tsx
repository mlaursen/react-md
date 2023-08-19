import type { ElementType, HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { DividerClassNameOptions } from "./styles.js";
import { divider } from "./styles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-divider-size"?: string | number;
    "--rmd-divider-vertical-size"?: string | number;
    "--rmd-divider-color"?: string;
    "--rmd-divider-spacing"?: string | number;
    "--rmd-divider-vertical-spacing"?: string | number;
    "--rmd-divider-inset"?: string | number;
    "--rmd-divider-width"?: string | number;
    "--rmd-divider-max-size"?: string | number;
  }
}

export type DividerElement = HTMLHRElement | HTMLDivElement;

/**
 * @remarks \@since 6.0.0 Extends the {@Link DividerClassNameOptions}
 */
export interface DividerProps
  extends HTMLAttributes<DividerElement>,
    DividerClassNameOptions {}

/**
 * **Server Component**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { Divider } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return  <Divider />;
 * }
 * ```
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
