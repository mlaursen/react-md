"use client";

import { Tree } from "@react-md/core/tree/Tree";
import { useTree } from "@react-md/core/tree/useTree";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import { type ReactElement } from "react";

import { folders } from "@/constants/folders.js";

export default function ExpanderIconExample(): ReactElement {
  const tree = useTree();

  return (
    <Tree
      {...tree}
      data={folders}
      aria-label="Tree"
      expanderIcon={<KeyboardArrowDownIcon />}
    />
  );
}
