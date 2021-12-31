import { ChildProcess, spawn } from "child_process";
import chokidar from "chokidar";
import log from "loglevel";
import { sep } from "path";
import { sys } from "typescript";

import { everythingScss, packagesRoot, src } from "./constants";
import { combineAllFiles, getPackages, list } from "./utils";

/**
 * Creates a custom dev watcher for copying styles into dists correctly
 * as well as spinning up tsc watchers.
 */
export function watch(cjs: boolean): void {
  const packages = getPackages().filter((name) => name !== "material-icons");
  const sources = packages.map((name) => `packages/${name}/${src}/**/*.scss`);

  const processes: ChildProcess[] = [];
  processes.push(spawn("yarn", ["build-ejs", "-w"], { stdio: "inherit" }));
  if (cjs) {
    processes.push(spawn("yarn", ["build-cjs", "-w"], { stdio: "inherit" }));
  }

  const watcher = chokidar.watch(sources, { ignored: /__tests__/ });
  watcher.on("change", (pathname) => {
    const [, packageName] = pathname.split("/");
    const name =
      packageName === "react-md" ? packageName : `@react-md/${packageName}`;
    const { newLine } = sys;

    let output = "";
    if (sys.clearScreen) {
      sys.clearScreen();
    } else {
      output += newLine;
    }

    const prefix = `packages${sep}${packageName}${sep}`;
    output = `[${name} - ${new Date().toLocaleTimeString()}] `;
    output += `Detected scss file change${newLine}`;
    output += `${pathname.replace(prefix, "")} -> `;
    output += `${everythingScss.replace(packagesRoot, "")}`;
    output += newLine + newLine;
    sys.write(output);

    combineAllFiles();
  });
  watcher.on("ready", () => {
    log.info("Started the watcher in the following packages:");
    log.info(list(packages));
    log.info();
  });

  process.on("SIGINT", () => {
    processes.forEach((child) => child.kill("SIGINT"));
    process.exit();
  });
}
