import { type CodeFile, type TypescriptCodeFile } from "@react-md/code/types";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";

import { transformTsToJs } from "./transformTsToJs.js";

export interface GetReadOnlyFilesOptions {
  aliasDir: string;
  readOnlyImports: ReadonlySet<string>;
}

export async function getReadOnlyFiles(
  options: GetReadOnlyFilesOptions
): Promise<readonly CodeFile[]> {
  const { aliasDir, readOnlyImports } = options;
  return await Promise.all<CodeFile>(
    [...readOnlyImports].map(async (importPath) => {
      const fullImportPath = importPath
        .replace(/^@\//, aliasDir + "/")
        .replace(/\.js(x)?$/, ".ts$1");
      const name = basename(fullImportPath);
      const code = await readFile(fullImportPath, "utf8");
      if (name.endsWith(".scss")) {
        return {
          name,
          lang: "scss",
          code,
          readOnly: true,
        };
      }

      return {
        name,
        lang: "tsx",
        code,
        compiled: await transformTsToJs(code, importPath),
        readOnly: true,
      } satisfies TypescriptCodeFile;
    })
  );
}
