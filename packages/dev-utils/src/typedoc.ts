import { execSync } from "child_process";
import log from "loglevel";

export function typedoc(): void {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  let command = "typedoc";
  if (commitSha) {
    command = `${command} --sourcefile-url-prefix "https://github.com/mlaursen/react-md/blob/${commitSha}/"`;
  }

  log.info(command);
  execSync(command, { stdio: "inherit" });
}
