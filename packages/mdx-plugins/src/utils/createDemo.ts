import { readFile } from "node:fs/promises";
import { join, parse, resolve } from "node:path";
import { assertString } from "./assertions.js";
import { createJsxElementContent, createJsxNode } from "./createJsxNode.js";
import { generateDemoFile } from "./generateDemoFile.js";
import { log } from "./log.js";
import {
  replacePreElement,
  type ReplacePreElementWithJsxNodeOptions,
} from "./replacePreElement.js";

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
  as: string;
  outDir: string;
  parentFolder: string;
}

export async function createDemo(options: CreateDemoOptions): Promise<void> {
  const { as, meta, outDir, parentFolder, preElement, preElementParent } =
    options;
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

  const sourceCodePath = resolve(parentFolder, source);
  const sourceCode = await readFile(sourceCodePath, "utf8");
  const demoName = parse(source).name;
  const generatedPath = join(outDir, source);
  const demoCode = `import ${demoName} from "${generatedPath}";

<${demoName} />
`;

  replacePreElement({
    preElement,
    preElementParent,
    replacements: createJsxElementContent(demoCode),
  });

  const name = generatedPath.replace(join(process.cwd(), "src"), "@");

  await log(
    generateDemoFile({
      props,
      demoName,
      sourceCode,
      generatedPath,
    }),
    `Compiling ${name}`,
    `Compiled ${name}`
  );
}
