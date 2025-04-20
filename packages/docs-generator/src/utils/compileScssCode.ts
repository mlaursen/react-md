import { type Element } from "hast";
import { toString } from "mdast-util-to-string";

import { compileScss } from "./compileScssModule.js";
import { createJsxNode } from "./createJsxNode.js";
import { loadDemoScssInNode } from "./getScssCodeFile.js";
import {
  type ReplacePreElementWithJsxNodeOptions,
  replacePreElement,
} from "./replacePreElement.js";

export interface CompileScssCodeOptions
  extends ReplacePreElementWithJsxNodeOptions {
  as: string;
  codeElement: Element;
}

/**
 * NOTE: I had tried making this a RSC, but that failed because the
 * `loadDemoScssInNode` file calls `git` and I really want this to be a
 * build-time thing instead of run-time. It probably would have worked if every
 * page is statically generated.
 */
export function compileScssCode(options: CompileScssCodeOptions): void {
  const { as, meta, codeElement, preElement, preElementParent } = options;
  const scss = toString(codeElement).trim();
  const css = compileScss({
    scss,
    load: loadDemoScssInNode,
  }).trim();

  if (!css) {
    throw new Error("The scss code did not compile to any css:\n\n" + scss);
  }

  const codeBlock = createJsxNode({
    as,
    meta,
    props: {
      css,
      scss,
    },
  });

  replacePreElement({
    preElement,
    preElementParent,
    replacements: [codeBlock],
  });
}
