import {
  type ScssCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { join } from "node:path";
import { getScssCodeFile } from "./getScssCodeFile.js";
import {
  parseWithTsMorph,
  type ParseWithTsMorphOptions,
} from "./parseWithTsMorph.js";

export interface ParseCompleteDemoFileOptions extends ParseWithTsMorphOptions {
  aliasDir: string;
  demoDir: string;
  demoName: string;
  generatedDir: string;
}

export interface ParseCompleteDemoFileResult {
  imports: ReadonlyMap<string, ReadonlySet<string>>;
  tsCodeFile: TypescriptCodeFile;
  scssCodeFile: ScssCodeFile | undefined;
}

export async function parseCompleteDemoFile(
  options: ParseCompleteDemoFileOptions
): Promise<ParseCompleteDemoFileResult> {
  const { project, demoDir, demoName, demoOutPath, demoSourcePath } = options;
  const { imports, tsCodeFile, scssModulesPath } = await parseWithTsMorph({
    project,
    demoOutPath,
    demoSourcePath,
  });

  const scssCodeFile = await getScssCodeFile({
    create: !!scssModulesPath,
    demoName,
    scssPath: join(demoDir, scssModulesPath),
  });

  return {
    imports,
    tsCodeFile,
    scssCodeFile,
  };
}
