import fs from "fs";

/**
 * Checks if the filePath is considered a markdown file.
 */
export function isMarkdown(filePath: string) {
  return filePath.endsWith(".md");
}

/**
 * Checks if the filePath was loaded through the raw-loader manually.
 */
export function isRaw(filePath: string) {
  return /raw-loader/.test(filePath);
}

/**
 * Checks if the filePath is considered a css or scss file.
 */
export function isStyle(filePath: string) {
  return /\.s?css$/.test(filePath);
}

/**
 * Checks if the filePath is considered an svg file.
 */
export function isSvg(filePath: string) {
  return /\.svg$/.test(filePath);
}

/**
 * Checks if the filePath is considered a relative import. This
 * is used when needing to resolve "./Name" or "../Name"
 */
export function isRelative(filePath: string) {
  return /^\.\.?\//.test(filePath);
}

/**
 * Checks if the filePath is an alised import
 */
export function isAliased(filePath: string, aliases: string[]) {
  return aliases.some(alias => filePath.startsWith(alias));
}

/**
 * Checks if the filePath is a directory
 */
export function isDirectory(filePath: string) {
  try {
    return fs.lstatSync(filePath).isDirectory();
  } catch (e) {
    return false;
  }
}
