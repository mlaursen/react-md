"use client";
import { folders } from "@/constants/folders.js";
import { Tree, useTree } from "@react-md/core";
import { type ReactElement } from "react";

export default function SingleSelectTreeExample(): ReactElement {
  const tree = useTree();

  return <Tree {...tree} data={folders} aria-label="Tree" />;
}
