import { ListItemHeight, ISimpleListItemProps } from "./SimpleListItem";

export default function getListItemHeight({
  height = "auto",
  leftIcon,
  rightIcon,
  leftAvatar,
  rightAvatar,
  secondaryText,
}: ISimpleListItemProps): ListItemHeight {
  if (height !== "auto") {
    return height;
  }

  const isIcon = leftIcon || rightIcon;
  const isAvatar = leftAvatar || rightAvatar;
  if (isAvatar || (secondaryText && isIcon)) {
    return "extra-large";
  } else if (secondaryText && !isIcon) {
    return "large";
  } else if (isIcon) {
    return "medium";
  }

  return "normal";
}
