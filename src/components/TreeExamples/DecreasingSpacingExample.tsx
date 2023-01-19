import type { TreeItemRendererProps } from "@react-md/core";
import { DefaultTreeItemRenderer, Tree, useTree } from "@react-md/core";
import FolderIcon from "@react-md/material-icons/FolderIcon";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { folders } from "src/constants/folders";

import styles from "./DecreasingSpacingExample.module.scss";

function Renderer(props: TreeItemRendererProps): ReactElement {
  const { item, depth } = props;
  return (
    <DefaultTreeItemRenderer
      {...props}
      item={{
        ...item,
        contentClassName: cnb(depth === 0 && styles.item),
        leftAddon: <FolderIcon />,
      }}
    />
  );
}

export function DecreasingSpacingExample(): ReactElement {
  const tree = useTree();

  return (
    <Tree
      {...tree}
      data={folders}
      aria-label="Tree"
      className={styles.container}
      renderer={Renderer}
      expanderLeft
    />
  );
}
