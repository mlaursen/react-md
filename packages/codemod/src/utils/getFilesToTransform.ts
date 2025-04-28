import input from "@inquirer/input";
import { globSync } from "glob";

export async function getFilesToTransform(
  files: readonly string[]
): Promise<readonly string[]> {
  let filePatterns = files;
  if (!files.length) {
    const filePattern = await input({
      message: "On which files or directory should the codemods be applied?",
      default: ".",
      transformer: (value) => value.trim(),
    });

    filePatterns = [filePattern];
  }

  const matchedFiles: string[] = [];
  for (const pattern of filePatterns) {
    if (pattern.includes("*")) {
      matchedFiles.push(...globSync(pattern));
    } else {
      matchedFiles.push(pattern);
    }
  }

  return matchedFiles;
}
