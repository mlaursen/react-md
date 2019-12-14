import { upperFirst } from "lodash";

/**
 * Converts a string to "title" cased by splitting on all hyphens,
 * capitializing the first letter of each split, and then joining
 * back together.
 */
export default function toTitle(s: string, joinWith: string = ""): string {
  return s
    .split("-")
    .map(upperFirst)
    .join(joinWith);
}
