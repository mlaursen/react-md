"use client";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type {
  MaterialSymbolCustomization,
  MaterialSymbolFill,
  MaterialSymbolGrade,
  MaterialSymbolOpticalSize,
  MaterialSymbolWeight,
} from "./MaterialSymbolsProvider.js";
import { useFontVariationSettings } from "./MaterialSymbolsProvider.js";
import type { MaterialSymbolName } from "./material.js";
import type { MaterialSymbolClassNameOptions } from "./styles.js";
import { icon } from "./styles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-symbol-fill"?: MaterialSymbolFill;
    "--rmd-symbol-wght"?: MaterialSymbolWeight;
    "--rmd-symbol-grad"?: MaterialSymbolGrade;
    "--rmd-symbol-opsz"?: MaterialSymbolOpticalSize;
  }
}

/**
 * @remarks \@since 6.0.0
 */
export interface MaterialSymbolProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    MaterialSymbolCustomization,
    Partial<MaterialSymbolClassNameOptions> {
  name: MaterialSymbolName;
  children?: never;
}

/**
 * **Client Component**
 * Might be able to become a server component if I remove the useFontVariationSettings hook
 *
 * @example
 * Simple Example
 * ```tsx
 * import { MaterialSymbol } from "@react-md/core";
 * import type { ReactElement } from "react";
 * import { createRoot } from "react-dom/client";
 *
 * function Example(): ReactElement {
 *   return (
 *     <>
 *       <MaterialSymbol symbol="" />
 *       <MaterialSymbol symbol="" type="outline" />
 *
 *       <MaterialSymbol symbol="" type="round" />
 *       <MaterialSymbol symbol="" type="sharp" />
 *     </>
 *   );
 * }
 *
 * const root = createRoot(document.getElementById("root"));
 * root.render(<App />);
 * ```
 *
 * @remarks \@since 6.0.0
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
      color,
      dense,
      ...remaining
    } = props;
    const { style, family } = useFontVariationSettings({
      style: propStyle,
      family: propFamily,
      fill,
      weight,
      grade,
      opticalSize,
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
          color,
          dense,
          className,
        })}
      >
        {symbol}
      </span>
    );
  }
);