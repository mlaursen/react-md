/* eslint-disable no-console */
// this is a temp file before I write the "combine everything" stuffs
import { glob } from "glob";
import chokidar from "chokidar";
import { copyFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

let log = false;
const pattern = "src/**/*.scss";

const replaceDist = (path) => path.replace("src", "dist");
const cp = async (path, dest = replaceDist(path)) => {
  await copyFile(path, dest);
  if (log) {
    console.log(`Copied ${path} -> ${dest}`);
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
  const styles = await glob(pattern);
  await Promise.all(styles.map(async (filePath) => cp(filePath)));
  console.log(`Copied ${styles.length} scss files`);
}
