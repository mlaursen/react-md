import { type JSCodeshift, type JSXElement } from "jscodeshift";
import { type JSXAttributes, type JSXReactNode } from "../types";

export interface CreateJsxElementOptions {
  j: JSCodeshift;
  name: string;
  props: JSXAttributes;
  children?: JSXReactNode;
}

export function createJsxElement(options: CreateJsxElementOptions): JSXElement {
  const { j, name, props, children = [] } = options;

  const selfClosing = !children.length;
  const component = j.jsxIdentifier(name);
  return j.jsxElement(
    j.jsxOpeningElement(component, props, selfClosing),
    !selfClosing ? j.jsxClosingElement(component) : null,
    children
  );
}
