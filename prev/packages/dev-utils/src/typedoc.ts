import { execSync } from "child_process";
import log from "loglevel";

const loggedExec = (command: string): void => {
  log.info(command);
  execSync(command, { stdio: "inherit" });
};

export function typedoc(): void {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const isNoRemote = execSync("git remote -v").toString().trim().length === 0;
  if (commitSha && isNoRemote) {
    log.info(
      "A git remote could not be found. Manually setting it to the repositor field in the `package.json`."
    );

    loggedExec("git remote add origin https://github.com/mlaursen/react-md");
  }

  loggedExec("typedoc");

  if (commitSha && isNoRemote) {
    loggedExec("git remote remove origin");
    log.info("Removed the manually set origin.");
  }
}
