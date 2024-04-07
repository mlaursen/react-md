import { type Root } from "hast";
import { type Plugin } from "unified";
import { visitParents } from "unist-util-visit-parents";
import { createDemo } from "./utils/createDemo.js";
import { createTypescriptCodeBlock } from "./utils/createTypescriptCodeBlock.js";
import { getCodeLanguage } from "./utils/getCodeLanguage.js";
import { replacePreElement } from "./utils/replacePreElement.js";

export interface RehypeCodeBlocksOptions {
  //
}

/**
 * This is a combination of multiple plugins:
 *
 * - rehype-mdx-code-props - https://github.com/remcohaszing/rehype-mdx-code-props/blob/007ff4af2a2c11bfbdc7c3b592c247df35cbb076/src/rehype-mdx-code-props.ts
 */
export const rehypeCodeBlocks: Plugin<
  [options?: RehypeCodeBlocksOptions],
  Root
> = (_options = {}) => {
  return async (root, file) => {
    const promises: Promise<void>[] = [];
    visitParents(root, "element", (node, ancestors) => {
      if (node.tagName !== "code") {
        return;
      }

      const meta = node.data?.meta;
      if (typeof meta !== "string" || !meta) {
        return;
      }

      const preElement = ancestors.at(-1);
      if (
        preElement?.type !== "element" ||
        preElement.tagName !== "pre" ||
        preElement.children.length !== 1
      ) {
        return;
      }

      const preElementParent = ancestors.at(-2);
      if (!preElementParent) {
        return;
      }

      const lang = getCodeLanguage(node);
      const filepath = file.path;
      const preElementIndex = preElementParent.children.indexOf(preElement);
      if (lang === "ts" || lang === "tsx") {
        promises.push(
          createTypescriptCodeBlock({
            meta,
            lang,
            filepath,
            preElement,
            preElementIndex,
            preElementParent,
            codeElement: node,
          })
        );
      } else if (lang === "demo") {
        promises.push(
          createDemo({
            meta,
            filepath,
            preElement,
            preElementIndex,
            preElementParent,

            // temp
            codeElement: node,
          })
        );
      } else {
        replacePreElement({
          meta,
          preElement,
          preElementIndex,
          preElementParent,
        });
      }
    });

    await Promise.all(promises);
    return;
  };
};

/**
 * @internal
 */
declare module "hast" {
  interface ElementData {
    /**
     * Code meta defined by the mdast.
     */
    meta?: string;
  }
}
