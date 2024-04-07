import { createJsxNode } from "./createJsxNode.js";
import { type ReplacePreElementOptions } from "./replacePreElement.js";

export interface TransformNpmCodeOptions extends ReplacePreElementOptions {
  as: string;
  code: string;
}

export function transformNpmCode(options: TransformNpmCodeOptions): void {
  const { as, code, meta, preElementIndex, preElementParent } = options;

  const yarnCode = code
    .replace(/npm/g, "yarn")
    .replace(/uninstall/g, "remove")
    .replace(/install/g, "add");
  const pnpmCode = yarnCode.replace(/yarn/g, "pnpm");

  const codeBlock = createJsxNode({
    as,
    meta,
    props: {
      managers: {
        npm: code,
        pnpm: pnpmCode,
        yarn: yarnCode,
      },
    },
  });
  preElementParent.children[preElementIndex] = codeBlock;
}
