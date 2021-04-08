import {
  copyFileSync,
  ensureDir,
  ensureDirSync,
  readFileSync,
  removeSync,
  writeFile,
} from "fs-extra";
import log from "loglevel";
import { join, sep } from "path";

import {
  dist,
  packagesRoot,
  projectRoot,
  src,
  tempStylesDir,
} from "../../constants";
import { glob } from "../glob";
import { getPackages } from "../packages";

const PATTERN = `packages/!(documentation)/${src}/**/*.scss`;

/**
 * The form package is a bit different in that there are separate variables and
 * mixin files for each part of the package in a folder. Need to make sure to
 * create the sub-folders before creating the non-webpack imports.
 */
const FORM_FOLDERS = [
  "file-input",
  "label",
  "select",
  "slider",
  "text-field",
  "toggle",
];

function ensureDists(): void {
  const packages = getPackages(true);
  packages.forEach((pkg) => {
    ensureDirSync(join(packagesRoot, pkg, dist));
  });

  FORM_FOLDERS.forEach((folder) => {
    ensureDirSync(join(packagesRoot, "form", dist, folder));
  });
}

/**
 * This util will copy the styles from the `src` directory into the `dist`
 * directory for the current package or all packages. In addition, it'll create
 * an additional `dist/scss` folder to contain all the scss files when not using
 * webpack since the original scss files use tilde in the path for webpack.
 */
export async function copyStyles(): Promise<void> {
  ensureDists();

  const files = await glob(PATTERN);
  files.forEach((srcPath) => {
    const dest = srcPath.replace(`${src}/`, `${dist}/`);
    log.debug(` - ${srcPath} -> ${dest}`);
    copyFileSync(srcPath, dest);
  });
  log.debug();
}

function cleanTempStyles(): void {
  removeSync(join(projectRoot, tempStylesDir));
}

export async function copyStylesTemp(): Promise<void> {
  const files = await glob(PATTERN);
  await Promise.all(
    files.map(async (filePath) => {
      const contents = readFileSync(filePath, "utf8");
      const [, name, , ...others] = filePath.split(sep);
      const packageName = name === "react-md" ? name : join("@react-md", name);
      const dest = join(tempStylesDir, packageName, others.join(sep));
      const parentFolders = dest.substring(0, dest.lastIndexOf(sep));

      await ensureDir(parentFolders);

      return writeFile(dest, contents);
    })
  );

  process.on("exit", (exitCode) => {
    cleanTempStyles();
    process.exit(exitCode);
  });
  process.on("SIGINT", () => {
    cleanTempStyles();
    process.exit();
  });
  process.on("uncaughtException", (error) => {
    log.error(error);
    process.exit(1);
  });
}
