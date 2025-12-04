import { type PackageManager } from "@react-md/code/PackageManagerProvider";

import { createJsxNode } from "./createJsxNode.js";
import {
  type ReplacePreElementWithJsxNodeOptions,
  replacePreElement,
} from "./replacePreElement.js";

export function getTransformedNpmCode(
  code: string
): Record<PackageManager, string> {
  const yarnCode = code
    .replace(/npm/g, "yarn")
    .replace(/uninstall/g, "remove")
    .replace(/install/g, "add");
  const pnpmCode = yarnCode.replace(/yarn/g, "pnpm");

  return {
    npm: code,
    pnpm: pnpmCode,
    yarn: yarnCode,
  };
}

export interface TransformNpmCodeOptions extends ReplacePreElementWithJsxNodeOptions {
  as: string;
  code: string;
}

export function transformNpmCode(options: TransformNpmCodeOptions): void {
  const { as, code, meta, preElement, preElementParent } = options;

  const codeBlock = createJsxNode({
    as,
    meta,
    props: {
      managers: getTransformedNpmCode(code),
    },
  });
  replacePreElement({
    preElement,
    preElementParent,
    replacements: [codeBlock],
  });
}
