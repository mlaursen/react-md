import babelParser from "@babel/parser";
import { type CompiledCodeFile } from "@react-md/code/types";
import { alphaNumericSort } from "@react-md/core/utils/alphaNumericSort";
import { namedTypes as n, visit } from "ast-types";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { format } from "prettier";
import { print } from "recast";
import { type InlineDemoProps } from "./createDemo.js";
import { transformTsToJs } from "./transformTsToJs.js";

const BASE_CODE = `"use client";
import { CodeEditor } from "@/components/CodeEditor.jsx";
import {
  type CompiledCodeFile,
  type RunnableCodeScope,
} from "@react-md/code/types";
import { type ReactElement } from "react";
$IMPORTS

const scope: RunnableCodeScope = {
  import: { $IMPORT },
};

const files: CompiledCodeFile[] = $FILES;

export default function $DEMO_NAME(): ReactElement {
  return <CodeEditor scope={scope} files={files} $PROPS />;
}
`;

export interface GenerateDemoFileOptions {
  props: InlineDemoProps;
  demoName: string;
  sourceCode: string;
  generatedPath: string;
}

export async function generateDemoFile(
  options: GenerateDemoFileOptions
): Promise<void> {
  const { props, sourceCode, generatedPath } = options;

  const sourceFile = babelParser.parse(sourceCode, {
    plugins: ["jsx", "typescript"],
    sourceType: "module",
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
  const jsCode = await transformTsToJs(tsCode, generatedPath);

  const files: CompiledCodeFile[] = [
    {
      lang: "tsx",
      name: "Demo",
      code: tsCode,
      compiled: jsCode,
    },
  ];
  if (styles) {
    files.push({
      lang: "scss",
      name: "Demo",
      code: styles,
      compiled: "",
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
    ""
  );
  const generatedCode = BASE_CODE.replace(
    "$IMPORTS",
    importStatements.join("\n")
  )
    .replace("$IMPORT", importScope.join(","))
    .replace("$FILES", JSON.stringify(files))
    .replace("$PROPS", stringifiedProps);

  const parentFolder = dirname(generatedPath);
  if (!existsSync(parentFolder)) {
    await mkdir(parentFolder, { recursive: true });
  }
  await writeFile(
    generatedPath,
    await format(generatedCode, { parser: "typescript" })
  );
}
