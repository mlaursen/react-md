import { execSync } from "child_process";
import filesize from "filesize";
import { readFileSync, writeFileSync } from "fs";
import { remove } from "fs-extra";
import gzipSize from "gzip-size";
import log from "loglevel";
import { join, sep } from "path";

import { packagesRoot, projectRoot, documentationRoot, src } from "./constants";
import createThemes from "./utils/createThemes";
import format from "./utils/format";
import glob from "./utils/glob";
import list from "./utils/list";
import writeFile from "./utils/writeFile";
import git from "./utils/git";

const cwd = join(packagesRoot, "react-md");

const MATERIAL_ICONS_REGEXP = /^.+material-icons.+$/gm;

const createIconBundle = (
  fileNames: readonly string[],
  indexFile: string
): string => {
  const exports = `export {
${fileNames
  .map((name) => name.substring(name.indexOf(sep)).replace(/\..+$/, ""))
  .join(", ")}
} from "@react-md/material-icons"`;

  return format(
    indexFile.replace(MATERIAL_ICONS_REGEXP, exports),
    "typescript"
  );
};

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
  const fonts = await glob("*FontIcon.tsx", { cwd });
  const reactMDSrc = join(packagesRoot, "react-md", "src");
  const mainBundlePath = join(reactMDSrc, "rollup.ts");
  const svgBundlePath = join(reactMDSrc, "svg.ts");
  const fontBundlePath = join(reactMDSrc, "font.ts");

  const indexFile = readFileSync(join(reactMDSrc, "index.ts"), "utf8");
  const withoutIcons = format(indexFile.replace(MATERIAL_ICONS_REGEXP, ""));
  await writeFile(mainBundlePath, withoutIcons);
  await writeFile(svgBundlePath, createIconBundle(svgs, indexFile));
  await writeFile(fontBundlePath, createIconBundle(fonts, indexFile));

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

async function umdSize(): Promise<string[]> {
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

  const sizes = umd.map(
    (name) =>
      `${name} ${filesize(
        gzipSize.sync(readFileSync(join(cwd, name), "utf8"))
      )}`
  );

  log.info("The gzipped UMD bundle sizes are:");
  log.info(list(sizes));
  log.info();

  return sizes;
}

async function cssSize(): Promise<string[]> {
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

  return sizes;
}

const LIBSIZE_TOKEN = "$ yarn dev-utils libsize\n\n";

function updateLibsize(filePath: string, message: string): void {
  const readme = readFileSync(filePath, "utf8");
  const startIndex = readme.indexOf(LIBSIZE_TOKEN);
  if (startIndex === -1) {
    throw new Error(`Unable to find \`${LIBSIZE_TOKEN}\` in \`${filePath}\``);
  }
  const prefix = readme.substring(0, startIndex);
  const content = readme.substring(startIndex + 1);
  const contentEndIndex = content.indexOf("```");
  const suffix = content.substring(contentEndIndex);

  const updated = `${prefix}${message}${suffix}`;

  writeFileSync(filePath, updated);
}

export default async function libsize(
  umd: boolean = true,
  themes: boolean = true,
  commit: boolean = false
): Promise<void> {
  if (umd) {
    await createUmd();
  }

  if (themes) {
    await createLoggedThemes();
  }

  const umds = await umdSize();
  const css = await cssSize();
  const message = `${LIBSIZE_TOKEN}The gizipped UMD bundle sizes are:
${list(umds)}

The min and max gzipped CSS bundle sizes are:
${list(css)}
`;

  updateLibsize(join(projectRoot, "README.md"), message);
  updateLibsize(
    join(documentationRoot, src, "components", "About", "README.md"),
    message
  );

  if (!commit || !git("diff README.md")) {
    return;
  }

  git("add README.md packages/documentation/src/components/About/README.md");
  git('commit -m "chore(libsize): Updated library size"');
}
