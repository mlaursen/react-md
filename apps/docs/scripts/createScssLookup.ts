import { debounce } from "@react-md/core/utils/debounce";
import { watch } from "chokidar";
import { createScssLookup } from "docs-generator/scripts/create-scss-lookup";
import { logComplete } from "docs-generator/utils/log";

if (!process.argv.includes("--watch")) {
  await createScssLookup();
  process.exit(0);
}

const CORE_DIST = "node_modules/@react-md/core/dist";
const CORE_SCSS_PATTERN = `${CORE_DIST}/**/*.scss`;

const debounced = debounce(createScssLookup, 1000);
const watcher = watch(CORE_SCSS_PATTERN, { persistent: true });
watcher.on("change", () => {
  try {
    debounced();
  } catch (e) {
    console.error(e);
  }
});

watcher.on("ready", () => {
  logComplete("Watching for sass changes");
});
