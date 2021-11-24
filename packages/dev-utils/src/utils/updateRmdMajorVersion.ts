import { promises as fs } from "fs";
import log from "loglevel";
import { join } from "path";

import { documentationRoot } from "../constants";
import { getLernaVersion } from "./packages";

const rmdVersionFile = join(
  documentationRoot,
  "src",
  "constants",
  "rmdVersion.ts"
);

const FILE_PREFIX = `// this is generated during the release process and should not be updated manually
export const RMD_MAJOR_VERSION = `;

/**
 * @returns The full major.minor.patch version number
 */
export async function updateRmdMajorVersion(): Promise<string> {
  const version = await getLernaVersion();
  const nextMajor = parseInt(version.substring(0, version.indexOf(".")), 10);
  const versionFile = await fs.readFile(rmdVersionFile, "utf8");
  const prevMajor = parseInt(versionFile.replace(FILE_PREFIX, ""), 10);

  if (Number.isNaN(nextMajor) || Number.isNaN(prevMajor)) {
    log.error("Unable to determine the react-md major version number.");
    process.exit(1);
  }

  if (nextMajor !== prevMajor) {
    await fs.writeFile(rmdVersionFile, `${FILE_PREFIX}${nextMajor};`);

    const docsBranch = `legacy-docs-v${prevMajor}`;
    log.info(`A new major version has been detected! Ensure the following steps have occurred:

- Update my domains to make sure there's a new A name for v${prevMajor}.react-md.dev
- Create a new \`${docsBranch}\` from the last published tag and push it to origin
- Update the Vercel domains to add a new v${prevMajor}.react-md.dev pointing to the \`${docsBranch}\`\`
`);
  }

  return version;
}
