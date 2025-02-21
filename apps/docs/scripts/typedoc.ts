import { execSync } from "node:child_process";

const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
const isNoRemote = execSync("git remote -v").toString().trim().length === 0;

const loggedExec = (command: string): void => {
  console.log(command);
  execSync(command, { stdio: "inherit" });
};

if (commitSha && isNoRemote) {
  const remote = "https://github.com/mlaursen/react-md";
  console.log(
    `A git remote could not be found. Manually setting it to ${remote}.`
  );
  loggedExec(`git remote add origin ${remote}`);
}

loggedExec("pnpm typedoc");

if (commitSha && isNoRemote) {
  loggedExec("git remote remove origin");
  console.log("Removed the manually set origin.");
}
