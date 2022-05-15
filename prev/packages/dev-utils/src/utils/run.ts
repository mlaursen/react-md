import { execSync } from "child_process";
import log from "loglevel";

import { projectRoot } from "../constants";

export function run(command: string, cwd: string = projectRoot): void {
  log.info(command);
  execSync(command, { cwd, stdio: "inherit" });
}
