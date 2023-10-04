import { join } from "node:path";
import {
  Node,
  Project,
  VariableDeclarationKind,
  type ImportDeclaration,
  type SourceFile,
} from "ts-morph";
import { format } from "../../src/utils/format.js";

const getImportName = (imp: ImportDeclaration): string =>
  imp
    .getModuleSpecifier()
    .getLiteralText()
    .replace(/\.js(x)?$/, ".ts$1");

const isAliasImport = (imp: ImportDeclaration | string): boolean =>
  (typeof imp !== "string" ? getImportName(imp) : imp).startsWith("@/");

const getRealPath = (imp: ImportDeclaration, directory: string): string => {
  const name = getImportName(imp);
  return isAliasImport(imp) ? name.replace("@", "src") : join(directory, name);
};

export interface MoveImportsIntoDemoFileOptions {
  demo: SourceFile;
  project: Project;
  imports: readonly string[];
  importPath: string;
}

const moveImportsIntoDemoFile = (
  options: MoveImportsIntoDemoFileOptions
): void => {
  const { demo, project, imports, importPath } = options;

  const sourceFile = project.getSourceFileOrThrow(importPath);
  for (const [name, declarations] of sourceFile.getExportedDeclarations()) {
    if (imports.includes(name)) {
      declarations.forEach((declaration) => {
        if (Node.isVariableDeclaration(declaration)) {
          const statement = declaration.getVariableStatementOrThrow();
          statement.setIsExported(false);

          demo.addVariableStatement({
            declarations: [
              {
                name: declaration.getName(),
                initializer: declaration.getInitializerOrThrow().getText(),
              },
            ],
            declarationKind: VariableDeclarationKind.Const,
          });
        }
      });
    }
  }
};

export const getDemoCode = async (
  demoFilePath: string,
  directory: string
): Promise<string> => {
  const project = new Project({
    tsConfigFilePath: "./tsconfig.json",
    skipAddingFilesFromTsConfig: true,
  });
  project.addSourceFileAtPath(demoFilePath);

  const demo = project.getSourceFileOrThrow(demoFilePath);
  const relativeImports = demo
    .getImportDeclarations()
    .filter((imp) => imp.isModuleSpecifierRelative() || isAliasImport(imp));
  relativeImports.forEach((imp) => {
    const importPath = getRealPath(imp, directory);
    project.addSourceFileAtPath(importPath);

    const identifiers = imp
      .getNamedImports()
      .map((identifier) => identifier.getText());
    moveImportsIntoDemoFile({
      demo,
      project,
      imports: identifiers,
      importPath,
    });

    imp.remove();
  });

  return await format(demo.getFullText());
};
