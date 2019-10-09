import React, { FC, ReactNode } from "react";
import {
  ArrowDropDownSVGIcon,
  FolderOpenSVGIcon,
  FolderSVGIcon,
} from "@react-md/material-icons";
import {
  GetItemProps,
  Tree,
  TreeData,
  TreeItemIds,
  useTreeItemExpansion,
  useTreeItemSelection,
} from "@react-md/tree";
import { bem } from "@react-md/utils";

import FileSVGIcon from "icons/FileSVGIcon";
import HTML5SVGIcon from "icons/HTML5SVGIcon";
import SassSVGIcon from "icons/SassSVGIcon";
import TypescriptSVGIcon from "icons/TypescriptSVGIcon";
import createIdGenerator from "utils/createIdGenerator";

import "./CustomizingTreeItems.scss";

type ItemType = "folder" | "html" | "typescript" | "scss" | "text";
interface Item extends TreeItemIds {
  name: string;
  type: ItemType;
}

const uuid = createIdGenerator("custom-tree-items");
const createItem = (
  name: string,
  type: ItemType,
  parentId: string | null = null
): Item => {
  const itemId = uuid();
  return {
    itemId,
    parentId,
    name,
    type,
  };
};

const publicFolder = createItem("public", "folder");
const srcFolder = createItem("src", "folder");
const indexHtml = createItem("index.html", "html", srcFolder.itemId);
const robots = createItem("robots.txt", "text", publicFolder.itemId);
const demo = createItem("Demo.tsx", "typescript", srcFolder.itemId);
const variables = createItem("_variables.scss", "scss", srcFolder.itemId);
const index = createItem("index.ts", "typescript", srcFolder.itemId);

const data = [
  publicFolder,
  srcFolder,
  indexHtml,
  robots,
  demo,
  variables,
  index,
].reduce<TreeData<Item>>(
  (tree, item) => ({ ...tree, [item.itemId]: item }),
  {}
);

const styles = bem("customizing-tree-items");

const getItemProps: GetItemProps<Item> = item => {
  const { selected, focused, expanded, type } = item;
  let leftIcon: ReactNode = null;
  switch (type) {
    case "folder":
      leftIcon = expanded ? <FolderOpenSVGIcon /> : <FolderSVGIcon />;
      break;
    case "html":
      leftIcon = <HTML5SVGIcon />;
      break;
    case "text":
      leftIcon = <FileSVGIcon />;
      break;
    case "scss":
      leftIcon = <SassSVGIcon />;
      break;
    case "typescript":
      leftIcon = <TypescriptSVGIcon />;
      break;
    // no default
  }

  return {
    leftIcon,
    expanderIcon: <ArrowDropDownSVGIcon />,
    className: styles("item", {
      focused,
      selected,
    }),
  };
};

const CustomizingTreeItems: FC = () => {
  const selection = useTreeItemSelection([demo.itemId], false);
  const expansion = useTreeItemExpansion([
    srcFolder.itemId,
    publicFolder.itemId,
  ]);

  return (
    <Tree
      id="customizing-tree-items"
      data={data}
      aria-label="Tree"
      className={styles()}
      {...selection}
      {...expansion}
      getItemProps={getItemProps}
    />
  );
};

export default CustomizingTreeItems;
