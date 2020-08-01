import { execSync } from "child_process";
import log from "loglevel";

import clean from "./clean";
import libsize from "./libsize";

export default async function prepublish(init: boolean): Promise<void> {
  if (!init) {
    log.info("Cleaning all the old dists and .tsbuildinfo...");
    await clean(true);
  }

  execSync("yarn build", { stdio: "inherit" });
  if (init) {
    log.info("Initial setup complete!");
    return;
  }

  await libsize(true, true, true);
}
