import cn from "classnames";
import { ReactElement, ReactNode, useId } from "react";
import {
  ArrowDropDownSVGIcon,
  DefaultTreeItemRenderer,
  FolderOpenSVGIcon,
  FolderSVGIcon,
  TreeItemRendererProps,
  TreeProvider,
  useKeyboardMovementContext,
  useTreeContext,
} from "react-md";

import Html5SVGIcon from "icons/Html5SVGIcon";
import FileSVGIcon from "./FileSVGIcon";
import SassSVGIcon from "./SassSVGIcon";
import TypescriptSVGIcon from "./TypescriptSVGIcon";
import { Item } from "./anotherFile";
import styles from "./styles.module.scss";

// TODO: This might need to be renamed to match normal component naming conventions
export const getItemProps = function Renderer(props: TreeItemRendererProps<Item>): ReactElement {
  const {
    item: tempItem
  } = props;

  const {
    type,
    itemId,
    ...item
  } = tempItem;

  const context = useTreeContext();

  const {
    expandedIds,
    selectedIds
  } = context;

  const expanded = expandedIds.has(itemId);
  const selected = selectedIds.has(itemId);
  const id = useId();
  const focused = useKeyboardMovementContext().activeDescendantId === id;
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

  return (
    <TreeProvider {...context} expanderIcon={<ArrowDropDownSVGIcon />}><DefaultTreeItemRenderer
        {...props}
        leftAddon={leftAddon}
        className={cn(styles.item, {
          [styles.focused]: focused,
          [styles.selected]: selected,
        })}
        id={id} /></TreeProvider>
  );
};
