import path from "path";
import nodeSass from "node-sass";

import { nodeModules, src } from "./paths";

export default function compileScss(options?: any) {
  const rootNodeModules = path.join(process.cwd(), "..", "..", nodeModules);

  return nodeSass.renderSync({
    ...options,
    includePaths: [src, rootNodeModules],
  });
}
