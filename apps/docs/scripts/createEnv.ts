import packageJson from "@react-md/core/package.json" with { type: "json" };
import { execSync } from "node:child_process";
import { writeFile } from "node:fs/promises";

const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
const branchName =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ??
  execSync("git branch --show-current").toString().trim();
const commit =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.argv.includes("--dev")
    ? branchName
    : execSync("git rev-parse HEAD").toString().trim();

const githubUrl = "https://github.com/mlaursen/react-md";

let baseUrl = packageJson.homepage;
if (/(support\/v\d)|next/.test(branchName)) {
  baseUrl = `https://${branchName}.react-md.dev`;
} else if (vercelUrl) {
  if (branchName !== "main") {
    baseUrl = `https://${vercelUrl}`;
  }
} else if (process.env.NODE_ENV !== "production") {
  baseUrl = `http://localhost:${process.env.PORT ?? 3000}`;
}

const env = {
  NEXT_PUBLIC_BASE_URL: baseUrl,
  NEXT_PUBLIC_GITHUB_URL: githubUrl,
  NEXT_PUBLIC_GITHUB_FILE_LINK: `${githubUrl}/blob/${commit}`,
  NEXT_PUBLIC_BRANCH_NAME: branchName,
  NEXT_PUBLIC_RMD_VERSION: packageJson.version,
  NEXT_PUBLIC_ALGOLIA_APP_ID: "D8A7D4VBAW",
  NEXT_PUBLIC_ALGOLIA_API_KEY: "9a93702ac5feb1874e6ecc334127c069",
  NEXT_PUBLIC_ALGOLIA_INDEX_NAME: "next_react_md_dev_search",
} satisfies Record<string, string>;

const stringifiedEnv = Object.entries(env)
  .map(([name, value]) => `${name}=${value}`)
  .join("\n");

console.log("Creating .env.local with:");
console.log(stringifiedEnv);
console.log();
await writeFile(".env.local", stringifiedEnv, "utf8");
