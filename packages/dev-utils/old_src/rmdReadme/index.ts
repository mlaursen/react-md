import { join } from "path";
import { readFile } from "fs-extra";

import { projectRoot, packagesRoot } from "../constants";
import writeFile from "../utils/writeFile";
import format from "../utils/format";
import getPackages from "../utils/getPackages";

const REPLACE_TOKEN = "<!-- rmd-readme-replace -->";

export default async function rmdReadme(): Promise<void> {
  const rootReadme = await readFile(join(projectRoot, "README.md"), "utf8");
  if (!rootReadme.includes(REPLACE_TOKEN)) {
    throw new Error("Unable to find the replace token in the root README.md");
  }

  const replacement = await readFile(
    join(packagesRoot, "dev-utils", "src", "rmdReadme", "README.md"),
    "utf8"
  );
  const packages = getPackages()
    .map(
      (name) =>
        `- [@react-md/${name}](https://react-md.dev/packages/${name}/demos)`
    )
    .join("\n");

  const markdown = rootReadme
    .replace(
      "(./examples)",
      "(https://github.com/mlaursen/react-md/tree/master/examples)"
    )
    .replace(REPLACE_TOKEN, replacement)
    .replace("#packages", packages);

  const updated = format(markdown, "markdown");
  return writeFile(join(packagesRoot, "react-md", "README.md"), updated);
}
