 // TODO: The `getItemProps` have been removed from the `Tree` component and need to be manually changed. The `renderer` prop is the closest in functionality.
import cn from "classnames";
import { ReactElement, ReactNode, useId } from "react";

import {
  ArrowDropDownSVGIcon,
  DefaultTreeItemRenderer,
  FolderOpenSVGIcon,
  FolderSVGIcon,
  Tree,
  TreeData,
  TreeItemNode,
  TreeItemRendererProps,
  TreeProvider,
  useKeyboardMovementContext,
  useTreeContext,
  useTreeExpansion,
  useTreeSelection,
} from "react-md";

import Html5SVGIcon from "icons/Html5SVGIcon";
import FileSVGIcon from "./FileSVGIcon";
import SassSVGIcon from "./SassSVGIcon";
import TypescriptSVGIcon from "./TypescriptSVGIcon";
import createIdGenerator from "./createIdGenerator";

import styles from "./CustomizingTreeItems.module.scss";

type ItemType = "folder" | "html" | "typescript" | "scss" | "text";
interface Item extends TreeItemNode {
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

// TODO: This might need to be renamed to match normal component naming conventions
const getItemProps = function Renderer(props: TreeItemRendererProps<Item>): ReactElement {
  const {
    item
  } = props;

  const {
    type,
    itemId
  } = item;

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

export default function Demo(): ReactElement {
  const selection = useTreeSelection([demo.itemId], false);
  const expansion = useTreeExpansion([
    srcFolder.itemId,
    publicFolder.itemId,
  ]);

  return (
    <Tree
      id="customizing-tree-items"
      data={data}
      aria-label="Tree"
      className={styles.tree}
      {...selection}
      {...expansion}
      getItemProps={getItemProps}
    />
  );
}
