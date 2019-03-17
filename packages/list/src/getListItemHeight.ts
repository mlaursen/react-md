import { ListItemHeight, SimpleListItemProps } from "./SimpleListItem";

export default function getListItemHeight({
  height = "auto",
  leftIcon,
  rightIcon,
  leftAvatar,
  rightAvatar,
  leftMedia,
  rightMedia,
  leftMediaLarge,
  rightMediaLarge,
  secondaryText,
}: SimpleListItemProps): ListItemHeight {
  if (height !== "auto") {
    return height;
  }

  const isIcon = leftIcon || rightIcon;
  const isAvatar = leftAvatar || rightAvatar;
  const isGraphic =
    leftMedia || rightMedia || leftMediaLarge || rightMediaLarge;
  if (isGraphic || (secondaryText && (isIcon || isAvatar))) {
    return "extra-large";
  } else if (isAvatar || (secondaryText && !isIcon)) {
    return "large";
  } else if (isIcon) {
    return "medium";
  }

  return "normal";
}
