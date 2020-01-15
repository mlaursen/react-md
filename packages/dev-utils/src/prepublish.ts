import log from "loglevel";

import build from "./build";
import clean from "./clean";
import libsize from "./libsize";
import createScssVariables from "./scssVariables";
import copyStyles from "./utils/copyStyles";

export default async function prepublish(
  init: boolean,
  silent: boolean
): Promise<void> {
  if (!init) {
    log.info("Cleaning all the old dists...");
    await clean();
  }

  log.info("Creating the SCSS dists...");
  await copyStyles();

  log.info("Creating the scssVariables files...");
  await createScssVariables(true);

  log.info();
  log.info("Building the typescript files...");
  await build(init, silent || !init);
  log.info();
  if (init) {
    log.info("Initial setup complete!");
    return;
  }

  await libsize();
}
