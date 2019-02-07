import { CSSProperties, useEffect } from "react";

export interface ICSSVariable {
  name: string;
  value: string;
}

/**
 * A simple helper function to prefix css variable names with `--` if they
 * were missing it. I might add some dev runtime checks for extra validation
 * at some point.
 *
 * @param name - The css variable name to fix
 * @return a "valid" css variable name.
 */
export function toCSSVariableName(name: string) {
  return name.startsWith("--") ? name : `--${name}`;
}

/**
 * Applies the `toCSSVariableName` fix to all variable names in the list.
 *
 * @param variables a list of css variables and their values
 * @return a new list ensuring that all variable names are prefixed with `--`
 */
export function fixVariables(variables: ICSSVariable[]) {
  return variables.map(({ name, value }) => ({
    name: toCSSVariableName(name),
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
  variables: ICSSVariable[],
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
export function useDocumentCSSVariables(variables: ICSSVariable[]) {
  useEffect(() => {
    const { style } = document.documentElement;
    fixVariables(variables).forEach(({ name, value }) => {
      style.setProperty(name, value);
    });
  });
}
