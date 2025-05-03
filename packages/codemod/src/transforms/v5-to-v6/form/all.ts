import { type API, type FileInfo, type Options } from "jscodeshift";

import replaceWithFormMessageComponents from "./replace-with-form-message-components.js";
import updateFileInputProps from "./update-file-input-props.js";
import updatePasswordProps from "./update-password-props.js";
import updateSelectApi from "./update-select-api.js";
import updateSliderAndRangeSlider from "./update-slider-and-range-slider.js";
import updateTextFieldContainerProps from "./update-text-field-container-props.js";
import updateUseTextFieldApi from "./update-use-text-field-api.js";

const transformers = [
  replaceWithFormMessageComponents,
  updateTextFieldContainerProps,
  updateFileInputProps,
  updatePasswordProps,
  updateSelectApi,
  updateSliderAndRangeSlider,
  updateUseTextFieldApi,
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
