"use client";

import { type RefObject, useEffect } from "react";

import { type CSSVariableName, type ReadonlyCSSVariableList } from "./types.js";

/**
 * @example Applying Variables the root html element
 * ```ts
 * import { purple500 } from "@react-md/core/theme/colors";
 * import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
 * import { contrastColor } from "@react-md/core/theme/utils";
 * import { useMemo } from "react";
 *
 * function Example(): null {
 *   // Note: You should use `useMemo` so that the custom variables are not
 *   // added and removed during each render.
 *   useCSSVariables(useMemo(() => {
 *     return [
 *       {
 *         name: "--rmd-primary-color",
 *         value: purple500,
 *       },
 *       {
 *         name: "--rmd-on-primary-color",
 *         value: contrastColor(purple500),
 *       },
 *     ];
 *   }, []));
 *
 *   return null;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useCSSVariables<Name extends CSSVariableName>(
  variables: ReadonlyCSSVariableList<Name>,
  rootNode?: RefObject<HTMLElement> | HTMLElement
): void {
  useEffect(() => {
    if (variables.length === 0) {
      return;
    }

    // use an iife so that hoisting doesn't cause a possible "null" issue for
    // the root
    const root = (() => {
      if (!rootNode) {
        return document.documentElement;
      }

      if ("current" in rootNode) {
        return rootNode.current;
      }

      return rootNode;
    })();

    if (!root) {
      return;
    }

    // const root = document.documentElement;
    for (const { name, value } of variables) {
      if (
        process.env.NODE_ENV !== "production" &&
        root.style.getPropertyValue(name)
      ) {
        const currentValue = root.style.getPropertyValue(name);
        const overwritten =
          currentValue !== value
            ? ` and will be overwritten to "${value}"`
            : "";
        // eslint-disable-next-line no-console
        console.warn(
          `The "${name}" css variable has already been set to "${currentValue}" ` +
            `on the root element${overwritten}. There might be conflicting overrides.`
        );
      }

      root.style.setProperty(name, `${value}`);
    }
    return () => {
      for (const { name } of variables) {
        root.style.removeProperty(name);
      }
    };
  }, [variables, rootNode]);
}
