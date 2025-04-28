import { type FileInfo } from "jscodeshift";

export function isTypescriptFile(file: FileInfo): boolean {
  return /\.tsx?$/.test(file.path);
}
