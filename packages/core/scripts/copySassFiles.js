/* eslint-disable no-console */
// this is a temp file before I write the "combine everything" stuffs
import { glob } from "glob";
import chokidar from "chokidar";
import { copyFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";

let log = false;
const pattern = "src/**/*.scss";

const replaceDist = (path) => path.replace("src", "dist");
const ensureParentDirectories = async (filePath) => {
  const folder = dirname(filePath);
  if (!existsSync(folder)) {
    await mkdir(folder, { recursive: true });
  }
};

const cp = async (path, dest = replaceDist(path)) => {
  const isColors = path.endsWith("_colors.scss");
  await ensureParentDirectories(dest);
  await copyFile(path, dest);
  if (isColors) {
    await copyFile(path, "dist/_colors.scss");
  }
  if (log) {
    console.log(`Copied ${path} -> ${dest}`);
    if (isColors) {
      console.log(`Copied ${path} -> dist/colors.scss`);
    }
  }
};

if (process.argv.includes("--watch")) {
  const watcher = chokidar.watch(pattern);
  watcher.on("all", async (eventName, path) => {
    const dist = replaceDist(path);

    switch (eventName) {
      case "add":
      case "change":
        cp(path, dist);
        break;
      case "unlink": {
        if (existsSync(dist)) {
          await rm(dist);
          console.log(`Removed ${dist}`);
        }
        break;
      }
    }
  });
  watcher.on("ready", () => {
    log = true;
    console.log("Watching changes...");
  });
} else {
  if (!existsSync("dist")) {
    await mkdir("dist");
  }

  const styles = await glob(pattern);
  for (const filePath of styles) {
    const dist = replaceDist(filePath);
    await ensureParentDirectories(dist);
    await cp(filePath, dist);
  }
  console.log(`Copied ${styles.length} scss files`);
}
