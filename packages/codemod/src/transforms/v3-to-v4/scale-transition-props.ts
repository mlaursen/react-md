import type { API, FileInfo, Options } from "jscodeshift";

import { renameProps } from "../utils/renameProps.js";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  return renameProps({
    root,
    component: "ScaleTransition",
    props: {
      visible: "transitionIn",
    },
  }).toSource(printOptions);
}
