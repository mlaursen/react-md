import { type CSSProperties, useMemo } from "react";

import {
  type CSSVariableName,
  type CSSVariablesProperties,
  type ReadonlyCSSVariableList,
} from "./types.js";

/**
 * @example Applying variables through inline styles
 * ```tsx
 * import { purple500 } from "@react-md/core/theme/colors";
 * import { type ReadonlyCSSVariableList } from "@react-md/core/theme/types";
 * import { useInlineCSSVariables } from "@react-md/core/theme/useInlineCSSVariables";
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
 *   const style = useInlineCSSVariables(customVariables);
 *
 *   return <div style={style}>{children}</div>;
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useInlineCSSVariables<Name extends CSSVariableName>(
  variables: ReadonlyCSSVariableList<Name>
): CSSProperties {
  return useMemo(() => {
    return variables.reduce<CSSVariablesProperties<Name>>(
      (style, { name, value }) => {
        style[name] = value;
        return style;
      },
      {}
    );
  }, [variables]);
}
