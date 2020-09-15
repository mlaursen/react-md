import { readFile, writeFile } from "fs-extra";
import log from "loglevel";
import { BuiltInParserName } from "prettier";

import { CopyConfig, COPY_BANNER } from "../../constants";
import { format } from "../format";

/**
 * Copies a file with a banner showing it should not be manually updated.
 */
export async function copyFileWithBanner(
  src: string,
  dest: string,
  parser?: BuiltInParserName
): Promise<void> {
  const contents = await readFile(src, "utf8");

  return writeFile(dest, format(`${COPY_BANNER}${contents}`, parser)).catch(
    (e) => {
      log.error(e);
      process.exit(1);
    }
  );
}

export async function copyFilesWithBanner(
  files: readonly CopyConfig[]
): Promise<void> {
  await Promise.all(
    files.map(({ src, dest }) =>
      copyFileWithBanner(src, dest).catch((e) => {
        log.error(e);
        process.exit(1);
      })
    )
  );
}
