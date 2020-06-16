import { execSync } from "child_process";
import filesize from "filesize";
import { readFileSync } from "fs";
import { remove } from "fs-extra";
import gzipSize from "gzip-size";
import log from "loglevel";
import { join, sep } from "path";

import { packagesRoot } from "./constants";
import createThemes from "./utils/createThemes";
import format from "./utils/format";
import glob from "./utils/glob";
import list from "./utils/list";
import writeFile from "./utils/writeFile";

const cwd = join(packagesRoot, "react-md");

const createIconBundle = (fileNames: readonly string[]): string =>
  format(
    `export {
${fileNames
  .map((name) => name.substring(name.indexOf(sep)).replace(/\..+$/, ""))
  .join(", ")}
} from "@react-md/material-icons"`,
    "typescript"
  );

/**
 * Create three entry points for the bundles:
 * - base react-md library (as `ReactMD`)
 * - only SVG icon components from material-icons (as `ReactMDIconSVG`)
 * - only Font icon components from material-icons as (`ReactMDIconFont`)
 *
 * 99% of the time, you don't want to import both svg and font icons into one
 * app so this helps separate this out.
 */
async function createUmd(): Promise<void> {
  log.info("Creating the UMD bundles...");
  const cwd = join(packagesRoot, "material-icons", "src");
  const svgs = await glob("*SVGIcon.tsx", { cwd });
  const fonts = await glob("*.FontIcon.tsx", { cwd });
  const reactMDSrc = join(packagesRoot, "react-md", "src");
  const mainBundlePath = join(reactMDSrc, "rollup.ts");
  const svgBundlePath = join(reactMDSrc, "svg.ts");
  const fontBundlePath = join(reactMDSrc, "font.ts");

  const indexFile = readFileSync(join(reactMDSrc, "index.ts"), "utf8");
  const withoutIcons = format(indexFile.replace(/^.+material-icons.+$/gm, ""));
  await writeFile(mainBundlePath, withoutIcons);
  await writeFile(svgBundlePath, createIconBundle(svgs));
  await writeFile(fontBundlePath, createIconBundle(fonts));

  execSync("yarn workspace react-md umd --silent", { stdio: "inherit" });
  await Promise.all(
    [mainBundlePath, svgBundlePath, fontBundlePath].map((filePath) =>
      remove(filePath)
    )
  );
  log.info();
}

async function createLoggedThemes(): Promise<void> {
  log.info("Creating all the pre-compiled themes...");
  await createThemes();
  log.info();
}

async function umdSize(): Promise<void> {
  let umd = await glob("dist/umd/*.min.js", { cwd });
  if (!umd.length) {
    log.info("No umd bundles found...");
    log.info("Creating...");
    log.info();
    await createUmd();
    umd = await glob("dist/umd/*.min.js", { cwd });
  }

  // want base lib first
  umd.sort((a, b) => {
    if (!a.includes("icon")) {
      return -1;
    }

    if (!b.includes("icon")) {
      return 1;
    }

    return a.localeCompare(b);
  });

  log.info("The gzipped UMD bundle size is:");
  log.info(
    list(
      umd.map(
        (name) =>
          `${name} ${filesize(
            gzipSize.sync(readFileSync(join(cwd, name), "utf8"))
          )}`
      )
    )
  );
  log.info();
}

async function cssSize(): Promise<void> {
  let css = await glob("dist/css/*.min.css", { cwd });
  if (!css.length) {
    log.info("No compiled css files found...");
    log.info("Creating...");
    log.info();
    await createLoggedThemes();
    css = await glob("dist/css/*.min.css", { cwd });
  }

  const { min, max } = css.reduce(
    (result, cssPath) => {
      const size = gzipSize.sync(readFileSync(join(cwd, cssPath), "utf8"));
      const update = { name: cssPath, size };
      if (size > result.max.size) {
        result.max = update;
      }

      if (result.min.size === -1 || size < result.min.size) {
        result.min = update;
      }

      return result;
    },
    {
      min: { name: "", size: -1 },
      max: { name: "", size: 0 },
    }
  );

  const sizes = [
    `${min.name} ${filesize(min.size)}`,
    `${max.name} ${filesize(max.size)}`,
  ];
  log.info("The min and max gzipped CSS bundle sizes are:");
  log.info(list(sizes));
  log.info();
}

export default async function libsize(
  umd: boolean = true,
  themes: boolean = true
): Promise<void> {
  if (umd) {
    await createUmd();
  }

  if (themes) {
    await createLoggedThemes();
  }

  await umdSize();
  await cssSize();
}
