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
    .replaceAll("npm", "yarn")
    .replaceAll("uninstall", "remove")
    .replaceAll("install", "add");
  const pnpmCode = yarnCode.replaceAll("yarn", "pnpm");

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
