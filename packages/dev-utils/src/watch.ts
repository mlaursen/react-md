import { ChildProcess, spawn } from "child_process";
import chokidar from "chokidar";
import { copyFileSync } from "fs";
import log from "loglevel";
import { sep } from "path";
import { sys } from "typescript";

import { dist, src } from "./constants";
import getPackages from "./utils/getPackages";
import list from "./utils/list";

const started = new Map<string, ChildProcess>();

function handle(cjs: boolean): (pathname: string) => void {
  return function handler(pathname) {
    const [, packageName] = pathname.split("/");
    const name =
      packageName === "react-md" ? packageName : `@react-md/${packageName}`;
    if (/(?<!scssVariables)\.tsx?$/.test(pathname) && !started.has(name)) {
      const args = ["workspace", name, "build", "-w"];
      log.info(`yarn ${args.join(" ")}`);
      const process = spawn("yarn", args, { stdio: "inherit" });

      started.set(name, process);
      if (cjs) {
        const cjsArgs = [...args, "--cjs"];
        log.info(`yarn ${cjsArgs.join(" ")}`);
        const cjsProcess = spawn("yarn", cjsArgs, { stdio: "inherit" });
        started.set(`${name}-cjs`, cjsProcess);
      }
    }

    if (/\.scss/.test(pathname)) {
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
    }
  };
}

export default function watch(cjs: boolean): void {
  const packages = getPackages().filter((name) => name !== "material-icons");
  const sources = packages.map((name) => `packages/${name}/${src}`);

  const watcher = chokidar.watch(sources, { ignored: /__tests__/ });
  watcher.on("change", handle(cjs));
  watcher.on("ready", () => {
    log.info("Started the watcher in the following packages:");
    log.info(list(packages));
    log.info();
  });

  process.on("SIGINT", () => {
    Array.from(started.entries()).forEach(([, child]) => {
      child.kill("SIGINT");
    });
    process.exit();
  });
}
