import { watch } from "chokidar";
import { glob } from "glob";
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join, parse, type ParsedPath } from "node:path";
import { createDemoMdx } from "./utils/createDemoMdx.js";
import { createMdxPage } from "./utils/createMdxPage.js";
import { log } from "./utils/log.js";

const { argv } = process;
const isCleanOnly = argv.includes("--clean-only");
const isClean = argv.includes("--clean") || isCleanOnly;
const isWatch = argv.includes("--watch");

const MDX_DEMOS = "demos.mdx";
const readmes = await glob("src/app/**/README.mdx");
const mdxDemos = await glob(`src/app/**/${MDX_DEMOS}`);
// const readmes = [] as const;
// const mdxDemos = [`src/app/components/dialog/${MDX_DEMOS}`];

if (isClean) {
  const tocs = await glob("src/app/**/toc.ts");
  const pages = await glob("src/app/*/**/page.tsx", {
    ignore: ["api/**"],
  });
  const demos = await glob("src/app/**/demo-page.mdx");
  await Promise.all([...tocs, ...pages, ...demos].map((path) => rm(path)));

  if (isCleanOnly) {
    process.exit(0);
  }
}

async function createAll(): Promise<void> {
  await Promise.all([
    ...readmes.map((markdownPath) => createMdxPage(markdownPath)),
    ...mdxDemos.map(async (demoPath) => createDemoMdx(demoPath, false)),
  ]);
}

await log(createAll(), "Compiling mdx and demos", "Compiled");

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
        await log(
          createDemoMdx(isMdxDemos ? path : maybeDemos, true),
          `Compiling demos for ${path}`,
          "Compiled demos"
        );
      } else if (fileName === "README.mdx") {
        await log(
          createMdxPage(path),
          `Compiling markdown for ${path}`,
          "Compiled markdown"
        );
      }
    } catch (e) {
      console.error(e);
    }
  });
  watcher.on("ready", () => {
    console.log(" ✓ Watching for markdown changes ... ");
  });
}
