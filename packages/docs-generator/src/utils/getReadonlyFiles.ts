import {
  type ReadonlyCodeFile,
  type TypescriptCodeFile,
} from "@react-md/code/types";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";

import { transformTsToJs } from "./transformTsToJs.js";

export interface GetReadOnlyFilesOptions {
  aliasDir: string;
  readOnlyImports: ReadonlySet<string>;
}

export async function getReadOnlyFiles(
  options: GetReadOnlyFilesOptions
): Promise<readonly ReadonlyCodeFile[]> {
  const { aliasDir, readOnlyImports } = options;
  return await Promise.all<ReadonlyCodeFile>(
    [...readOnlyImports].map(async (importPath) => {
      const fullImportPath = importPath
        .replace(/^@\//, aliasDir + "/")
        .replace(/\.js$/, (match, offset, fullString) => {
          const fileName = basename(fullString, ".js");

          return /^[A-Z]/.test(fileName) ? ".tsx" : ".ts";
        });
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
