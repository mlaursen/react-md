import { type NonNullMutableRef } from "@react-md/core/types";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { format } from "prettier";
import { type InlineDemoProps } from "./createDemo.js";
import { parseDemoFile } from "./parseDemoFile.js";

const BASE_CODE = `"use client";
import { DemoCodeEditor } from "@/components/DemoCode/DemoCodeEditor.jsx";
import {
  type RunnableCodeScope,
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { type ReactElement } from "react";
$IMPORTS

const scope: RunnableCodeScope = {
  import: { $IMPORT },
};

const tsCodeFile: TypescriptCodeFile = $TS_CODE_FILE;
const scssCodeFile: ScssCodeFile | undefined = $SCSS_CODE_FILE;

export default function $DEMO_NAME(): ReactElement {
  return <DemoCodeEditor scope={scope} tsCodeFile={tsCodeFile} scssCodeFile={scssCodeFile} $PROPS />;
}
`;

export interface GenerateDemoFileOptions {
  props: InlineDemoProps;
  aliasDir: string;
  demoDir: string;
  demoName: string;
  demoOutDir: string;
  demoOutPath: string;
  generatedDir: string;
  demoSourceCode: string;
  createScssLookup: NonNullMutableRef<boolean>;
}

export async function generateDemoFile(
  options: GenerateDemoFileOptions
): Promise<void> {
  const {
    props,
    aliasDir,
    demoDir,
    demoName,
    demoOutDir,
    demoOutPath,
    generatedDir,
    demoSourceCode,
    createScssLookup,
  } = options;

  const { imports, tsCodeFile, scssCodeFile } = await parseDemoFile({
    aliasDir,
    demoDir,
    demoName,
    demoOutPath,
    generatedDir,
    demoSourceCode,
    createScssLookup,
  });

  const importScope: string[] = [];
  const importStatements: string[] = [];
  [...imports.entries()].forEach(([name, values]) => {
    const sortedValues = alphaNumericSort([...values]);
    const key = `${sortedValues.join("_")}`;
    importScope.push(`"${name}": ${key}`);
    importStatements.push(`import * as ${key} from "${name}";`);
  });

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
    `demoName="${demoName}"`
  );
  const generatedCode = BASE_CODE.replace(
    "$IMPORTS",
    importStatements.join("\n")
  )
    .replace("$IMPORT", importScope.join(","))
    .replace("$TS_CODE_FILE", JSON.stringify(tsCodeFile))
    .replace(
      "$SCSS_CODE_FILE",
      scssCodeFile ? JSON.stringify(scssCodeFile) : "undefined"
    )
    .replace("$DEMO_NAME", demoName)
    .replace("$PROPS", stringifiedProps);

  if (!existsSync(demoOutDir)) {
    await mkdir(demoOutDir, { recursive: true });
  }
  await writeFile(
    demoOutPath,
    await format(generatedCode, { parser: "typescript" })
  );
}
