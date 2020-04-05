import {
  copyFileSync,
  ensureDirSync,
  readFileSync,
  writeFileSync,
} from "fs-extra";
import log from "loglevel";
import { join } from "path";

import {
  dist,
  isRoot,
  nonWebpackDist,
  packagesRoot,
  projectRoot,
  src,
} from "../constants";
import glob from "./glob";
import getCurrentPackageName from "./getCurrentPackageName";
import list from "./list";
import getPackages from "./getPackages";

const SRC_PATTERN = "src/**/*.scss";
const ROOT_PATTERN = `packages/!(documentation)/${SRC_PATTERN}`;

/**
 * The form package is a bit different in that there are separate variables and
 * mixin files for each part of the package in a folder. Need to make sure to
 * create the sub-folders before creating the non-webpack imports.
 */
const FORM_FOLDERS = ["file-input", "label", "select", "text-field", "toggle"];

function ensureDists(): void {
  const name = getCurrentPackageName();
  if (name) {
    log.debug(`Ensuring the ${dist} and ${nonWebpackDist} folders in ${name}.`);
    ensureDirSync(dist);
    ensureDirSync(nonWebpackDist);
  } else {
    const packages = getPackages(true);
    log.debug(`Ensuring the ${dist} and ${nonWebpackDist} folders in:`);
    log.debug(list(packages));
    log.debug();
    packages.forEach((pkg) => {
      ensureDirSync(join(packagesRoot, pkg, dist));
      ensureDirSync(join(packagesRoot, pkg, nonWebpackDist));
    });
  }

  log.debug("Ensuring the form child folder dists.");
  FORM_FOLDERS.forEach((folder) => {
    ensureDirSync(join(packagesRoot, "form", dist, folder));
    ensureDirSync(join(packagesRoot, "form", nonWebpackDist, folder));
  });
  log.debug();
}

function createNonTildedImports(srcPath: string): void {
  const webpackDest = srcPath.replace(`${src}/`, `${nonWebpackDist}/`);

  const contents = readFileSync(srcPath, "utf8");
  const updated = contents
    .replace(/~@react-md/g, "@react-md")
    .replace(/dist\//g, `${nonWebpackDist}/`);

  log.debug(` - ${srcPath} -> ${webpackDest}`);
  writeFileSync(webpackDest, updated, "utf8");
}

/**
 * This util will copy the styles from the `src` directory into the `dist`
 * directory for the current package or all packages. In addition, it'll create
 * an additional `dist/scss` folder to contain all the scss files when not using
 * webpack since the original scss files use tilde in the path for webpack.
 */
export default async function copyStyles(): Promise<void> {
  ensureDists();

  let cwd = process.cwd();
  let pattern = SRC_PATTERN;
  if (isRoot) {
    cwd = projectRoot;
    pattern = ROOT_PATTERN;
  }

  log.debug(`Scss glob: "${pattern}"`);
  log.debug(`cwd: "${cwd}"`);
  const files = await glob(pattern, { cwd });
  log.debug(
    "Copying the following scss files and creating non-webpack import versions:"
  );
  files.forEach((srcPath) => {
    const dest = srcPath.replace(`${src}/`, `${dist}/`);
    log.debug(` - ${srcPath} -> ${dest}`);
    copyFileSync(srcPath, dest);
    createNonTildedImports(srcPath);
  });
  log.debug();
}
