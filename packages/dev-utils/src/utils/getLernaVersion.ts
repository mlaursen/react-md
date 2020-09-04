import log from "loglevel";
import { join } from "path";

import { projectRoot } from "../constants";

export default async function getLernaVersion(): Promise<string | null> {
  const { version } = await import(join(projectRoot, "lerna.json"));

  log.debug(`lerna version: ${version}`);
  if (typeof version === "string") {
    return version;
  }

  return null;
}
