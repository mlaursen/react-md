import { watch } from "chokidar";
import { glob } from "glob";
import { existsSync } from "node:fs";
import { join, parse, type ParsedPath } from "node:path";
import { scssModulesCache } from "./codeCache.js";
import { createDemoMdx } from "./utils/createDemoMdx.js";
import { createMdxPage } from "./utils/createMdxPage.js";
import {
  createScssModuleFile,
  updateScssModule,
} from "./utils/createScssModules.js";
import { getScriptFlags } from "./utils/getScriptFlags.js";
import { isRebasing } from "./utils/isRebasing.js";
import { log } from "./utils/log.js";

const MDX_DEMOS = "demos.mdx";
const readmes = await glob("src/app/**/README.mdx");
const mdxDemos = await glob(`src/app/**/${MDX_DEMOS}`);
// const readmes = [] as const;
// const mdxDemos = [`src/app/components/dialog/${MDX_DEMOS}`];

const { isWatch, isWatchOnly } = getScriptFlags();

async function createAll(): Promise<void> {
  await Promise.all([
    ...readmes.map((markdownPath) => createMdxPage(markdownPath)),
    ...mdxDemos.map((demoPath) =>
      createDemoMdx({
        demoPath,
        isLogged: false,
      })
    ),
  ]);
  await createScssModuleFile();
}

if (!isWatchOnly) {
  await log(createAll(), "Compiling mdx and demos", "Compiled");
}

const isProbablyDemoRelatedFile = (
  parsed: ParsedPath,
  demosPath: string
): boolean => {
  const { base, ext } = parsed;
  if (
    ["page.tsx", "toc.ts"].includes(base) ||
    [".mdx", ".md", ".scss"].includes(ext)
  ) {
    return false;
  }

  return existsSync(demosPath);
};

if (isWatch) {
  const watcher = watch("src/app", {
    persistent: true,
  });

  watcher.on("change", async (path) => {
    if (isRebasing()) {
      return;
    }

    const parsed = parse(path);
    const fileName = parsed.base;
    const maybeDemos = join(parsed.dir, MDX_DEMOS);
    const isMdxDemos = fileName === MDX_DEMOS;

    try {
      if (isMdxDemos || isProbablyDemoRelatedFile(parsed, maybeDemos)) {
        await log(
          createDemoMdx({
            demoPath: isMdxDemos ? path : maybeDemos,
            isLogged: true,
          }),
          `Compiling demos for ${path}`,
          "Compiled demos"
        );
      } else if (fileName === "README.mdx") {
        await log(
          createMdxPage(path),
          `Compiling markdown for ${path}`,
          "Compiled markdown"
        );
      } else if (parsed.ext === ".scss") {
        await log(
          updateScssModule(path),
          "Updating fake scss modules",
          "Updated fake scss modules"
        );
      }
    } catch (e) {
      console.error(e);
    }
  });
  watcher.on("unlink", async (path) => {
    if (isRebasing()) {
      return;
    }

    if (path.endsWith(".module.scss")) {
      scssModulesCache.delete(path);
    }
  });
  watcher.on("ready", () => {
    console.log(" ✓ Watching for markdown changes ... ");
  });
}
