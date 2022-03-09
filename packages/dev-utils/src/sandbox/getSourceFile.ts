import log from "loglevel";
import { join, sep } from "path";
import type { Project, SourceFile } from "ts-morph";

import { documentationRoot, src } from "../constants";
import { isAlaised } from "./aliases";

function getSourceFolder(sourceFile: SourceFile): string {
  const sourceFilePath = sourceFile.getFilePath();
  return sourceFilePath.substring(0, sourceFilePath.lastIndexOf(sep));
}

export function getDemoSourceFile(
  demoName: string,
  parentFolder: string,
  project: Project
): SourceFile {
  const sf = project.getSourceFile(join(parentFolder, `${demoName}.tsx`));
  if (sf) {
    return sf;
  }

  return project.getSourceFileOrThrow(
    join(parentFolder, demoName, `${demoName}.tsx`)
  );
}

export function getSourceFile(
  sourceFile: SourceFile,
  filePath: string,
  project: Project
): SourceFile {
  let prefix: string;
  if (isAlaised(filePath)) {
    prefix = join(documentationRoot, src, filePath);
  } else {
    prefix = join(getSourceFolder(sourceFile), filePath);
  }

  const tsExt = project.getSourceFile(`${prefix}.ts`);
  if (tsExt) {
    return tsExt;
  }

  const tsxExt = project.getSourceFile(`${prefix}.tsx`);
  if (tsxExt) {
    return tsxExt;
  }

  try {
    return project.getSourceFileOrThrow(`${prefix}/index.ts`);
  } catch (e) {
    log.error("Source file path: ", sourceFile.getFilePath());
    log.error("Current prefix:", prefix);
    log.error(e);

    process.exit(1);
  }
}
