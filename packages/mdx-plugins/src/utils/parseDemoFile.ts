import { type Statement } from "@babel/types";
import {
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { type NonNullMutableRef } from "@react-md/core/types";
import { namedTypes as n, visit } from "ast-types";
import { join } from "node:path";
import { format } from "prettier";
import { print } from "recast";
import { getImportSpecifierName, isTypeImport } from "./ast/imports.js";
import { getScssCodeFile } from "./getScssCodeFile.js";
import { parseAliasedFiles } from "./parseAliasedFiles.js";
import { parseToBabelFile } from "./parseToBabelFile.js";
import { transformTsToJs } from "./transformTsToJs.js";

const SCSS_LOOKUP_NAME = "rmdScssLookup.ts";

interface ParseDemoFileOptions {
  aliasDir: string;
  demoDir: string;
  demoName: string;
  demoOutPath: string;
  demoSourceCode: string;
  generatedDir: string;
  createScssLookup: NonNullMutableRef<boolean>;
}

interface ParseDemoFileResult {
  imports: ReadonlyMap<string, ReadonlySet<string>>;
  tsCodeFile: TypescriptCodeFile;
  scssCodeFile: ScssCodeFile | undefined;
}

export async function parseDemoFile(
  options: ParseDemoFileOptions
): Promise<ParseDemoFileResult> {
  const {
    aliasDir,
    demoDir,
    demoName,
    demoOutPath,
    demoSourceCode,
    generatedDir,
    createScssLookup,
  } = options;

  const sourceFile = parseToBabelFile(demoSourceCode, demoOutPath);

  let scssModulesPath = "";
  const imports = new Map<string, Set<string>>();
  const promises: Promise<void>[] = [];
  const movedImports: Statement[] = [];
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
        if (scssModulesPath) {
          throw new Error("Only one style file is allowed per demo");
        }

        value.source.value = "./Demo.module.scss";
        scssModulesPath = name;
        return;
      }

      const specifiers = value.specifiers ?? [];

      if (name.startsWith(".")) {
        throw new Error("Relative files not supported yet");
      }

      if (name.startsWith("@/")) {
        promises.push(
          parseAliasedFiles({
            aliasDir,
            aliasImportPath: name,
            specifiers,
            movedImports,
            isTypeImportDeclaration: isTypeImport(value),
          })
        );

        // remove the aliased import since it'll be replaced later
        path.prune();
        return;
      }

      const values = new Set<string>();
      specifiers.forEach((specifier) => {
        values.add(getImportSpecifierName(specifier));
      });
      imports.set(name, values);
    },
    visitExportDefaultDeclaration(path) {
      this.traverse(path);
      if (!n.ExportDefaultDeclaration.check(path.value)) {
        return;
      }

      const { declaration } = path.value;
      if (n.FunctionDeclaration.check(declaration)) {
        if (!declaration.id) {
          throw new Error("I do not support unnamed function exports");
        }

        declaration.id.name = "Demo";
      } else {
        throw new Error(`Unsupported export declaration ${declaration.type}`);
      }
    },
  });

  await Promise.all(promises);
  sourceFile.program.body.push(...movedImports);

  const sourceCode = print(sourceFile).code;
  const tsCode = await format(sourceCode, { parser: "typescript" });
  const jsCode = await transformTsToJs(tsCode, demoOutPath);
  const createLookup = createScssLookup.current;
  createScssLookup.current = false;

  const scssCodeFile = await getScssCodeFile({
    create: !!scssModulesPath,
    createLookup,
    aliasDir,
    demoName,
    scssPath: join(demoDir, scssModulesPath),
    scssLookupPath: join(generatedDir, SCSS_LOOKUP_NAME),
  });

  return {
    imports,
    tsCodeFile: {
      lang: "tsx",
      name: "Demo.tsx",
      code: tsCode,
      compiled: jsCode,
    },
    scssCodeFile,
  };
}
