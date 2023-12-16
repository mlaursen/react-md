"use client";
import { folders, type Folder } from "@/constants/folders.js";
import {
  Tree,
  TreeItem,
  // useKeyboardMovementContext,
  useTree,
  useTreeContext,
  type RenderRecursiveItemsProps,
  type TreeData,
} from "@react-md/core";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import FolderOpenIcon from "@react-md/material-icons/FolderOpenIcon";
import { cnb } from "cnbuilder";
import { useId, type ReactElement } from "react";
import styles from "./CustomTreeItemRendererExample.module.scss";

export default function CustomTreeItemRendererExample(): ReactElement {
  const tree = useTree();

  return (
    <Tree
      {...tree}
      data={folders}
      aria-label="Tree"
      renderer={CustomTreeItem}
      expanderLeft
      expansionMode="manual"
    />
  );
}

function CustomTreeItem(
  props: RenderRecursiveItemsProps<Folder, TreeData<Folder>>
): ReactElement {
  const {
    item,
    // data,
    parents,
    children: childItems,
  } = props;
  const id = useId();
  const { itemId, name } = item;
  const {
    expandedIds,
    selectedIds,

    // these commented out values are all available in the tree context
    //
    // data,
    // rootId,
    // expanderIcon,
    // expanderLeft,
    // toggleTreeItemExpansion,
    // toggleTreeItemSelection,
    // selectMultipleTreeItems,
    // expandMultipleTreeItems,
    // expansionMode,
    // metadataLookup,
    // multiSelect,
    // linkComponent,
    // disableTransition,
    // temporaryChildItems,
  } = useTreeContext();

  // if you want to add custom keyboard focus styles, you could check for focus
  // state like this:
  //
  // const { activeDescendantId } = useKeyboardMovementContext();
  // const focused = id === activeDescendantId;

  const expanded = expandedIds.has(itemId);
  const selected = selectedIds.has(itemId);

  return (
    <TreeItem
      id={id}
      depth={parents.length}
      itemId={itemId}
      leftAddon={expanded ? <FolderOpenIcon /> : <FolderIcon />}
      childItems={childItems}
      className={cnb(selected && styles.selected)}
    >
      {name}
    </TreeItem>
  );
}
