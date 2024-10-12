import { dirname, join, parse, resolve } from "node:path";
import { type Project } from "ts-morph";
import { assertString } from "./assertions.js";
import { createJsxElementContent, createJsxNode } from "./createJsxNode.js";
import { generateDemoFile } from "./generateDemoFile.js";
import { log } from "./log.js";
import { parseWithTsMorph } from "./parseWithTsMorph.js";
import {
  replacePreElement,
  type ReplacePreElementWithJsxNodeOptions,
} from "./replacePreElement.js";
import { type CodePreviewProps } from "@react-md/code/CodePreview";

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

export type DemoCodePreviewProps = Required<
  Pick<
    CodePreviewProps,
    "disableBox" | "transparent" | "forceDarkMode" | "disablePadding"
  >
>;

export interface InlineDemoProps extends DemoCodePreviewProps {
  card: boolean;
  phone: boolean;
  importOnly: boolean;
  startOnScss: boolean;
}

export interface DemoProps extends InlineDemoProps {
  jsCode: string;
  tsCode: string;
}

export interface CreateDemoOptions extends ReplacePreElementWithJsxNodeOptions {
  demoDir: string;
  project: Project;

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
    project,
    generatedDir,
    preElement,
    preElementParent,
  } = options;
  const code = createJsxNode({
    as: "code",
    meta,
  });

  let source = "";
  const props: InlineDemoProps = {
    card: false,
    phone: false,
    disableBox: false,
    importOnly: false,
    startOnScss: false,
    transparent: false,
    forceDarkMode: false,
    disablePadding: false,
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
      case "disableBox":
      case "importOnly":
      case "transparent":
      case "startOnScss":
      case "forceDarkMode":
      case "disablePadding":
        props[name] = true;
        break;
      default:
        errors.add(`\`${name}\` is not a valid demo prop`);
    }
  });
  if (errors.size) {
    errors.add(`Valid demo props are:
${Object.keys(props)
  .map((name) => `- ${name}`)
  .join("\n")}
`);
  }

  if (!source || !source.startsWith("./")) {
    errors.add("`source` is required and must be a relative path");
  }

  if (errors.size) {
    const message = [...errors]
      .map((error) =>
        error.startsWith("Valid demo props are") ? error : `- ${error}`
      )
      .join("\n");
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
  if (props.importOnly) {
    const task = async (): Promise<void> => {
      const { tsCodeFile, scssModulesPath } = await parseWithTsMorph({
        project,
        demoOutPath,
        demoSourcePath: demoCodePath,
      });

      if (scssModulesPath) {
        throw new Error("SCSS Modules are not supported for import-only demos");
      }

      const codeBlock = createJsxNode({
        as: "TypescriptCodeBlock",
        props: {
          isTsx: true,
          tsCode: tsCodeFile.code,
          jsCode: tsCodeFile.compiled,
        },
      });

      replacePreElement({
        preElement,
        preElementParent,
        replacements: [codeBlock],
      });
    };

    await log(task(), "", `Compiled ${aliasedDemoOutPath}`);
    return;
  }

  await log(
    generateDemoFile({
      props,
      aliasDir,
      project,
      demoDir,
      demoName,
      demoOutDir,
      demoOutPath,
      demoSourcePath: demoCodePath,
      generatedDir,
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
