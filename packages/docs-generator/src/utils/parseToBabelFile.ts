import { parse, type ParseResult } from "@babel/parser";
import { type File } from "@babel/types";

export function parseToBabelFile(
  code: string,
  sourceFilename: string
): ParseResult<File> {
  return parse(code, {
    plugins: ["jsx", "typescript"],
    sourceType: "module",
    sourceFilename,
  });
}
