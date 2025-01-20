"use client";

import { Tree } from "@react-md/core/tree/Tree";
import { useTree } from "@react-md/core/tree/useTree";
import { type ReactElement } from "react";

import { folders } from "@/constants/folders.js";

export default function MultiSelectTreeExample(): ReactElement {
  const tree = useTree({
    multiSelect: true,
  });

  return <Tree {...tree} data={folders} aria-label="Tree" />;
}
