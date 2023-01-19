import type { TreeItemRendererProps } from "@react-md/core";
import {
  DefaultTreeItemRenderer,
  Tree,
  useTree,
  useTreeContext,
} from "@react-md/core";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import FolderOpenIcon from "@react-md/material-icons/FolderOpenIcon";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";

function CustomRenderer(props: TreeItemRendererProps): ReactElement {
  const { item } = props;
  const { itemId } = item;
  const { expandedIds } = useTreeContext();
  const expanded = expandedIds.has(itemId);

  return (
    <DefaultTreeItemRenderer
      {...props}
      item={{
        ...item,
        leftAddon: expanded ? <FolderOpenIcon /> : <FolderIcon />,
      }}
    />
  );
}

export function IconExpanderBeforeExample(): ReactElement {
  const tree = useTree();

  return (
    <Tree
      {...tree}
      data={folders}
      aria-label="Tree"
      renderer={CustomRenderer}
      expanderLeft
      expansionMode="manual"
    />
  );
}
