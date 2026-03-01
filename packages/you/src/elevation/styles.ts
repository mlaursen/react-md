import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-elevation");

export interface ElevationClassNameOptions {
  className?: string;
}

export function elevation(options: ElevationClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles(), className);
}
