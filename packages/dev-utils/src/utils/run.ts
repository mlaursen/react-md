import log from "loglevel";
import { execSync } from "child_process";
import { projectRoot } from "../constants";

export function run(command: string, cwd: string = projectRoot): void {
  log.info(command);
  execSync(command, { cwd, stdio: "inherit" });
}
