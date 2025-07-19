import { type Element } from "hast";
import { type MdxJsxFlowElementHast } from "mdast-util-mdx-jsx";
import { readFile } from "node:fs/promises";
import { join, parse } from "node:path";

import { assertString } from "./assertions.js";
import { createJsxNode } from "./createJsxNode.js";
import { log } from "./log.js";
import {
  type ReplacePreElementWithJsxNodeOptions,
  replacePreElement,
  replacePreElementWithJsxNode,
} from "./replacePreElement.js";
import { transformTsToJs } from "./transformTsToJs.js";

export interface ImportCodeOptions extends ReplacePreElementWithJsxNodeOptions {
  demoDir: string;
  aliasDir: string;
  codeElement: Element;
}

export async function importCode(options: ImportCodeOptions): Promise<void> {
  const { meta, preElement, preElementParent, codeElement, aliasDir, demoDir } =
    options;

  const code = createJsxNode({
    as: "code",
    meta,
  });

  let source = "";
  let fileName: string | undefined;

  const errors = new Set<string>();
  code.attributes.forEach((attr) => {
    if (attr.type !== "mdxJsxAttribute") {
      return;
    }

    const { name, value } = attr;
    switch (name) {
      case "source":
        assertString(value);
        source = value;
        break;
      case "fileName":
        assertString(value);
        fileName = value;
        break;
      default:
        errors.add(`\`${name}\` is not a valid import prop`);
    }
  });

  if (!source) {
    errors.add("`source` is required");
  }

  if (errors.size) {
    const message = [...errors].map((error) => `- ${error}`).join("\n");
    throw new Error(
      `Unable to import code due to the following errors:\n${message}`
    );
  }

  const sourcePath = source.startsWith("@/")
    ? source.replace("@", aliasDir)
    : join(demoDir, source);
  const task = async (): Promise<void> => {
    const sourceCode = await readFile(sourcePath, "utf8");
    const lang = parse(sourcePath).ext.replace(".", "");

    let codeBlock: MdxJsxFlowElementHast | undefined;
    if (/^tsx?$/.test(lang)) {
      const jsCode = await transformTsToJs(sourceCode, sourcePath);
      if (jsCode && jsCode !== sourceCode.trim()) {
        codeBlock = createJsxNode({
          as: "TypescriptCodeBlock",
          props: {
            isTsx: true,
            tsCode: sourceCode,
            jsCode,
            fileName,
          },
        });
      }
    }

    if (codeBlock) {
      replacePreElement({
        preElement,
        preElementParent,
        replacements: [codeBlock],
      });
    } else {
      codeElement.properties.className = [`language-${lang.replace(".", "")}`];
      codeElement.children = [{ type: "text", value: sourceCode }];
      const meta = new URLSearchParams();
      if (fileName) {
        meta.set("fileName", fileName);
      }

      replacePreElementWithJsxNode({
        meta: meta.toString(),
        preElement,
        preElementParent,
      });
    }
  };

  await log(task(), "", `Imported ${sourcePath.replace(aliasDir, "src")}`);
  return;
}
