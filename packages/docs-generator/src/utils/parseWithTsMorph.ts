import { type TypescriptCodeFile } from "@react-md/code/types";
import { format } from "prettier";
import { type Project } from "ts-morph";
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

export async function parseWithTsMorph(
  options: ParseWithTsMorphOptions
): Promise<ParseWithTsMorphResult> {
  const { project, demoOutPath, demoSourcePath } = options;

  project.addSourceFileAtPath(demoSourcePath);

  const sourceFile = project.getSourceFileOrThrow(demoSourcePath);

  let scssModulesPath = "";
  const imports = new Map<string, Set<string>>();
  sourceFile.getImportDeclarations().forEach((importDeclaration) => {
    const name = importDeclaration.getModuleSpecifier().getLiteralText();
    const namedImports = importDeclaration.getNamedImports();
    // react is always included
    if (name === "react") {
      return;
    }

    if (name.endsWith(".module.scss")) {
      scssModulesPath = name;
    } else if (
      importDeclaration.isModuleSpecifierRelative() ||
      /^(@\/|\.)/.test(name)
    ) {
      const nonAliasedName = name
        .replace(/.*@/, "src")
        .replace(/\.js(x)?$/, ".ts$1");

      const nextSourceFile = project.addSourceFileAtPath(nonAliasedName);
      sourceFile.addStatements("\n\n" + nextSourceFile.getFullText());
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
    scssModulesPath,
  };
}
