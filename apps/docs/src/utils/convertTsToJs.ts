import { transform } from "sucrase";
import { format } from "./format.js";

export async function convertTsToJs(code: string): Promise<string> {
  const transformedCode = transform(code, {
    transforms: ["typescript", "jsx"],
    jsxRuntime: "preserve",
    disableESTransforms: true,
    production: process.env.NODE_ENV === "production",
  }).code;

  // when there is no code, it is usually just an import statement or something that doesn't
  if (!transformedCode) {
    return code;
  }

  const formatted = await format(
    transformedCode.replace(/(>|,)\r?\n+/g, "$1\n"),
    "babel"
  );
  return formatted.trim();
}
