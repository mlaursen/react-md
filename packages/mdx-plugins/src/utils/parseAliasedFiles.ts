import { type Statement } from "@babel/types";
import { namedTypes as n, visit } from "ast-types";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getImportSpecifierName, isTypeImport } from "./ast/imports.js";
import { type AnyImportSpecifier } from "./ast/types.js";
import { parseToBabelFile } from "./parseToBabelFile.js";

interface IsMatchedOptions {
  names: ReadonlySet<string>;
  declaration: NonNullable<Required<n.ExportNamedDeclaration>["declaration"]>;
}

function isTypeAliasMatched({ names, declaration }: IsMatchedOptions): boolean {
  return (
    declaration.type === "TSTypeAliasDeclaration" &&
    names.has(declaration.id.name)
  );
}

function isVariableMatched({ declaration, names }: IsMatchedOptions): boolean {
  if (declaration.type !== "VariableDeclaration") {
    return false;
  }

  if (declaration.declarations.length !== 1) {
    throw new Error(
      "I do not support defining multiple variables in one statement"
    );
  }

  const [variable] = declaration.declarations;
  return (
    variable.type === "VariableDeclarator" &&
    variable.id.type === "Identifier" &&
    names.has(variable.id.name)
  );
}

export interface DeclarationMatchedOptions {
  vars: ReadonlySet<string>;
  types: ReadonlySet<string>;
  declaration: n.ExportNamedDeclaration["declaration"];
}

function isDeclarationMatched(
  options: DeclarationMatchedOptions
): options is DeclarationMatchedOptions & { declaration: Statement } {
  const { vars, types, declaration } = options;

  return !!(
    declaration &&
    (isTypeAliasMatched({ declaration, names: types }) ||
      isVariableMatched({ declaration, names: vars }))
  );
}

export interface ParseAliasedFilesOptions {
  aliasDir: string;
  aliasImportPath: string;
  specifiers: readonly AnyImportSpecifier[];
  movedImports: Statement[];
  isTypeImportDeclaration: boolean;
}

export async function parseAliasedFiles(
  options: ParseAliasedFilesOptions
): Promise<void> {
  const {
    aliasImportPath,
    aliasDir,
    specifiers,
    movedImports,
    isTypeImportDeclaration,
  } = options;

  const vars = new Set<string>();
  const types = new Set<string>();
  specifiers.forEach((specifier) => {
    const name = getImportSpecifierName(specifier);
    if (isTypeImportDeclaration || isTypeImport(specifier)) {
      types.add(name);
    } else {
      vars.add(name);
    }
  });

  const importPath = join(aliasDir, aliasImportPath.replace("@/", "")).replace(
    /\.js(x)?$/,
    ".ts$1"
  );

  const importedCode = await readFile(importPath, "utf8");
  const parsed = parseToBabelFile(importedCode, importPath);
  visit(parsed, {
    visitExportNamedDeclaration(path) {
      this.traverse(path);
      if (
        !n.ExportNamedDeclaration.check(path.value) ||
        !path.value.declaration
      ) {
        return;
      }

      const { declaration } = path.value;

      // NOTE: This does not handle merging other dependencies of the variables/types.
      // i.e. export type X = 3 | AnotherType;
      //
      // AnotherType would not be moved right now.
      if (!isDeclarationMatched({ vars, types, declaration })) {
        return;
      }

      // delete the location so it'll be generated automatically
      delete declaration.loc;
      movedImports.push(declaration as Statement);
    },
  });
  if (movedImports.length !== vars.size + types.size) {
    throw new Error("Missing demo imports");
  }
}
