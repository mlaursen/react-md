import log from "loglevel";
import { execSync } from "child_process";

import { isRoot } from "./constants";
import getCurrentPackageName from "./utils/getCurrentPackageName";
import getPackages from "./utils/getPackages";
import tsc, { CompileTarget, tscWatcher } from "./utils/tsc";

function getTargets(packageName: string): CompileTarget[] {
  const configs: CompileTarget[] = [];
  if (getPackages("typescript").includes(packageName)) {
    configs.push("ejs", "cjs");
  }

  if (getPackages("scss").includes(packageName)) {
    configs.push("var");
  }

  return configs;
}

function getNameOf(tsconfigPath: string): string {
  if (!isRoot) {
    return getCurrentPackageName(false);
  }

  const [, name] = tsconfigPath.split("/").reverse();
  if (name === "react-md") {
    return name;
  }

  return `@react-md/${name}`;
}

/**
 * Runs tsc for all the packages that have typescript files or packages that
 * have a scssVariables file.
 */
export default function build(
  scopedOnly: boolean,
  silent: boolean,
  watch: boolean = false,
  cjs: boolean = false
): Promise<void> {
  if (isRoot) {
    if (watch) {
      throw new Error("Unable to create a build watcher from the root.");
    }

    let command = [
      "@react-md/dev-utils",
      "documentation",
      !scopedOnly && "react-md",
    ].reduce((cmd, name) => {
      if (!name) {
        return cmd;
      }

      return `${cmd} --ignore ${name}`;
    }, "lerna run build");

    let added = false;
    if (silent) {
      added = true;
      command = `${command} -- --silent`;
    }

    if (watch) {
      command = `${command} ${added ? "" : "-- "}-w`;
      added = true;
    }

    log.info(command);
    execSync(command, { stdio: "inherit" });
    return;
  }

  if (watch) {
    tscWatcher(cjs);
    return;
  }

  const name = getCurrentPackageName();
  log.info(`Building ${getNameOf(name)}...`);
  getTargets(name).forEach(target => tsc(target));
  log.info();
}
