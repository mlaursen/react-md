import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { format } from "prettier";
import { VariableDeclarationKind } from "ts-morph";
import { type InlineDemoProps } from "./createDemo.js";
import {
  parseCompleteDemoFile,
  type ParseCompleteDemoFileOptions,
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

export interface GenerateDemoFileOptions extends ParseCompleteDemoFileOptions {
  props: InlineDemoProps;
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
  } = options;

  const { imports, tsCodeFile, scssCodeFile } = await parseCompleteDemoFile({
    aliasDir,
    project,
    demoDir,
    demoName,
    demoOutPath,
    generatedDir,
    demoSourcePath,
  });

  const sourceFile = project.createSourceFile(demoOutPath, TEMPLATE, {
    overwrite: true,
  });
  const importScope: Record<string, string> = {};
  [...imports.entries()].forEach(([name, values]) => {
    const sortedValues = alphaNumericSort([...values]);
    const key = sortedValues.join("_");
    importScope[name] = key;
    sourceFile.addImportDeclaration({
      namespaceImport: key,
      moduleSpecifier: name,
    });
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
  if (scssCodeFile) {
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

  const scssCodeFileProp = scssCodeFile ? `scssCodeFile={scssCodeFile}` : "";
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
    // allow hot reloading in dev mode with the `watch-demos` script
    process.env.NODE_ENV !== "production" ? `key={${Date.now()}}` : ""
  );
  sourceFile.addFunction({
    name: demoName,
    // ts-morph does not support tsx at this time
    statements: `return <DemoCodeEditor scope={scope} demoName="${demoName}" tsCodeFile={tsCodeFile} ${scssCodeFileProp} ${stringifiedProps} />`,
    returnType: "ReactElement",
    isDefaultExport: true,
  });

  if (!existsSync(demoOutDir)) {
    await mkdir(demoOutDir, { recursive: true });
  }
  await writeFile(
    demoOutPath,
    await format(sourceFile.getFullText(), { parser: "typescript" })
  );
}
