import nodeSass from "node-sass";

import { rootNodeModules, src } from "./paths";

export default function compileScss(options?: any) {
  return nodeSass.renderSync({
    ...options,
    includePaths: [src, rootNodeModules],
  });
}
