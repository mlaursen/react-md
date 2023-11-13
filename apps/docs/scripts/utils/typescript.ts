import { join } from "node:path";
import {
  Node,
  Project,
  VariableDeclarationKind,
  type ImportDeclaration,
  type SourceFile,
} from "ts-morph";
import { format } from "../../src/utils/format.js";
import { createScssModule } from "./createScssModules.js";

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
        } else if (Node.isTypeAliasDeclaration(declaration)) {
          declaration.setIsExported(false);
          const text = declaration.getText();
          demo.addTypeAlias({
            name: declaration.getName(),
            // I don't know how to do this better.
            // `declaration.getType().getText()` would return the expanded value which I don't want
            type: text.substring(text.indexOf("=") + 1),
          });
        } else if (Node.isInterfaceDeclaration(declaration)) {
          declaration.setIsExported(false);
          demo.addInterface({
            name: declaration.getName(),
            extends: declaration
              .getExtends()
              .map((extendedType) => extendedType.getText()),
            properties: declaration.getProperties().map((property) => ({
              name: property.getName(),
              isReadonly: property.isReadonly(),
              type: property.getType().getText(),
              initializer: property.getInitializer()?.getText(),
            })),
            methods: declaration.getMethods().map((method) => ({
              name: method.getName(),
              parameters: method.getParameters().map((parameter) => ({
                name: parameter.getName(),
              })),
              returnType: method.getReturnType().getText(),
              typeParameters: method.getTypeParameters().map((typeParam) => ({
                name: typeParam.getName(),
                default: typeParam.getDefault()?.getText(),
              })),
            })),
          });
        }
      });
    }
  }
};

interface DemoCode {
  styles: readonly string[];
  demoCode: string;
}

interface DemoCodeOptions {
  directory: string;
  demoFilePath: string;
}

export const getDemoCode = async (
  options: DemoCodeOptions
): Promise<DemoCode> => {
  const { directory, demoFilePath } = options;

  const project = new Project({
    tsConfigFilePath: "./tsconfig.json",
    skipAddingFilesFromTsConfig: true,
  });
  project.addSourceFileAtPath(demoFilePath);

  const demo = project.getSourceFileOrThrow(demoFilePath);
  const relativeImports = demo
    .getImportDeclarations()
    .filter((imp) => imp.isModuleSpecifierRelative() || isAliasImport(imp));
  const styles: string[] = [];
  relativeImports.forEach((imp) => {
    const importPath = getRealPath(imp, directory);
    if (importPath.endsWith(".scss")) {
      styles.push(importPath);
      return;
    }

    project.addSourceFileAtPath(importPath);

    const identifiers = imp
      .getNamedImports()
      .map((identifier) => identifier.getText().replace("type ", ""));
    moveImportsIntoDemoFile({
      demo,
      project,
      imports: identifiers,
      importPath,
    });

    imp.remove();
  });
  await Promise.all(
    styles.map(async (scssModulePath) => createScssModule(scssModulePath))
  );

  const demoCode = await format(demo.getFullText());

  return {
    styles,
    demoCode,
  };
};
