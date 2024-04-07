import { type Element } from "hast";
import { toString } from "mdast-util-to-string";
import { createJsxNode } from "./createJsxNode.js";
import {
  replacePreElement,
  type ReplacePreElementOptions,
} from "./replacePreElement.js";
import { transformTsToJs } from "./transformTsToJs.js";

export interface CreateTypescriptCodeBlockOptions
  extends ReplacePreElementOptions {
  as: string;
  lang: string;
  filepath: string;
  codeElement: Element;
}

export async function createTypescriptCodeBlock(
  options: CreateTypescriptCodeBlockOptions
): Promise<void> {
  const {
    as,
    meta,
    filepath,
    codeElement,
    preElement,
    preElementIndex,
    preElementParent,
  } = options;

  const tsCode = toString(codeElement).trim();
  const jsCode = await transformTsToJs(tsCode, filepath);
  if (tsCode === jsCode) {
    replacePreElement({
      meta,
      preElement,
      preElementIndex,
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
  preElementParent.children[preElementIndex] = codeBlock;
}
