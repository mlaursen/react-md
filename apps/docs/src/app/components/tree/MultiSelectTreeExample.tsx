"use client";
import { folders } from "@/constants/folders.js";
import { Tree, useTree } from "@react-md/core";
import { type ReactElement } from "react";

export default function MultiSelectTreeExample(): ReactElement {
  const tree = useTree({
    multiSelect: true,
  });

  return <Tree {...tree} data={folders} aria-label="Tree" />;
}
