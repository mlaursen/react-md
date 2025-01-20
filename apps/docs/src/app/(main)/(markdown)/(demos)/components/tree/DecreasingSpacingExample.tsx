"use client";

import { Tree } from "@react-md/core/tree/Tree";
import { useTree } from "@react-md/core/tree/useTree";
import { type ReactElement } from "react";

import { folders } from "@/constants/folders.js";

import styles from "./DecreasingSpacingExample.module.scss";

export default function DecreasingSpacingExample(): ReactElement {
  const tree = useTree();

  return (
    <Tree {...tree} data={folders} aria-label="Tree" className={styles.tree} />
  );
}
