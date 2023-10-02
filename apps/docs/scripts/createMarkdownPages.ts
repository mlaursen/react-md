import { watch } from "chokidar";
import { glob } from "glob";
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join, parse, type ParsedPath } from "node:path";
import { createDemo } from "./utils/createDemo.js";
import { createMarkdownPage } from "./utils/createMarkdownPage.js";
import { createTableOfContents } from "./utils/createTableOfContents.js";
import { log } from "./utils/log.js";

const { argv } = process;
const isCleanOnly = argv.includes("--clean-only");
const isClean = argv.includes("--clean") || isCleanOnly;
const isWatch = argv.includes("--watch");

const MDX_DEMOS = "demos.mdx";
const readmes = await glob("src/app/**/README.mdx");
const mdxDemos = await glob(`src/app/**/${MDX_DEMOS}`);

if (isClean) {
  const tocs = await glob("src/app/**/toc.ts");
  const pages = await glob("src/app/*/**/page.tsx");
  const demos = await glob("src/app/**/demo-page.mdx");
  await Promise.all([...tocs, ...pages, ...demos].map((path) => rm(path)));

  if (isCleanOnly) {
    process.exit(0);
  }
}

async function update(file: string): Promise<void> {
  await Promise.all([createTableOfContents(file), createMarkdownPage(file)]);
}

await Promise.all(
  readmes.map(async (file) => {
    return update(file);
  })
);
await Promise.all(mdxDemos.map(async (path) => createDemo(path)));

const isProbablyDemoRelatedFile = (
  parsed: ParsedPath,
  demosPath: string
): boolean => {
  const { base, ext } = parsed;
  if (["page.tsx", "toc.ts"].includes(base) || [".mdx", ".md"].includes(ext)) {
    return false;
  }

  return existsSync(demosPath);
};

if (isWatch) {
  const watcher = watch("src/app", {
    persistent: true,
  });

  watcher.on("change", async (path) => {
    const parsed = parse(path);
    const fileName = parsed.base;
    const maybeDemos = join(parsed.dir, MDX_DEMOS);
    const isMdxDemos = fileName === MDX_DEMOS;

    try {
      if (isMdxDemos || isProbablyDemoRelatedFile(parsed, maybeDemos)) {
        await log("demos", isMdxDemos ? path : maybeDemos, createDemo);
      } else if (fileName === "README.mdx") {
        await log("markdown", path, update);
      }
    } catch (e) {
      console.error(e);
    }
  });
}
