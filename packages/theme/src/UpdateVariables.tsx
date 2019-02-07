import { FunctionComponent, CSSProperties, ReactElement } from "react";

import {
  ICSSVariable,
  useDocumentCSSVariables,
  createCSSVariablesStyle,
} from "./utils";

export type VariableChildrenRenderer = (props: {
  style: CSSProperties | undefined;
}) => ReactElement<any>;

export interface IUpdateVariablesProps {
  /**
   * An optional style object to merge the css variables into when using the children render
   * function.
   */
  style?: CSSProperties;

  /**
   * If this is a function, it will be provided the style object to apply to an element
   * that contains all the css variables and their values for the update.
   *
   * If no children are applied or it is a react element, the css variables will be applied
   * to the root html tag instead
   */
  children?: ReactElement<any> | VariableChildrenRenderer;

  /**
   * A list of variables to set/update. If the variable names are not prefixed with `--`, it
   * will be done automatically.
   *
   * NOTE: There is no real "validation" for the css variable values, so use at your own risk
   * and debugging.
   */
  variables: ICSSVariable[];
}

/**
 * This component is used to update css variables either at the root html or provide a style
 * object to the children render function that can be applied to an element to update the values.
 */
const UpdateVariables: FunctionComponent<IUpdateVariablesProps> = ({
  variables,
  style,
  children,
}) => {
  if (typeof children === "function") {
    return (children as VariableChildrenRenderer)({
      style: createCSSVariablesStyle(variables, style),
    });
  }

  useDocumentCSSVariables(variables);

  return (children as ReactElement<any>) || null;
};

export default UpdateVariables;
