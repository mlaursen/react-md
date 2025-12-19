import { debounce } from "@react-md/core/utils/debounce";
import { watch } from "chokidar";
import { createScssLookup } from "docs-generator/scripts/create-scss-lookup";
import { logComplete } from "docs-generator/utils/log";

import { ensureGeneratedDir } from "./ensureGeneratedDir.js";

if (process.argv.includes("--watch")) {
  const CORE_DIST = "node_modules/@react-md/core/dist";

  const debounced = debounce(createScssLookup, 1000);
  const watcher = watch(CORE_DIST, {
    persistent: true,
    ignored: (path, stats) => !!stats?.isFile() && !path.endsWith(".scss"),
  });
  watcher.on("change", () => {
    try {
      debounced();
    } catch (error) {
      console.error(error);
    }
  });

  watcher.on("ready", () => {
    logComplete("Watching for sass changes");
  });
} else {
  await ensureGeneratedDir();
  await createScssLookup();
}
