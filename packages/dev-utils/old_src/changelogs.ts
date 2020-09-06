import { ensureDir, remove } from "fs-extra";
import log from "loglevel";
import { join, sep } from "path";

import { documentationRoot, packagesRoot, src } from "./constants";
import copyMarkdown from "./utils/copyMarkdown";
import glob from "./utils/glob";

const documentationChangelogs = join(documentationRoot, src, "changelogs");

export default async function changelogs(
  clean: boolean = false
): Promise<void> {
  log.info("Finding and copying changelogs...");
  const changelogs = await glob(
    "!(dev-utils|documentation|react-md)/CHANGELOG.md",
    {
      cwd: packagesRoot,
    }
  );

  if (clean) {
    await remove(documentationChangelogs);
  }

  await ensureDir(documentationChangelogs);
  await Promise.all(
    changelogs.map((changelog) => {
      const [packageName] = changelog.split(sep);

      return copyMarkdown(
        join(packagesRoot, changelog),
        join(documentationChangelogs, `${packageName}.md`)
      );
    })
  );
}
