import { glob } from "glob";
import { rm } from "node:fs/promises";
import { watch } from "chokidar";
import { createMarkdownPage } from "./utils/createMarkdownPage.js";
import { createTableOfContents } from "./utils/createTableOfContents.js";
import { parse } from "node:path";
import prettyMilliseconds from "pretty-ms";

const { argv } = process;
const isCleanOnly = argv.includes("--clean-only");
const isClean = argv.includes("--clean") || isCleanOnly;
const isWatch = argv.includes("--watch");

const files = await glob("src/app/**/README.mdx");

if (isClean) {
  const tocs = await glob("src/app/**/toc.ts");
  const pages = await glob("src/app/*/**/page.tsx");
  await Promise.all([...tocs, ...pages].map((path) => rm(path)));

  if (isCleanOnly) {
    process.exit(0);
  }
}

async function update(file: string): Promise<void> {
  await Promise.all([createTableOfContents(file), createMarkdownPage(file)]);
}

await Promise.all(
  files.map(async (file) => {
    return update(file);
  })
);

if (isWatch) {
  const watcher = watch("src/app", {
    persistent: true,
  });

  watcher.on("change", async (path) => {
    if (parse(path).base === "README.mdx") {
      console.log(` ○ Compiling markdown for ${path} ...`);
      const start = Date.now();
      await update(path);
      const duration = Date.now() - start;
      console.log(` ✓ Compiled markdown in ${prettyMilliseconds(duration)}`);
    }
  });
}
