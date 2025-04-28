import cn from "classnames";
import type { ReactNode } from "react";
import type { GetItemProps } from "react-md";
import {
  ArrowDropDownSVGIcon,
  FolderOpenSVGIcon,
  FolderSVGIcon,
} from "react-md";

import Html5SVGIcon from "icons/Html5SVGIcon";
import FileSVGIcon from "./FileSVGIcon";
import SassSVGIcon from "./SassSVGIcon";
import TypescriptSVGIcon from "./TypescriptSVGIcon";
import { Item } from "./anotherFile";
import styles from "./styles.module.scss";

export const getItemProps: GetItemProps<Item> = ({
  selected,
  focused,
  expanded,
  type,
  ...item
}) => {
  let leftAddon: ReactNode = null;
  switch (type) {
    case "folder":
      leftAddon = expanded ? <FolderOpenSVGIcon /> : <FolderSVGIcon />;
      break;
    case "html":
      leftAddon = <Html5SVGIcon />;
      break;
    case "text":
      leftAddon = <FileSVGIcon />;
      break;
    case "scss":
      leftAddon = <SassSVGIcon />;
      break;
    case "typescript":
      leftAddon = <TypescriptSVGIcon />;
      break;
    // no default
  }

  return {
    leftAddon,
    expanderIcon: <ArrowDropDownSVGIcon />,
    className: cn(styles.item, {
      [styles.focused]: focused,
      [styles.selected]: selected,
    }),
  };
};
