import path from "path";
import { isRelative, isAliased } from "./matchers";

/**
 * A small util that will make a "pretty" module name from the provided
 * file path.
 */
export function getModuleName(filePath: string, scss: boolean = false): string {
  if (/csstype|prop-types/.test(filePath)) {
    return "";
  }
  if (scss && filePath.includes("@react-md")) {
    return filePath.replace(/^.*(@react-md\/[a-z-]+)\/.+$/, "$1");
  }

  return filePath
    .replace(/.*node_modules\//, "")
    .replace(/\/(types|dist)\/.+$/, "")
    .replace(/.+documentation\//, "")
    .replace(/prismjs.+/, "prismjs")
    .replace(/.*@types\/([a-z-]+)(\/.+)?$/, "$1");
}

/**
 * Returns a filtered list of modules that are considered relative imports
 * so that additional custom resolution can be done.
 */
export function getRelativeModules(modules: string[]): string[] {
  return modules.filter(isRelative);
}

export function getAliasedImports(
  imports: string[],
  aliases: string[]
): string[] {
  return imports.filter(name => isAliased(name, aliases));
}

/**
 * Finds the relative or parent folder of the provided file path. This really only works
 * for files right now and will return incorrect results for folders (maybe)
 */
export function getRelativeFolder(filePath: string, start: number = 0): string {
  return filePath.substring(start, filePath.lastIndexOf(path.sep));
}

export function getAliasedRelativeFolder(
  filePath: string,
  aliases: string[]
): string {
  const alias = aliases.find(a => filePath.includes(a));
  let start = 0;
  if (alias) {
    start = filePath.indexOf(alias);
  }

  return getRelativeFolder(filePath, start);
}
