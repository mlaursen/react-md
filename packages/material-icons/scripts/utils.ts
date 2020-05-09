import nodeGlob from "glob";
import { promisify } from "util";

export const glob = promisify(nodeGlob);

export function list(things: (string | boolean | null | undefined)[]): string {
  return things
    .filter(Boolean)
    .map((thing) => `- ${thing}`)
    .join("\n");
}
