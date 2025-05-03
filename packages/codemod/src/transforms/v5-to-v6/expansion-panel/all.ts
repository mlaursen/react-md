import { type API, type FileInfo, type Options } from "jscodeshift";

import updateExpansionPanelProps from "./update-expansion-panel-props.js";
import usePanelsToUseExpansionPanels from "./use-panels-to-use-expansion-panels.js";

const transformers = [updateExpansionPanelProps, usePanelsToUseExpansionPanels];

export default function all(
  file: FileInfo,
  api: API,
  options: Options
): string {
  transformers.forEach((transform) => {
    file.source = transform(file, api, options);
  });

  return file.source;
}
