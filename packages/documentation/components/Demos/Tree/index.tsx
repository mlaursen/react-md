import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";
import README from "./README.md";

import SingleSelectTree from "./SingleSelectTree";
import singleSelectTree from "./SingleSelectTree.md";

import MultiSelectTree from "./MultiSelectTree";
import multiSelectTree from "./MultiSelectTree.md";

import CustomizingTreeItems from "./CustomizingTreeItems";
import customizingTreeItems from "./CustomizingTreeItems.md";

const demos = [
  {
    name: "Single Select Tree",
    description: singleSelectTree,
    children: <SingleSelectTree />,
  },
  {
    name: "Multi Select Tree",
    description: multiSelectTree,
    children: <MultiSelectTree />,
  },
  {
    name: "Customizing Tree Items",
    description: customizingTreeItems,
    children: <CustomizingTreeItems />,
  },
];

export default (): ReactElement => (
  <DemoPage
    demos={demos}
    description={README}
    packageName="tree"
    fonts={["Font Awesome"]}
  />
);
