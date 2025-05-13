import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import { globSync } from "glob";

export async function getSassFilesToTransform(
  files: readonly string[],
  requireConfirm = false
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
  for (const filePattern of filePatterns) {
    let pattern = filePattern;
    if (!pattern.endsWith(".scss")) {
      pattern = `${pattern}/**/*.scss`;
    }

    matchedFiles.push(
      ...globSync(pattern, {
        ignore: ["**/node_modules/**"],
      })
    );
  }

  if (
    requireConfirm &&
    !(await confirm({
      message: `The following files were matched:
${matchedFiles.map((f) => `- ${f}`).join("\n")}

Run the sass-migrator on those files?`,
    }))
  ) {
    // eslint-disable-next-line no-console
    console.log("Canceling the sass-migrator run.");
    process.exit(1);
  }

  return matchedFiles;
}
