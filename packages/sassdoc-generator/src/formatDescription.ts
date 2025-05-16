import { NO_COMPILE_TOKEN } from "./constants.js";

/**
 * Updates the description text to remove the trailing newlines as well as
 * replace all inline newlines with spaces
 */
export function formatDescription(
  description: string | undefined = ""
): string {
  return description
    .replace(NO_COMPILE_TOKEN, "")
    .replace(/\r?\n\r?\n$/, "")
    .replace(/([A-Za-z0-9])\r?\n([A-Za-z0-9])/g, "$1 $2");
}
