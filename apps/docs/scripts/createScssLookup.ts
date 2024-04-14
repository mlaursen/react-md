import { type AnyFunction } from "@react-md/core/types";
import { type DebouncedFunction } from "@react-md/core/useDebouncedFunction";
import { watch } from "chokidar";
import { createScssLookup } from "docs-generator/scripts/create-scss-lookup";
import { logComplete } from "docs-generator/utils/log";

if (!process.argv.includes("--watch")) {
  createScssLookup();
  process.exit(0);
}

const CORE_DIST = "node_modules/@react-md/core/dist";
const CORE_SCSS_PATTERN = `${CORE_DIST}/**/*.scss`;

const debounce = <F extends AnyFunction>(
  fn: F,
  duration: number
): DebouncedFunction<F> => {
  let timeout: NodeJS.Timeout | undefined;
  const debounced: DebouncedFunction<F> = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, duration);
  };
  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
};

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
