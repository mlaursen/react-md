import babelParser from "@babel/parser";
import {
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { type NonNullMutableRef } from "@react-md/core/types";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import { namedTypes as n, visit } from "ast-types";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "prettier";
import { print } from "recast";
import { type InlineDemoProps } from "./createDemo.js";
import { getScssCodeFile } from "./getScssCodeFile.js";
import { transformTsToJs } from "./transformTsToJs.js";

const BASE_CODE = `"use client";
import { DemoCodeEditor } from "@/components/DemoCode/DemoCodeEditor.jsx";
import {
  type CompiledCodeFile,
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

  const sourceFile = babelParser.parse(demoSourceCode, {
    plugins: ["jsx", "typescript"],
    sourceType: "module",
    sourceFilename: demoOutPath,
  });

  let styles = "";
  const imports = new Map<string, Set<string>>();
  visit(sourceFile, {
    visitImportDeclaration(path) {
      const { value } = path;

      this.traverse(path);
      if (
        !n.ImportDeclaration.check(value) ||
        !n.StringLiteral.check(value.source)
      ) {
        return;
      }

      const name = value.source.value;
      // react is always included, so it can be skipped
      if (name === "react") {
        return;
      }

      if (name.endsWith(".module.scss")) {
        if (styles) {
          throw new Error("Only one style file is allowed per demo");
        }

        value.source.value = "./Demo.module.scss";
        styles = name;
        return;
      }

      if (name.startsWith(".")) {
        throw new Error("Relative files not supported yet");
      }

      const values = new Set<string>();
      value.specifiers?.forEach((specifier) => {
        if (n.ImportDefaultSpecifier.check(specifier) && specifier.local) {
          values.add(specifier.local.name);
        } else if (n.ImportSpecifier.check(specifier)) {
          values.add(specifier.imported.name);
        }
      });

      imports.set(name, values);
    },
    visitExportDefaultSpecifier(path) {
      this.traverse(path);
      const { value } = path;
      if (n.ExportDefaultSpecifier.check(value)) {
        value.exported.name = "Demo";
      }
    },
  });

  const tsCode = await format(print(sourceFile).code, { parser: "typescript" });
  const jsCode = await transformTsToJs(tsCode, demoOutPath);

  let scssCodeFile: ScssCodeFile | undefined;
  const tsCodeFile: TypescriptCodeFile = {
    lang: "tsx",
    name: "Demo.tsx",
    code: tsCode,
    compiled: jsCode,
  };
  if (styles) {
    let scssLookupPath = "";
    if (createScssLookup.current) {
      createScssLookup.current = false;
      scssLookupPath = join(generatedDir, "rmdScssLookup.ts");
    }

    scssCodeFile = await getScssCodeFile({
      aliasDir,
      demoName,
      scssPath: join(demoDir, styles),
      scssLookupPath,
    });
  }

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
    .replace("$PROPS", stringifiedProps);

  if (!existsSync(demoOutDir)) {
    await mkdir(demoOutDir, { recursive: true });
  }
  await writeFile(
    demoOutPath,
    await format(generatedCode, { parser: "typescript" })
  );
}
