import { execSync } from "child_process";
import filesize from "filesize";
import gzipSize from "gzip-size";
import log from "loglevel";
import { join } from "path";

import build from "./build";
import clean from "./clean";
import { packagesRoot } from "./constants";
import createScssVariables from "./scssVariables";
import copyStyles from "./utils/copyStyles";
import createThemes from "./utils/createThemes";
import glob from "./utils/glob";
import list from "./utils/list";

const cwd = join(packagesRoot, "react-md");

async function umd(): Promise<void> {
  const umd = await glob("dist/umd/*.min.js", { cwd });
  log.info("The gzipped UMD bundle size is:");
  log.info(list(umd.map(name => `${name} ${filesize(gzipSize.sync(name))}`)));
  log.info();
}

async function css(): Promise<void> {
  const css = await glob("dist/css/*.min.css", { cwd });

  const { min, max } = css.reduce(
    (result, cssPath) => {
      const size = gzipSize.sync(cssPath);
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

export default async function prepublish(
  init: boolean,
  silent: boolean
): Promise<void> {
  if (!init) {
    log.info("Cleaning all the old dists...");
    await clean();
  }

  log.info("Creating the SCSS dists...");
  await copyStyles();

  log.info("Creating the scssVariables files...");
  await createScssVariables(true);

  log.info();
  log.info("Building the typescript files...");
  await build(init, silent || !init);
  log.info();
  if (init) {
    log.info("Initial setup complete!");
    return;
  }

  log.info("Creating the UMD bundles...");
  execSync("yarn workspace react-md umd --silent", { stdio: "inherit" });
  log.info();

  log.info("Creating all the pre-compiled themes...");
  await createThemes();
  log.info();

  await umd();
  await css();
}
