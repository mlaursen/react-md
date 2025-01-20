import { type TypescriptCodeFile } from "@react-md/code/types";
import { type NonNullMutableRef } from "@react-md/core/types";
import { format } from "prettier";
import {
  type ImportDeclaration,
  type ImportSpecifier,
  type Project,
  type SourceFile,
} from "ts-morph";

import { transformTsToJs } from "./transformTsToJs.js";

export interface ParseWithTsMorphOptions {
  project: Project;
  demoOutPath: string;
  demoSourcePath: string;
}

export interface ParseWithTsMorphResult {
  imports: ReadonlyMap<string, ReadonlySet<string>>;
  tsCodeFile: TypescriptCodeFile;
  scssModulesPath: string;
}

interface AddImportsOptions {
  name: string;
  imports: Map<string, Set<string>>;
  namedImports: ImportSpecifier[];
  importDeclaration: ImportDeclaration;
}

function addImports(options: AddImportsOptions): void {
  const { name, imports, namedImports, importDeclaration } = options;

  const values = new Set<string>();
  namedImports.forEach((namedImport) => {
    values.add(namedImport.getName());
  });
  const defaultImport = importDeclaration.getDefaultImport();
  if (defaultImport) {
    values.add(defaultImport.getText());
  }
  imports.set(name, values);
}

interface HandleImportsOptions {
  project: Project;
  imports: Map<string, Set<string>>;
  sourceFile: SourceFile;
  scssModulesPath: NonNullMutableRef<string>;
  importDeclaration: ImportDeclaration;
}

function handleImports(options: HandleImportsOptions): void {
  const { project, imports, sourceFile, scssModulesPath, importDeclaration } =
    options;

  const name = importDeclaration.getModuleSpecifier().getLiteralText();
  const namedImports = importDeclaration.getNamedImports();
  // react is always included
  if (name === "react") {
    return;
  }

  if (name.endsWith(".module.scss")) {
    scssModulesPath.current = name;
  } else if (
    importDeclaration.isModuleSpecifierRelative() ||
    /^(@\/|\.)/.test(name)
  ) {
    const nonAliasedName = name
      .replace(/.*@/, "src")
      .replace(/\.js(x)?$/, ".ts$1");

    // TODO: Clean this up...
    const nextSourceFile = project.addSourceFileAtPath(nonAliasedName);
    nextSourceFile
      .getImportDeclarations()
      .forEach((nextSourceImportDeclaration) => {
        const name = nextSourceImportDeclaration
          .getModuleSpecifier()
          .getLiteralText();
        const nextSourceNamedImports =
          nextSourceImportDeclaration.getNamedImports();

        // if it's react, need to make sure the other file's react imports are
        // included in the original source code
        if (name === "react") {
          const sourceFileReactImport = sourceFile.getImportDeclarationOrThrow(
            (imp) => imp.getModuleSpecifier().getLiteralText() === "react"
          );
          nextSourceNamedImports.forEach((namedImport) => {
            if (
              !sourceFileReactImport
                .getNamedImports()
                .find((name) => name.getName() === namedImport.getName())
            ) {
              sourceFileReactImport.addNamedImport(namedImport.getStructure());
            }
          });
        } else {
          // otherwise, just move the imports over. I should probably always
          // merge though?
          sourceFile.addImportDeclaration({
            ...nextSourceImportDeclaration.getStructure(),
          });
          addImports({
            name,
            imports,
            namedImports: nextSourceNamedImports,
            importDeclaration: nextSourceImportDeclaration,
          });
        }

        nextSourceImportDeclaration.remove();
      });

    sourceFile.addStatements(
      "\n\n" + nextSourceFile.getFullText().replace(/"use client";/, "")
    );
    project.removeSourceFile(nextSourceFile);
    // for some reason I can't get this to work anymore, so just move the
    // entire file over.
    //

    // const exports = [...nextSourceFile.getExportedDeclarations().entries()];
    // exports.forEach(([name, declarations]) => {
    //   if (!namedImports.find((imp) => imp.getText() === name)) {
    //     return;
    //   }
    //
    //   declarations.forEach((declaration) => {
    //     if (Node.isVariableDeclaration(declaration)) {
    //       const statement = declaration.getVariableStatementOrThrow();
    //       statement.setIsExported(false);
    //       sourceFile.addVariableStatement(statement.getStructure());
    //     } else if (Node.isTypeAliasDeclaration(declaration)) {
    //       declaration.setIsExported(false);
    //       sourceFile.addTypeAlias(declaration.getStructure());
    //     } else if (Node.isInterfaceDeclaration(declaration)) {
    //       declaration.setIsExported(false);
    //       sourceFile.addInterface(declaration.getStructure());
    //     }
    //   });
    // });

    importDeclaration.remove();
  } else {
    addImports({
      name,
      imports,
      namedImports,
      importDeclaration,
    });
  }
}

export async function parseWithTsMorph(
  options: ParseWithTsMorphOptions
): Promise<ParseWithTsMorphResult> {
  const { project, demoOutPath, demoSourcePath } = options;

  project.addSourceFileAtPath(demoSourcePath);

  const sourceFile = project.getSourceFileOrThrow(demoSourcePath);

  const imports = new Map<string, Set<string>>();
  const scssModulesPath: NonNullMutableRef<string> = { current: "" };
  sourceFile.getImportDeclarations().forEach((importDeclaration) => {
    handleImports({
      imports,
      project,
      sourceFile,
      scssModulesPath,
      importDeclaration,
    });
  });

  const tsCode = await format(sourceFile.getFullText(), {
    parser: "typescript",
  });
  const jsCode = await transformTsToJs(tsCode, demoOutPath);

  return {
    imports,
    tsCodeFile: {
      lang: "tsx",
      name: "Demo.tsx",
      code: tsCode,
      compiled: jsCode,
    },
    scssModulesPath: scssModulesPath.current,
  };
}
