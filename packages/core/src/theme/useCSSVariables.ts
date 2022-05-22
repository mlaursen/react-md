import { useMemo } from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

export interface CSSVariable {
  name: `--${string}`;
  value: string | number;
}

export interface CSSVariablesProperties {
  [key: `--${string}`]: string | number;
}

export function useCSSVariables(variables: Readonly<CSSVariable>[]): void;
export function useCSSVariables(
  variables: Readonly<CSSVariable>[],
  local: true
): CSSVariablesProperties;
export function useCSSVariables(
  variables: Readonly<CSSVariable>[],
  local?: boolean
): CSSVariablesProperties | void {
  useIsomorphicLayoutEffect(() => {
    if (local) {
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
