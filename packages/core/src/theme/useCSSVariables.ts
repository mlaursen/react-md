import { useEffect, useMemo } from "react";
import type { CSSVariableName, DefinedCSSVariableNames } from "./types";

/**
 * @remarks \@since 6.0.0
 */
export interface CSSVariable<
  Name extends CSSVariableName = DefinedCSSVariableNames
> {
  name: Name;
  value: string | number;
}

/**
 * @remarks \@since 6.0.0
 */
export type CSSVariablesProperties<
  Name extends CSSVariableName = DefinedCSSVariableNames
> = {
  [key in Name]?: string | number;
};

/**
 * @remarks \@since 6.0.0
 */
export type ReadonlyCSSVariableList<
  Name extends CSSVariableName = DefinedCSSVariableNames
> = readonly Readonly<CSSVariable<Name>>[];

/**
 * @example
 * Applying Variables the root html element
 * ```ts
 * import {
 *   contrastColor,
 *   pinkAccent200,
 *   purple500,
 *   useCSSVariables,
 *  } from "@react-md/core";
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
 * @remarks \@since 6.0.0
 */
export function useCSSVariables<Name extends CSSVariableName>(
  variables: ReadonlyCSSVariableList<Name>
): void;
/**
 * @example
 * Applying variables through inline styles
 * ```tsx
 * import {
 *   contrastColor,
 *   ReadonlyCSSVariableList,
 *   pinkAccent200,
 *   purple500,
 *   useCSSVariables,
 *  } from "@react-md/core";
 * import { useMemo } from "react";
 * import type { ReactElement, ReactNode } from "react";
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
 * @remarks \@since 6.0.0
 */
export function useCSSVariables<Name extends CSSVariableName>(
  variables: ReadonlyCSSVariableList<Name>,
  local: true
): CSSVariablesProperties<Name>;
/**
 * @remarks \@since 6.0.0
 */
export function useCSSVariables<Name extends CSSVariableName>(
  variables: ReadonlyCSSVariableList<Name>,
  local?: boolean
): CSSVariablesProperties<Name> | void {
  useEffect(() => {
    if (local || !variables.length) {
      return;
    }

    const root = document.documentElement;
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
  }, [variables, local]);

  return useMemo(() => {
    if (!local) {
      return;
    }

    return variables.reduce<CSSVariablesProperties<Name>>(
      (style, { name, value }) => {
        style[name] = value;
        return style;
      },
      {}
    );
  }, [local, variables]);
}
