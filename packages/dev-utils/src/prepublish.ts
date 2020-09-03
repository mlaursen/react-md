import { execSync } from "child_process";
import log from "loglevel";

import clean from "./clean";
import libsize from "./libsize";
import createScssVariables from "./scssVariables";
import git, { uncommittedFiles } from "./utils/git";

export default async function prepublish(init: boolean): Promise<void> {
  if (!init) {
    log.info("Cleaning all the old dists and .tsbuildinfo...");
    await clean(true);
  }

  if (!init) {
    await createScssVariables();
    if (uncommittedFiles()) {
      git("add -u");
    }
  }

  execSync("yarn build", { stdio: "inherit" });
  if (init) {
    log.info("Initial setup complete!");
    return;
  }

  await libsize(true, true, true);
}
