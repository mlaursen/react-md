import { type API, type FileInfo, type Options } from "jscodeshift";

import dirToWritingDirectionProvider from "./dir-to-writing-direction-provider.js";
import nearestParametersToObject from "./nearest-parameters-to-object.js";
import removeScrollListener from "./remove-scroll-listener.js";
import updateResizeListener from "./update-resize-listener.js";
import updateSearchFunctions from "./update-search-functions.js";
import updateUseResizeObserverApi from "./update-use-resize-observer-api.js";
import updateUseToggleApi from "./update-use-toggle-api.js";
import withinRangeParametersToObject from "./within-range-parameters-to-object.js";

const transformers = [
  dirToWritingDirectionProvider,
  nearestParametersToObject,
  removeScrollListener,
  updateResizeListener,
  updateSearchFunctions,
  updateUseResizeObserverApi,
  updateUseToggleApi,
  withinRangeParametersToObject,
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
