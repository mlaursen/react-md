import { type Root } from "hast";
import { toString } from "mdast-util-to-string";
import { type Plugin } from "unified";
import { visitParents } from "unist-util-visit-parents";
import { createDemo } from "./utils/createDemo.js";
import { createTypescriptCodeBlock } from "./utils/createTypescriptCodeBlock.js";
import { getCodeLanguage } from "./utils/getCodeLanguage.js";
import { replacePreElement } from "./utils/replacePreElement.js";
import { transformNpmCode } from "./utils/transformNpmCode.js";

export interface RehypeCodeBlocksOptions {
  /** @defaultValue `"TypescriptCodeBlock"` */
  tsComponentName?: string;

  /** @defaultValue `"PackageManagerCodeBlock"` */
  npmComponentName?: string;

  /** @defaultValue `"Demo"` */
  demoComponentName?: string;
}

/**
 * This is a combination of multiple plugins:
 *
 * - rehype-mdx-code-props - https://github.com/remcohaszing/rehype-mdx-code-props/blob/007ff4af2a2c11bfbdc7c3b592c247df35cbb076/src/rehype-mdx-code-props.ts
 */
export const rehypeCodeBlocks: Plugin<
  [options?: RehypeCodeBlocksOptions],
  Root
> = (options = {}) => {
  const {
    tsComponentName = "TypescriptCodeBlock",
    npmComponentName = "PackageManagerCodeBlock",
    demoComponentName = "Demo",
  } = options;

  return async (root, file) => {
    const promises: Promise<void>[] = [];
    visitParents(root, "element", (node, ancestors) => {
      if (node.tagName !== "code") {
        return;
      }

      const meta = node.data?.meta ?? "";
      if (typeof meta !== "string") {
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
      switch (lang) {
        case "ts":
        case "tsx":
          promises.push(
            createTypescriptCodeBlock({
              as: tsComponentName,
              meta,
              lang,
              filepath,
              preElement,
              preElementIndex,
              preElementParent,
              codeElement: node,
            })
          );
          break;
        case "sh": {
          const code = toString(node).trim();
          if (code.startsWith("npm")) {
            transformNpmCode({
              as: npmComponentName,
              meta,
              code,
              preElement,
              preElementIndex,
              preElementParent,
            });
          } else if (meta) {
            replacePreElement({
              meta,
              preElement,
              preElementIndex,
              preElementParent,
            });
          }

          break;
        }
        case "demo":
          promises.push(
            createDemo({
              as: demoComponentName,
              meta,
              filepath,
              preElement,
              preElementIndex,
              preElementParent,

              // temp
              codeElement: node,
            })
          );
          break;
        case "bash":
        case "shell":
          throw new Error("Shell scripts should use `sh`");
        case "js":
        case "jsx":
        case "javascript":
        case "typescript":
        case "typescriptreact":
          throw new Error("Code examples must use `ts` or `tsx`");
        default:
          if (meta) {
            replacePreElement({
              meta,
              preElement,
              preElementIndex,
              preElementParent,
            });
          }
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
