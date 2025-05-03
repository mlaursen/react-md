import { type API, type FileInfo, type Options } from "jscodeshift";

import removeRemovedTypes from "./remove-removed-types.js";
import updateTextContainerProps from "./update-text-container-props.js";
import updateTypographyProps from "./update-typography-props.js";

const transformers = [
  removeRemovedTypes,
  updateTextContainerProps,
  updateTypographyProps,
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
