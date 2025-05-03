import { type API, type FileInfo, type Options } from "jscodeshift";

import removeClassNameConstants from "./remove-class-name-constants.js";
import removeUseActionClassName from "./remove-use-action-class-name.js";
import removeNavAndActionWithButton from "./replace-nav-and-action-with-button.js";
import updateAppBarProps from "./update-app-bar-props.js";
import updateAppBarTitleProps from "./update-app-bar-title-props.js";

const transformers = [
  removeClassNameConstants,
  removeUseActionClassName,
  removeNavAndActionWithButton,
  removeUseActionClassName,
  updateAppBarProps,
  updateAppBarTitleProps,
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
