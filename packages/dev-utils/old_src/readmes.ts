import { ensureDir, remove } from "fs-extra";
import log from "loglevel";
import { join } from "path";

import { documentationRoot, packagesRoot, projectRoot, src } from "./constants";
import copyMarkdown from "./utils/copyMarkdown";
import glob from "./utils/glob";

export default async function readmes(clean: boolean = false): Promise<void> {
  const documentaionReadmes = join(documentationRoot, src, "readmes");
  log.info("Finding and copying readmes...");
  const readmePaths = await glob(
    "!(dev-utils|documentation|react-md)/README.md",
    {
      cwd: packagesRoot,
    }
  );
  const readmes = readmePaths.map((filePath) => {
    const pkgName = filePath.substring(0, filePath.indexOf("/"));

    return {
      src: join(packagesRoot, filePath),
      dest: join(documentaionReadmes, `${pkgName}.md`),
    };
  });
  const contributing = {
    src: join(projectRoot, ".github", "CONTRIBUTING.md"),
    dest: join(documentationRoot, src, "guides", "contributing.md"),
  };

  if (clean) {
    await remove(contributing.dest);
    await remove(documentaionReadmes);
  }

  await ensureDir(documentaionReadmes);
  await Promise.all(
    [...readmes, contributing].map(({ src, dest }) => copyMarkdown(src, dest))
  );
}
