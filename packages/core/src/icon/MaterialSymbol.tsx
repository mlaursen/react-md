import { type AriaAttributes, type HTMLAttributes, forwardRef } from "react";

import { type MaterialSymbolName } from "./material.js";
import {
  type MaterialSymbolCustomization,
  type MaterialSymbolFill,
  type MaterialSymbolGrade,
  type MaterialSymbolOpticalSize,
  type MaterialSymbolWeight,
  getFontVariationSettings,
} from "./materialConfig.js";
import { type MaterialSymbolClassNameOptions, icon } from "./styles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-symbol-fill"?: MaterialSymbolFill;
    "--rmd-symbol-wght"?: MaterialSymbolWeight;
    "--rmd-symbol-grad"?: MaterialSymbolGrade;
    "--rmd-symbol-opsz"?: MaterialSymbolOpticalSize;
  }
}

/**
 * @since 6.0.0
 */
export interface MaterialSymbolProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    MaterialSymbolCustomization,
    Partial<MaterialSymbolClassNameOptions> {
  /** @defaultValue `true` */
  "aria-hidden"?: AriaAttributes["aria-hidden"];
  name: MaterialSymbolName;
  children?: never;
}

/**
 * This is a convenience component that provides autocomplete for all the
 * available material symbols via the `name` prop.
 *
 * Note: You might notice IDE slowdowns for files that use this component since
 * there are so many icons available. If it becomes an issue, just stop using
 * this component and define the icons inline instead.
 *
 * @example Simple Example
 * ```tsx
 * import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
 * import type { ReactElement } from "react";
 * import { createRoot } from "react-dom/client";
 *
 * function Example(): ReactElement {
 *   return (
 *     <>
 *       <MaterialSymbol symbol="close" />
 *       <MaterialSymbol symbol="tune" type="outline" />
 *
 *       <MaterialSymbol symbol="add" type="round" />
 *       <MaterialSymbol symbol="air" type="sharp" />
 *     </>
 *   );
 * }
 *
 * const root = createRoot(document.getElementById("root"));
 * root.render(<App />);
 * ```
 *
 * @see {@link https://react-md.dev/components/icon | Icon Demos}
 * @see {@link https://react-md.dev/components/material-icons|Available Material Icons}
 * @since 6.0.0
 */
export const MaterialSymbol = forwardRef<HTMLSpanElement, MaterialSymbolProps>(
  function MaterialSymbol(props, ref) {
    const {
      "aria-hidden": ariaHidden = true,
      className,
      name: symbol,
      style: propStyle,
      family: propFamily,
      fill,
      weight,
      grade,
      opticalSize,
      theme,
      dense,
      ...remaining
    } = props;
    const { style, family } = getFontVariationSettings({
      style: propStyle,
      fill,
      weight,
      grade,
      opticalSize,
      family: propFamily,
    });

    return (
      <span
        {...remaining}
        aria-hidden={ariaHidden}
        ref={ref}
        style={style}
        className={icon({
          type: "symbol",
          family,
          theme,
          dense,
          className,
        })}
      >
        {symbol}
      </span>
    );
  }
);
