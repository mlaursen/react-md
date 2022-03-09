import type { IOptions } from "glob";
import nodeGlob from "glob";
import { promisify } from "util";

import { projectRoot } from "../constants";

/**
 * A simple promisified glob
 */
export const globPromise = promisify(nodeGlob);

/**
 * Does globs from the root of the git project by default.
 */
export const glob = (
  pattern: string,
  { cwd = projectRoot, ...options }: IOptions = {}
): ReturnType<typeof globPromise> =>
  globPromise(pattern, {
    ...options,
    cwd,
  });
