import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";
import README from "./README.md";

import SingleSelectTree from "./SingleSelectTree";
import singleSelectTree from "./SingleSelectTree.md";

import MultiSelectTree from "./MultiSelectTree";
import multiSelectTree from "./MultiSelectTree.md";

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
];

export default (): ReactElement => (
  <DemoPage demos={demos} description={README} packageName="tree" />
);
