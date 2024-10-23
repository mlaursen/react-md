import { debounce } from "@react-md/core/utils/debounce";
import { watch } from "chokidar";
import { logComplete, logPending } from "docs-generator/utils/log";
import { existsSync } from "node:fs";
import { open, utimes } from "node:fs/promises";
import { dirname, join } from "node:path";

let pending = false;

const cwd = process.cwd();
const watcher = watch("src/app", {
  cwd,
  persistent: true,
  ignored: (path, stats) =>
    !!stats?.isFile() && !/\(demos\).+\.(ts|tsx|scss)$/.test(path),
});

const debounced = debounce(async (path: string): Promise<void> => {
  const page = join(dirname(path), "page.mdx");
  if (!existsSync(page)) {
    console.warn(`${page} does not exist?`);
    return;
  }

  const now = Date.now();
  try {
    await utimes(page, now, now);
  } catch (e) {
    if (!(e instanceof Error) || !("code" in e) || "ENOENT" !== e.code) {
      throw e;
    }

    const fileHandler = await open(page, "a");
    await fileHandler.close();
  }
  pending = false;
  logComplete("Updated demos");
}, 1000);

watcher.on("change", (path) => {
  if (!pending) {
    pending = true;
    logPending("Updating demos");
  }

  debounced(path);
});

watcher.on("ready", () => {
  logComplete("Watching for demo changes");
});
