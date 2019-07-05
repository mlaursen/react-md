import { CSSProperties, useEffect } from "react";

export type CSSVariableValue = string | null;
export interface CSSVariable {
  name: string;
  value: CSSVariableValue;
}

/**
 * A simple helper function to prefix css variable names with `--` if they
 * were missing it. I might add some dev runtime checks for extra validation
 * at some point.
 *
 * @param name - The css variable name to fix
 * @return a "valid" css variable name.
 */
export function toCSSVariableName(name: string, prefix: string = "--") {
  return name.startsWith(prefix) ? name : `${prefix}${name}`;
}

/**
 * Applies the `toCSSVariableName` fix to all variable names in the list.
 *
 * @param variables a list of css variables and their values
 * @return a new list ensuring that all variable names are prefixed with `--`
 */
export function fixVariables(variables: CSSVariable[], prefix: string = "--") {
  return variables.map(({ name, value }) => ({
    name: toCSSVariableName(name, prefix),
    value,
  }));
}

/**
 * An extremely simple util to create a style object containing the css variables
 * and their values. It will also merge with an existing style object if one was
 * provided.
 *
 * @param variables The list of css variables to create a style object for
 * @param style An optional style object to merge the css variables into.
 * @return a style object or undefined
 */
export function createCSSVariablesStyle(
  variables: CSSVariable[],
  style?: CSSProperties
) {
  if (!variables.length) {
    return style;
  }

  return fixVariables(variables).reduce(
    (mergedStyle, { name, value }) => ({
      ...mergedStyle,
      [name]: value,
    }),
    { ...style }
  );
}

/**
 * A hook that will set the css variables and their values onto the root html
 * tag.
 *
 * @param variables The list of css variables to create a style object for
 */
export function useDocumentCSSVariables(variables: CSSVariable[]) {
  useEffect(() => {
    const { style } = document.documentElement;
    const fixedVariables = fixVariables(variables);
    fixedVariables.forEach(({ name, value }) => {
      style.setProperty(name, value);
    });

    return () => {
      fixedVariables.forEach(({ name }) => {
        style.setProperty(name, "");
      });
    };
  }, [variables]);
}

type ScssVariableMap = {
  [key: string]: CSSVariableValue;
};

function tryImport(packageName: string) {
  return import(`@react-md/${packageName}/dist/scssVariables`)
    .then(pkg => {
      const themeVars = `rmd-${packageName}${
        packageName === "theme" ? "" : "-theme"
      }-values`;
      const values = (pkg.default[themeVars] || {}) as ScssVariableMap;

      return Object.entries(values).reduce<CSSVariable[]>(
        (list, [variableName, variableValue]) => [
          ...list,
          {
            name: `--rmd-${packageName}-${variableName}`,
            value: variableValue,
          },
        ],
        []
      );
    })
    .catch(() => []);
}

export async function resolveVariables() {
  const variables = await Promise.all([
    tryImport("app-bar"),
    tryImport("avatar"),
    tryImport("button"),
    tryImport("card"),
    tryImport("dialog"),
    tryImport("divider"),
    tryImport("elevation"),
    tryImport("form"),
    tryImport("icon"),
    tryImport("link"),
    tryImport("list"),
    tryImport("media"),
    tryImport("menu"),
    tryImport("overlay"),
    tryImport("progress"),
    tryImport("sheet"),
    tryImport("states"),
    tryImport("table"),
    tryImport("theme"),
    tryImport("tooltip"),
    tryImport("transition"),
    tryImport("tree"),
    tryImport("typography"),
    tryImport("utils"),
  ]);

  return variables.reduce((list, pkgVars) => [...list, ...pkgVars], []);
}
