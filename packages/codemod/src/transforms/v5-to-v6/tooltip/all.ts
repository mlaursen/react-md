import { type API, type FileInfo, type Options } from "jscodeshift";

import convertUseTooltip from "./convert-use-tooltip.js";
import removeTooltippedComponent from "./remove-tooltipped-component.js";
import updateTooltipProps from "./update-tooltip-props.js";

const transformers = [
  convertUseTooltip,
  removeTooltippedComponent,
  updateTooltipProps,
];

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
