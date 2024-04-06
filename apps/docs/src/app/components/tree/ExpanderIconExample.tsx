"use client";
import { folders } from "@/constants/folders.js";
import { Tree, useTree } from "react-md";
import KeyboardArrowDownIcon from "@react-md/material-icons/KeyboardArrowDownIcon";
import { type ReactElement } from "react";

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
