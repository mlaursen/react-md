import { Box } from "@react-md/core";
import { Tree, useTreeExpansion, useTreeSelection } from "@react-md/tree";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import { folders } from "src/constants/folders";

function SingleSelectTree(): ReactElement {
  const selection = useTreeSelection([], false);
  const expansion = useTreeExpansion([]);

  return (
    <Tree
      id="single-select-tree"
      data={folders}
      aria-label="Tree"
      {...selection}
      {...expansion}
    />
  );
}

function MultiSelectTree(): ReactElement {
  const selection = useTreeSelection([], true);
  const expansion = useTreeExpansion([]);

  return (
    <Tree
      id="multi-select-tree"
      data={folders}
      aria-label="Tree"
      {...selection}
      {...expansion}
    />
  );
}

export default function TreeExamples(): ReactElement {
  return (
    <Box stacked>
      <DemoHeadingWithDivider>Single Select Tree</DemoHeadingWithDivider>
      <SingleSelectTree />
      <DemoHeadingWithDivider>Multi Select Tree</DemoHeadingWithDivider>
      <MultiSelectTree />
    </Box>
  );
}
