import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import SingleSelectTree from "./SingleSelectTree";
import singleSelectTree from "./SingleSelectTree.md";

const demos = [
  {
    name: "Single Select Tree",
    description: singleSelectTree,
    children: <SingleSelectTree />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="tree" />
);
