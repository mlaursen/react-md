import { type LinkHTMLAttributes, type ReactElement } from "react";
import { preconnect } from "react-dom";

import {
  type MaterialSymbolsUrlOptions,
  getMaterialSymbolsUrl,
} from "./getMaterialSymbolsUrl.js";

/**
 * @since 7.1.0
 */
export interface MaterialSymbolsLinksProps
  extends MaterialSymbolsUrlOptions, LinkHTMLAttributes<HTMLLinkElement> {
  /**
   * Set this to `true` to not add:
   *
   * ```tsx
   * <link rel="preconnect" href="https://fonts.googleapis.com" />
   * <link
   *   rel="preconnect"
   *   href="https://fonts.gstatic.com"
   *   crossOrigin=""
   * />
   * ```
   * @defaultValue `false`
   */
  disablePreconnect?: boolean;
}

/**
 * This component can be used to render additional `<link>` elements to load
 * material symbols. This component defaults to using `MATERIAL_CONFIG` and
 * `DEFAULT_MATERIAL_SYMBOL_NAMES`.
 *
 * @example Simple Example
 * ```tsx
 * // optional: this just sets all the default icons to the `<MaterialSymbol>`
 * // equivalent
 * import "@react-md/core/icon/configureMaterialSymbols";
 *
 * <RootHtml
 *   className={roboto.variable}
 *   beforeBodyChildren={
 *     <head>
 *       <MaterialSymbolsLinks />
 *     </head>
 *   }
 * >
 *   <RootProviders>{children}</RootProviders>
 * </RootHtml>
 * ```
 *
 * @example Additional Symbols
 * ```tsx
 * import { type MaterialSymbolName } from "@react-md/core/icon/material";
 * import { DEFAULT_MATERIAL_SYMBOL_NAMES } from "@react-md/core/icon/symbols";
 *
 * const names = [
 *   ...DEFAULT_MATERIAL_SYMBOL_NAMES,
 *   'favorite'
 * ] satisfies MaterialSymbolName[];
 *
 *
 * <MaterialSymbolsLinks names={names} />
 * ```
 *
 * @since 7.1.0
 */
export function MaterialSymbolsLinks(
  props: Readonly<MaterialSymbolsLinksProps>
): ReactElement {
  const {
    names,
    fill,
    family,
    grade,
    opticalSize,
    weight,
    disablePreconnect,
    ...remaining
  } = props;

  if (!disablePreconnect) {
    preconnect("https://fonts.googleapis.com");
    preconnect("https://fonts.gstatic.com", { crossOrigin: "" });
  }

  return (
    <link
      {...remaining}
      rel="stylesheet"
      href={getMaterialSymbolsUrl({
        names,
        fill,
        family,
        weight,
        grade,
        opticalSize,
      })}
    />
  );
}
