import {
  type AriaAttributes,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

import { type MaterialSymbolName } from "./material.js";
import {
  type MaterialSymbolCustomization,
  getFontVariationSettings,
} from "./materialConfig.js";
import { type MaterialSymbolClassNameOptions, icon } from "./styles.js";

/**
 * @since 6.0.0
 */
export interface MaterialSymbolProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    MaterialSymbolCustomization,
    Partial<MaterialSymbolClassNameOptions> {
  ref?: Ref<HTMLSpanElement>;

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
export function MaterialSymbol(props: MaterialSymbolProps): ReactElement {
  const {
    ref,
    className,
    size,
    textColor,
    name: symbol,
    style: propStyle,
    family: propFamily,
    fill,
    weight,
    grade,
    opticalSize,
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
      aria-hidden
      {...remaining}
      ref={ref}
      style={style}
      className={icon({
        type: "symbol",
        family,
        size,
        textColor,
        className,
      })}
    >
      {symbol}
    </span>
  );
}
