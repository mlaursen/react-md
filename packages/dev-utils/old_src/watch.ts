import { ChildProcess, spawn } from "child_process";
import chokidar from "chokidar";
import { copyFileSync } from "fs";
import log from "loglevel";
import { sep } from "path";
import { sys } from "typescript";

import { dist, src } from "./constants";
import getPackages from "./utils/getPackages";
import list from "./utils/list";

export default function watch(cjs: boolean): void {
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
    const dest = pathname.replace(src, dist);

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
    output += `${dest.replace(prefix, "")}`;
    output += newLine + newLine;
    sys.write(output);

    // I don't care about the non-webpack imports for this
    copyFileSync(pathname, dest);
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
