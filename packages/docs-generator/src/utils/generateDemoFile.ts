import {
  type CodeFile,
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname } from "node:path";
import { format } from "prettier";
import { type Project, VariableDeclarationKind } from "ts-morph";

import { type InlineDemoProps } from "./createDemo.js";
import { getProjectRootDir } from "./getProjectRootDir.js";
import { getReadOnlyFiles } from "./getReadonlyFiles.js";
import {
  type ParseCompleteDemoFileOptions,
  parseCompleteDemoFile,
} from "./parseDemoFile.js";

const CLIENT_TEMPLATE = `"use client";
import { DemoCodeEditor, type DemoCodeEditorProps } from "@/components/DemoCode/DemoCodeEditor.jsx";
import { type RunnableCodeScope } from "@react-md/code/types";
import { type ReactElement } from "react";

type Props = Omit<DemoCodeEditorProps, 'scope'>;
`;

const SERVER_TEMPLATE = `
import { CreateStackBlitzProject } from "@/components/StackBlitz/CreateStackBlitzProject.jsx";
import {
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { type ReactElement } from "react";
`;

const upperFirst = <S extends string>(s: S): Capitalize<S> =>
  (s.slice(0, 1).toUpperCase() + s.slice(1)) as Capitalize<S>;

const titleCase = (s: string): string =>
  s.split(/(?=[A-Z])/).reduce((result, part, i) => {
    return result + (i ? " " : "") + upperFirst(part);
  }, "");

function getStackBlitzDemoName(demoOutPath: string, demoName: string): string {
  const parent = basename(dirname(demoOutPath))
    .split("-")
    .map((part) => upperFirst(part))
    .join(" ");

  return `${parent} - ${titleCase(demoName)}`;
}

const toPropString = (
  props: Record<string, number | boolean | string | undefined>
): string =>
  Object.entries(props).reduce<string>((s, [name, value]) => {
    if (typeof value === "boolean" && value) {
      return `${s} ${name}`;
    }

    if (typeof value === "string") {
      return `${s} ${name}="${value}"`;
    }

    if (typeof value === "number") {
      return `${s} ${name}={${value}}`;
    }

    return s;
  }, "");

interface GetServerComponentSourceOptions {
  source: string;
  project: Project;
  demoName: string;
  demoOutPath: string;
  demoProps: InlineDemoProps;
  readOnlyFiles: readonly CodeFile[];
  readOnlyImports: ReadonlySet<string>;
  tsCodeFile: TypescriptCodeFile;
  scssCodeFile: ScssCodeFile | undefined;
  dependencies: ReadonlySet<string>;
  clientDemoName: string;
  clientImportName: string;
}

