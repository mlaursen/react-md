import { execSync } from "child_process";
import { readFileSync } from "fs";
import { writeFile } from "fs-extra";
import log from "loglevel";
import { join, sep } from "path";

import { packagesRoot } from "./constants";
import { clean, format, glob } from "./utils";

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
export async function umd(): Promise<void> {
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

  execSync("yarn rollup -c rollup.config.js --silent", {
    stdio: "inherit",
  });
  await clean([mainBundlePath, svgBundlePath, fontBundlePath]);
  log.info();
}
