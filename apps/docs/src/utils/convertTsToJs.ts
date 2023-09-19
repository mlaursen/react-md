import "server-only";
import { transform } from "@babel/core";
import { format } from "./format.js";

export async function convertTsToJs(
  code: string,
  fileName: string
): Promise<string> {
  const result = transform(code, {
    retainLines: true,
    plugins: [
      [
        "@babel/plugin-transform-typescript",
        { isTSX: fileName.endsWith(".tsx") },
      ],
    ],
  });

  const transformedCode = result?.code;
  if (typeof transformedCode !== "string" || !transformedCode) {
    throw new Error("Unable to transform from ts to js");
  }

  return format(transformedCode.replace(/(>|,)\r?\n+/g, "$1\n"), "babel");
}
