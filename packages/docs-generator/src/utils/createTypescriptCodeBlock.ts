import { type Element } from "hast";
import { toString } from "mdast-util-to-string";

import { createJsxNode } from "./createJsxNode.js";
import {
  type ReplacePreElementWithJsxNodeOptions,
  replacePreElement,
  replacePreElementWithJsxNode,
} from "./replacePreElement.js";
import { transformTsToJs } from "./transformTsToJs.js";

const DISABLE_TRANSFORM = "disableTransform";

export interface CreateTypescriptCodeBlockOptions
  extends ReplacePreElementWithJsxNodeOptions {
  as: string;
  lang: string;
  filepath: string;
  codeElement: Element;
}

export async function createTypescriptCodeBlock(
  options: CreateTypescriptCodeBlockOptions
): Promise<void> {
  const { as, meta, filepath, codeElement, preElement, preElementParent } =
    options;

  const tsCode = toString(codeElement).trim();
  if (meta.includes(DISABLE_TRANSFORM)) {
    replacePreElementWithJsxNode({
      meta: meta.replace(DISABLE_TRANSFORM, "").trim(),
      preElement,
      preElementParent,
    });
    return;
  }

  const jsCode = await transformTsToJs(tsCode, filepath);
  if (!jsCode || tsCode === jsCode) {
    replacePreElementWithJsxNode({
      meta,
      preElement,
      preElementParent,
    });
    return;
  }

  const codeBlock = createJsxNode({
    as,
    meta,
    props: {
      isTsx: filepath.endsWith(".tsx"),
      tsCode,
      jsCode,
    },
  });
  replacePreElement({
    preElement,
    preElementParent,
    replacements: [codeBlock],
  });
}
