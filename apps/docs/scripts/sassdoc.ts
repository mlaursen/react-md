import { log } from "docs-generator/utils/log";
import { generate } from "sassdoc-generator";

import { CORE_SRC } from "./constants.js";
import { ensureGeneratedDir } from "./ensureGeneratedDir.js";
import { createSassDocFile } from "./sassdoc-utils/createSassDocFile.js";
import { generateNavItems } from "./sassdoc-utils/generateNavItems.js";
import { touch } from "./sassdoc-utils/touch.js";

if (process.argv.includes("--touch")) {
  await touch();
} else {
  async function run(): Promise<void> {
    await ensureGeneratedDir();
    const generated = await generate({ src: CORE_SRC });
    await Promise.all([
      createSassDocFile(generated),
      generateNavItems(generated),
    ]);
  }

  // eslint-disable-next-line unicorn/prefer-top-level-await
  await log(run(), "", "sassdoc script completed");
}
