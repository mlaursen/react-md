import type { CSSProperties } from "react";
import { useEffect, useMemo } from "react";
import type { ThemeCssVarName } from "./cssVars";

export type CSSVariableName = `--${string}`;

export interface CSSVariable<Name extends CSSVariableName = CSSVariableName> {
  name: Name;
  value: string | number;
}

export type CSSVariablesProperties<
  Name extends CSSVariableName = CSSVariableName
> = {
  [key in Name]: string | number;
};

export type ThemeCSSVariable = CSSVariable<ThemeCssVarName>;
export type ThemeCSSVariablesProperties =
  CSSVariablesProperties<ThemeCssVarName>;

export function useCSSVariables<Name extends CSSVariableName>(
  variables: readonly Readonly<CSSVariable<Name>>[]
): void;
export function useCSSVariables<Name extends CSSVariableName>(
  variables: readonly Readonly<CSSVariable<Name>>[],
  local: true
): CSSVariablesProperties<Name> & CSSProperties;
export function useCSSVariables<Name extends CSSVariableName>(
  variables: readonly Readonly<CSSVariable<Name>>[],
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

    return variables.reduce<CSSVariablesProperties>(
      (style, { name, value }) => {
        style[name] = value;
        return style;
      },
      {}
    );
  }, [local, variables]);
}
