"use client";
import { folders } from "@/constants/folders.js";
import { Tree, useTree } from "react-md";
import { type ReactElement } from "react";
import styles from "./DecreasingSpacingExample.module.scss";

export default function DecreasingSpacingExample(): ReactElement {
  const tree = useTree();

  return (
    <Tree {...tree} data={folders} aria-label="Tree" className={styles.tree} />
  );
}
