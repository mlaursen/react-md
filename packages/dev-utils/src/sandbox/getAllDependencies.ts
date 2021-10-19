import { readFileSync } from "fs";
import log from "loglevel";
import { join, sep } from "path";
import { Project, SourceFile } from "ts-morph";

import { documentationRoot, src } from "../constants";
import { isAlaised } from "./aliases";
import { DEPENDENCIES } from "./constants";
import { getSourceFile } from "./getSourceFile";

export type ReferencedDependencies = Set<string>;
export type ReferencedFiles = Map<string, string>;

const IGNORED_FILE_REGEXP = /constants\/(github|packages)|@react-md/;

function isIgnoredDependency(name: string): boolean {
  return IGNORED_FILE_REGEXP.test(name) || /dist\/scssVariables/.test(name);
}

const SCSS_IMPORT = /@import '(.+)';/g;

function getScssImports(contents: string): readonly string[] {
  const matches = contents.match(SCSS_IMPORT) || [];

  return matches.map((match) =>
    match.replace(/.+~(@react-md\/[a-z-]+)\/.+$/, "$1")
  );
}

function safeSet(files: ReferencedFiles, key: string, contents: string): void {
  if (files.has(key)) {
    log.debug(`${key} has already been added`);
    return;
  }

  files.set(key, contents);
}

function toAbsolutePath(name: string, currentFilePath: string): string {
  if (!name.startsWith(".")) {
    if (name.startsWith("next/")) {
      return "next";
    }

    return name;
  }

  const parentFolder = currentFilePath
    .substring(0, currentFilePath.lastIndexOf(sep))
    .replace(/^.+src\//, "");

  return join(parentFolder, name);
}

export function getAllDependencies(
  sourceFile: SourceFile,
  project: Project
): [ReferencedDependencies, ReferencedFiles] {
  const dependencies: ReferencedDependencies = new Set(DEPENDENCIES);
  const files: ReferencedFiles = new Map();
  let names = sourceFile
    .getImportDeclarations()
    .map((imp) => imp.getModuleSpecifierValue());

  const filePath = sourceFile.getFilePath();
  const isIndexExport = !names.length && filePath.endsWith("index.ts");
  if (isIndexExport) {
    const [, name] = filePath.split(sep).reverse();
    const exps = sourceFile.getExportDeclarations();
    const found = exps.find(
      (exp) => exp.getModuleSpecifierValue() === `./${name}`
    );

    if (found) {
      names = [`${found.getModuleSpecifierValue()}`];
    }
  }

  names = names.map((name) => toAbsolutePath(name, filePath));

  names.forEach((name) => {
    if (isIgnoredDependency(name)) {
      return;
    }

    if (!isAlaised(name)) {
      dependencies.add(name);
    } else if (/\.(scss|svg)$/.test(name)) {
      const importedFilePath = join(documentationRoot, src, name);

      const contents = readFileSync(importedFilePath).toString();
      if (name.endsWith(".scss")) {
        const scssDependencies = getScssImports(contents);
        scssDependencies.forEach((dep) => dependencies.add(dep));
      }

      safeSet(files, name, contents);
    } else {
      const sf = getSourceFile(sourceFile, name, project);
      const currentName = sf.getFilePath().replace(/^.+src\//, "");

      safeSet(files, currentName, sf.getFullText());
      const [sfDependencies, sfFiles] = getAllDependencies(sf, project);
      sfDependencies.forEach((dep) => dependencies.add(dep));
      sfFiles.forEach((contents, key) => {
        safeSet(files, key, contents);
      });
    }
  });

  return [dependencies, files];
}
