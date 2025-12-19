import { format } from "prettier";
import { transform } from "sucrase";

/**
 * TODO: Figure out why including prettier causes:
 * ```
 * [webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo] Parsing of /home/mlaursen/code/react-md/node_modules/.pnpm/prettier@3.2.5/node_modules/prettier/index.mjs for build dependencies failed at 'import(pathToFileURL2(file).href)'.
 * ```
 */
export async function transformTsToJs(
  code: string,
  filepath: string,
  printWidth = 80
): Promise<string> {
  const transformedCode = transform(code, {
    transforms: ["typescript", "jsx"],
    jsxRuntime: "preserve",
    disableESTransforms: true,
    production: process.env.NODE_ENV === "production",
  }).code;

  // when there is no code, it is usually just an import statement or something
  // that hasn't changed
  if (!transformedCode) {
    return code;
  }

  const formatted = await format(
    transformedCode.replaceAll(/(>|,)\r?\n+/g, "$1\n"),
    {
      parser: "typescript",
      filepath,
      // It looks like the .prettierrc.yaml aren't always picked up
      printWidth,
      trailingComma: "es5",
    }
  );
  return formatted.trim();
}
