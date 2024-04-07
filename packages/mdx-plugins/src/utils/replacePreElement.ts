import { type Element, type Root } from "hast";
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

export interface ReplacePreElementOptions extends CreatePreJsxNodeOptions {
  preElementIndex: number;
  preElementParent:
    | MdxJsxTextElementHast
    | MdxJsxFlowElementHast
    | Element
    | Root;
}

export function replacePreElement(options: ReplacePreElementOptions): void {
  const { meta, preElement, preElementIndex, preElementParent } = options;

  const replacement = createPreJsxNode({ meta, preElement });
  preElementParent.children[preElementIndex] = replacement;
}
