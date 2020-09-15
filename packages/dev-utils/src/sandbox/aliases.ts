import { readdirSync } from "fs";
import { join } from "path";

import { documentationRoot, src } from "../constants";

const aliases: string[] = [];

export function getAliases(): readonly string[] {
  if (!aliases.length) {
    const directories = readdirSync(join(documentationRoot, src)).filter(
      (name) => !name.startsWith("_")
    );

    aliases.push(...directories);
  }

  return aliases;
}

export function isAlaised(name: string): boolean {
  return getAliases().some((alias) => name.startsWith(alias));
}
