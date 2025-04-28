import type { API, FileInfo, Options } from "jscodeshift";

import renameTextToTypography from "./rename-text-to-typography.js";
import scaleTransitionProps from "./scale-transition-props.js";

const transformers = [renameTextToTypography, scaleTransitionProps] as const;

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  transformers.forEach((transformer) => {
    file.source = transformer(file, api, options);
  });

  return file.source;
}
