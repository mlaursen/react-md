import { ensureDir } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, packagesRoot, projectRoot, src } from "./constants";
import { clean, copyMarkdown, getPackages } from "./utils";

export async function markdown(shouldClean: boolean = false): Promise<void> {
  log.info("Finding and copying markdown files...");

  const readmeDest = join(documentationRoot, src, "readmes");
  const changelogDest = join(documentationRoot, src, "changelogs");

  const packages = getPackages();

  const contributing = {
    src: join(projectRoot, ".github", "CONTRIBUTING.md"),
    dest: join(documentationRoot, src, "guides", "contributing.md"),
  };
  const markdownFiles = packages.flatMap((name) => [
    {
      src: join(packagesRoot, name, "README.md"),
      dest: join(readmeDest, `${name}.md`),
    },
    {
      src: join(packagesRoot, name, "CHANGELOG.md"),
      dest: join(changelogDest, `${name}.md`),
    },
  ]);
  markdownFiles.push(contributing);

  if (shouldClean) {
    await clean([contributing.dest, readmeDest, changelogDest]);
  }

  await ensureDir(readmeDest);
  await ensureDir(changelogDest);
  await Promise.all(
    markdownFiles.map(({ src, dest }) => copyMarkdown(src, dest))
  );
}
