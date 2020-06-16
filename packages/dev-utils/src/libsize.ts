import { execSync } from "child_process";
import filesize from "filesize";
import { readFileSync } from "fs";
import gzipSize from "gzip-size";
import log from "loglevel";
import { join } from "path";

import { packagesRoot } from "./constants";
import createThemes from "./utils/createThemes";
import glob from "./utils/glob";
import list from "./utils/list";

const cwd = join(packagesRoot, "react-md");

function createUmd(): void {
  log.info("Creating the UMD bundles...");
  execSync("yarn workspace react-md umd --silent", { stdio: "inherit" });
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
    createUmd();
    umd = await glob("dist/umd/*.min.js", { cwd });
  }

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
    createUmd();
  }

  if (themes) {
    await createLoggedThemes();
  }

  await umdSize();
  await cssSize();
}
