import { type NonNullMutableRef } from "@react-md/core/types";
import { type Root } from "hast";
import { toString } from "mdast-util-to-string";
import { dirname, join } from "node:path";
import { type Plugin } from "unified";
import { visitParents } from "unist-util-visit-parents";
import { createDemo } from "./utils/createDemo.js";
import { createTypescriptCodeBlock } from "./utils/createTypescriptCodeBlock.js";
import { getCodeLanguage } from "./utils/getCodeLanguage.js";
import { replacePreElementWithJsxNode } from "./utils/replacePreElement.js";
import { transformNpmCode } from "./utils/transformNpmCode.js";

export interface RehypeCodeBlocksOptions {
  /** @defaultValue `"TypescriptCodeBlock"` */
  tsComponentName?: string;

  /** @defaultValue `"PackageManagerCodeBlock"` */
  npmComponentName?: string;
}

/**
 * This plugin will inspect all code blocks in the MDX file to:
 * - Ensure only specific languages are used in code blocks and throw errors
 *   for others
 * - If the code block is a shell script with `npm `code:
 *   - auto convert the code into `pnpm` and `yarn` and replace the code block
 *   with: `<PackageManagerCodeBlock manangers={{ npm, pnpm, yarn }} />`
 * - Check if there are any "code props" and pass them to the `code` renderer
 *   or other special components defined later.
 *   - rehype-mdx-code-props - https://github.com/remcohaszing/rehype-mdx-code-props/blob/007ff4af2a2c11bfbdc7c3b592c247df35cbb076/src/rehype-mdx-code-props.ts
 *   - Available props for the `demo` language:
 *     - `source` (required)
 *     - `card`
 *     - `phone`
 *     - `transparent`
 *     - `disableEditor`
 *     - `disablePreview`
 * - If the code block is `ts `or `tsx`, try to convert it to javascript and
 *   replace the code block with:
 *   `<TypescriptCodeBlock isTsx={isTsx} tsCode={tsCode} jsCode={jsCode} />`
 * - If the code block has a language of `demo`, resolve the `source` code prop
 *   as the demo file to generate a new component that renders the
 *   `<CodeEditor />` with props for that demo. Then replace the code block in
 *   the markdown page with the new component.
 *
 *```tsx
 *import CustomizingTypography from "@/generated/components/typography/CustomizingTypography.tsx";
 *
 *<CustomizingTypography />
 *```
 *
 * - This generated component is important because it:
 *   - it parses the demo source file to determine the `RunnableCodeScope`
 *     imports
 *   - transpiles the `.tsx` code into javascript
 *   - checks if there is a `.module.scss` file to create fake scss modules
 *     - load the scss source code
 *     - compile using sass with a custom importer to conver to "file urls"
 *       - create a `@/generated/rmdScssLookup.ts` with the
 *         `@react-md/core/*.scss` so that the demo can be modified in the
 *         browser
 *     - use postcss to traverse the output to make a simple SCSS module with
 *       local and global scoping based on the demo name
 *
 * TODO:
 * - Preserve comments and whitespace
 * - Handle the `disableEditor` and `disablePreview` cases
 * - Trigger reload when demo is added, removed, or modified
 * - Create codemod for `react-md` -> `@react-md/core/*`
 */
export const rehypeCodeBlocks: Plugin<
  [options?: RehypeCodeBlocksOptions],
  Root
> = (options = {}) => {
  const {
    tsComponentName = "TypescriptCodeBlock",
    npmComponentName = "PackageManagerCodeBlock",
  } = options;
  const srcDir = join(process.cwd(), "src");
  const generatedDir = join(srcDir, "generated");
  const createScssLookup: NonNullMutableRef<boolean> = {
    current: true,
  };

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
              preElementParent,
            });
          } else if (meta) {
            replacePreElementWithJsxNode({
              meta,
              preElement,
              preElementParent,
            });
          }

          break;
        }
        case "demo": {
          promises.push(
            createDemo({
              meta,
              demoDir: dirname(filepath),
              aliasDir: srcDir,
              generatedDir,
              preElement,
              preElementParent,
              createScssLookup,
            })
          );
          break;
        }
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
            replacePreElementWithJsxNode({
              meta,
              preElement,
              preElementParent,
            });
          }
      }
    });

    await Promise.all(promises);
    if (process.env.NODE_ENV !== "production") {
      createScssLookup.current = true;
    }
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
