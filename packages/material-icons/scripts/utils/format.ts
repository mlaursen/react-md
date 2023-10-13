import { format as prettierFormat } from "prettier";

export async function format(code: string): Promise<string> {
  return prettierFormat(code, {
    parser: "typescript",
    trailingComma: "es5",
  });
}
