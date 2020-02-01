import { Children, cloneElement, CSSProperties, ReactElement } from "react";

import {
  createCSSVariablesStyle,
  CSSVariable,
  useDocumentCSSVariables,
} from "./variables";

interface Styleable {
  style?: CSSProperties;
}
export type StyleableChild = ReactElement<Styleable>;

export type VariableChildrenRenderer = (props: Styleable) => StyleableChild;

export interface UpdateVariablesProps {
  /**
   * An optional style object to merge the css variables into when using the
   * children render function.
   */
  style?: CSSProperties;

  /**
   * If this is a function, it will be provided the style object to apply to an
   * element that contains all the css variables and their values for the
   * update.
   *
   * If no children are applied or it is a react element, the css variables will
   * be applied to the root html tag instead
   */
  children?: StyleableChild | VariableChildrenRenderer;

  /**
   * Boolean if the style with the updated css variables should be cloned as a
   * prop into the child element.
   */
  clone?: boolean;

  /**
   * A list of variables to set/update. If the variable names are not prefixed
   * with `--`, it will be done automatically.
   *
   * NOTE: There is no real "validation" for the css variable values, so use at
   * your own risk and debugging.
   */
  variables: CSSVariable[];
}

/**
 * This component is used to update css variables either at the root html or
 * provide a style object to the children render function that can be applied to
 * an element to update the values.
 */
function UpdateVariables({
  style,
  children,
  clone,
  variables,
}: UpdateVariablesProps): ReactElement {
  if (typeof children === "function") {
    return (children as VariableChildrenRenderer)({
      style: createCSSVariablesStyle(variables, style),
    });
  }

  if (clone) {
    // can "safely" typecast this since it'll throw an error if they don't provide
    // children anyways
    const child = Children.only(children as StyleableChild);
    return cloneElement(child, {
      style: createCSSVariablesStyle(variables, style),
    });
  }

  // TODO: Add a dev runtime check to make sure that only one instance
  // of the UpdateVariables is setting the values

  // It's ok to disable it here since I want the app to crash if they switch between cloning, children renderer,
  // or just children
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useDocumentCSSVariables(variables, clone || typeof children === "function");

  return (children as StyleableChild) || null;
}

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    UpdateVariables.propTypes = {
      clone: PropTypes.bool,
      style: PropTypes.object,
      variables: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ).isRequired,
      children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    };
  } catch (e) {}
}

export default UpdateVariables;
