import { type API, type FileInfo, type Options } from "jscodeshift";

import removeNestedDialogProvider from "./update-dialog-props.js";
import updateDialogProps from "./update-dialog-props.js";

const transformers = [removeNestedDialogProvider, updateDialogProps];

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
