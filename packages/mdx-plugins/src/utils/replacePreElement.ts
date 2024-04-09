import { type Element, type ElementContent, type Root } from "hast";
import { propertiesToMdxJsxAttributes } from "hast-util-properties-to-mdx-jsx-attributes";
import {
  type MdxJsxFlowElementHast,
  type MdxJsxTextElementHast,
} from "mdast-util-mdx-jsx";
import { createJsxNode } from "./createJsxNode.js";

export interface CreatePreJsxNodeOptions {
  meta: string;
  preElement: Element;
}

export function createPreJsxNode(
  options: CreatePreJsxNodeOptions
): MdxJsxFlowElementHast {
  const { meta, preElement } = options;

  const replacement = createJsxNode({
    as: "pre",
    meta,
  });
  replacement.children = preElement.children;
  replacement.data = preElement.data;
  replacement.position = preElement.position;
  replacement.attributes.unshift(
    ...propertiesToMdxJsxAttributes(preElement.properties, {
      elementAttributeNameCase: "react",
    })
  );

  return replacement;
}

export interface ReplacePreElementOptions {
  preElement: Element;
  preElementParent:
    | MdxJsxTextElementHast
    | MdxJsxFlowElementHast
    | Element
    | Root;
  replacements: ElementContent[];
}

export function replacePreElement(options: ReplacePreElementOptions): void {
  const { preElement, preElementParent, replacements } = options;

  preElementParent.children.splice(
    // NOTE: Need to use .indexOf each time instead of passing an index around
    // because of async behavior
    preElementParent.children.indexOf(preElement),
    1,
    ...replacements
  );
}

export interface ReplacePreElementWithJsxNodeOptions
  extends CreatePreJsxNodeOptions {
  preElement: Element;
  preElementParent:
    | MdxJsxTextElementHast
    | MdxJsxFlowElementHast
    | Element
    | Root;
}

export function replacePreElementWithJsxNode(
  options: ReplacePreElementWithJsxNodeOptions
): void {
  const { meta, preElement, preElementParent } = options;

  replacePreElement({
    preElement,
    preElementParent,
    replacements: [createPreJsxNode({ meta, preElement })],
  });
}
