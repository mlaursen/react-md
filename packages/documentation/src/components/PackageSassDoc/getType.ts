import { FormattedSassDocItem } from "utils/sassdoc";

export default function getType(
  type: FormattedSassDocItem["type"]
): "function" | "mixin" | "variable" {
  return type !== "mixin" && type !== "function" ? "variable" : type;
}
