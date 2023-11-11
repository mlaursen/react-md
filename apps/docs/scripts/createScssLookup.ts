import { watch } from "chokidar";
import { glob } from "glob";
import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "../src/utils/format.js";
import { GENERATED_FILE_BANNER } from "./constants.js";
import { log } from "./utils/log.js";

const { argv } = process;
const isCleanOnly = argv.includes("--clean-only");
const isClean = argv.includes("--clean") || isCleanOnly;
const isWatch = argv.includes("--watch");

const SCSS_LOOKUP_PATH = join(
  process.cwd(),
  "src",
  "constants",
  "scssLookup.ts"
);

if (isClean) {
  await rm(SCSS_LOOKUP_PATH);

  if (isCleanOnly) {
    process.exit(0);
  }
}

async function createScssLookup(): Promise<void> {
  const docsScss = await glob("*.scss");
  const reactMdScss = await glob("node_modules/@react-md/core/dist/**/*.scss");
  const lookup: Record<string, string> = {};
  await Promise.all(
    [...docsScss, ...reactMdScss].map(async (scssPath) => {
      const contents = await readFile(scssPath, "utf8");
      const name = scssPath
        .replace("node_modules/@react-md/core/dist", "@react-md")
        .replace(/_([a-z0-9-]+)\.scss$/, "$1");
      lookup[name] = contents;
    })
  );

  await writeFile(
    SCSS_LOOKUP_PATH,
    await format(`${GENERATED_FILE_BANNER}

export const SCSS_LOOKUP: Record<string, string> = ${JSON.stringify(lookup)}
`)
  );
}

async function update(): Promise<void> {
  await log(
    createScssLookup(),
    "Creating stylesheets lookup",
    "Created stylesheets lookup"
  );
}

await update();

if (isWatch) {
  const watcher = watch("node_modules/@react-md/core/dist", {
    persistent: true,
  });

  watcher.on("change", async (path) => {
    console.log("path:", path);

    try {
      await update();
    } catch (e) {
      console.error(e);
    }
  });

  watcher.on("ready", () => {
    console.log(" ✓ Watching for sass changes ... ");
  });
}
