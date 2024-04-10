import { type NonNullMutableRef } from "@react-md/core/types";
import { readFile } from "node:fs/promises";
import { dirname, join, parse, resolve } from "node:path";
import { assertString } from "./assertions.js";
import { createJsxElementContent, createJsxNode } from "./createJsxNode.js";
import { generateDemoFile } from "./generateDemoFile.js";
import { log } from "./log.js";
import {
  replacePreElement,
  type ReplacePreElementWithJsxNodeOptions,
} from "./replacePreElement.js";

interface CreateDemoMdxCodeOptions {
  demoName: string;
  aliasedDemoOutPath: string;
}

const createDemoMdxCode = ({
  demoName,
  aliasedDemoOutPath,
}: CreateDemoMdxCodeOptions): string => `import ${demoName} from "${aliasedDemoOutPath}";

<${demoName} />
`;

export interface InlineDemoProps {
  card: boolean;
  phone: boolean;
  transparent: boolean;
  disableEditor: boolean;
  disablePreview: boolean;
}

export interface DemoProps extends InlineDemoProps {
  jsCode: string;
  tsCode: string;
}

export interface CreateDemoOptions extends ReplacePreElementWithJsxNodeOptions {
  createScssLookup: NonNullMutableRef<boolean>;

  demoDir: string;

  /**
   * The full path to the docs src folder
   */
  aliasDir: string;
  generatedDir: string;
}

export async function createDemo(options: CreateDemoOptions): Promise<void> {
  const {
    meta,
    demoDir,
    aliasDir,
    generatedDir,
    preElement,
    preElementParent,
    createScssLookup,
  } = options;
  const code = createJsxNode({
    as: "code",
    meta,
  });

  let source = "";
  const props: InlineDemoProps = {
    card: false,
    phone: false,
    transparent: false,
    disableEditor: false,
    disablePreview: false,
  };

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
      case "card":
      case "phone":
      case "transparent":
      case "disableEditor":
      case "disablePreview":
        props[name] = true;
        break;
      default:
        errors.add(`\`${name}\` is not a valid demo prop`);
    }
  });

  if (!source || !source.startsWith("./")) {
    errors.add("`source` is required and must be a relative path");
  }

  if (errors.size) {
    const message = [...errors].map((error) => `- ${error}`).join("\n");
    throw new Error(
      `Unable to create a demo due to the following errors:\n${message}`
    );
  }

  const demoName = parse(source).name;
  const demoCodePath = join(demoDir, source);
  // /home/mlaursen/code/react-md/apps/docs/src/app/(main)/(markdown)/(demos)/components/button -> /components/button/
  const twoFoldersAboveDemo = demoDir.replace(
    resolve(demoDir, "..", "..") + "/",
    ""
  );

  const demoOutPath = join(generatedDir, twoFoldersAboveDemo, source);
  const demoOutDir = dirname(demoOutPath);
  const aliasedDemoOutPath = demoOutPath.replace(aliasDir, "@");
  const demoSourceCode = await readFile(demoCodePath, "utf8");
  await log(
    generateDemoFile({
      props,
      aliasDir,
      demoDir,
      demoName,
      demoOutDir,
      demoOutPath,
      generatedDir,
      demoSourceCode,
      createScssLookup,
    }),
    "",
    `Compiled ${aliasedDemoOutPath}`
  );
  replacePreElement({
    preElement,
    preElementParent,
    replacements: createJsxElementContent(
      createDemoMdxCode({
        demoName,
        aliasedDemoOutPath,
      })
    ),
  });
}
