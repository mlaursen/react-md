import { join } from "path";
import { Project } from "ts-morph";

import { packagesRoot } from "../constants";

export function getAllReactMDExports(): readonly string[] {
  const project = new Project({
    tsConfigFilePath: join(packagesRoot, "react-md", "tsconfig.ejs.json"),
  });
  const sourceFile = project.createSourceFile(
    "source.ts",
    'import ReactMD from "react-md";'
  );

  const declarations = new Set<string>();
  sourceFile.getImportDeclarations().forEach((declaration) => {
    const defaultImport = declaration.getDefaultImportOrThrow();
    const defaultImportType = defaultImport.getType();
    defaultImportType.getProperties().forEach((symbol) => {
      declarations.add(symbol.getName());
    });
  });

  return Array.from(declarations);
}
