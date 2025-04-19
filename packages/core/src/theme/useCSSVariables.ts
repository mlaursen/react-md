"use client";

import { type CSSProperties, type RefObject, useEffect, useMemo } from "react";

import {
  type CSSVariableName,
  type CSSVariablesProperties,
  type ReadonlyCSSVariableList,
} from "./types.js";

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
): void;
/**
 * @example Applying variables through inline styles
 * ```tsx
 * import { purple500 } from "@react-md/core/theme/colors";
 * import { type ReadonlyCSSVariableList } from "@react-md/core/theme/types";
 * import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
 * import { contrastColor } from "@react-md/core/theme/utils";
 * import { type ReactElement, type ReactNode, useMemo } from "react";
 *
 * function Example({ children }: { children: ReactNode }): ReactElement {
 *   const customVariables = useMemo<ReadonlyCSSVariableList>(() => {
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
 *   }, []);
 *   const style = useCSSVariables(customVariables, true);
 *
 *   return <div style={style}>{children}</div>;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useCSSVariables<Name extends CSSVariableName>(
  variables: ReadonlyCSSVariableList<Name>,
  inlineStyle: true
): CSSProperties;
/**
 * @since 6.0.0
 */
export function useCSSVariables<Name extends CSSVariableName>(
  variables: ReadonlyCSSVariableList<Name>,
  rootNodeOrInlineStyle?: RefObject<HTMLElement> | HTMLElement | boolean
): CSSProperties | undefined {
  useEffect(() => {
    if (rootNodeOrInlineStyle === true || !variables.length) {
      return;
    }

    // use an iife so that hoisting doesn't cause a possible "null" issue for
    // the root
    const root = (() => {
      if (!rootNodeOrInlineStyle) {
        return document.documentElement;
      }

      if ("current" in rootNodeOrInlineStyle) {
        return rootNodeOrInlineStyle.current;
      }

      return rootNodeOrInlineStyle;
    })();

    if (!root) {
      return;
    }

    // const root = document.documentElement;
    variables.forEach(({ name, value }) => {
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
    });
    return () => {
      variables.forEach(({ name }) => {
        root.style.removeProperty(name);
      });
    };
  }, [variables, rootNodeOrInlineStyle]);

  return useMemo(() => {
    if (rootNodeOrInlineStyle !== true) {
      return;
    }

    return variables.reduce<CSSVariablesProperties<Name>>(
      (style, { name, value }) => {
        style[name] = value;
        return style;
      },
      {}
    );
  }, [rootNodeOrInlineStyle, variables]);
}