async function getServerComponentSource({
  source,
  project,
  demoName,
  demoOutPath,
  demoProps,
  tsCodeFile,
  dependencies,
  scssCodeFile,
  readOnlyFiles,
  readOnlyImports,
  clientDemoName,
  clientImportName,
}: GetServerComponentSourceOptions): Promise<string> {
  const stringifiedProps = toPropString({
    // allow hot reloading in dev mode with the `watch-demos` script
    key: process.env.NODE_ENV !== "production" ? Date.now() : undefined,
    demoName,
    ...demoProps,
  });
  const { disableBox, disablePadding, forceDarkMode } = demoProps;

  const sourceFile = project.createSourceFile(demoOutPath, SERVER_TEMPLATE, {
    overwrite: true,
  });

  let readOnlyFilesProps = "";
  let readOnlyImportsProps = "";
  if (readOnlyFiles.length) {
    sourceFile.addImportDeclaration({
      namedImports: [{ name: "ReadonlyCodeFile", isTypeOnly: true }],
      moduleSpecifier: "@react-md/code/types",
    });
    sourceFile.addImportDeclaration({
      namedImports: [{ name: "ReadOnlyFile" }],
      moduleSpecifier: "@/components/DemoCode/ReadOnlyFile.jsx",
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

    sourceFile.addVariableStatement({
      declarations: [
        {
          name: "readOnlyImports",
          type: "Readonly<Record<string, string>>",
          initializer: JSON.stringify(
            Object.fromEntries(
              [...readOnlyImports].map((name) => [basename(name), name])
            )
          ),
        },
      ],
      declarationKind: VariableDeclarationKind.Const,
    });

    readOnlyFilesProps = `
      readOnlyFiles={readOnlyFiles.map((file) => <ReadOnlyFile key={file.name} file={file} />)}
      readOnlyFileNames={readOnlyFiles.map((file) => file.name.replace(/\\.j/, '.ts'))}
`;
    readOnlyImportsProps = `
      readOnlyFiles={readOnlyFiles}
      readOnlyImports={readOnlyImports}
`;
  }
  sourceFile.addImportDeclaration({
    defaultImport: clientDemoName,
    moduleSpecifier: `./${clientImportName}`,
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

  sourceFile.addFunction({
    name: demoName,
    statements: `
  return (
    <${clientDemoName}
      tsCodeFile={tsCodeFile}
      ${scssCodeFileProp}
      ${readOnlyFilesProps}
      ${stringifiedProps}
      source="${source}"
      beforeSourceLinkChildren={
        <CreateStackBlitzProject
          tsCodeFile={tsCodeFile}
          ${scssCodeFileProp}
          ${readOnlyImportsProps}
          ${toPropString({
            title: getStackBlitzDemoName(demoOutPath, demoName),
            demoName,
            disableBox,
            disablePadding,
            forceDarkMode,
          })}
          dependencies={${JSON.stringify([...dependencies])}}
        />
      }
    />
  );
`,
    returnType: "ReactElement",
    isDefaultExport: true,
  });
  return await format(sourceFile.getFullText(), { parser: "typescript" });
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

  const clientSourceFile = project.createSourceFile(
    demoOutPath,
    CLIENT_TEMPLATE,
    { overwrite: true }
  );
  const dependencies = new Set<string>();
  const importScope: Record<string, string> = {};
  [...imports.entries()].forEach(([name, values]) => {
    const sortedValues = alphaNumericSort([...values]);
    const key = sortedValues.join("_");
    importScope[name] = key;
    if (!name.startsWith("@react-md") && !name.startsWith("@/")) {
      dependencies.add(
        // @reduxjs/toolkit/react -> @reduxjs/toolkit
        name
          .split("/")
          .slice(0, name.startsWith("@") ? 2 : 1)
          .join("/")
      );
    }

    clientSourceFile.addImportDeclaration({
      namespaceImport: key,
      moduleSpecifier: name,
    });
  });

  const scope = Object.entries(importScope)
    .map(([name, value]) => `"${name}": ${value}`)
    .join(",");
  clientSourceFile.addVariableStatement({
    declarations: [
      {
        name: "scope",
        type: "RunnableCodeScope",
        initializer: `{ import: {${scope}} }`,
      },
    ],
    declarationKind: VariableDeclarationKind.Const,
  });

  const clientDemoName = `${demoName}Client`;
  const clientDemoOutPath = demoOutPath.replace(/(\..+)$/, "Client$1");
  const clientImportName = basename(clientDemoOutPath).replace(/\.t/, ".j");
  clientSourceFile.addFunction({
    name: clientDemoName,
    parameters: [{ name: "props", type: "Props" }],
    // ts-morph does not support tsx at this time
    statements: "return <DemoCodeEditor {...props} scope={scope} />",
    returnType: "ReactElement",
    isDefaultExport: true,
    isExported: true,
  });

  if (!existsSync(demoOutDir)) {
    await mkdir(demoOutDir, { recursive: true });
  }

  await writeFile(
    clientDemoOutPath,
    await format(clientSourceFile.getFullText(), { parser: "typescript" })
  );
  await writeFile(
    demoOutPath,
    await getServerComponentSource({
      project,
      demoName,
      demoOutPath,
      demoProps: props,
      source: demoSourcePath
        .replace(getProjectRootDir(), "")
        .replace(/^\/+/, ""),
      tsCodeFile,
      scssCodeFile,
      readOnlyFiles,
      readOnlyImports,
      dependencies,
      clientDemoName,
      clientImportName,
    })
  );
}
