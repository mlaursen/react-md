import { type CodeFile } from "@react-md/code/types";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { format } from "prettier";
import { type Project, VariableDeclarationKind } from "ts-morph";

import { type InlineDemoProps } from "./createDemo.js";
import { getProjectRootDir } from "./getProjectRootDir.js";
import { getReadOnlyFiles } from "./getReadonlyFiles.js";
import {
  type ParseCompleteDemoFileOptions,
  parseCompleteDemoFile,
} from "./parseDemoFile.js";

const TEMPLATE = `"use client";
import { DemoCodeEditor } from "@/components/DemoCode/DemoCodeEditor.jsx";
import {
  type RunnableCodeScope,
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { type ReactElement } from "react";
`;

const SERVER_TEMPLATE = `
import { type ReadonlyCodeFile } from "@react-md/code/types";
import { type ReactElement } from "react";
import { MarkdownCode } from "@/components/MarkdownCode.jsx";
import { TypescriptCodeBlock } from "@/components/TypescriptCodeBlock.jsx";
`;

interface GetServerComponentSourceOptions {
  project: Project;
  demoName: string;
  demoOutPath: string;
  readOnlyFiles: readonly CodeFile[];
  clientDemoName: string;
  clientImportName: string;
}

async function getServerComponentSource({
  project,
  demoName,
  demoOutPath,
  readOnlyFiles,
  clientDemoName,
  clientImportName,
}: GetServerComponentSourceOptions): Promise<string> {
  const sourceFile = project.createSourceFile(demoOutPath, SERVER_TEMPLATE, {
    overwrite: true,
  });
  sourceFile.addVariableStatement({
    declarations: [
      {
        name: "readOnlyFiles",
        type: "readonly ReadonlyCodeFile[]",
        initializer: JSON.stringify(readOnlyFiles),
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
  });
  sourceFile.addImportDeclaration({
    namedImports: [{ name: clientDemoName }],
    moduleSpecifier: `./${clientImportName}`,
  });

  sourceFile.addFunction({
    name: demoName,
    statements: `
  return (
    <${clientDemoName}
      readOnlyFiles={readOnlyFiles.map((file) => {
        if ("compiled" in file) {
          return (
            <TypescriptCodeBlock
              key={file.name}
              isTsx={file.name.endsWith(".tsx")}
              tsCode={file.code}
              jsCode={file.compiled}
              disableAppBar
            />
          );
        }
        return <MarkdownCode key={file.name} language={file.lang}>{file.code}</MarkdownCode>;
      })}
      readOnlyFileNames={readOnlyFiles.map((file) => file.name.replace(/\\.j/, '.ts'))}
    />
  );
`,
    returnType: "ReactElement",
    isDefaultExport: true,
  });
  return await format(sourceFile.getFullText(), { parser: "typescript" });
}

/**
 * These packages fail with the `import * ` notation
 */
function isCjsOnly(key: string): boolean {
  return /^autosuggest-highlight/.test(key);
}

export interface GenerateDemoFileOptions extends ParseCompleteDemoFileOptions {
  props: InlineDemoProps;
  aliasDir: string;
  demoOutDir: string;
}

export async function generateDemoFile(
  options: GenerateDemoFileOptions
): Promise<void> {
  const {
    props,
    aliasDir,
    project,
    demoDir,
    demoName,
    demoOutDir,
    demoOutPath,
    generatedDir,
    demoSourcePath,
    readOnlyImports,
  } = options;

  const { imports, tsCodeFile, scssCodeFile } = await parseCompleteDemoFile({
    project,
    demoDir,
    demoName,
    demoOutPath,
    generatedDir,
    demoSourcePath,
    readOnlyImports,
  });
  const readOnlyFiles = await getReadOnlyFiles({ aliasDir, readOnlyImports });

  const sourceFile = project.createSourceFile(demoOutPath, TEMPLATE, {
    overwrite: true,
  });
  const importScope: Record<string, string> = {};
  [...imports.entries()].forEach(([name, values]) => {
    const sortedValues = alphaNumericSort([...values]);
    const key = sortedValues.join("_");
    importScope[name] = key;

    if (isCjsOnly(name)) {
      sourceFile.addImportDeclaration({
        defaultImport: key,
        moduleSpecifier: name,
      });
    } else {
      sourceFile.addImportDeclaration({
        namespaceImport: key,
        moduleSpecifier: name,
      });
    }
  });

  sourceFile.addVariableStatement({
    declarations: [
      {
        name: "tsCodeFile",
        type: "TypescriptCodeFile",
        initializer: JSON.stringify(tsCodeFile),
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
  });

  let scssCodeFileProp = "";
  if (scssCodeFile) {
    scssCodeFileProp = "scssCodeFile={scssCodeFile}";
    sourceFile.addVariableStatement({
      declarations: [
        {
          name: "scssCodeFile",
          type: "ScssCodeFile",
          initializer: JSON.stringify(scssCodeFile),
        },
      ],
      declarationKind: VariableDeclarationKind.Const,
    });
  }

  let readOnlyFilesProp = "";
  let clientDemoName = demoName;
  if (readOnlyFiles.length) {
    readOnlyFilesProp =
      "readOnlyFiles={readOnlyFiles} readOnlyFileNames={readOnlyFileNames}";
    clientDemoName = demoName + "Client";
  }

  const scope = Object.entries(importScope)
    .map(([name, value]) => `"${name}": ${value}`)
    .join(",");
  sourceFile.addVariableStatement({
    declarations: [
      {
        name: "scope",
        type: "RunnableCodeScope",
        initializer: `{ import: {${scope}} }`,
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
  });

  // allow hot reloading in dev mode with the `watch-demos` script
  const devKey =
    process.env.NODE_ENV !== "production" ? `key={${Date.now()}}` : "";
  const stringifiedProps = Object.entries(props).reduce<string>(
    (s, [name, value]) => {
      if (typeof value === "boolean" && value) {
        return `${s} ${name}`;
      }

      if (typeof value === "string") {
        return `${s} ${name}="${value}"`;
      }

      return s;
    },
    ""
  );

  sourceFile.addFunction({
    name: clientDemoName,
    parameters: readOnlyFilesProp
      ? [
          {
            name: "{ readOnlyFiles, readOnlyFileNames }",
            type: "{ readOnlyFiles: readonly ReactElement[]; readOnlyFileNames: readonly string[] }",
          },
        ]
      : [],
    // ts-morph does not support tsx at this time
    statements: `return (
  <DemoCodeEditor
    ${devKey}
    scope={scope}
    source={"${demoSourcePath.replace(getProjectRootDir(), "").replace(/^\/+/, "")}"}
    demoName="${demoName}"
    tsCodeFile={tsCodeFile}
    ${scssCodeFileProp}
    ${readOnlyFilesProp}
    ${stringifiedProps}
  />
);
`,
    returnType: "ReactElement",
    isDefaultExport: !readOnlyFilesProp,
    isExported: true,
  });

  if (!existsSync(demoOutDir)) {
    await mkdir(demoOutDir, { recursive: true });
  }

  let demoOutPathClient = demoOutPath;
  let clientImportName: string | undefined;
  if (readOnlyFilesProp) {
    demoOutPathClient = demoOutPath.replace(/(\..+)$/, "Client$1");
    clientImportName = basename(demoOutPathClient).replace(/\.t/, ".j");
  }

  await writeFile(
    demoOutPathClient,
    await format(sourceFile.getFullText(), { parser: "typescript" })
  );
  if (clientImportName) {
    await writeFile(
      demoOutPath,
      await getServerComponentSource({
        project,
        demoName,
        demoOutPath,
        readOnlyFiles,
        clientDemoName,
        clientImportName,
      })
    );
  }
}
