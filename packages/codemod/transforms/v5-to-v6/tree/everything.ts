import { type API, type FileInfo, type Options } from "jscodeshift";
import getItemPropsToRenderComponent from "./get-item-props-to-render-component";
import itemRendererToRenderComponent from "./item-renderer-to-render-component";
import updateSimpleTypes from "./update-simple-types";
import updateTreeProps from "./update-tree-props";
import useTreeHooks from "./use-tree-hooks";

const transformers = [
  useTreeHooks,
  itemRendererToRenderComponent,
  getItemPropsToRenderComponent,
  updateSimpleTypes,
  updateTreeProps,
];

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
