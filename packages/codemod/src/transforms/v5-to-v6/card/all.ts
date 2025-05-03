import { type API, type FileInfo, type Options } from "jscodeshift";

import cardActionsToCardFooter from "./card-actions-to-card-footer.js";
import removeDeprecatedCardProps from "./remove-deprecated-card-props.js";
import updateCardContentProps from "./update-card-content-props.js";
import updateCardHeaderProps from "./update-card-header-props.js";
import updateCardSubtitleProps from "./update-card-subtitle-props.js";
import updateCardTitleProps from "./update-card-title-props.js";

const transformers = [
  cardActionsToCardFooter,
  removeDeprecatedCardProps,
  updateCardContentProps,
  updateCardHeaderProps,
  updateCardSubtitleProps,
  updateCardTitleProps,
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
